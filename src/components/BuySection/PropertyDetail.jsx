import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Booking from "./Booking";
import "./PropertyDetail.css";
import { useAuth } from "../../context/AuthContext";

const Lightbox = ({ src, onClose }) => (
  <div className="lightbox" onClick={onClose}>
    <img src={src} alt="Zoomed" className="lightbox-image" />
  </div>
);

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty(docSnap.data());
        checkFavoriteStatus(docSnap.id);
      } else {
        console.log("No such document!");
      }
    };
    fetchProperty();
  }, [id]);

  const checkFavoriteStatus = async (propertyId) => {
    const favoriteQuery = query(collection(db, "favorites"), where("userId", "==", user.uid), where("propertyId", "==", propertyId));
    const snapshot = await getDocs(favoriteQuery);
    setIsFavorited(!snapshot.empty);
  };

  const toggleFavorite = async () => {
    if (isFavorited) {
      const favoriteDoc = await getFavoriteDoc();
      await deleteDoc(doc(db, "favorites", favoriteDoc.id));
    } else {
      await setDoc(doc(db, "favorites", `${user.uid}_${id}`), {
        userId: user.uid,
        propertyId: id
      });
    }
    setIsFavorited(!isFavorited);
  };

  const getFavoriteDoc = async () => {
    const favoriteQuery = query(collection(db, "favorites"), where("userId", "==", user.uid), where("propertyId", "==", id));
    const snapshot = await getDocs(favoriteQuery);
    return snapshot.docs.length > 0 ? snapshot.docs[0] : null;
  };

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/600x400"; // Fallback image
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setLightboxVisible(true);
  };

  if (!property) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const formattedFeatures = property.features ? (Array.isArray(property.features) ? property.features.join(', ') : property.features) : '';

  // Prepare the URL for the iframe dynamically
  const addressForMap = encodeURIComponent(`${property.address}, ${property.location}`);
  const mapSrc = `https://maps.google.com/maps?q=${addressForMap}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="property-detail-page">
      {lightboxVisible && (
        <Lightbox src={selectedImage} onClose={() => setLightboxVisible(false)} />
      )}
      <header className="property-header">
        <h1 className="property-name">{property.name}</h1>
      </header>
      <main className="property-main-content">
        <div className="property-detail-top">
          <div className="property-images">
            <img
              src={property.image}
              alt={property.name}
              className="property-main-image"
              onError={handleImageError}
              onClick={() => handleImageClick(property.image)}
            />
            <div className="property-additional-images">
              {property.additionalImages && property.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional image ${index + 1}`}
                  className="property-additional-image"
                  onError={handleImageError}
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </div>
          <div className="property-info">
            <p className="property-price">${property.price.toLocaleString()}</p>
            <p className="property-address">{property.address}, {property.location}</p>
            <button onClick={toggleFavorite} className="favorite-button">
              {isFavorited ? '❤️' : '🤍'}
            </button>
            <button onClick={() => setIsBookingOpen(true)} className="book-visit-button">
              Book a Visit
            </button>
          </div>
        </div>
        
        <div className="property-detail-info">
          <h2>Listing Description</h2>
          <p>{property.detail}</p>
          <h2>Property Summary</h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <td><strong>Category:</strong></td>
                <td>{property.category}</td>
                <td><strong>Year Built:</strong></td>
                <td>{property.yearBuilt}</td>
              </tr>
              <tr>
                <td><strong>Type:</strong></td>
                <td>{property.type}</td>
                <td><strong>Garage:</strong></td>
                <td>{property.garage}</td>
              </tr>
              <tr>
                <td><strong>Bedrooms:</strong></td>
                <td>{property.bedrooms}</td>
                <td><strong>Features:</strong></td>
                <td>{formattedFeatures}</td>
              </tr>
              <tr>
                <td><strong>Bathrooms:</strong></td>
                <td>{property.bathrooms}</td>
                <td><strong>Floor Plan:</strong></td>
                <td>{property.floorPlan}</td>
              </tr>
              <tr>
                <td><strong>Square Footage:</strong></td>
                <td>{property.squareFootage} sq ft</td>
                <td><strong>Lot Size:</strong></td>
                <td>{property.lotSize} sq.ft.</td>
              </tr>
              <tr>
                <td><strong>Amenities Nearby:</strong></td>
                <td>{property.amenities}</td>
              </tr>
            </tbody>
          </table>
          <div className="building-details">
            <table className="building-grid">
              <tbody>
                <tr>
                  <td><strong>Heating Type:</strong></td>
                  <td>{property.heatingType}</td>
                  <td><strong>Cooling:</strong></td>
                  <td>{property.cooling}</td>
                </tr>
                <tr>
                  <td><strong>Exterior Finish:</strong></td>
                  <td>{property.exteriorFinish}</td>
                  <td><strong>Construction Material:</strong></td>
                  <td>{property.constructionMaterial}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="property-detail-map">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={mapSrc}
            ></iframe>
          </div>
          
        </div>
        {isBookingOpen && (
          <Booking propertyId={id} onClose={() => setIsBookingOpen(false)} />
        )}
      </main>
    </div>
  );
};

export default PropertyDetail;
