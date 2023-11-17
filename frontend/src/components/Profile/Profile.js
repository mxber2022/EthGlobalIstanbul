import React, { useState } from 'react';
import "./Profile.css";
import configFile from '../../Config.json';
import { abi } from "./abi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { ethers } from "ethers"

function Profile() {

   

    return (
        <>

            Profile    

        </>

    
    )
}

export default Profile;

