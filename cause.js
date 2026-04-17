 // Reasons database
 const reasons = [
    { 
        text: "Keep going even when it feels hard, because every small step you take is bringing you closer to your goal. 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Believe in yourself and your abilities, because you are stronger and more capable than you think. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Don’t be afraid to make mistakes, because every mistake is a chance to learn and grow into a better version of yourself. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Never give up on your dreams, even if progress feels slow, because success takes time and patience. 💪 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    // Center the button at bottom middle
                    shuffleButton.style.position = 'fixed';
                    shuffleButton.style.left = '50%';
                    shuffleButton.style.top = '80%';
                    shuffleButton.style.transform = 'translateX(-50%)';
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
    
    // Move button to bottom after first click
    if (currentReasonIndex === 1) {
        setTimeout(() => {
            shuffleButton.style.position = 'fixed';
            shuffleButton.style.left = '50%';
            shuffleButton.style.top = '80%';
            shuffleButton.style.transform = 'translateX(-50%)';
        }, 600); // Wait for animation to complete
    }
});

// Make button run away on hover (only before first click)
shuffleButton.addEventListener('mouseenter', () => {
    if (shuffleButton.classList.contains('story-mode') || currentReasonIndex > 0) return;
    
    const buttonRect = shuffleButton.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate direction away from mouse
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const deltaX = centerX - mouseX;
    const deltaY = centerY - mouseY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const moveDistance = 150; // pixels to move
    
    let newX = centerX + (deltaX / distance) * moveDistance;
    let newY = centerY + (deltaY / distance) * moveDistance;
    
    // Keep within viewport bounds, but limit Y to upper 70% of screen
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const maxY = window.innerHeight * 0.7 - buttonHeight; // Don't go below 70% of screen height
    
    newX = Math.max(0, Math.min(window.innerWidth - buttonWidth, newX));
    newY = Math.max(0, Math.min(maxY, newY));
    
    shuffleButton.style.position = 'fixed';
    shuffleButton.style.left = newX + 'px';
    shuffleButton.style.top = newY + 'px';
    
    // Add a fun animation
    gsap.fromTo(shuffleButton, 
        { scale: 1.2 }, 
        { scale: 1, duration: 0.3, ease: "back.out" }
    );
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);