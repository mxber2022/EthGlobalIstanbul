import "./Nav.css";
import { HashLink as Link } from 'react-router-hash-link';
import Safex from "../Safex/Safex";

function Nav () {

    const linkStyle = {
        textDecoration: 'none', 
        color: 'black',
    };

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
                    <button> <Link to="/search" style={linkStyle}>List Parking</Link> </button>
                </div>

                <Safex />
                <div>
                    <w3m-button />
                </div>              
            </nav>
        </>
    );
}

export default Nav;