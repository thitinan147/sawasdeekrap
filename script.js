// Prize data
const prizes = [
  {
    icon: '🌹',
    title: 'กุหลาบ',
    description: 'ดอกไม้งดงาม',
    message: '<p>กุหลาบดอกนี้</p><p>ขอมอบให้คุณนะ</p>',
    color: ['#E1BEE7', '#CE93D8']
  },
  {
    icon: '🍫',
    title: 'ช็อคโกแลต',
    description: 'หวานอร่อย',
    message: '<p>ช็อคโกแลตแท่งนี้</p><p>เอาไว้เต็มน้ำตาลตอนขึ้นเวรนะ</p>',
    color: ['#B3E5FC', '#81D4FA']
  },
  {
    icon: '📸',
    title: 'รูปถ่ายระดับชาติ',
    description: 'ถ่ายโดยช่างภาพมืออาชีพ',
    message: '<p>เป็นรูปคุณตอนยิ้ม</p><p>ขอโทษทีที่แอบถ่ายตอนไม่รู้ตัว</p>',
    color: ['#C8E6C9', '#A5D6A7']
  },
];

// State
let currentPrizeIndex = 0;
let shuffledPrizes = [];
let isSpinning = false;
let remainingPrizes = 0;

// DOM elements
const capsulesContainer = document.getElementById('capsulesContainer');
const gachaKnob = document.getElementById('gachaKnob');
const prizeCapsule = document.getElementById('prizeCapsule');
const prizeIcon = document.getElementById('prizeIcon');
const tapHint = document.getElementById('tapHint');
const prizeCard = document.getElementById('prizeCard');
const cardEmoji = document.getElementById('cardEmoji');
const cardTitle = document.getElementById('cardTitle');
const cardDescription = document.getElementById('cardDescription');
const cardMessage = document.getElementById('cardMessage');
const btnAgain = document.getElementById('btnAgain');
const finalMessage = document.getElementById('finalMessage');
const remainingCount = document.getElementById('remainingCount');

// Initialize
function init() {
  shuffledPrizes = [...prizes];
  remainingPrizes = shuffledPrizes.length;
  updateRemainingCount();
  createMiniCapsules();
}

function createMiniCapsules() {
  const colors = [
    ['#FFCDD2', '#EF9A9A'],
    ['#B3E5FC', '#81D4FA'],
    ['#C8E6C9', '#A5D6A7'],
    ['#FFE0B2', '#FFCC80'],
    ['#E1BEE7', '#CE93D8'],
    ['#F8BBD9', '#F48FB1']
  ];

  for (let i = 0; i < 12; i++) {
    const capsule = document.createElement('div');
    capsule.className = 'capsule-mini';
    capsule.style.background = `linear-gradient(145deg, ${colors[i % colors.length][0]}, ${colors[i % colors.length][1]})`;
    capsule.style.left = `${10 + (i % 4) * 25}%`;
    capsule.style.top = `${10 + Math.floor(i / 4) * 30}%`;
    capsule.style.animationDelay = `${i * 0.2}s`;
    capsulesContainer.appendChild(capsule);
  }
}

function updateRemainingCount() {
  if (remainingPrizes > 0) {
    remainingCount.textContent = `เหลืออีก ${remainingPrizes} รางวัล`;
  } else {
    remainingCount.textContent = 'หมดแล้ว!';
  }
}

// Spin gacha
function spinGacha() {
  if (isSpinning || remainingPrizes <= 0) return;
  isSpinning = true;

  gachaKnob.classList.add('spinning');

  setTimeout(() => {
    gachaKnob.classList.remove('spinning');
    showCapsule();
  }, 800);
}

function showCapsule() {
  const prize = shuffledPrizes[currentPrizeIndex];

  prizeCapsule.style.setProperty('--capsule-top', prize.color[0]);
  prizeCapsule.style.setProperty('--capsule-bottom', prize.color[1]);
  prizeCapsule.querySelector('.capsule-top').style.background =
    `linear-gradient(145deg, ${prize.color[0]}, ${prize.color[1]})`;

  prizeIcon.textContent = prize.icon;

  prizeCapsule.classList.remove('opened');
  prizeCapsule.classList.add('visible', 'bounce');
  tapHint.classList.add('visible');

  setTimeout(() => {
    prizeCapsule.classList.remove('bounce');
    isSpinning = false;
  }, 600);
}

function openCapsule() {
  if (prizeCapsule.classList.contains('opened')) return;

  prizeCapsule.classList.add('opened');
  tapHint.classList.remove('visible');

  setTimeout(() => {
    showPrizeCard();
  }, 500);
}

function showPrizeCard() {
  const prize = shuffledPrizes[currentPrizeIndex];

  cardEmoji.textContent = prize.icon;
  cardTitle.textContent = prize.title;
  cardDescription.textContent = prize.description;
  cardMessage.innerHTML = prize.message;

  prizeCard.classList.add('visible');
}

function closePrizeCard() {
  prizeCard.classList.remove('visible');

  setTimeout(() => {
    prizeCapsule.classList.remove('visible', 'opened');
  }, 300);
}

function nextPrize() {
  currentPrizeIndex++;
  remainingPrizes--;
  updateRemainingCount();

  closePrizeCard();

  if (remainingPrizes <= 0) {
    setTimeout(() => {
      showFinalMessage();
    }, 500);
  }
}

function showFinalMessage() {
  finalMessage.classList.add('visible');
}

// Event listeners
gachaKnob.addEventListener('click', spinGacha);

prizeCapsule.addEventListener('click', () => {
  if (prizeCapsule.classList.contains('visible') && !prizeCapsule.classList.contains('opened')) {
    openCapsule();
  }
});

btnAgain.addEventListener('click', nextPrize);

// Keyboard support
gachaKnob.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    spinGacha();
  }
});

prizeCapsule.setAttribute('tabindex', '0');
prizeCapsule.setAttribute('role', 'button');
prizeCapsule.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openCapsule();
  }
});

// Initialize
init();
