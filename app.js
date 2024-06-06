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

    const viewHistoryButton = document.getElementById('viewHistory');
    const historyModal = document.getElementById('historyModal');
    const closeButton = document.getElementsByClassName('close')[0];

    if (viewHistoryButton) {
        viewHistoryButton.addEventListener('click', function () {
            viewHistory();
            historyModal.style.display = "block";
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            historyModal.style.display = "none";
        });
    }

    window.onclick = function(event) {
        if (event.target == historyModal) {
            historyModal.style.display = "none";
        }
    }

    // Example to capture chatbot interactions
    const chatbotIframe = document.getElementById('chatbotIframe');
    if (chatbotIframe) {
        window.addEventListener('message', function (event) {
            if (event.origin === 'https://www.chatbase.co') { // Verify the origin
                saveChatHistory(event.data.query, event.data.response);
            }
        });
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
        localStorage.setItem('username', username);
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
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }
}

function saveChatHistory(query, response) {
    let username = localStorage.getItem('username');
    if (!username) return;
    
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
    if (!chatHistory[username]) {
        chatHistory[username] = [];
    }
    chatHistory[username].push({ query: query, response: response });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function viewHistory() {
    let username = localStorage.getItem('username');
    if (!username) return;

    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
    let userHistory = chatHistory[username] || [];
    let historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
    userHistory.forEach(chat => {
        let chatEntry = document.createElement('div');
        chatEntry.classList.add('chat-entry');
        chatEntry.innerHTML = `<strong>Query:</strong> ${chat.query}<br><strong>Response:</strong> ${chat.response}`;
        historyContainer.appendChild(chatEntry);
    });
}
