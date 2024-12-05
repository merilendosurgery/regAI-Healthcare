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
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        const token = generateToken(16);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTime', Date.now());
        localStorage.setItem('username', username);

        if (username === 'rahul.fidai') {
            // Admin-specific options
            const choice = confirm("Do you want to go to the Admin Page? Click 'OK' for Admin Page, 'Cancel' for Chatbot.");
            if (choice) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'chatbot.html';
            }
        } else {
            // Regular users go directly to chatbot
            alert('Login successful!');
            window.location.href = 'chatbot.html';
        }
    } else {
        alert('Incorrect username or password');
    }
}

function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const authToken = localStorage.getItem('authToken');
    const authTime = parseInt(localStorage.getItem('authTime'), 10);
    const currentTime = Date.now();
    const sessionDuration = 30 * 60 * 1000; // 30 minutes

    if (!isAuthenticated || !authToken || currentTime - authTime > sessionDuration) {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTime');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    } else {
        const username = localStorage.getItem('username');
        if (username === 'rahul.fidai' && window.location.pathname !== '/admin.html') {
            window.location.href = 'admin.html';
        } else if (window.location.pathname !== '/chatbot.html') {
            window.location.href = 'chatbot.html';
        }
    }
}
