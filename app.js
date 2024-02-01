// app.js

const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./database');  // Import the users array
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.post("/api/logout", function (req, res) {
    // Logout logic
    res.redirect("/"); // Redirect to Homepage after logout
});

// Start the server

app.listen(port, function (err) {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Example app listening on port ${port}`);
    }
});

// Route for the logout
app.get('/logout', function (req, res) {
    // Clear the sessionToken cookie by setting its expiration date to the past
    res.cookie('sessionToken', '', { expires: new Date(0), path: '/' });

    // Redirect the user to the homepage
    res.redirect('/');
});

