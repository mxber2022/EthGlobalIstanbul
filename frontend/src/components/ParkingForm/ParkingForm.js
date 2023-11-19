import React, { useState } from 'react';
import "./ParkingForm.css";
import image3 from "./Car_Park_Background2.png";

const ParkingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    parkingImage: '',
    pricePerDay: '',
    acceptedCurrency: '',
    earningStrategy: 'FreeStyleWithdrawal', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
        Logic to save data to database
    */
    console.log('Form submitted:', formData);
    try {
        const response = await fetch('http://localhost:8006/addList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: formData.name,
            Location: formData.location,
            ParkingSpaceImageURL: formData.parkingImage,
            PricePerDay: formData.pricePerDay,
            AcceptedCurrency: formData.acceptedCurrency,
            EarningStrategy: formData.earningStrategy,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Link added successfully:', data);
      } catch (error) {
        console.error('Error adding link:', error);
      }

  };

  return (
    <>
          <div className="container" style={{ backgroundImage: `url(${image3})` }}></div>
          <h2>Parking Space Information</h2>
          <div className="form-container">
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
              <select
                id="earningStrategy"
                name="earningStrategy"
                value={formData.earningStrategy}
                onChange={handleChange}
                required
              >
                <option value="FreeStyleWithdrawal">FreeStyleWithdrawal</option>
                <option value="CompoundStaking">CompoundStaking</option>
              </select>
          </div>
          <button className="button" type="submit">Submit</button>
    </>
    
  );
};

export default ParkingForm;
