document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const nameInput = document.getElementById('name-input');
    const colorPicker = document.getElementById('color-picker');

    let username = '';
    let userColor = '#000000';

    function addMessageToChat(message, color, isRainbow) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<span style="color: ${color};">${message}</span>`;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        if (isRainbow) {
            applyRainbowEffect(div.querySelector('span'));
        }
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            return;
        }
        let formattedMessage = `${username}: ${message}`;
        let isRainbow = false;
        if (username === 'Handycodeis18230555') {
            formattedMessage = `Handy: ${message}`;
            isRainbow = true;
        }
        addMessageToChat(formattedMessage, userColor, isRainbow);
        messageInput.value = '';
    }

    function applyRainbowEffect(element) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 5) % 360;
            element.style.color = `hsl(${hue}, 100%, 50%)`;
        }, 100);
    }

    sendButton.addEventListener('click', function() {
        if (messageInput.value.length <= 100) {
            sendMessage();
        } else {
            alert('Message cannot exceed 100 characters');
        }
    });

    nameInput.addEventListener('input', function() {
        username = nameInput.value.trim();
    });

    colorPicker.addEventListener('input', function() {
        userColor = colorPicker.value;
    });

    // Default username if not provided
    username = 'Anonymous'; // You can change this to any default username

    // Display initial message
    addMessageToChat('Bienvenido a el chat, felicidades eres un buen amigo de handy que has sido invitado a este chat programado por el :D', '#009', false);
});
