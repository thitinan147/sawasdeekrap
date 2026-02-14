
// Prize data - Valentine's Day Theme
const prizes = [
  {
    icon: '🌹',
    title: 'กุหลาบแห่งความภูมิใจ',
    description: 'สวยและเด่นเสมอ',
    message: '<p>ไม่ต้องรอใครมามอบให้</p><p>วันนี้เธอสวยและน่ารักพอที่จะมอบดอกไม้ให้ตัวเองได้แล้วนะ</p>',
    color: ['#F8BBD9', '#F48FB1']
  },
  {
    icon: '🍫',
    title: 'ช็อคโกแลตรสเข้มข้น',
    description: 'ช่วงเวลาที่หวานล้ำ',
    message: '<p>ชีวิตก็เหมือนช็อคโกแลต</p><p>บางทีต้องผ่านรสขมไปบ้าง ถึงจะรู้สึกถึงความหวานที่ตามมา</p>',
    color: ['#D7CCC8', '#BCAAA4']
  },
  {
    icon: '💌',
    title: 'จดหมายรักจากตัวเอง',
    description: 'ข้อความที่รอคอย',
    message: '<p>รักตัวเองให้มากที่สุดนะ</p><p>เพราะตัวเธอคือคนที่จะอยู่กับเธอไปตลอดชีวิต</p>',
    color: ['#FFCDD2', '#EF9A9A']
  },
  {
    icon: '🍕',
    title: 'พิซซ่าความรัก',
    description: 'หัวใจครบทุกส่วนผสม',
    message: '<p>ความรักก็เหมือนพิซซ่า</p><p>แม้จะมีหน้าให้เลือกเยอะ แต่สุดท้ายก็อร่อยทุกชิ้นนั่นแหละ</p>',
    color: ['#FFCC80', '#FFB74D']
  },
  {
    icon: '🧸',
    title: 'ตุ๊กตาหมีปลอบใจ',
    description: 'เพื่อนที่พร้อมกอด',
    message: '<p>หากวันไหนรู้สึกเหงา</p><p>จำไว้ว่ายังมีใครหลายคนที่ห่วงใยและคิดถึงเธอเสมอนะ</p>',
    color: ['#D1C4E9', '#B39DDB']
  },
  {
    icon: '☕',
    title: 'กาแฟอุ่นๆ',
    description: 'อุ่นใจไปพร้อมกัน',
    message: '<p>จิบช้าๆ สักหน่อย</p><p>ขอให้วันนี้ผ่านไปด้วยดี และมีแต่เรื่องดีๆ เข้ามาในชีวิต</p>',
    color: ['#C8E6C9', '#A5D6A7']
  },
  {
    icon: '🌟',
    title: 'ดาวเด่นแห่งปี',
    description: 'ส่องแสงสว่าง',
    message: '<p>เธอเป็นดาวดวงนั้น</p><p>ที่ไม่จำเป็นต้องเปล่งประกายเพื่อใคร แต่เปล่งเพื่อตัวเองให้สว่างที่สุด</p>',
    color: ['#FFF59D', '#FFF176']
  },
  {
    icon: '🧁',
    title: 'คัพเค้กหวานลิ้น',
    description: 'เติมความสุขให้วันนี้',
    message: '<p>ความสุขไม่จำเป็นต้องใหญ่โต</p><p>แค่เรื่องเล็กๆ อย่างของอร่อยก็ทำให้ยิ้มได้แล้วใช่มั้ยละ</p>',
    color: ['#F8BBD0', '#F48FB1']
  },
  {
    icon: '🎈',
    title: 'ลูกโป่งสีชมพู',
    description: 'ลอยสูงขึ้นไป',
    message: '<p>ปล่อยวางสิ่งที่หนักใจ</p><p>แล้วลอยขึ้นไปบนฟ้าสูงๆ ให้หัวใจเบาสบายขึ้นซะบ้าง</p>',
    color: ['#E1BEE7', '#CE93D8']
  },
  {
    icon: '🎁',
    title: 'กล่องของขวัญ',
    description: 'เซอร์ไพรส์จากใจ',
    message: '<p>ของขวัญที่ดีที่สุด</p><p>คือการที่เธอยังคงเป็นตัวของตัวเองและยิ้มได้ทุกวัน</p>',
    color: ['#B3E5FC', '#81D4FA']
  },
  {
    icon: '🎮',
    title: 'เกมผจญภัย',
    description: 'เลเวลอัพชีวิต',
    message: '<p>ชีวิตคือเกมที่ต้องเล่นต่อไป</p><p>ไม่ผ่านด่านนี้ก็ผ่านด่านนั้น เธอเก่งมากแล้วนะ</p>',
    color: ['#B2DFDB', '#80CBC4']
  },
  {
    icon: '🧣',
    title: 'ผ้าพันคออุ่นใจ',
    description: 'กอดไว้ให้อบอุ่น',
    message: '<p>ห่มความอบอุ่นนี้ไว้</p><p>ไม่ว่าอากาศจะหนาวแค่ไหน หัวใจเธอก็ยังอุ่นอยู่ดี</p>',
    color: ['#FFCCBC', '#FFAB91']
  },
  {
    icon: '🎵',
    title: 'เพลงของหัวใจ',
    description: 'เสียงดนตรีแห่งความสุข',
    message: '<p>เปิดเพลงที่ชอบแล้วเคลิบเคลิ้มไปกับมัน</p><p>บางทีคำตอบของความทุกข์ก็อยู่ที่ทำนองเพลงนะ</p>',
    color: ['#D1C4E9', '#B39DDB']
  },
  {
    icon: '🍩',
    title: 'โดนัทแห่งความหวัง',
    description: 'หวานทั้งวง',
    message: '<p>ชีวิตไม่จำเป็นต้องสมบูรณ์แบบ</p><p>แบบที่เป็นอยู่ก็ดีแล้ว ขอแค่มีรูขาดตรงไหน ก็เติมความหวานลงไป</p>',
    color: ['#FFE0B2', '#FFCC80']
  },
  {
    icon: '🌈',
    title: 'สายรุ้งหลังฝน',
    description: 'ความสวยงามรออยู่ข้างหน้า',
    message: '<p>หลังพายุผ่านไป</p><p>ท้องฟ้าจะสวยงามเสมอ รอวันนั้นไปพร้อมกันนะ</p>',
    color: ['#C8E6C9', '#A5D6A7']
  }
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
