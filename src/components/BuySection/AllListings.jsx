import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, query, where
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AllListings.css";

const AllListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertyData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const favoritesQuery = query(collection(db, "favorites"), where("userId", "==", user.uid));
      getDocs(favoritesQuery).then((snapshot) => {
        const favoriteData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favoriteData);
      });
    }
  }, [user]);

  const toggleFavorite = async (propertyId, e) => {
    e.stopPropagation();
    if (!user) {
      alert("You need to log in to favorite a property.");
      return;
    }

    const favoriteDoc = favorites.find(fav => fav.propertyId === propertyId);
    if (favoriteDoc) {
      await deleteDoc(doc(db, "favorites", favoriteDoc.id));
      setFavorites(favorites.filter(fav => fav.propertyId !== propertyId));
    } else {
      const newFavorite = { userId: user.uid, propertyId, isFavorite: true };
      const docRef = await setDoc(doc(collection(db, "favorites")), newFavorite);
      setFavorites([...favorites, { ...newFavorite, id: docRef.id }]);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.propertyId === propertyId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="all-listings">
      <h1>All Listings</h1>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-item" onClick={() => navigate(`/property/${property.id}`)}>
            <div className="image-wrapper">
              <img src={property.image} alt={property.name} />
              <div className="favorite" onClick={(e) => toggleFavorite(property.id, e)}>
                {isFavorite(property.id) ? '❤️' : '🤍'}
              </div>
            </div>
            <div className="property-details">
              <h3>{property.name}</h3>
              <h3>{property.price}</h3>
              <p>{property.beds} Beds • {property.baths} Baths • {property.sqft} Sqft • {property.type}</p>
              <p>{property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllListings;
