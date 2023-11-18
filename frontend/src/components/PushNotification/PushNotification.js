import React, { useState, useEffect } from 'react';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useAccount, useConnect, useEnsName, useSignMessage } from 'wagmi';
import './PushNotification.css'; 
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';
import { NotificationItem, chainNameType } from "@epnsproject/sdk-uiweb";

const PushNotification = () => {
    
    const { address, isConnected, connector } = useAccount();
    const { provider } = useConnect();
    const { signMessageAsync } = useSignMessage();

    const {data: walletClient} = useWalletClient();
 

    async function activatePn() {

        console.log("walletClient: ", walletClient);
       // const provider_ = await connector.getProvider();
        const userAlice = await PushAPI.initialize(walletClient, { env: CONSTANTS.ENV.STAGING });
        const channelAddress = "0x7199D548f1B30EA083Fe668202fd5E621241CC89";
        const response = await userAlice.notification.subscribe(
            `eip155:11155111:${channelAddress}`,
        );
        const inboxNotifications = await userAlice.notification.list("INBOX");

        console.log("inboxNotifications", inboxNotifications);

        const stream = userAlice.stream([CONSTANTS.STREAM.NOTIF], {
            filter: {
              channels: ['0x7199D548f1B30EA083Fe668202fd5E621241CC89'], // pass in specific channels to only listen to those
              chats: ['*'], // pass in specific chat ids to only listen to those
            },
            connection: {
              retries: 3, // number of retries in case of error
            },
            raw: false // enable true to show all data
          })
          
          // Listen for notifications events
          stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
            console.log(data)
          })
          
          // Connect stream, Important to setup up listen events first
          stream.connect()

    }    


  return (
    <>
        <button onClick={activatePn}>ActivatePushNotification</button>
    </>
  );
};

export default PushNotification;
