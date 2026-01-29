const qs = (s) => document.querySelector(s);

// Mobile-centric: Use 'click' which works on tap too, but ensures sound/context allowed
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('start-screen');
const mainCard = document.getElementById('mainCard');

startBtn.addEventListener('click', () => {
    // 1. Fade out start screen
    startScreen.classList.add('hidden');

    // 2. Show Main Card after slight delay
    setTimeout(() => {
        mainCard.classList.add('active');

        // 3. Start Animation Sequence
        setTimeout(() => {
            runAnimationSequence();
        }, 500);
    }, 500);

    // Optional: Remove from DOM later so it doesn't block clicks
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);

    // Trigger a little welcome confetti
    confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb3c1', '#ffffff']
    });
});

function runAnimationSequence() {
    // Helper
    const animateDraw = (id, duration, delay) => {
        const el = document.getElementById(id);
        el.style.animation = `drawLine ${duration}s ease forwards ${delay}s`;
    };

    // Sequence
    animateDraw('head', 1.2, 0);       // Start immediately
    animateDraw('body', 1.0, 0.6);
    animateDraw('armL', 0.5, 1.2);
    animateDraw('armR', 0.5, 1.2);
    animateDraw('hand1', 0.3, 1.5);
    animateDraw('hand2', 0.3, 1.5);

    setTimeout(() => { qs('#head').classList.add('filled'); qs('#body').classList.add('filled'); }, 1000);
    setTimeout(() => { qs('#face').classList.add('show'); }, 1800);
    setTimeout(() => { qs('#blush').classList.add('show'); }, 2100);

    // Pop + Confetti
    setTimeout(() => {
        qs('#biuHeart .heart-icon').classList.add('pop');
        triggerCharacterConfetti();
    }, 2300);

    // Text
    setTimeout(() => { qs('#loveText').classList.add('show'); }, 2800);

    // Float
    setTimeout(() => { qs('#charWrapper').classList.add('floating'); }, 3000);
}

function triggerCharacterConfetti() {
    const rect = qs('#charWrapper').getBoundingClientRect();
    const x = (rect.right - 40) / window.innerWidth;
    const y = (rect.top + 60) / window.innerHeight;

    confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: x, y: y },
        colors: ['#ff4d6d', '#ff8fa3', '#fff'],
        zIndex: 9999,
    });
}

// Tap for hearts
document.addEventListener('click', (e) => {
    // Avoid triggering on the start button itself
    if (e.target.closest('#startBtn')) return;

    confetti({
        particleCount: 15,
        scalar: 2,
        shapes: ['heart'],
        colors: ['#ff4d6d', '#ffcad4'],
        origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        },
        zIndex: 999
    });
});

// Simple tilt effect (Gyroscope fallback would be ideal for real phone but mousemove works for desktop testing/hybrid)
document.addEventListener('mousemove', (e) => {
    if (!mainCard.classList.contains('active')) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    mainCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
