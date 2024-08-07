import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "./BuySection.css";
import { sliderSettings } from "../../utils/common";
import { useAuth } from "../../context/AuthContext";

const BuySection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribeProperties = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertyData);
      setLoading(false);
    });

    let unsubscribeFavorites;
    if (user) {
      unsubscribeFavorites = onSnapshot(
        query(collection(db, "favorites"), where("userId", "==", user.uid)),
        (snapshot) => {
          const favoriteData = snapshot.docs.map(doc => doc.data().propertyId);
          setFavorites(favoriteData);
        }
      );
    }

    return () => {
      unsubscribeProperties();
      if (unsubscribeFavorites) unsubscribeFavorites();
    };
  }, [user]);

  const toggleFavorite = async (propertyId) => {
    const favoriteQuery = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid),
      where("propertyId", "==", propertyId)
    );

    const favoriteSnapshot = await getDocs(favoriteQuery);
    const favoriteDoc = favoriteSnapshot.docs[0];

    if (favoriteDoc) {
      await deleteDoc(favoriteDoc.ref);
      setFavorites(favorites.filter(favId => favId !== propertyId));
    } else {
      await setDoc(doc(db, "favorites", `${user.uid}_${propertyId}`), {
        userId: user.uid,
        propertyId: propertyId
      });
      setFavorites([...favorites, propertyId]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="buy" className="buy-section">
      <div id="buy-section" className="buy-wrapper">
        <div className="buy-paddings buy-innerWidth buy-container">
          <div className="buy-head">
            <span className="buy-orangeText">Best Choices</span>
            <span className="buy-primaryText">Popular Residencies</span>
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
              Explore All Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export default BuySection;
