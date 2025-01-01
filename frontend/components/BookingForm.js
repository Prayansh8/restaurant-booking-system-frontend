import React, { useState } from "react";

const BookingForm = ({ onNewBooking }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/; // Regular expression for 10 digit number

    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.guests) newErrors.guests = "Number of guests is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.contact) {
      newErrors.contact = "Contact details are required.";
    } else if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Contact must be a 10-digit phone number.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        onNewBooking(result.booking);
        setFormData({ date: "", time: "", guests: "", name: "", contact: "" });
        setErrors({});
      } else {
        alert(result.error || "An error occurred");
      }
    } catch (error) {
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-[#070f25] rounded-lg shadow-lg border border-gray-500">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        <div>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Number of guests"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
          {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact details"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Book Table
        </button>
      </form>
    </div>
  );
};

export default BookingForm;