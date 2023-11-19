import "./Nav.css";
import { HashLink as Link } from 'react-router-hash-link';
import Safex from "../Safex/Safex";
import {StripePack} from '@safe-global/onramp-kit'
import { useState } from "react";
import Modal from 'react-modal';
import logo from './Logo.png'

function Nav () {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
        // Trigger OnRamp when modal opens
        ramp();
    };

    const closeModal = () => setModalIsOpen(false);

    const linkStyle = {
        textDecoration: 'none', 
        color: 'black',
    };

    async function ramp() {
        const stripePack = new StripePack({
            // Get public key from Stripe: https://dashboard.stripe.com/register
            stripePublicKey:
              'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO',
            // Deploy your own server: https://github.com/5afe/aa-stripe-service
            onRampBackendUrl: 'https://aa-stripe.safe.global'
          })
          await stripePack.init()

          const sessionData = await stripePack.open({
            element: '#stripe-root', // Can be any CSS selector
            theme: 'light' // light | dark
            // Optional, if you want to use a specific created session
            // ---
            // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
            // Optional, if you want to specify default options
            // ---
            // defaultOptions: {
            // transaction_details: {
            //   wallet_address: walletAddress,
            //   lock_wallet_address: true
            //   supported_destination_networks: ['ethereum', 'polygon'],
            //   supported_destination_currencies: ['usdc'],
            // },
            // customer_information: {
            //   email: 'john@doe.com'
            // }
          })
    }

    return(
        <>
            <nav className="nav">

                <div className="leftx">
                    <div>
                        <img src={logo} class="resize-image"></img>
                    </div>

                    <div>
                        <button className="mybuttonstyle"><Link to="/book" style={linkStyle}>Book</Link> </button>
                    </div>
        
                    <div>
                        <button className="mybuttonstyle"> <Link to="/List" style={linkStyle}>List Parking</Link> </button>
                    </div>

                    <div>
                        <button className="mybuttonstyle"> <Link to="/Exchange" style={linkStyle}>Exchange</Link> </button>
                    </div>

                </div>                


                <div className="rightx">
                    <div>
                        <button onClick={openModal} className="mybuttonstyle">Top Wallet up</button>
                    </div>

                    <div>
                        <Safex />
                    </div>

                    <div className="makewc">
                        <w3m-button />
                    </div>   
                </div>           
            </nav>

            <Modal style={{
                    content: {
                    //width: '50%', // Adjust the width as needed
                    //margin: 'auto', // Center the modal horizontally
                },
            }}  isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Stripe OnRamp Modal" >
                <div>
                    <h2>Stripe OnRamp</h2>
                    <div id="stripe-root">
                        
                    </div>
                    <button onClick={closeModal}>Close Modal</button>
                </div>
            </Modal>

        </>
    );
}

export default Nav;