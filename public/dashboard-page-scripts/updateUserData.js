// 文件: updateUserData.js

function updateUserData() {

    const username = sessionStorage.getItem('username');


    const heading = document.querySelector('h1');


    if (username) {
        heading.textContent = `${username}'s Dashboard`;
    } else {
        heading.textContent = 'Dashboard';
    }
}


window.onload = function () {

    updateUserData();
};


document.addEventListener('DOMContentLoaded', function() {

    const username = sessionStorage.getItem('username');


    document.getElementById('dashboardHeading').textContent = `Welcome to your dashboard，${username}！`;
});
