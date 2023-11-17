import React, { useState } from 'react';
import './ParkingForm.css';

const ParkingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    parkingImage: '',
    pricePerDay: '',
    acceptedCurrency: '',
    earningStrategy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle the form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2>Parking Space Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="parkingImage">Parking Space Image URL:</label>
        <input
          type="text"
          id="parkingImage"
          name="parkingImage"
          value={formData.parkingImage}
          onChange={handleChange}
          required
        />

        <label htmlFor="pricePerDay">Price Per Day:</label>
        <input
          type="number"
          id="pricePerDay"
          name="pricePerDay"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />

        <label htmlFor="acceptedCurrency">Accepted Currency:</label>
        <input
          type="text"
          id="acceptedCurrency"
          name="acceptedCurrency"
          value={formData.acceptedCurrency}
          onChange={handleChange}
          required
        />

        <label htmlFor="earningStrategy">Earning Strategy:</label>
        <textarea
          id="earningStrategy"
          name="earningStrategy"
          value={formData.earningStrategy}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ParkingForm;
