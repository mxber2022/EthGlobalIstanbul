import React, { useState } from 'react';
import "./Exchange.css";
import image4 from "./Car_Park_Background3.png";

function Exchange() {

    const [location, setLocation] = useState('');


    return (
        <div className="container" style={{ backgroundImage: `url(${image4})` }}>

        </div>

    );

};

export default Exchange;