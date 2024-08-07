import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { db, storage } from "../../firebase/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    detail: "",
    image: "",
    additionalImages: "",
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
  const [previewImage, setPreviewImage] = useState('');
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertyData);
      console.log("Fetched properties:", propertyData);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleDrop = async (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    const imageRef = ref(storage, `properties/${file.name}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);

    if (field === 'image') {
      setPreviewImage(imageUrl);
      setForm((prevForm) => ({
        ...prevForm,
        image: imageUrl
      }));
    } else {
      setPreviewAdditionalImages((prevImages) => [...prevImages, imageUrl]);
      setForm((prevForm) => ({
        ...prevForm,
        additionalImages: [...prevForm.additionalImages.split(','), imageUrl].join(',')
      }));
    }
  };

  const createDropzone = (field, label) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, field)
    });

    return (
      <div className="image-upload-section">
        <input
          type="text"
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={`${label} URL`}
        />
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image file here, or click to select one for {label}</p>
        </div>
        {field === 'image' && previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt={`Preview ${label}`} />
          </div>
        )}
        {field === 'additionalImages' && previewAdditionalImages.length > 0 && (
          <div className="image-preview">
            {previewAdditionalImages.map((img, index) => (
              <img key={index} src={img} alt={`Preview ${label} ${index + 1}`} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        name: form.name,
        price: form.price,
        detail: form.detail,
        image: form.image,
        additionalImages: form.additionalImages.split(',').map(item => item.trim()),
        location: form.location,
        category: form.category,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        amenities: form.amenities.split(',').map(item => item.trim()),
        address: form.address,
        type: form.type,
        squareFootage: form.squareFootage,
        floorPlan: form.floorPlan,
        yearBuilt: form.yearBuilt,
        lotSize: form.lotSize,
        garage: form.garage,
        features: form.features,
        approved: false
      };
      if (form.id) {
        // Update existing listing
        const propertyRef = doc(db, "properties", form.id);
        await updateDoc(propertyRef, propertyData);
        console.log("Property updated successfully");
      } else {
        // Add new listing
        await addDoc(collection(db, "properties"), propertyData);
        console.log("Property added successfully");
      }
      setForm({
        id: "",
        name: "",
        price: "",
        detail: "",
        image: "",
        additionalImages: "",
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
      setPreviewImage('');
      setPreviewAdditionalImages([]);
    } catch (error) {
      console.error("Error adding or updating property: ", error);
    }
  };

  const handleEdit = (property) => {
    setForm({
      id: property.id,
      name: property.name,
      price: property.price,
      detail: property.detail,
      image: property.image,
      additionalImages: property.additionalImages.join(', '), // Ensure arrays are joined to strings
      location: property.location,
      category: property.category,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      amenities: property.amenities.join(', '), // Convert array to comma-separated string
      address: property.address,
      type: property.type,
      squareFootage: property.squareFootage,
      floorPlan: property.floorPlan,
      yearBuilt: property.yearBuilt,
      lotSize: property.lotSize,
      garage: property.garage,
      features: property.features
    });
    setPreviewImage(property.image);
    setPreviewAdditionalImages(property.additionalImages);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteDoc(doc(db, "properties", id));
        console.log("Property deleted successfully");
      } catch (error) {
        console.error("Error deleting property: ", error);
      }
    }
  };

  return (
    <div className="admin-wrapper">
      <h1 className="admin-heading">My Dashboard</h1>
      <div className="admin-content"> {/* Ensures side by side layout */}
        <div className="admin-form-section">
          <form onSubmit={handleSubmit} className="admin-form">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Property Name"
              required
            />
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Property Price"
              required
            />
            <textarea
              name="detail"
              value={form.detail}
              onChange={handleChange}
              placeholder="Property Detail"
              required
            />
            {createDropzone('image', 'Image')}
            {createDropzone('additionalImages', 'Additional Images')}
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              required
            />
            <input
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              required
            />
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="Amenities (comma separated)"
              required
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Type"
              required
            />
            <input
              type="text"
              name="squareFootage"
              value={form.squareFootage}
              onChange={handleChange}
              placeholder="Square Footage"
              required
            />
            <input
              type="text"
              name="floorPlan"
              value={form.floorPlan}
              onChange={handleChange}
              placeholder="Floor Plan"
              required
            />
            <input
              type="number"
              name="yearBuilt"
              value={form.yearBuilt}
              onChange={handleChange}
              placeholder="Year Built"
              required
            />
            <input
              type="text"
              name="lotSize"
              value={form.lotSize}
              onChange={handleChange}
              placeholder="Lot Size"
              required
            />
            <input
              type="text"
              name="garage"
              value={form.garage}
              onChange={handleChange}
              placeholder="Garage"
              required
            />
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="Features"
              required
            />
            <button type="submit">{form.id ? "Update Listing" : "Add Listing"}</button>
          </form>
        </div>
        <div className="separator"></div> {/* Separator with subtle background */}
        <div className="admin-list">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="admin-list-item">
                <h2>{property.name}</h2>
                <p>{property.price}</p>
                <p>{property.detail}</p>
                <img src={property.image} alt={property.name} />
                <div className="admin-additional-images">
                  {Array.isArray(property.additionalImages) && property.additionalImages.map((img, index) => (
                    <img key={index} src={img} alt={`Additional Image ${index + 1}`} />
                  ))}
                </div>
                <div className="button-group">
  <button className="edit-button" onClick={() => handleEdit(property)}>Edit</button>
  <button className="delete-button" onClick={() => handleDelete(property.id)}>Delete</button>
</div>

              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
