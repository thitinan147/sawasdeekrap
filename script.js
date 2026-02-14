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
    message: '<p>ช็อคโกแลตแท่งนี้</p><p>เอาไว้เติมน้ำตาลตอนทำงานนะ</p>',
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
let hasPlayed = false;
let selectedPrize = null;
let isSpinning = false;

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
const btnFinish = document.getElementById('btnFinish');
const finalMessage = document.getElementById('finalMessage');

// Initialize
function init() {
  // Random prize once at start
  selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];
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

// Spin gacha
function spinGacha() {
  if (isSpinning || hasPlayed) return;
  
  isSpinning = true;
  hasPlayed = true;

  gachaKnob.classList.add('spinning');

  setTimeout(() => {
    gachaKnob.classList.remove('spinning');
    gachaKnob.classList.add('disabled');
    showCapsule();
  }, 800);
}

function showCapsule() {
  prizeCapsule.querySelector('.capsule-top').style.background =
    `linear-gradient(145deg, ${selectedPrize.color[0]}, ${selectedPrize.color[1]})`;

  prizeIcon.textContent = selectedPrize.icon;

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
  cardEmoji.textContent = selectedPrize.icon;
  cardTitle.textContent = selectedPrize.title;
  cardDescription.textContent = selectedPrize.description;
  cardMessage.innerHTML = selectedPrize.message;

  prizeCard.classList.add('visible');
}

function closePrizeCard() {
  prizeCard.classList.remove('visible');

  setTimeout(() => {
    prizeCapsule.classList.remove('visible', 'opened');
    showFinalMessage();
  }, 300);
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

btnFinish.addEventListener('click', closePrizeCard);

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
