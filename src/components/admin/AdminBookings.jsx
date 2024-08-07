import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const bookingData = snapshot.docs.map((doc, index) => ({ id: doc.id, ...doc.data(), number: index + 1 }));
      setBookings(bookingData);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status: "approved" });
      console.log(`Booking ${id} approved`);
      setBookings(currentBookings => currentBookings.map(booking => booking.id === id ? { ...booking, status: "approved" } : booking));
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error approving booking: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const bookingRef = doc(db, "bookings", id);
        await deleteDoc(bookingRef);
        setBookings(currentBookings => currentBookings.filter(booking => booking.id !== id));
        setSelectedBooking(null);
      } catch (error) {
        console.error("Error deleting booking: ", error);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => activeTab === "pending" ? booking.status !== "approved" : booking.status === "approved");

  return (
    <div className="elite-estate-admin-bookings-wrapper">
      <div className="elite-estate-admin-bookings-header">
        <h1>Booking Requests</h1>
        <p>Total Bookings: {bookings.length}</p>
      </div>
      <div className="tabs">
        <div className={`tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
          Pending Bookings
        </div>
        <div className={`tab ${activeTab === "approved" ? "active" : ""}`} onClick={() => setActiveTab("approved")}>
          Approved Bookings
        </div>
      </div>
      <div className="elite-estate-admin-bookings-container">
        <div className="elite-estate-admin-bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className={`elite-estate-admin-booking-item ${selectedBooking && selectedBooking.id === booking.id ? "selected" : ""}`} onClick={() => setSelectedBooking(booking)}>
              <h2>{booking.number}. {booking.firstName} {booking.lastName}</h2>
            </div>
          ))}
        </div>
        {selectedBooking && (
          <div className="elite-estate-admin-booking-details">
            <h2>{selectedBooking.firstName} {selectedBooking.lastName}</h2>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Phone:</strong> {selectedBooking.phoneNumber}</p>
            <p><strong>Message:</strong> {selectedBooking.message}</p>
            <p><strong>Preferred Contact:</strong> {selectedBooking.preferredContact}</p>
            <p><strong>Preferred Date:</strong> {selectedBooking.bookingDate}</p>
            <p><strong>Preferred Time:</strong> {selectedBooking.bookingTime}</p>
            <p><strong>Property ID:</strong> {selectedBooking.propertyId}</p>
            {selectedBooking.timestamp && selectedBooking.timestamp.seconds ? (
              <p><strong>Timestamp:</strong> {new Date(selectedBooking.timestamp.seconds * 1000).toLocaleString()}</p>
            ) : (
              <p><strong>Timestamp:</strong> Not Available</p>
            )}
            <div className="button-group">
              {selectedBooking.status !== "approved" && (
                <button onClick={() => handleApprove(selectedBooking.id)} className="approve-button">Approve</button>
              )}
              <button onClick={() => handleDelete(selectedBooking.id)} className="delete-button">Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
