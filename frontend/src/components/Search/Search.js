import React, { useState } from 'react';
import "./Search.css";
import configFile from '../../Config.json';
import { abi } from "./abi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { ethers } from "ethers"
import ParkingForm from '../ParkingForm/ParkingForm';

function Search() {

    
    return (
        <>      

          <ParkingForm/>

        </>

    
    )
}

export default Search;

