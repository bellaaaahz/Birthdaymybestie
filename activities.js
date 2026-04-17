// Present Messages Database
const presentMessages = [
    "You deserve all the happiness in the world! Go treat yourself to something special! 🎉",
    "Here's your reward: A warm hug and endless good vibes! 💕",
    "You're amazing! Your present is a day of relaxation and self-care! 🌸",
    "Congratulations! You deserve 10 bonus points for being awesome! 💖",
    "Special present: Permission to do whatever makes you smile today! ✨",
    "You found it! Your present is knowing someone cares deeply about you! 💗"
];

// Card messages for display
const cardEmojis = [
    'Keep going, you are getting closer.',
    'Small steps still move you forward.',
    'Don\'t give up on your dreams.',
    'You are stronger than you think.',
    'Progress is better than perfect.',
    'Believe in yourself every day.',
    'Hard work will pay off.',
    'Stay focused and keep trying.',
    'Every day is a new chance.',
    'Mistakes help you learn and grow.',
    'You can do difficult things.',
    'Keep pushing, don\'t stop now.',
    'Success takes time and effort.',
    'Be proud of your progress.',
    'Stay positive and never quit.'
];

// Game State
let gameState = {
    cards: [],
    winningCard: null,
    revealed: [],
    gameOver: false,
    canClick: true
};

// Initialize the game
function initGame() {
    // Reset game state
    gameState = {
        cards: [],
        winningCard: null,
        revealed: [],
        gameOver: false,
        canClick: true
    };

    // Create 12 cards for more fun
    const numCards = 16;
    gameState.winningCard = Math.floor(Math.random() * numCards);

    // Create cards array
    for (let i = 0; i < numCards; i++) {
        gameState.cards.push({
            id: i,
            emoji: cardEmojis[i % cardEmojis.length],
            isWinning: i === gameState.winningCard,
            revealed: false
        });
    }

    renderCards();
    updateMessage("Choose a card! Only ONE has the special present! 🎁");
    document.getElementById('gameMessage').style.color = '#6b5b95';
}

// Render cards
function renderCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';

    gameState.cards.forEach(card => {
        const cardEl = document.createElement('button');
        cardEl.className = `card ${card.revealed ? 'revealed' : ''} ${gameState.gameOver ? 'disabled' : ''}`;
        
        if (card.revealed) {
            cardEl.textContent = card.isWinning ? '🎁' : card.emoji;
            cardEl.style.background = card.isWinning ? 
                'linear-gradient(135deg, #FFD700, #FFA500)' : 
                'linear-gradient(135deg, #a8b8e6, #c9a0d6)';
        } else {
            cardEl.textContent = '❓';
        }

        cardEl.addEventListener('click', () => handleCardClick(card.id));
        grid.appendChild(cardEl);
    });
}

// Handle card click
function handleCardClick(cardId) {
    if (!gameState.canClick || gameState.gameOver) return;
    if (gameState.cards[cardId].revealed) return;

    gameState.canClick = false;

    // Reveal the card
    const card = gameState.cards[cardId];
    card.revealed = true;
    gameState.revealed.push(cardId);

    renderCards();

    // Small delay before showing message
    setTimeout(() => {
        if (card.isWinning) {
            // Winner!
            gameState.gameOver = true;
            showPresentModal();
        } else {
            // Not the right card
            updateMessage(`Oops! That's not it. Try again! 💪`);
            document.getElementById('gameMessage').style.color = '#ff85c0';
            
            // Allow next click after 1 second
            setTimeout(() => {
                gameState.canClick = true;
            }, 1000);
        }
    }, 300);
}

// Show present modal
function showPresentModal() {
    const modal = document.getElementById('presentModal');
    const message = presentMessages[Math.floor(Math.random() * presentMessages.length)];
    document.getElementById('presentMessage').textContent = message;
    modal.classList.add('active');

    // Confetti effect
    createConfetti();
}

// Create confetti animation
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '99';
        confetti.textContent = ['🎉', '🎊', '💕', '✨', '🌟', '💖'][Math.floor(Math.random() * 6)];
        document.body.appendChild(confetti);

        gsap.to(confetti, {
            y: window.innerHeight + 100,
            rotation: Math.random() * 720,
            duration: Math.random() * 3 + 2,
            ease: "none",
            onComplete: () => confetti.remove()
        });
    }
}

// Update message
function updateMessage(text) {
    const messageEl = document.getElementById('gameMessage');
    messageEl.textContent = text;
}

// Reset game
function resetGame() {
    const modal = document.getElementById('presentModal');
    modal.classList.remove('active');
    initGame();
}

// Go to enjoy page
function goBack() {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'enjoy.html';
        }
    });
}

// Show interest modal
function showInterestModal() {
    document.getElementById('presentModal').classList.remove('active');
    document.getElementById('interestModal').classList.add('active');
}

// Hide interest modal
function hideInterestModal() {
    document.getElementById('interestModal').classList.remove('active');
}

// Go to Tic-Tac-Toe
function goToTicTacToe() {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'tictactoe.html';
        }
    });
}

// Go to first page
function goHome() {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'index.html';
        }
    });
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDuration = Math.random() * 3 + 5;
        const randomDelay = Math.random() * 2;
        
        heart.style.left = randomX + 'px';
        heart.style.top = '0px';
        heart.style.setProperty('--float-duration', randomDuration + 's');
        heart.style.setProperty('--delay', randomDelay + 's');
        heart.style.setProperty('--translate-x', (Math.random() * 200 - 100) + 'px');
        
        heartsContainer.appendChild(heart);
    }
}

// Event listeners
document.getElementById('modalCloseBtn').addEventListener('click', showInterestModal);
document.getElementById('sureBtn').addEventListener('click', goToTicTacToe);

// Close modal when clicking outside
document.getElementById('presentModal').addEventListener('click', (e) => {
    if (e.target.id === 'presentModal') {
        resetGame();
    }
});

document.getElementById('interestModal').addEventListener('click', (e) => {
    if (e.target.id === 'interestModal') {
        hideInterestModal();
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    createFloatingHearts();
    initGame();

    // Animate title
    gsap.from('.title-section', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'back.out'
    });

    // Animate buttons
    gsap.from(['.reset-button', '.back-button', '.home-button'], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out'
    });
});
