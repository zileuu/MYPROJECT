const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database:'mysql',
});

// Q14 you need to add the full code to use session variables to enable a login system.

conn.connect( err => {
  if(err) {
    console.log('Could not connect to database server');
    process.exit(1);
  } else {

    
    
    // Q4 complete the route to find all flights to the user's chosen 
    // destination on the user's chosen date 
    app.get('/search/:flightDestination/:flightDate', (req, res) => {
        const { flightDestination, flightDate } = req.params;

        conn.query("SELECT * FROM eaflights WHERE endcity = ? AND date = ?",
            [ flightDestination, flightDate ], 
            (err, results, fields) => {
                // Q5 complete to return the flight details as JSON 
                if (err) {
                    res.json({ flights: [] });
                    return;
                }

                res.json({ flights: results });
            });
    });

    // Q7 complete the route to book the flight for 1 passenger and a hard-coded
    // username by inserting a record in the bookings table
    app.post('/flightbook/:flightId', (req, res) => {
        const { flightId } = req.params;

        conn.query("INSERT INTO bookings (username, flightID, npass) values (?, ?, ?)",
            [  "fred", flightId, 1 ],
            (err, results, fields) => {
                if(err) {
                    res.status(500).json({'error': 'Internal error'});
                } else {
                    res.json({'success': 1});
                }
            });
    });

 
    app.post('/flightadd', (req, res) => {
        console.log("req body: ", req.body);
        // Q11 send back an error if any of the details are blank (you need to add this code...)
        const errors  = [];
        const flightPayload = req.body;
        const { number, dest, date, deptime, arrtime, thePrice, numSeats } = flightPayload;
        if (!number) errors.push("Flight Number is a required field");
        if (!dest) errors.push("Destination airport is a required field");
        if (!date) errors.push("Date is a required field");
        if (!deptime) errors.push("Departure Time is a required field");
        if (!arrtime) errors.push("Arrival Time is a required field");
        if (!thePrice) errors.push("Price is a required field");
        if (!numSeats) errors.push("Number of seats is a required field");

        if (errors.length > 0) {
            return res.status(400).json({ message: "Invalid fields", errors });
        }

        // Q10 complete the 'add flight' route as described in the paper
        conn.query("INSERT INTO eaflights (fnumber, endcity, date, depart, arrive, price, nseats) values (?, ?, ?, ?, ?, ?, ?)",
            [ number, dest, date, deptime, arrtime, thePrice, numSeats ],
            (err, results, fields) => {
                if(err) {
                    res.status(500).json({'error': 'Internal error'});
                } else {
                    res.json({'success': 1});
                }
            });
    });

    // Q14 complete the login route on the server
    app.post('/login', (req, res) => {
        // ?????
    });

    app.listen(8081);
  }
});
