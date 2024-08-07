import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import "./Booking.css";

const Booking = ({ propertyId, onClose }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    preferredContact: "Email",
    bookingDate: "",
    bookingTime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        propertyId,
        timestamp: new Date()
      });
      alert("Booking request sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending booking request: ", error);
    }
  };

  return (
    <div className="booking-modal">
      <div className="booking-form-container">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Book a Visit</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            required
          />
          <div>
            <label>Preferred method of contact:</label>
            <select
              name="preferredContact"
              value={form.preferredContact}
              onChange={handleChange}
              required
            >
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
            </select>
          </div>
          <div>
            <label>Preferred Date:</label>
            <input
              type="date"
              name="bookingDate"
              value={form.bookingDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Preferred Time:</label>
            <input
              type="time"
              name="bookingTime"
              value={form.bookingTime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
