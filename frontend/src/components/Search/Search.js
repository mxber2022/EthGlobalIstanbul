import React, { useState } from 'react';
import "./Search.css";
import configFile from '../../Config.json';
import { abi } from "./abi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { ethers } from "ethers"

function Search() {

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

        <div>
            <label htmlFor="locationInput">Enter Location: </label>
            <input type="text" id="locationInput" value={location} onChange={handleLocationChange} />

            <br />

            <label htmlFor="dateInput">Enter Date: </label>
            <input type="date" id="dateInput" value={date} onChange={handleDateChange} />
        </div> 

        </>

    
    )
}

export default Search;

