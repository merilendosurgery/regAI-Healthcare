document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }
});

// Initialize users in localStorage if not already set
if (!localStorage.getItem('users')) {
    const defaultUsers = {
        "rahul.fidai": "Meril@123",
        "bittu.jha": "Meril@123",
        "umesh.sharma": "Meril@123",
        "neha.patel": "Meril@123",
        "ra.hc": "Meril@123",
        "ijaj.tamboli": "Tamboli@123",
        "nirmal.mistry": "Meril@123",
        "jatin.bhatt": "Meril@123"
    };
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        if (username === 'rahul.fidai') {
            const choice = confirm("Do you want to go to the Admin Page? Click 'OK' for Admin Page, 'Cancel' for Chatbot.");
            if (choice) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'chatbot.html';
            }
        } else {
            alert('Login successful!');
            window.location.href = 'chatbot.html';
        }
    } else {
        alert('Incorrect username or password');
    }
}

function renderAdminDashboard() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userTable = document.getElementById('userTable');
    const totalIds = document.getElementById('totalIds');

    userTable.innerHTML = ''; // Clear the table
    totalIds.textContent = Object.keys(users).length;

    Object.keys(users).forEach(username => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${username}</td>
            <td><button onclick="deleteUser('${username}')">Delete</button></td>
        `;
        userTable.appendChild(row);
    });
}

function deleteUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));
        renderAdminDashboard();
    }
}
