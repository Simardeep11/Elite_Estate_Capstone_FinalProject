import React, { useState } from "react";
import { db, storage } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SellPropertyFormPage1 from "./SellPropertyFormPage1";
import SellPropertyFormPage2 from "./SellPropertyFormPage2";
import SellPropertyFormPage3 from "./SellPropertyFormPage3";
import SellPropertyFormPage4 from "./SellPropertyFormPage4";
import ThankYouPage from "./ThankYouPage";
import "./SellPropertyForm.css";  // Common styles
import { useAuth } from "../../context/AuthContext"; // Ensure you have user context for email

const SellPropertyForm = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    ownerName: "",
    ownerEmail: user ? user.email : "", // Check if user is available
    name: "",
    price: "",
    detail: "",
    imageFile: null,
    imageUrl: "",
    location: "",
    category: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    address: "",
    type: "",
    squareFootage: "",
    floorPlan: "",
    yearBuilt: "",
    lotSize: "",
    garage: "",
    features: ""
  });
  const [propertyId, setPropertyId] = useState(null);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      if (file) {
        const imageRef = ref(storage, `properties/${file.name}`);
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);
        setForm((prevForm) => ({
          ...prevForm,
          imageFile: file,
          imageUrl
        }));
        console.log("Image uploaded successfully:", imageUrl);
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...form,
        image: form.imageUrl,
        amenities: form.amenities.split(',').map((item) => item.trim()),
        status: "pending" // Add status field to indicate pending approval
      };

      const docRef = await addDoc(collection(db, "pendingProperties"), propertyData); // Add to pendingProperties collection
      console.log("Property submitted for approval:", docRef.id);
      setPropertyId(docRef.id);
      setForm({
        ownerName: "",
        ownerEmail: user ? user.email : "",
        name: "",
        price: "",
        detail: "",
        imageFile: null,
        imageUrl: "",
        location: "",
        category: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
        address: "",
        type: "",
        squareFootage: "",
        floorPlan: "",
        yearBuilt: "",
        lotSize: "",
        garage: "",
        features: ""
      });
      setStep(5);
    } catch (error) {
      console.error("Error submitting property for approval:", error);
    }
  };

  switch (step) {
    case 1:
      return <SellPropertyFormPage1 nextStep={nextStep} form={form} handleChange={handleChange} />;
    case 2:
      return <SellPropertyFormPage2 nextStep={nextStep} prevStep={prevStep} form={form} handleChange={handleChange} />;
    case 3:
      return <SellPropertyFormPage3 nextStep={nextStep} prevStep={prevStep} form={form} handleChange={handleChange} />;
    case 4:
      return <SellPropertyFormPage4 prevStep={prevStep} handleSubmit={handleSubmit} form={form} handleChange={handleChange} />;
    case 5:
      return <ThankYouPage propertyId={propertyId} />;
    default:
      return <SellPropertyFormPage1 nextStep={nextStep} form={form} handleChange={handleChange} />;
  }
};

export default SellPropertyForm;
