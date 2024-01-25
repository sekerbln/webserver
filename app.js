// app.js

const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./database');  // Import the users array
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Your route handling comes after setting up static file serving


// Redirect root path to the landing page
app.get('/', function (req, res) {
    res.redirect('/home');
});

// Listens to GET requests on /test
app.get('/test', function (req, res) {
    res.send('Hello World!');
});

// Route for the landing page
app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/public/landing.html');
});

// Handle POST requests to /api/login
app.post("/api/login", function (req, res) {
    // ... Login logic
    let hasAuthenticatedUser = false;

    for (let i = 0; i < users.length; i++) {
        const userToCheck = users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {
            // Perform actions after successful login, such as generating a sessionToken
            const sessionToken = `${userToCheck.username}_${Date.now()}`;
            res.send(sessionToken);

            hasAuthenticatedUser = true;
            break;
        }
    }

    if (!hasAuthenticatedUser) {
        res.status(401).send(); // Respond with a 401 status code for unsuccessful login attempts
    }
});

// Handle GET requests to /api/login
app.get("/api/login", function (req, res) {
    // Return some information about the login page or redirect to the login page
    res.send("Please use POST request for login.");
});

// ... Other routes and server setup

app.listen(port, function (err) {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Example app listening on port ${port}`);
    }
});
