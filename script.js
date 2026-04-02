/* ════════════════════════════════════════════════
   JS MINI PROJECTS v3 — script.js
   01: Background Color Changer (named colors)
   02: Live Text Preview (word + char count)
   03: Show/Hide Password (segmented strength)
   04: Car Image Slider (8 cars, keyboard nav)
   05: Counter (undo + history log)
════════════════════════════════════════════════ */


/* ════════════════════════════
   01 — BACKGROUND COLOR CHANGER
════════════════════════════ */

const namedColors = [
  { bg: '#fecdd3', name: 'Rose Quartz',   hex: '#fecdd3' },
  { bg: '#fed7aa', name: 'Peach Sorbet',  hex: '#fed7aa' },
  { bg: '#fef08a', name: 'Lemon Drop',    hex: '#fef08a' },
  { bg: '#bbf7d0', name: 'Mint Julep',    hex: '#bbf7d0' },
  { bg: '#bae6fd', name: 'Sky Blue',      hex: '#bae6fd' },
  { bg: '#c4b5fd', name: 'Lavender Mist', hex: '#c4b5fd' },
  { bg: '#fbcfe8', name: 'Cotton Candy',  hex: '#fbcfe8' },
  { bg: '#d1fae5', name: 'Seafoam',       hex: '#d1fae5' },
  { bg: '#e0f2fe', name: 'Baby Blue',     hex: '#e0f2fe' },
  { bg: '#fae8ff', name: 'Lilac Dream',   hex: '#fae8ff' },
  { bg: '#dcfce7', name: 'Honeydew',      hex: '#dcfce7' },
  { bg: '#fff7ed', name: 'Cream Puff',    hex: '#fff7ed' },
];

const randomPalette = [
  '#fecdd3','#fed7aa','#fef08a','#bbf7d0','#bae6fd','#c4b5fd',
  '#fbcfe8','#d1fae5','#e0f2fe','#fae8ff','#dcfce7','#fff7ed',
  '#f0fdf4','#ffe4e6','#fdf4ff','#ecfeff','#fffbeb','#f0f9ff',
];

const swatchContainer = document.getElementById('swatches');
const bgSection       = document.getElementById('bg-section');
const colorNameEl     = document.getElementById('color-name');
let activeSwatch = null;

// Build named color swatches
namedColors.forEach((c) => {
  const s = document.createElement('div');
  s.className = 'swatch';
  s.style.background = c.bg;
  s.title = c.name;
  s.onclick = () => {
    bgSection.style.background = c.bg;
    colorNameEl.textContent = `${c.name}  ${c.hex}`;
    if (activeSwatch) activeSwatch.classList.remove('active');
    s.classList.add('active');
    activeSwatch = s;
  };
  swatchContainer.appendChild(s);
});

function randomBg() {
  const color = randomPalette[Math.floor(Math.random() * randomPalette.length)];
  bgSection.style.background = color;
  colorNameEl.textContent = `Random  ${color}`;
  if (activeSwatch) { activeSwatch.classList.remove('active'); activeSwatch = null; }
}


/* ════════════════════════════
   02 — LIVE TEXT PREVIEW
════════════════════════════ */

