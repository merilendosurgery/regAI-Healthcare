// app.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }

    if (document.querySelector('iframe')) {
        checkAuthentication();
    }
});

function generateToken(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var token = '';
    for (var i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if ((username === 'rahul.fidai' && password === 'Rahul@1969') || 
        (username === 'umesh.sharma' && password === 'Meril@123')) {
        var token = generateToken(16);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTime', Date.now());
        window.location.href = 'chatbot.html';
    } else {
        alert('Incorrect username or password');
    }
}

function checkAuthentication() {
    var isAuthenticated = localStorage.getItem('authenticated') === 'true';
    var authToken = localStorage.getItem('authToken');
    var authTime = parseInt(localStorage.getItem('authTime'), 10);
    var currentTime = Date.now();
    var sessionDuration = 30 * 60 * 1000; // 30 minutes

    if (!isAuthenticated || !authToken || currentTime - authTime > sessionDuration) {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTime');
        window.location.href = 'index.html';
    }
}
