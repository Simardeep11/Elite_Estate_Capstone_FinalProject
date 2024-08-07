import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "./AdminBuySection.css";
import { sliderSettings } from "../../utils/common";
import { useAuth } from "../../context/AuthContext";

const BuySection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("Fetching properties...");
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched properties:", propertyData);
      setProperties(propertyData);
      setLoading(false);
    });

    if (user) {
      console.log("Fetching favorites for user:", user.uid);
      const unsubscribeFavorites = onSnapshot(collection(db, "favorites"), (snapshot) => {
        const favoriteData = snapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => doc.data().propertyId);
        console.log("Fetched favorites:", favoriteData);
        setFavorites(favoriteData);
      });

      return () => {
        unsubscribe();
        unsubscribeFavorites();
      };
    }
  }, [user]);

  const toggleFavorite = async (propertyId) => {
    console.log("Toggling favorite for property:", propertyId);
    if (favorites.includes(propertyId)) {
      const favoriteDoc = await getFavoriteDoc(propertyId);
      if (favoriteDoc) {
        console.log("Removing from favorites:", favoriteDoc.id);
        await deleteDoc(doc(db, "favorites", favoriteDoc.id));
        setFavorites(favorites.filter(favId => favId !== propertyId));
      }
    } else {
      console.log("Adding to favorites:", `${user.uid}_${propertyId}`);
      await setDoc(doc(db, "favorites", `${user.uid}_${propertyId}`), {
        userId: user.uid,
        propertyId: propertyId
      });
      setFavorites([...favorites, propertyId]);
    }
  };

  const getFavoriteDoc = async (propertyId) => {
    const favoriteQuery = query(collection(db, "favorites"), where("userId", "==", user.uid), where("propertyId", "==", propertyId));
    const snapshot = await getDocs(favoriteQuery);
    return snapshot.docs[0];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="buy-section" className="buy-wrapper">
      <div className="buy-paddings buy-innerWidth buy-container">
        <div className="buy-head">
          <span className="buy-orangeText">View all the properties</span>
          <span className="buy-primaryText"> Currently Listed</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {properties.length === 0 ? (
            <div>No properties available</div>
          ) : (
            properties.map((property) => (
              <SwiperSlide key={property.id} onClick={() => navigate(`/property/${property.id}`)}>
                <div className="buy-card">
                  <img src={property.image} alt="home" />
                  <span className="buy-price">
                    <span style={{ color: "orange" }}>$</span>
                    <span>{property.price}</span>
                  </span>
                  <div className="buy-flexRowSpaceBetween">
                    <span className="buy-primaryText">{property.name}</span>
                    <div
                      className="buy-favorite-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                    >
                      {favorites.includes(property.id) ? '❤️' : '🤍'}
                    </div>
                  </div>
                  <span className="buy-secondaryText">{property.detail}</span>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="buy-explore-all-wrapper">
          <button className="buy-explore-all-button" onClick={() => navigate('/all-listings')}>
            View Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySection;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="buy-buttons">
      <button onClick={() => swiper.slidePrev()} className="buy-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="buy-nextButton">
        &gt;
      </button>
    </div>
  );
};
