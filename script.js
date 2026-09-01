// ===== CONFETI =====
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const colors = ['#7FCBA4', '#3E9C74', '#E3F6EC', '#FFFFFF', '#B8E8D0'];
const pieces = [];

function makePiece(burst) {
  return {
    x: Math.random() * canvas.width,
    y: burst ? canvas.height * 0.4 + Math.random() * 100 : -20 - Math.random() * canvas.height,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 1.5 + Math.random() * 2.5,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 6,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  };
}

// ráfaga inicial
for (let i = 0; i < 120; i++) pieces.push(makePiece(true));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  requestAnimationFrame(draw);
}

// mantiene un flujo constante y ligero de confeti cayendo
setInterval(() => {
  if (pieces.length < 160) pieces.push(makePiece(false));
}, 300);

draw();
