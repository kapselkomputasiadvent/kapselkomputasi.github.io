

document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const chatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-btn');
    const messagesDiv = document.getElementById('messages');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('messages');

    // Tampilkan simbol chat hanya jika pengguna login
    const token = localStorage.getItem('token');
    if (token) {
        chatIcon.style.display = 'block';
    } else {
        chatIcon.style.display = 'none';
    }

    // Toggle kolom chat
    chatIcon.addEventListener('click', () => {
        chatIcon.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(100px)', opacity: 0 }
        ], { duration: 300, fill: 'forwards' });

        // After the animation ends, hide the icon and show the chat container
        setTimeout(() => {
            chatIcon.style.display = 'none'; // Hide chat icon
            chatContainer.style.display = 'flex'; // Show chat container

            // Animate the chat container to slide up from the bottom
            chatContainer.animate([
                { transform: 'translateY(100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], { duration: 300, fill: 'forwards' });
        }, 300); // This delay matches the duration of the icon animation
    });

    closeChatButton.addEventListener('click', () => {
        // Animate the chat container to slide down
        chatContainer.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(100%)', opacity: 0 }
        ], { duration: 300, fill: 'forwards' });

        // After the animation ends, hide the chat container and show the chat icon
        setTimeout(() => {
            chatContainer.style.display = 'none'; // Hide chat container
            chatIcon.style.display = 'block'; // Show chat icon

            // Animate the chat icon to slide up into view
            chatIcon.animate([
                { transform: 'translateY(100px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], { duration: 300, fill: 'forwards' });
        }, 300); // This delay matches the duration of the container animation
    });

    
    // Kirim pesan
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Display user's message in the chat
        displayMessage('user', userMessage);
        chatInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if logged in
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            const botReply = data.reply || "Sorry, I couldn't process your message.";

            // Display bot's reply in the chat
            displayMessage('assistant', botReply);

        } catch (error) {
            displayMessage('assistant', 'Oops! Something went wrong.');
            console.error('Error:', error);
        }
    }

    function displayMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
    }




    // Terima pesan dari server
    socket.on('message', (msg) => {
        const msgElement = document.createElement('div');
        msgElement.textContent = msg;
        messagesDiv.appendChild(msgElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll otomatis ke bawah
    });
});


