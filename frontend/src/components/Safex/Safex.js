import "./Safex.css";
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useRef } from "react";
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit'
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo, WALLET_ADAPTERS } from '@web3auth/base';
import { EthersAdapter } from '@safe-global/protocol-kit'
import Safe, { SafeFactory } from '@safe-global/protocol-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import SafeApiKit from '@safe-global/api-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import { MetaTransactionData, MetaTransactionOptions } from '@safe-global/safe-core-sdk-types'


import configFile from '../../Config.json';
import { abi } from "./abi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { useDebounce } from 'use-debounce';


function Safex () {
    const [loggedIn, setLoggedIn] = useState(false); 
    const [wmp, setWmp] = useState(null)
    const web2provider = useRef("");
    const ASD = useRef("");
   // const { address, isConnected } = useAccount();
    //const { provider } = useConnect();

    const clientId = "BMt8Val4uB41EFPQo2RWtZMKJV4SfERT2-8pc7LKlgO9jNBvkrGKASnnFqkEU1p8csKeTq2xCJTRoL4fyRxq-m8";

    const options = {
        clientId: clientId,
        web3AuthNetwork: 'testnet',
        chainConfig: {
        chainNamespace: "eip155",
        chainId: '0x5',
        rpcTarget: 'https://rpc.ankr.com/eth_goerli'
        },
        uiConfig: {
        theme: 'dark',
        loginMethodsOrder: ['google', 'facebook']
        }
    };

    const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
        label: 'torus',
        showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
        label: 'metamask',
        showOnDesktop: true,
        showOnMobile: false
        }
    }

    const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
        mfaLevel: 'mandatory'
        },
        adapterSettings: {
        uxMode: 'popup',
        whiteLabel: {
            name: 'Safe'
        }
        }
    })

    const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
    })    
    
    async function web2login() {

        try {
            await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })
            setWmp(web3AuthModalPack);
            const authKitSignData = await web3AuthModalPack.signIn();
            ASD.current = authKitSignData;
            const provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider());
            web2provider.current = provider;
            const signer = provider.getSigner()



            try {
                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer || provider
                })

                const safeFactory = await SafeFactory.create({ ethAdapter })
                console.log("ha: ", signer);
                const owners = [authKitSignData.eoa];



                console.log(authKitSignData.safes[0]);
                

                const safeAccountConfig = {
                    owners,
                    threshold: 1,
                }
                const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })
                const safeAddress = await safeSdk.getAddress()

                console.log('Your Safe has been deployed:')
                console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
                console.log(`https://app.safe.global/gor:${safeAddress}`)
            
            }
            catch(e) {
                console.log("Eroor here ", e)
            }



            console.log("authKitSignData: ", authKitSignData);
            setLoggedIn(true);
        }
        catch(e){
            console.log("Error connecting wallet: ", e)
        }
        
    }

    async function web2logout() {
        await wmp.signOut()
        setLoggedIn(false);
        
    } 

    if(wmp!=null) {
        wmp.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
            console.log('User is authenticated')
        })
        
        wmp.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
            console.log('User is not authenticated')
        })
    }

    return(
        <>

            {
                loggedIn ? (
                    <button onClick={web2logout} className="mybuttonstyle">Safe Logout</button>
                ) : (
                    <button onClick={web2login} className="mybuttonstyle">Safe Login</button>
                )
            }

        </>

    );
}

export default Safex;