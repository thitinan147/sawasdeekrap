const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Config
const CONFIG = {
    growthSpeed: 0.5,
    color: {
        root: 'rgba(200, 200, 200, 0.2)',
        stem: 'rgba(100, 255, 100, 0.8)',
        petal: 'rgba(255, 240, 245, 0.9)',
        glow: 'rgba(255, 215, 0, 0.5)'
    }
};

let particles = [];
let rootSystem = null;
let mainStem = null;
let flower = null;
let rootStart = { x: 0, y: 0 };

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.life = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class Branch {
    constructor(x, y, angle, depth, type = 'stem', isLeader = false) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.depth = depth;
        this.type = type;
        this.isLeader = isLeader;
        this.length = 0;
        this.maxLength = (type === 'root') ? 20 + Math.random() * 30 : 60 + Math.random() * 40;
        if (this.depth > 0) this.maxLength *= 0.8;
        this.thickness = (type === 'root') ? 1 : 6 * (0.7 ** (5 - depth));
        this.grown = false;
        this.children = [];
    }

    grow() {
        if (this.length < this.maxLength) {
            this.length += CONFIG.growthSpeed * (this.type === 'root' ? 1.0 : 2.0);
        } else if (!this.grown && this.depth > 0) {
            this.grown = true;

            // Spawn children
            const numChildren = (this.isLeader) ? 3 : Math.floor(Math.random() * 2);

            // If leader, always spawn one leader continuation
            if (this.isLeader) {
                const deviation = (Math.random() - 0.5) * 0.2; // Slight wobble
                const branchX = this.x + Math.cos(this.angle) * this.length;
                const branchY = this.y + Math.sin(this.angle) * this.length;
                this.children.push(new Branch(branchX, branchY, this.angle + deviation, this.depth - 1, this.type, true));

                // Side branches
                for (let i = 0; i < 2; i++) {
                    if (Math.random() > 0.3) {
                        const sideDev = (Math.random() - 0.5) * 1.5;
                        this.children.push(new Branch(branchX, branchY, this.angle + sideDev, this.depth - 2, this.type, false));
                    }
                }
            } else {
                // Non-leader branching
                for (let i = 0; i < numChildren; i++) {
                    const deviation = (Math.random() - 0.5) * 1.0;
                    const branchX = this.x + Math.cos(this.angle) * this.length;
                    const branchY = this.y + Math.sin(this.angle) * this.length;
                    this.children.push(new Branch(branchX, branchY, this.angle + deviation, this.depth - 1, this.type, false));
                }
            }
        }
    }

    draw(ctx) {
        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);

        if (this.type === 'root') {
            ctx.strokeStyle = `rgba(200, 200, 200, ${0.1 + (this.depth / 10)})`;
            ctx.shadowBlur = 0;
        } else {
            const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
            grad.addColorStop(0, '#2e8b57');
            grad.addColorStop(1, '#98fb98');
            ctx.strokeStyle = grad;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(50, 255, 50, 0.3)';
        }

        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        this.children.forEach(child => {
            child.grow();
            child.draw(ctx);
        });
    }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.maxSize = 40;
        this.petals = [];
        this.bloomProgress = 0;

        const petalCount = 12;
        for (let i = 0; i < petalCount; i++) {
            this.petals.push({
                angle: (i / petalCount) * Math.PI * 2,
                length: 0,
                maxLength: 40 + Math.random() * 20,
                width: 10 + Math.random() * 10,
                color: `hsla(${340 + Math.random() * 40}, 80%, 80%, 0.8)`
            });
        }
    }

    grow() {
        if (this.bloomProgress < 1) {
            this.bloomProgress += 0.005;
        } else {
            if (Math.random() < 0.1) {
                particles.push(new Particle(this.x, this.y, 'gold'));
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.bloomProgress > 0.5) {
            ctx.shadowBlur = 30 * this.bloomProgress;
            ctx.shadowColor = 'white';
        }

        this.petals.forEach(p => {
            const currentLen = p.maxLength * this.bloomProgress;
            const currentWid = p.width * this.bloomProgress;

            ctx.save();
            ctx.rotate(p.angle);
            ctx.beginPath();
            ctx.ellipse(currentLen / 2, 0, currentLen / 2, currentWid / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(currentLen * 0.8, 0);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.stroke();

            ctx.restore();
        });

        ctx.beginPath();
        ctx.arc(0, 0, 5 * this.bloomProgress, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();

        ctx.restore();
    }
}

function init() {
    rootStart.x = canvas.width / 2;
    rootStart.y = canvas.height * 0.85;

    rootSystem = new Branch(rootStart.x, rootStart.y, Math.PI / 2, 4, 'root', false);
    mainStem = new Branch(rootStart.x, rootStart.y, -Math.PI / 2, 6, 'stem', true);

    particles = [];
    flower = null;
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rootSystem.grow();
    rootSystem.draw(ctx);

    mainStem.grow();
    mainStem.draw(ctx);

    if (!flower) {
        let current = mainStem;
        while (current.children.length > 0) {
            const leaderChild = current.children.find(c => c.isLeader);
            if (leaderChild) {
                current = leaderChild;
            } else {
                break;
            }
        }

        if (current.grown || (current.depth === 0 && current.length >= current.maxLength)) {
            const tipX = current.x + Math.cos(current.angle) * current.length;
            const tipY = current.y + Math.sin(current.angle) * current.length;
            flower = new Flower(tipX, tipY);
        }
    }

    if (flower) {
        flower.grow();
        flower.draw(ctx);
    }

    if (Math.random() < 0.05) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 'rgba(255,255,255,0.5)'));
    }

    particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

init();
animate();
