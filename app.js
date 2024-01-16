const express = require('express');
const app = express();
const port = 3000;

// Import user data from database.js
const users = require('./database');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Listens to GET requests on /test
app.get('/test', function (req, res) {
    res.send('Hello World!');
});


app.post("/api/login", function (req, res) {
    let hasAuthenticatedUser = false;

    for (let i = 0; i < users.length; i++) {
        const userToCheck = users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {
            // Generate a unique session token using the username and current timestamp
            const sessionToken = `${userToCheck.username}_${Date.now()}`;
            res.json(sessionToken); // Respond with the session token
            hasAuthenticatedUser = true;
            break;
        }
    }

    if (!hasAuthenticatedUser) {
        res.status(401).send(); // Respond with a 401 status code for unsuccessful login attempts
    }
});

app.listen(port, function (err) {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Example app listening on port ${port}`);
    }
});
