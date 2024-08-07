import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, query, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Make sure AuthContext is correctly set up
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get("location").toLowerCase();
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]); // Assuming favorite fetching is set up
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setSearchMessage("");
      setSearchResults([]);
      try {
        const propertiesRef = collection(db, "properties");
        const propertiesQuery = query(propertiesRef);
        const querySnapshot = await getDocs(propertiesQuery);
        const results = [];
        querySnapshot.forEach((doc) => {
          const property = { id: doc.id, ...doc.data() };
          if (property.location.toLowerCase().includes(searchLocation)) {
            results.push(property);
          }
        });
        if (results.length > 0) {
          setSearchResults(results);
        } else {
          setSearchMessage("No properties found for this location.");
        }
      } catch (error) {
        console.error("Error searching properties: ", error);
        setSearchMessage("An error occurred while searching.");
      }
    };

    if (searchLocation) {
      fetchResults();
    }
  }, [searchLocation]);

  const toggleFavorite = async (propertyId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking on favorite icon
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

  return (
    <div className="search-results-wrapper">
      <h1>Search Results for "{searchLocation}"</h1>
      {searchMessage && <div className="search-message">{searchMessage}</div>}
      <div className="search-results">
        {searchResults.map((property) => (
          <div key={property.id} className="property-item" onClick={() => navigate(`/property/${property.id}`)}>
            <div className="image-wrapper">
              <img src={property.image} alt={property.name} style={{ width: "100%", height: "200px" }} />
              <button className="favorite" onClick={(e) => toggleFavorite(property.id, e)}>
                {isFavorite(property.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="property-details">
              <h3>{property.name}</h3>
              <h3>${property.price.toLocaleString()}</h3>
              <p>{property.beds} Beds • {property.baths} Baths • {property.sqft} Sqft</p>
              <p>{property.type}</p>
              <p>{property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
