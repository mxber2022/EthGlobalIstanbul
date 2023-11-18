// ParkingSpaceList.js
import React, { useState, useEffect } from 'react';
import './ParkingSpaceList.css'; // Import your CSS file

const ParkingSpaceList = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8006/getAllListings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParkingSpaces(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching parking spaces:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (name) => {
    // Handle button click for a specific parking space (use the id)
    console.log(`Button clicked for parking space with Name ${name}`);
    // Add your custom logic here for booking
  };

  return (
    <div>
      <h2>List of Parking Spaces</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {parkingSpaces.map((space) => (
            <div key={space.Name} className="card">
              <strong>Name:</strong> {space.Name}
              <br />
              <strong>Location:</strong> {space.Location}
              <br />
              <strong>Price Per Day:</strong> {space.PricePerDay}
              <br />
              <strong>Accepted Currency:</strong> {space.AcceptedCurrency}
              <br />
              <strong>Earning Strategy:</strong> {space.EarningStrategy}
              <br />
              <button onClick={() => handleButtonClick(space.Name)}>Book</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParkingSpaceList;
