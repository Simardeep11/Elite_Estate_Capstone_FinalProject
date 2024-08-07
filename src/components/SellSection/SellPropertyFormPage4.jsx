import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./SellPropertyFormPage4.css";
import Header from "../Header/Header";
import { storage } from "../../firebase/firebase"; // Adjust the import path as necessary

const SellPropertyFormPage4 = ({ nextStep, prevStep, form, handleChange, handleSubmit }) => {
  const [previewImages, setPreviewImages] = useState({
    imageUrl1: form.imageUrl1 || '',
    imageUrl2: form.imageUrl2 || '',
    imageUrl3: form.imageUrl3 || ''
  });
  const [uploading, setUploading] = useState(false);

  const handleDrop = (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const event = {
        target: {
          name: field,
          value: reader.result
        }
      };
      handleChange(event);
      setPreviewImages((prevImages) => ({
        ...prevImages,
        [field]: reader.result
      }));
    };
    reader.readAsDataURL(file);

    // Upload to Firebase
    uploadImage(file, field);
  };

  const uploadImage = async (file, field) => {
    try {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!', snapshot);
      const url = await getDownloadURL(storageRef);
      console.log('File available at', url);

      const event = {
        target: {
          name: field,
          value: url
        }
      };
      handleChange(event);
      setPreviewImages((prevImages) => ({
        ...prevImages,
        [field]: url
      }));
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const createDropzone = (field, label) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, field)
    });

    return (
      <div className="page4-image-upload-section">
        <div className="page4-image-url">
          <input
            type="text"
            name={field}
            value={form[field] || ''} // Ensure the value is always defined
            onChange={handleChange}
            placeholder={`${label} URL`}
            className="page4-sell-property-input"
          />
        </div>
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image file here, or click to select one for {label}</p>
        </div>
        {previewImages[field] && (
          <div className="page4-image-preview">
            <img src={previewImages[field]} alt={`Preview ${label}`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="page4-container">
        <div className="page4-left-column">
          <h2 className="page4-heading">Detailed Property Listings</h2>
          <p className="page4-details-heading">
            High-quality images make a big difference. Upload clear and attractive images to catch the eyes of potential buyers.
          </p>
        </div>
        <div className="page4-right-column">
          <div className="page4-form-container">
            <h2>Sell Your Property - Upload Images</h2>
            <form onSubmit={handleSubmit} className="page4-sell-property-form">
              <div className="page4-horizontal-structure">
                {createDropzone('imageUrl1', 'Image 1')}
                {createDropzone('imageUrl2', 'Image 2')}
                {createDropzone('imageUrl3', 'Image 3')}
              </div>
              <div className="page4-button-container">
                <button type="button" className="page4-back-button" onClick={prevStep}>Back</button>
                <button type="submit" className="page4-submit-button" disabled={uploading}>Submit Property</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellPropertyFormPage4;
