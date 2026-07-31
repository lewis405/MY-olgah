/* ============================================================
   CONFIG — edit this to match the real date if you like
   ============================================================ */
const RELATIONSHIP_START = new Date('2023-02-14T00:00:00');

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 900);
});

/* ============================================================
   CUSTOM CURSOR GLOW
   ============================================================ */
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let glowX = mouseX, glowY = mouseY;
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
});
function animateGlow(){
  glowX += (mouseX - glowX) * 0.18;
  glowY += (mouseY - glowY) * 0.18;
  if(cursorGlow){ cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%,-50%)`; }
  requestAnimationFrame(animateGlow);
}
animateGlow();

document.querySelectorAll('button, .gallery-item, .timeline-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorGlow && cursorGlow.classList.add('big'));
  el.addEventListener('mouseleave', () => cursorGlow && cursorGlow.classList.remove('big'));
});

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollFill = document.getElementById('scrollFill');
function updateScrollProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if(scrollFill) scrollFill.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealTargets = document.querySelectorAll('.reveal, .letter-paper');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealTargets.forEach(el => revealObserver.observe(el));

/* ============================================================
   HERO "BEGIN OUR STORY" BUTTON
   ============================================================ */
document.getElementById('beginBtn').addEventListener('click', () => {
  document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   FLOATING HEARTS CANVAS (ambient, behind content)
   ============================================================ */
const heartsCanvas = document.getElementById('heartsCanvas');
const hctx = heartsCanvas.getContext('2d');
let hearts = [];

function resizeHeartsCanvas(){
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
resizeHeartsCanvas();
window.addEventListener('resize', resizeHeartsCanvas);

function makeHeart(){
  return {
    x: Math.random() * heartsCanvas.width,
    y: heartsCanvas.height + 40 + Math.random() * 200,
    size: 8 + Math.random() * 16,
    speed: 0.3 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.6,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.02,
    opacity: 0.12 + Math.random() * 0.25,
    hue: 330 + Math.random() * 40
  };
}
const HEART_COUNT = window.innerWidth < 640 ? 16 : 30;
for(let i=0;i<HEART_COUNT;i++){
  const h = makeHeart();
  h.y = Math.random() * heartsCanvas.height;
  hearts.push(h);
}

function drawHeart(ctx, x, y, size, angle, opacity, hue){
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = `hsl(${hue}, 70%, 78%)`;
  ctx.beginPath();
  const s = size / 16;
  ctx.moveTo(0, 4*s);
  ctx.bezierCurveTo(0, -2*s, -8*s, -2*s, -8*s, 4*s);
  ctx.bezierCurveTo(-8*s, 9*s, 0, 12*s, 0, 16*s);
  ctx.bezierCurveTo(0, 12*s, 8*s, 9*s, 8*s, 4*s);
  ctx.bezierCurveTo(8*s, -2*s, 0, -2*s, 0, 4*s);
  ctx.fill();
  ctx.restore();
}

function animateHearts(){
  hctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach(h => {
    h.y -= h.speed;
    h.x += h.drift;
    h.angle += h.spin;
    if(h.y < -40){
      Object.assign(h, makeHeart());
      h.y = heartsCanvas.height + 40;
    }
    drawHeart(hctx, h.x, h.y, h.size, h.angle, h.opacity, h.hue);
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ============================================================
   MUSIC TOGGLE
   ============================================================ */
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let musicPlaying = false;
musicToggle.addEventListener('click', () => {
  musicPlaying = !musicPlaying;
  musicToggle.setAttribute('aria-pressed', String(musicPlaying));
  if(musicPlaying){
    bgMusic.play().catch(() => { /* file may be missing — silently ignore */ });
  } else {
    bgMusic.pause();
  }
});

/* ============================================================
   TIMELINE MODAL
   ============================================================ */
const timelineData = {
  t1: { eyebrow: 'Chapter One', title: 'We Met', body: 'Out of every room I could have walked into, I walked into the one you were in. I didn\u2019t know it yet, but that was the moment everything changed.' },
  t2: { eyebrow: 'Chapter Two', title: 'First Conversation', body: 'I don\u2019t remember exactly what we talked about, only that I didn\u2019t want it to end, and that I kept finding reasons to talk to you again.' },
  t3: { eyebrow: 'Chapter Three', title: 'First Date', body: 'I was nervous in a way I hadn\u2019t been in years. Somewhere between the nerves and the laughing, I already knew I wanted a second one.' },
  t4: { eyebrow: 'Chapter Four', title: 'Favourite Memories', body: 'The lazy mornings, the terrible jokes, the trips we almost didn\u2019t take. Somehow the small, ordinary days became the ones I hold onto the most.' },
  t5: { eyebrow: 'Chapter Five', title: 'Today', body: 'Right now, exactly as things are \u2014 still learning you, still choosing you, still grateful you\u2019re the one I get to do life with.' },
  t6: { eyebrow: 'Chapter Six', title: 'Forever', body: 'Wherever the story goes from here, I already know how I want it to end: with you, always. That part isn\u2019t up for revision.' }
};

const modal = document.getElementById('timelineModal');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.timeline-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = timelineData[btn.dataset.open];
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
modal.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){ closeModal(); closeGallery(); }
});

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
const galleryBackdrop = document.createElement('div');
galleryBackdrop.className = 'gallery-backdrop';
document.body.appendChild(galleryBackdrop);

const galleryCaption = document.createElement('div');
galleryCaption.className = 'gallery-caption';
document.body.appendChild(galleryCaption);

let activeGalleryItem = null;
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.setProperty('--h', item.dataset.hue || 340);
  item.addEventListener('click', () => {
    if(activeGalleryItem === item){ closeGallery(); return; }
    if(activeGalleryItem) activeGalleryItem.classList.remove('expanded');
    activeGalleryItem = item;
    item.classList.add('expanded');
    galleryBackdrop.classList.add('open');
    galleryCaption.textContent = item.dataset.caption || '';
    galleryCaption.classList.add('open');
  });
});
galleryBackdrop.addEventListener('click', closeGallery);
function closeGallery(){
  if(activeGalleryItem) activeGalleryItem.classList.remove('expanded');
  activeGalleryItem = null;
  galleryBackdrop.classList.remove('open');
  galleryCaption.classList.remove('open');
}

/* ============================================================
   LOVE COUNTER
   ============================================================ */
const cDays = document.getElementById('cDays');
const cHours = document.getElementById('cHours');
const cMinutes = document.getElementById('cMinutes');
const cSeconds = document.getElementById('cSeconds');

function updateCounter(){
  const now = new Date();
  let diff = Math.max(0, now - RELATIONSHIP_START) / 1000; // seconds
  const days = Math.floor(diff / 86400); diff -= days * 86400;
  const hours = Math.floor(diff / 3600); diff -= hours * 3600;
  const minutes = Math.floor(diff / 60); diff -= minutes * 60;
  const seconds = Math.floor(diff);
  cDays.textContent = days.toLocaleString();
  cHours.textContent = String(hours).padStart(2,'0');
  cMinutes.textContent = String(minutes).padStart(2,'0');
  cSeconds.textContent = String(seconds).padStart(2,'0');
}
updateCounter();
setInterval(updateCounter, 1000);

/* ============================================================
   SURPRISE BUTTON — confetti + hearts rain + message
   ============================================================ */
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');
const surpriseSection = document.getElementById('surprise');

const confettiCanvas = document.createElement('canvas');
confettiCanvas.id = 'confettiCanvas';
surpriseSection.appendChild(confettiCanvas);
const cctx = confettiCanvas.getContext('2d');

function sizeConfettiCanvas(){
  const rect = surpriseSection.getBoundingClientRect();
  confettiCanvas.width = surpriseSection.clientWidth;
  confettiCanvas.height = surpriseSection.clientHeight;
}
sizeConfettiCanvas();
window.addEventListener('resize', sizeConfettiCanvas);

let confettiPieces = [];
const CONFETTI_COLORS = ['#F6C9D6', '#C48A73', '#D9C9EE', '#EFA9C1', '#FFF8F2'];

function burstConfetti(){
  confettiPieces = [];
  const cw = confettiCanvas.width, ch = confettiCanvas.height;
  for(let i=0;i<140;i++){
    confettiPieces.push({
      x: cw/2, y: ch/2,
      vx: (Math.random()-0.5) * 14,
      vy: (Math.random()-1.4) * 14,
      size: 4 + Math.random()*6,
      color: CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)],
      rot: Math.random()*Math.PI*2,
      vrot: (Math.random()-0.5) * 0.3,
      heart: Math.random() < 0.35,
      life: 0
    });
  }
}

let confettiRunning = false;
function tickConfetti(){
  cctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  let alive = false;
  confettiPieces.forEach(p => {
    p.life++;
    p.vy += 0.28; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vrot;
    p.vx *= 0.99;
    const opacity = Math.max(0, 1 - p.life/160);
    if(opacity > 0 && p.y < confettiCanvas.height + 40){ alive = true; }
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot);
    cctx.globalAlpha = opacity;
    if(p.heart){
      drawHeart(cctx, 0, 0, p.size*2.2, 0, 1, 340);
    } else {
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    }
    cctx.restore();
  });
  if(alive){
    requestAnimationFrame(tickConfetti);
  } else {
    confettiRunning = false;
  }
}

const surpriseMessages = [
  'You are, and always will be, my favourite person.',
  'Every love story is beautiful, but ours is my favourite.',
  'If I had to choose you, I\u2019d choose you every single time.',
  'Loving you is the easiest thing I\u2019ve ever done.'
];

let surpriseUsed = false;
surpriseBtn.addEventListener('click', () => {
  sizeConfettiCanvas();
  burstConfetti();
  if(!confettiRunning){ confettiRunning = true; requestAnimationFrame(tickConfetti); }

  document.body.classList.toggle('surprise-active');
  document.body.style.transition = 'background .8s ease';

  const msg = surpriseMessages[Math.floor(Math.random()*surpriseMessages.length)];
  surpriseMessage.textContent = '\u2764\ufe0f ' + msg;
  surpriseMessage.classList.remove('show');
  void surpriseMessage.offsetWidth; // restart animation
  surpriseMessage.classList.add('show');

  surpriseBtn.style.transform = 'scale(0.9)';
  setTimeout(() => { surpriseBtn.style.transform = ''; }, 200);
});

/* ============================================================
   FINAL SECTION — glowing particle drift
   ============================================================ */
const finalCanvas = document.getElementById('finalCanvas');
const fctx = finalCanvas.getContext('2d');
let finalParticles = [];

function resizeFinalCanvas(){
  const section = document.getElementById('final');
  finalCanvas.width = section.clientWidth;
  finalCanvas.height = section.clientHeight;
}
resizeFinalCanvas();
window.addEventListener('resize', resizeFinalCanvas);

function makeFinalParticle(){
  return {
    x: Math.random() * finalCanvas.width,
    y: Math.random() * finalCanvas.height,
    r: 0.6 + Math.random()*1.8,
    baseOpacity: 0.2 + Math.random()*0.6,
    twinkleSpeed: 0.5 + Math.random()*1.5,
    phase: Math.random()*Math.PI*2,
    vy: -0.08 - Math.random()*0.15
  };
}
for(let i=0;i<90;i++){ finalParticles.push(makeFinalParticle()); }

let finalTime = 0;
function animateFinal(){
  finalTime += 0.02;
  fctx.clearRect(0,0,finalCanvas.width, finalCanvas.height);
  finalParticles.forEach(p => {
    p.y += p.vy;
    if(p.y < -10){ p.y = finalCanvas.height + 10; p.x = Math.random()*finalCanvas.width; }
    const twinkle = (Math.sin(finalTime * p.twinkleSpeed + p.phase) + 1) / 2;
    fctx.beginPath();
    fctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    fctx.fillStyle = `rgba(231,187,166,${(p.baseOpacity * twinkle).toFixed(3)})`;
    fctx.fill();
  });
  requestAnimationFrame(animateFinal);
}
animateFinal();

/* trigger reveal for final canvas resize once section becomes visible */
const finalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if(entry.isIntersecting) resizeFinalCanvas(); });
}, { threshold: 0.1 });
finalObserver.observe(document.getElementById('final'));

/* ============================================================
   KEYBOARD NAV: allow Enter/Space on gallery buttons (native for <button>)
   ============================================================ */
