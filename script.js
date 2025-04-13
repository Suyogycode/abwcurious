// User Authentication
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const profileForm = document.getElementById('profileForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form not found');
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    } else {
        console.error('Signup form not found');
    }

    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSetup);
    } else {
        console.error('Profile form not found');
    }
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // TODO: Implement actual authentication
    console.log('Login:', { email, password });
}

function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // TODO: Implement actual signup
    console.log('Signup:', { email, password });
}

function handleProfileSetup(event) {
    event.preventDefault();
    const profileData = new FormData(profileForm);

    // TODO: Implement actual profile setup
    console.log('Profile Setup:', Object.fromEntries(profileData));
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
/* New JavaScript to add to your script.js */
// Quiz functionality
function initQuiz() {
    let timeLeft = 900; // 15 minutes in seconds
    const timerDisplay = document.getElementById('timer');
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            alert('Time is up!');
            // Handle quiz submission
        }
    }
    
    if (timerDisplay) {
        updateTimer();
    }
}

// Initialize quiz if on quiz page
if (document.querySelector('.quiz-container')) {
    initQuiz();
    
    // Handle quiz navigation
    document.getElementById('nextQuestion')?.addEventListener('click', () => {
        // Add logic to show next question
        const currentQuestion = parseInt(document.getElementById('questionCount').textContent.split('/')[0]);
        const totalQuestions = parseInt(document.getElementById('questionCount').textContent.split('/')[1]);
        
        if (currentQuestion < totalQuestions) {
            document.getElementById('questionCount').textContent = `${currentQuestion + 1}/${totalQuestions}`;
        }
    });
    
    document.getElementById('prevQuestion')?.addEventListener('click', () => {
        // Add logic to show previous question
        const currentQuestion = parseInt(document.getElementById('questionCount').textContent.split('/')[0]);
        
        if (currentQuestion > 1) {
            document.getElementById('questionCount').textContent = `${currentQuestion - 1}/10`;
        }
    });
}

// Learning path functionality
function initLearningPath() {
    const milestones = document.querySelectorAll('.milestone');
    
    milestones.forEach(milestone => {
        milestone.addEventListener('click', () => {
            // Add logic to navigate to specific topic
            const topicTitle = milestone.querySelector('h3').textContent;
            console.log(`Navigating to topic: ${topicTitle}`);
        });
    });
}

// Initialize learning path if on learning path page
if (document.querySelector('.learning-path-container')) {
    initLearningPath();
}
// AI Tutor Chat functionality
function initChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (messageInput && sendButton && chatMessages) {
        sendButton.addEventListener('click', () => {
            const message = messageInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = `
                    <div class="message user-message">
                        <div class="message-content">
                            <p>${message}</p>
                        </div>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', userMessage);
                
                // Clear input
                messageInput.value = '';
                
                // Auto scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate AI response (in real app, this would be an API call)
                setTimeout(() => {
                    const aiMessage = `
                        <div class="message tutor-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <p>I understand your question about ${message}. Let me help you with that...</p>
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', aiMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });

        // Allow sending message with Enter key
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }
}

// Resource Library functionality
function initLibrary() {
    const filters = document.querySelectorAll('.filter');
    const searchInput = document.querySelector('.search-bar input');
    const resourceCards = document.querySelectorAll('.resource-card');

    if (filters && searchInput && resourceCards) {
        // Filter functionality
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                filters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                filter.classList.add('active');
                
                // Filter resources (in real app, this would fetch filtered data)
                const filterType = filter.textContent.toLowerCase();
                resourceCards.forEach(card => {
                    if (filterType === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const cardType = card.querySelector('.resource-type').className
                            .split(' ')
                            .find(c => c !== 'resource-type')
                            .toLowerCase();
                        card.style.display = cardType === filterType ? 'flex' : 'none';
                    }
                });
            });
        });

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Enhanced Profile functionality
function initProfile() {
    // Update study streak
    function updateStudyStreak() {
        const streakElement = document.querySelector('.stat-card p');
        if (streakElement) {
            // In real app, this would fetch from backend
            const streak = localStorage.getItem('studyStreak') || 0;
            streakElement.textContent = `${streak} days`;
        }
    }

    // Update study hours
    function updateStudyHours() {
        const hoursElement = document.querySelector('.stat-card:nth-child(2) p');
        if (hoursElement) {
            // In real app, this would fetch from backend
            const hours = localStorage.getItem('studyHours') || 0;
            hoursElement.textContent = `${hours} hrs`;
        }
    }

    // Initialize profile page
    if (document.querySelector('.profile-dashboard')) {
        updateStudyStreak();
        updateStudyHours();
        
        // Add click handlers for achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach(card => {
            card.addEventListener('click', () => {
                // Show achievement details (in real app, this would show a modal)
                const title = card.querySelector('h4').textContent;
                const description = card.querySelector('p').textContent;
                alert(`Achievement: ${title}\n${description}`);
            });
        });
    }
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chat if on AI Tutor page
    if (document.querySelector('.tutor-container')) {
        initChat();
    }
    
    // Initialize library if on Resource Library page
    if (document.querySelector('.library-container')) {
        initLibrary();
    }
    
    // Initialize profile if on Enhanced Profile page
    if (document.querySelector('.profile-dashboard')) {
        initProfile();
    }
});
