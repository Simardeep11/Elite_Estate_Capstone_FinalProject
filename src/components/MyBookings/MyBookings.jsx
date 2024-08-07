import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "bookings"), where("email", "==", user.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-bookings-wrapper">
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="my-bookings-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <h2>{booking.propertyId}</h2>
              <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
              <p><strong>Message:</strong> {booking.message}</p>
              <p><strong>Preferred Contact:</strong> {booking.preferredContact}</p>
              <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
              <p><strong>Booking Time:</strong> {booking.bookingTime}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No bookings found.</div>
      )}
    </div>
  );
};

export default MyBookings;