function updateLive() {
  const val    = document.getElementById('live-input').value;
  const outEl  = document.getElementById('live-out');
  const charEl = document.getElementById('char-count');
  const wordEl = document.getElementById('word-count');

  if (val.trim()) {
    outEl.innerHTML = `<span style="color:var(--ink)">${escapeHtml(val)}</span>`;
  } else {
    outEl.innerHTML = '<span class="preview-placeholder">Your text will appear here in real time…</span>';
  }

  const words = val.trim() ? val.trim().split(/\s+/).length : 0;
  charEl.textContent = val.length + ' chars';
  wordEl.textContent = words + ' word' + (words !== 1 ? 's' : '');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


/* ════════════════════════════
   03 — SHOW / HIDE PASSWORD
════════════════════════════ */

const eyeOpen = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>`;

const eyeClosed = `
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>`;

function togglePw() {
  const inp  = document.getElementById('pw-input');
  const icon = document.getElementById('eye-icon');
  const show = inp.type === 'password';
  inp.type       = show ? 'text' : 'password';
  icon.innerHTML = show ? eyeClosed : eyeOpen;
}

function checkStrength() {
  const pw   = document.getElementById('pw-input').value;
  const segs = document.querySelectorAll('.seg');
  const lbl  = document.getElementById('strength-label');

  // Rules
  const rules = [
    { id: 'r-len',   pass: pw.length >= 6           },
    { id: 'r-upper', pass: /[A-Z]/.test(pw)         },
    { id: 'r-lower', pass: /[a-z]/.test(pw)         },
    { id: 'r-num',   pass: /[0-9]/.test(pw)         },
    { id: 'r-sym',   pass: /[^A-Za-z0-9]/.test(pw)  },
  ];

  let score = rules.filter(r => r.pass).length;

  // Update rule badges
  rules.forEach(r => {
    const el = document.getElementById(r.id);
    if (el) el.classList.toggle('pass', r.pass);
  });

  // Segment colors
  const colors = ['transparent','#ef4444','#f97316','#eab308','#22c55e','#16a34a'];
  const segColors = [
    [],
    ['#ef4444'],
    ['#f97316','#f97316'],
    ['#eab308','#eab308','#eab308'],
    ['#22c55e','#22c55e','#22c55e','#22c55e'],
    ['#16a34a','#16a34a','#16a34a','#16a34a','#16a34a'],
  ];
  segs.forEach((seg, i) => {
    seg.style.background = (segColors[score] && segColors[score][i]) ? segColors[score][i] : '#e2dfd8';
  });

  const labels = ['Enter a password','Very weak','Weak','Fair','Strong','Very strong'];
  const labelColors = ['var(--muted)','#ef4444','#f97316','#ca8a04','#16a34a','#15803d'];
  lbl.textContent  = labels[score];
  lbl.style.color  = labelColors[score];
}


/* ════════════════════════════
   04 — CAR IMAGE SLIDER
════════════════════════════ */

const carsData = [
  {
    img:    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85',
    name:   'Lamborghini Huracán',
    tag:    'Italian Supercar',
    origin: 'Sant\'Agata Bolognese, Italy'
  },
  {
    img:    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85',
    name:   'Porsche 911',
    tag:    'German Icon',
    origin: 'Stuttgart, Germany'
  },
  {
    img:    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85',
    name:   'Ferrari',
    tag:    'Italian Stallion',
    origin: 'Maranello, Italy'
  },
  {
    img:    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=85',
    name:   'BMW M Series',
    tag:    'Ultimate Driving Machine',
    origin: 'Munich, Germany'
  },
  {
    img:    'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=85',
    name:   'Mercedes-Benz',
    tag:    'German Luxury',
    origin: 'Stuttgart, Germany'
  },
  {
    img:    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85',
    name:   'Classic Mustang',
    tag:    'American Muscle',
    origin: 'Detroit, Michigan'
  },
  {
    img:    'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=900&q=85',
    name:   'Aston Martin',
    tag:    'British Elegance',
    origin: 'Gaydon, England'
  },
  {
    img:    'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=900&q=85',
    name:   'McLaren',
    tag:    'British Hypercar',
    origin: 'Woking, England'
  },
];

let curSlide = 0;
let autoPlay = null;
const stageEl   = document.getElementById('slider-track');
const dotsEl    = document.getElementById('dots');
const counterEl = document.getElementById('slide-counter');

// Build slides
carsData.forEach((car, i) => {
  const el = document.createElement('div');
  el.className = 'slide' + (i === 0 ? ' active' : '');
  el.style.backgroundImage    = `url('${car.img}')`;
  el.style.backgroundSize     = 'cover';
  el.style.backgroundPosition = 'center';
  el.innerHTML = `
    <div class="slide-caption">
      <span class="slide-tag">${car.tag}</span>
      <span class="slide-name">${car.name}</span>
      <span class="slide-origin">${car.origin}</span>
    </div>`;
  stageEl.appendChild(el);

  // Dot
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick   = () => goTo(i);
  dotsEl.appendChild(d);
});

function goTo(n) {
  const slides = stageEl.querySelectorAll('.slide');
  const dots   = dotsEl.querySelectorAll('.dot');
  slides[curSlide].classList.remove('active');
  dots[curSlide].classList.remove('active');
  curSlide = (n + carsData.length) % carsData.length;
  slides[curSlide].classList.add('active');
  dots[curSlide].classList.add('active');
  counterEl.textContent = `${curSlide + 1} / ${carsData.length}`;
}

function moveSlide(dir) { goTo(curSlide + dir); }

function startAutoPlay() { autoPlay = setInterval(() => moveSlide(1), 3500); }
function stopAutoPlay()  { clearInterval(autoPlay); }

startAutoPlay();

// Pause on hover
stageEl.addEventListener('mouseenter', stopAutoPlay);
stageEl.addEventListener('mouseleave', startAutoPlay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  moveSlide(-1);
  if (e.key === 'ArrowRight') moveSlide(1);
});


/* ════════════════════════════
   05 — COUNTER
════════════════════════════ */

let count   = 0;
let history = [];

function adjust(dir) {
  const step = parseInt(document.getElementById('step').value) || 1;
  const prev = count;
  count += dir * step;
  updateCounter(prev, dir > 0 ? '+' : '-', step);
}

function resetCounter() {
  const prev = count;
  count = 0;
  updateCounter(prev, 'reset', 0);
}

function undoCounter() {
  if (history.length === 0) return;
  history.pop();
  const last = history[history.length - 1];
  count = last ? last.value : 0;
  renderCounter();
  renderHistory();
}

function updateCounter(prev, op, step) {
  history.push({ value: count, op, step, prev });
  if (history.length > 20) history.shift();
  renderCounter();
  renderHistory();
}

function renderCounter() {
  const el = document.getElementById('cnt');
  el.textContent = count;
  el.style.color = count > 0 ? 'var(--green)' : count < 0 ? 'var(--red)' : 'var(--ink)';
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function renderHistory() {
  const log = document.getElementById('history-log');
  if (history.length === 0) {
    log.innerHTML = '<p class="history-empty">Operations will appear here…</p>';
    return;
  }
  log.innerHTML = [...history].reverse().map((h, i) => {
    let badge, label;
    if (h.op === 'reset') {
      badge = `<span class="history-badge badge-reset">RST</span>`;
      label = `Reset  →  0`;
    } else if (h.op === '+') {
      badge = `<span class="history-badge badge-plus">+${h.step}</span>`;
      label = `${h.prev}  →  ${h.value}`;
    } else {
      badge = `<span class="history-badge badge-minus">−${h.step}</span>`;
      label = `${h.prev}  →  ${h.value}`;
    }
    return `<div class="history-item">${badge}<span>${label}</span></div>`;
  }).join('');
}