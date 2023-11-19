import React, { useState } from 'react';
import "./Book.css";
import ParkingSpaceList from '../ParkingSpaceList/ParkingSpaceList';
import image1 from "./Search_Icon.png";
import image2 from "./Car_Park_Background.jpeg";


function Book() {

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
  
    const handleDateChange = (event) => {
      setDate(event.target.value);
    };

    return (
      <>
            <div className="container" style={{ backgroundImage: `url(${image2})` }}>
              <div className="input-container" >
                  <label className="label" htmlFor="locationInput">Location</label>
                  <label className="label" htmlFor="dateInput" >Date</label>
                  <div></div>
                  <input 
                      type="text" 
                      id="locationInput" 
                      value={location} 
                      onChange={handleLocationChange} 
                      placeholder='Enter Location' 
                  />
                  <input 
                      type="date" 
                      id="dateInput" 
                      value={date} 
                      onChange={handleDateChange} 
                      placeholder='Pick the date' 
                  />
                  <button className="image-button">
                      <img src={image1} alt="Button Icon" />
                  </button>
              </div>
            </div>
          <ParkingSpaceList/>
      </>
  );
}

export default Book;

