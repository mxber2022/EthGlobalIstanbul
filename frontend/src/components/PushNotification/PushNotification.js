import React, { useState, useEffect } from 'react';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useAccount, useConnect, useEnsName, useSignMessage } from 'wagmi';
import './PushNotification.css'; 
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';

const PushNotification = () => {
    
    const { address, isConnected, connector } = useAccount();
    const { provider } = useConnect();
    const { signMessageAsync } = useSignMessage();

    const {data: walletClient} = useWalletClient();
 

    async function activatePn() {

        console.log("walletClient: ", walletClient);
       // const provider_ = await connector.getProvider();
        const userAlice = await PushAPI.initialize(walletClient, { env: CONSTANTS.ENV.STAGING });
    

    }    


  return (
    <>
        <button onClick={activatePn}>ActivatePushNotification</button>
    </>
  );
};

export default PushNotification;
