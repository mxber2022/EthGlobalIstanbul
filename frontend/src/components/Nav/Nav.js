import "./Nav.css";
import { HashLink as Link } from 'react-router-hash-link';
import Safex from "../Safex/Safex";
import {StripePack} from '@safe-global/onramp-kit'

function Nav () {

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
                <div>
                    <h1>ParkedIn</h1>
                </div>

                <div>
                    <button><Link to="/book" style={linkStyle}>Book</Link> </button>
                </div>
       
                <div>
                    <button> <Link to="/search" style={linkStyle}>ListParking</Link> </button>
                </div>

                <Safex />

                <div>
                    <w3m-button />
                </div>              
            </nav>

            <div id="stripe-root" onClick={ramp}> OnRamp </div>
        </>
    );
}

export default Nav;