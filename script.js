/* ══════════════════════════════
   1. BACKGROUND COLOR CHANGER
══════════════════════════════ */
const presetColors = [
  { bg: '#1a0533', label: 'purple' },
  { bg: '#03301c', label: 'green'  },
  { bg: '#002b4d', label: 'blue'   },
  { bg: '#3d1a00', label: 'amber'  },
  { bg: '#3d0014', label: 'rose'   },
  { bg: '#1a1a1a', label: 'dark'   },
];

const swatchContainer = document.getElementById('swatches');
const bgCard = document.getElementById('bg-card');
let activeSwatch = null;

presetColors.forEach((c, i) => {
  const s = document.createElement('div');
  s.className = 'swatch';
  s.style.background = c.bg;
  s.title = c.label;
  s.onclick = () => {
    bgCard.style.background = c.bg;
    if (activeSwatch) activeSwatch.classList.remove('active');
    s.classList.add('active');
    activeSwatch = s;
  };
  swatchContainer.appendChild(s);
});

function randomBg() {
  const r = () => Math.floor(Math.random() * 156);
  const color = `rgb(${r()},${r()},${r()})`;
  bgCard.style.background = color;
  if (activeSwatch) { activeSwatch.classList.remove('active'); activeSwatch = null; }
}


/* ══════════════════════════════
   2. LIVE TEXT PREVIEW
══════════════════════════════ */
function updateLive() {
  const val = document.getElementById('live-input').value;
  const out  = document.getElementById('live-out');
  const cc   = document.getElementById('char-count');
  out.textContent = val || 'Your text will appear here…';
  out.style.color = val ? '#f1f1f1' : '#444';
  out.style.borderColor = val ? '#444' : '#2a2a2a';
  cc.textContent = val.length + ' character' + (val.length !== 1 ? 's' : '');
}


/* ══════════════════════════════
   3. SHOW / HIDE PASSWORD
══════════════════════════════ */
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
  inp.type   = show ? 'text' : 'password';
  icon.innerHTML = show ? eyeClosed : eyeOpen;
}

function checkStrength() {
  const pw   = document.getElementById('pw-input').value;
  const fill = document.getElementById('strength-fill');
  const lbl  = document.getElementById('strength-label');
  let score  = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { w:'0%',   bg:'transparent', t:'Enter a password' },
    { w:'20%',  bg:'#e74c3c',     t:'Very weak' },
    { w:'40%',  bg:'#e67e22',     t:'Weak' },
    { w:'60%',  bg:'#f1c40f',     t:'Fair' },
    { w:'80%',  bg:'#2ecc71',     t:'Strong' },
    { w:'100%', bg:'#27ae60',     t:'Very strong' },
  ];
  const l = levels[Math.min(score, 5)];
  fill.style.width = l.w;
  fill.style.background = l.bg;
  lbl.textContent = l.t;
  lbl.style.color = l.bg === 'transparent' ? '#555' : l.bg;
}


/* ══════════════════════════════
   4. IMAGE SLIDER
══════════════════════════════ */
const slides_data = [
  { img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', label:'Lamborghini Huracán', tag:'Italian Supercar' },
  { img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', label:'Porsche 911',         tag:'German Legend' },
  { img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', label:'Ferrari',              tag:'Italian Stallion' },
  { img:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', label:'BMW M Series',       tag:'Ultimate Machine' },
  { img:'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80', label:'Mercedes-Benz',      tag:'German Luxury' },
];

let curSlide = 0;
const track = document.getElementById('slider-track');
const dotsEl = document.getElementById('dots');

slides_data.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'slide' + (i === 0 ? ' active' : '');
  el.style.backgroundImage = `url('${s.img}')`;
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = 'center';
  el.innerHTML = `<div class="slide-caption"><span class="slide-tag">${s.tag}</span><span class="slide-name">${s.label}</span></div>`;
  track.appendChild(el);

  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
});

function goTo(n) {
  const allSlides = track.querySelectorAll('.slide');
  const allDots   = dotsEl.querySelectorAll('.dot');
  allSlides[curSlide].classList.remove('active');
  allDots[curSlide].classList.remove('active');
  curSlide = (n + slides_data.length) % slides_data.length;
  allSlides[curSlide].classList.add('active');
  allDots[curSlide].classList.add('active');
}

function moveSlide(d) { goTo(curSlide + d); }

// Auto-play
setInterval(() => moveSlide(1), 3000);


/* ══════════════════════════════
   5. COUNTER
══════════════════════════════ */
let count = 0;

function adjust(dir) {
  const step = parseInt(document.getElementById('step').value) || 1;
  count += dir * step;
  const el = document.getElementById('cnt');
  el.textContent = count;
  el.style.color = count > 0 ? '#4ade80' : count < 0 ? '#f87171' : '#f1f1f1';
  el.classList.remove('pop');
  void el.offsetWidth; // reflow to re-trigger animation
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 150);
}

function resetCounter() {
  count = 0;
  const el = document.getElementById('cnt');
  el.textContent = '0';
  el.style.color = '#f1f1f1';
}