const express = require('express');
const myMongoServer = express();
const cors = require("cors");
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const slowDown = require("express-slow-down");
const helmet = require("helmet");
const compression = require("compression");
require('dotenv/config');
const { connectToDb, getDb} = require('./mydb');
const { ServerApiVersion, Db } = require('mongodb');

var bodyParser = require('body-parser');

/* Middleware to get request body - post request*/
myMongoServer.use(compression());
myMongoServer.use(express.json());
//myMongoServer.use(logger);
myMongoServer.use(helmet());
myMongoServer.disable('x-powered-by');

myMongoServer.use(cors({
    origin: "*",
    methods: ["POST"],
}))

const PORT = process.env.PORT || 9001;
/* database connection */
let db;

connectToDb((err) => {
    if(!err) {
        myMongoServer.listen(PORT, () => {
            console.log(`myMongoServer listening on port ${PORT}`);
        });

        db = getDb();
    }
})

/*
    This function helps to limit number of request sent by specifiic IP address. Note: This is used globally for all requests.
    You can add proxy later if used later.
*/
const limiter  = rateLimit({
    windowMs: 60 * 1000, //Every 60 seconds 10 requests
    max: 10,
});

//myMongoServer.use(limiter);

/*
    This function helps to delay response.
*/
const speedLimiter = slowDown({
    windowMs: 60 * 1000, // 1 minutes
    delayAfter: 5, // allow 5 requests per 1 minutes, then...
    delayMs: 50000 // begin adding 50000 ms(50 second) of delay per request above 5:
});
  
//myMongoServer.use(speedLimiter);


/* Accept request only in JSON format */
myMongoServer.use(bodyParser.json()) ;

/* This is the route for testing */
const addressRoute = require('./routes/test'); 
myMongoServer.use('/testme', addressRoute);


myMongoServer.post('/addList', async (req, res) => {
    const { Name, Location, ParkingSpaceImageURL, PricePerDay, AcceptedCurrency, EarningStrategy } = req.body;
  
  console.log("Name: ", Name);
  console.log("Location: ", Location);

    db.collection('whitelist')
        .insertOne({
            Name: Name,
            Location: Location,
            ParkingSpaceImageURL: ParkingSpaceImageURL,
            PricePerDay: PricePerDay,
            AcceptedCurrency: AcceptedCurrency,
            EarningStrategy: EarningStrategy,
        })
        .then(result => {
            res.status(201).json("success");
        })
        .catch(err => {
            res.status(500).json({err: 'failure to save email to database'})
    });

});


myMongoServer.get('/getAllListings', async (req, res) => {
    try {
        const allLinks = await db.collection('whitelist').find({}).toArray();
        console.log("allLinks: ", allLinks);
        res.status(200).json(allLinks);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Failed to retrieve data from the database' });
    }
});
