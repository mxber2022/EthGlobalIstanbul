import React, { useState } from 'react';
import "./Search.css";
import configFile from '../../Config.json';
import { abi } from "./abi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { ethers } from "ethers"

function Search() {

    
    return (
        <>      

          Seacrch

        </>

    
    )
}

export default Search;

