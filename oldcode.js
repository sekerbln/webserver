const users = require("./database");
app.post("/api/login", function (req, res) {
    let hasAuthenticatedUser = false;

    for (let i = 0; i < users.length; i++){
        const userToCheck = users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password){
            res.send("Authenticated!");
            hasAuthenticatedUser = true;
            break;
        }
    }

    if (hasAuthenticatedUser === false){
        res.send("Unauthenticated!");
    }
});

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

    for (let i = 0; i < users.length; i++){
        const userToCheck = users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password){
            res.send("Authenticated!");
            hasAuthenticatedUser = true;
            break;
        }
    }

    if (hasAuthenticatedUser === false){
        res.send("Unauthenticated!");
    }

    //   const username = req.body.username;
    //   const password = req.body.password;

    // Find user in the users array
    //   const user = users.find(u => u.username === username && u.password === password);

    // Check if user is found and res.send("Unauthenticated");
    //   if (user) {
    //       res.send("Authenticated!");
    //   } else {
    //       res.send("Unauthenticated! Talk to Seker for help.");
    //   }
// });

    app.listen(port, function (err) {
        if (err) {
            console.error('Error starting the server:', err);
        } else {
            console.log(`Example app listening on port ${port}`);
        }
    });
