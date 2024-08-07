import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc, addDoc } from "firebase/firestore";
import "./AdminSellProperties.css";

const AdminSellProperties = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pendingProperties"), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingProperties(propertyData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      const propertyRef = doc(db, "pendingProperties", id);
      const propertyDoc = await getDoc(propertyRef);
      const propertyData = propertyDoc.data();

      // Move to properties collection
      await addDoc(collection(db, "properties"), {
        ...propertyData,
        approved: true
      });

      // Remove from pendingProperties collection
      await deleteDoc(propertyRef);
      console.log("Property approved successfully");

      // Update local state
      setPendingProperties(pendingProperties.filter(property => property.id !== id));
    } catch (error) {
      console.error("Error approving property: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pendingProperties", id));
      console.log("Property deleted successfully");

      // Update local state
      setPendingProperties(pendingProperties.filter(property => property.id !== id));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-sell-properties-wrapper">
      <h1 className="admin-heading">Pending Property Listings</h1>
      <div className="admin-sell-properties-list">
        {pendingProperties.map((property, index) => (
          <div key={property.id} className="admin-sell-property-item">
            <div className="image-wrapper">
              {property.imageUrl1 && <img src={property.imageUrl1} alt={`${property.name} - 1`} />}
              {property.imageUrl2 && <img src={property.imageUrl2} alt={`${property.name} - 2`} />}
              {property.imageUrl3 && <img src={property.imageUrl3} alt={`${property.name} - 3`} />}
            </div>
            <div className="property-details">
              <h3>{index + 1}. {property.name}</h3>
              <h3>{property.price}</h3>
              <p>{property.beds} Beds • {property.baths} Baths • {property.sqft} Sqft • {property.type}</p>
              <p>{property.location}</p>
              <div className="admin-additional-images">
                {property.additionalImages && property.additionalImages.map((img, index) => (
                  <img key={index} src={img} alt={`Additional ${index + 1}`} />
                ))}
              </div>
              <div className="button-group">
                <button onClick={() => handleApprove(property.id)} className="approve-button">Approve</button>
                <button onClick={() => handleDelete(property.id)} className="delete-button">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSellProperties;
