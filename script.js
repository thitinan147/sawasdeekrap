// ================================================
// Valentine's Day Gift - Interactive Script
// ================================================

// Prize emojis
const prizes = ['🌹', '🍫', '🧸', '🧁', '🍬'];

// DOM Elements
const heartsContainer = document.getElementById('heartsContainer');
const giftSection = document.getElementById('giftSection');
const giftBox = document.getElementById('giftBox');
const openBtn = document.getElementById('openBtn');
const drumSection = document.getElementById('drumSection');
const drumStrip = document.getElementById('drumStrip');
const spinningText = document.getElementById('spinningText');
const resultSection = document.getElementById('resultSection');
const prizeDisplay = document.getElementById('prizeDisplay');
const replayBtn = document.getElementById('replayBtn');

// ================================================
// Falling Hearts Background Animation
// ================================================

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['❤️', '💕', '💗', '💖', '💝'][Math.floor(Math.random() * 5)];

    // Random horizontal position
    heart.style.left = Math.random() * 100 + '%';

    // Random size
    const size = 1 + Math.random() * 1.5;
    heart.style.fontSize = size + 'rem';

    // Random duration
    const duration = 6 + Math.random() * 8;
    heart.style.animationDuration = duration + 's';

    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create hearts periodically
setInterval(createFallingHeart, 500);

// Create initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFallingHeart, i * 200);
}

// ================================================
// Initialize Drum Strip
// ================================================

function initDrumStrip() {
    // Create repeated prize items for smooth spinning
    // We need enough items to create a seamless loop
    const repeatCount = 20; // Number of times to repeat the prize array

    for (let i = 0; i < repeatCount; i++) {
        prizes.forEach(prize => {
            const item = document.createElement('div');
            item.className = 'drum-item';
            item.textContent = prize;
            item.dataset.prize = prize;
            drumStrip.appendChild(item);
        });
    }
}

initDrumStrip();

// ================================================
// Open Gift Box - Start Spinning
// ================================================

openBtn.addEventListener('click', () => {
    // Add opened class to gift box
    giftBox.classList.add('opened');

    // Disable button
    openBtn.disabled = true;
    openBtn.style.opacity = '0.5';
    openBtn.style.cursor = 'not-allowed';

    // Play small confetti
    triggerConfetti();

    // Transition to drum section after gift opens
    setTimeout(() => {
        giftSection.classList.add('fade-out');

        setTimeout(() => {
            giftSection.classList.add('hidden');
            drumSection.classList.remove('hidden');

            // Start spinning animation
            startSpin();
        }, 500);
    }, 600);
});

// ================================================
// Spinning Drum Logic
// ================================================

function startSpin() {
    // Select random prize
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

    // Calculate position
    const itemWidth = 112; // Width of each drum item in pixels
    const containerWidth = drumSection.querySelector('.drum-window').offsetWidth;
    const items = drumStrip.querySelectorAll('.drum-item');

    // Find a random instance of the selected prize
    const matchingItems = Array.from(items).filter(item => item.dataset.prize === randomPrize);
    const targetItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];

    // Calculate target position (center the selected item)
    const itemIndex = Array.from(items).indexOf(targetItem);
    const targetPosition = -(itemIndex * itemWidth) + (containerWidth / 2) - (itemWidth / 2);

    // Add some extra rotations for visual effect
    const extraRotations = items.length * itemWidth * (2 + Math.floor(Math.random() * 3));
    const finalPosition = targetPosition - extraRotations;

    // Start spinning animation
    let currentPosition = 0;
    const spinDuration = 4000; // 4 seconds
    const startTime = Date.now();
    const startPosition = 0;

    // Initial fast spin
    let spinSpeed = 50;

    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);

        // Easing function for smooth slowdown
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        currentPosition = startPosition + (finalPosition * easedProgress);
        drumStrip.style.transform = `translateX(${currentPosition}px)`;

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            // Spin complete
            setTimeout(() => {
                showResult(randomPrize);
            }, 300);
        }
    }

    animateSpin();
}

// ================================================
// Show Result
// ================================================

function showResult(prize) {
    // Hide drum section
    drumSection.classList.add('hidden');

    // Show result section
    resultSection.classList.remove('hidden');

    // Display prize
    prizeDisplay.textContent = prize;

    // Trigger celebration confetti
    triggerBigConfetti();
}

// ================================================
// Replay Functionality
// ================================================

replayBtn.addEventListener('click', () => {
    // Hide result section
    resultSection.classList.add('hidden');

    // Show drum section
    drumSection.classList.remove('hidden');

    // Reset drum position
    drumStrip.style.transition = 'none';
    drumStrip.style.transform = 'translateX(0)';

    // Start spinning again
    setTimeout(() => {
        drumStrip.style.transition = 'transform 0.1s linear';
        startSpin();
    }, 100);
});

// ================================================
// Confetti Effects
// ================================================

function triggerConfetti() {
    confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffcad4', '#ffb3c1', '#c9184a', '#ffd700']
    });
}

function triggerBigConfetti() {
    // Multiple bursts for celebration effect
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // Launch confetti from left and right
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ffcad4', '#ffb3c1', '#c9184a', '#ffd700']
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ffcad4', '#ffb3c1', '#c9184a', '#ffd700']
        });

        // Heart-shaped confetti
        confetti({
            particleCount: 3,
            spread: 70,
            origin: { y: 0.6 },
            shapes: ['heart'],
            colors: ['#ff4d6d', '#c9184a'],
            scalar: 2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Final big burst
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#ff4d6d', '#ffcad4', '#ffb3c1', '#c9184a', '#ffd700'],
            shapes: ['circle', 'heart'],
            scalar: 1.5
        });
    }, 200);
}

// ================================================
// Tap for Hearts Effect (Additional Fun)
// ================================================

document.addEventListener('click', (e) => {
    // Don't trigger on buttons
    if (e.target.closest('button')) return;

    confetti({
        particleCount: 8,
        spread: 50,
        origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        },
        shapes: ['heart'],
        colors: ['#ff4d6d', '#ffcad4', '#c9184a'],
        scalar: 1.5,
        zIndex: 9999
    });
});

// ================================================
// Gift Box Click (Alternative to Button)
// ================================================

giftBox.addEventListener('click', () => {
    if (!openBtn.disabled) {
        openBtn.click();
    }
});
