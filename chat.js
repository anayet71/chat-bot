  document.addEventListener('DOMContentLoaded', function () {
            const chatIcon = document.getElementById('chatIcon');
            const chatWindow = document.getElementById('chatWindow');
            const closeChat = document.getElementById('closeChat');
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const sendButton = document.getElementById('sendButton');

            // Auto replies database
            const autoReplies = {
                "What are your working hours?": "We're open Monday to Friday 9AM-6PM, Saturday 10AM-4PM, and closed on Sundays.",
                "Do you offer test rides?": "Yes! We offer test rides on all our bikes. Just bring your valid ID and sign a quick waiver form.",
                "What's your return policy?": "We offer a 30-day return policy for unused bikes in original condition with all documentation."
            };

            // Function to add message to chat
            function addMessage(text, isUser) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Function to handle sending messages hello
            function sendMessage(text) {
                if (text.trim() === '') return;

                addMessage(text, true);

                // Check for auto reply
                const reply = autoReplies[text] || "Thank you for your message. Our team will get back to you soon.";
                setTimeout(() => addMessage(reply, false), 500);

                chatInput.value = '';
            }

            // Event listeners
            chatIcon.addEventListener('click', () => chatWindow.classList.add('active'));
            closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

            sendButton.addEventListener('click', () => sendMessage(chatInput.value));
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage(chatInput.value);
            });

            // Quick question buttons
            document.querySelectorAll('.quick-question-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const question = button.getAttribute('data-question');
                    sendMessage(question);
                });
            });
        });