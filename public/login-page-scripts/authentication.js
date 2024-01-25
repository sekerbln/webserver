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

    // if respnse.status === 200
    if (response.status === 200) {
        // The login was successful
        const sessionToken = await response.text();

        // Store the session token in a cookie named "sessionToken"
        document.cookie = `sessionToken=${sessionToken}`;

        // Additional logic or redirection after successful login
        window.location.href = "http://localhost:3000/dashboard.html"; //Redirect to the dashboard
    } else {
        displayErrorMessage('Authentication failed. Please check your username and password.');
    }
}

function togglePassword() {

}

function displayErrorMessage(message) {

    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.color = 'white';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.border = '2px solid darkred';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.marginTop = '10px';


    const colorBlock = document.getElementById('colorBlock');
    colorBlock.appendChild(errorDiv);


    setTimeout(() => {
        colorBlock.removeChild(errorDiv);
    }, 5000);
}


