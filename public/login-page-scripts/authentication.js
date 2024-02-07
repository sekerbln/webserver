async function authenticateUser(event) {
    // Prevents the browser from submitting the form itself
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password-field").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "username="+username + "&password="+password
    });

    // if response.status === 200
    if (response.status === 200) {
        // The login was successful
        const sessionToken = await response.text();

        // Store the username in sessionStorage
        sessionStorage.setItem('username', username);

        // Store the session token in a cookie named "sessionToken"
        document.cookie = `sessionToken=${sessionToken}`;

        // Additional logic or redirection after successful login
        window.location.href = "http://localhost:3000/dashboard.html"; //Redirect to the dashboard
    } else {
        displayErrorMessage('Authentication failed. Please check your username and password.');
    }
}
