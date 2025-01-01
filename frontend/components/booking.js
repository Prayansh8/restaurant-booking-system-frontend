import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle the error state as needed
      }
    };
    fetchBookings();
  }, []);

  const handleNewBooking = (newBooking) => {
    setBookingSuccess(true);
    setSummaryData(newBooking);
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Table Booking</h1>
      {bookingSuccess && summaryData && (
        <div className="bg-green-100 p-4 rounded mb-5">
          <h2 className="font-bold text-lg">Booking Confirmed!</h2>
          <p>Date: {summaryData.date}</p>
          <p>Time: {summaryData.time}</p>
          <p>Guests: {summaryData.guests}</p>
          <p>Name: {summaryData.name}</p>
          <p>Contact: {summaryData.contact}</p>
        </div>
      )}
      <BookingForm onNewBooking={handleNewBooking} />

      {bookings.length > 0 && (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Date</th>
                <th className="py-2 px-4 border-b border-gray-300">Time</th>
                <th className="py-2 px-4 border-b border-gray-300">Guests</th>
                <th className="py-2 px-4 border-b border-gray-300">Contact</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{booking.name}</td>
                  <td className="py-2 px-4">{booking.date}</td>
                  <td className="py-2 px-4">{booking.time}</td>
                  <td className="py-2 px-4">{booking.guests}</td>
                  <td className="py-2 px-4">{booking.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPage;