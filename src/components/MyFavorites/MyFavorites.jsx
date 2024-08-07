import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./MyFavorites.css";

const MyFavorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritesQuery = query(collection(db, "favorites"), where("userId", "==", user.uid));
        const snapshot = await getDocs(favoritesQuery);
        const favoriteData = snapshot.docs.map(doc => ({ propertyId: doc.id, ...doc.data() }));

        const propertyPromises = favoriteData.map(async (favorite) => {
          const propertyDoc = await getDoc(doc(db, "properties", favorite.propertyId));
          return { ...favorite, ...propertyDoc.data() };
        });

        const properties = await Promise.all(propertyPromises);
        setFavoriteProperties(properties);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (propertyId) => {
    const favoriteDoc = await getFavoriteDoc(propertyId);
    if (favoriteDoc) {
      await deleteDoc(doc(db, "favorites", favoriteDoc.id));
      setFavoriteProperties(favoriteProperties.filter(property => property.propertyId !== propertyId));
    } else {
      await setDoc(doc(db, "favorites", `${user.uid}_${propertyId}`), {
        userId: user.uid,
        propertyId: propertyId
      });
      const propertyDoc = await getDoc(doc(db, "properties", propertyId));
      setFavoriteProperties([...favoriteProperties, { propertyId, ...propertyDoc.data() }]);
    }
  };

  const getFavoriteDoc = async (propertyId) => {
    const favoriteQuery = query(collection(db, "favorites"), where("userId", "==", user.uid), where("propertyId", "==", propertyId));
    const snapshot = await getDocs(favoriteQuery);
    return snapshot.docs.length > 0 ? snapshot.docs[0] : null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-favorites-wrapper">
      <h1>My Favorites</h1>
      <div className="my-favorites-container">
        {favoriteProperties.map((property) => (
          <div
            key={property.propertyId}
            className="property-item"
            onClick={() => navigate(`/property/${property.propertyId}`)}
          >
            <div className="image-wrapper">
              <img src={property.image} alt={property.name} />
              <div
                className="favorite"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.propertyId);
                }}
              >
                {favoriteProperties.some(fav => fav.propertyId === property.propertyId) ? '❤️' : '🤍'}
              </div>
            </div>
            <div className="property-details">
              <h3 className="property-name">{property.name}</h3>
              <h3>${property.price ? property.price.toLocaleString() : 'N/A'}</h3>
              <p>{property.beds} Beds • {property.baths} Baths • {property.squareFootage} Sqft • {property.type}</p>
              <p>{property.communityName}, {property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
