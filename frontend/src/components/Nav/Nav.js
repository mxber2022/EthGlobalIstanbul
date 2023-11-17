import "./Nav.css";

function Nav () {
    return(
        <>
            <nav className="nav">
                <div>
                    <h1>ParkedIn</h1>
                </div>

                <div>
                    <button>Book</button>
                </div>

                <div>
                    <button>List Parking</button>
                </div>
                
                <div>
                    <w3m-button />
                </div>              
            </nav>
        </>
    );
}

export default Nav;