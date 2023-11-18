import React, { useState } from 'react';
import "./Book.css";
import ParkingSpaceList from '../ParkingSpaceList/ParkingSpaceList';
import Maps from '../Maps/Maps';

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

        <div className='book_'>
            <label htmlFor="locationInput">Enter Location: </label>
            <input type="text" id="locationInput" value={location} onChange={handleLocationChange} />

            <br />

            <label htmlFor="dateInput">Enter Date: </label>
            <input type="date" id="dateInput" value={date} onChange={handleDateChange} />
        </div> 

        <ParkingSpaceList/>

        <Maps/>
        </>

    
    )
}

export default Book;

