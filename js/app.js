/* Echoes of Discovery — Interactive Cosmic Map, Audio Storytelling & Timeline Engine */

const state = {
  view: 'map', // 'map' | 'story'
  activeIndex: 0,
  lastZone: null,
  visitedIds: new Set(),
  mediaMode: 'image', // 'image' | 'video'
  isPlayingIntro: false,
  isNarrating: false,
  isAmbientOn: false,
  isAutoStory: false,
  storyOrderMode: 'journey', // 'journey' (Earth->Moon->Mars->DeepSpace) | 'timeline' (1963->2024)
  autoAdvanceTimer: null,
  transitTimer: null,
  cinemaTimer: null,
  cinemaSlideInterval: null,
  galleryIndex: 0,
  speechFullText: '',
  speechCharOffset: 0,
  speechOnEnd: null,
  a11y: false
};

// Web Audio API nodes
let audioCtx = null;
let osc1 = null;
let osc2 = null;
let gainNode = null;

// Punch lines for Landing Audio Intro
const INTRO_PUNCH_LINES = [
  { text: 'Footprints fade. Batteries die. Signals go dark.', delay: 0 },
  { text: 'Yet across the Moon, Mars, and the void between the stars...', delay: 3200 },
  { text: 'NASA’s silent pioneers are still telling their story.', delay: 6800 }
];

/* ============================================================================
   INITIALIZATION
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initStarfield();
  renderMasterTimeline();
  updatePassportCount();
  setupKeyboardNav();
  startCosmicOdometer();
});

function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const stars = Array.from({ length: 85 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.025 + 0.008
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.phase += s.speed;
      const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase));
      ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function startCosmicOdometer() {
  const pageLoadMs = Date.now();
  const epoch2026Ms = Date.UTC(2026, 0, 1, 0, 0, 0);
  const apollo11Ms = Date.UTC(1969, 6, 20, 20, 17, 0);
  const msPerYear = 365.25 * 24 * 3600 * 1000;

  // Pioneer 10 baseline ~20.824 billion km at Jan 1, 2026, traveling ~11.87 km/s
  const pioneerBaseKm = 20824000000;
  const pioneerSpeedKmS = 11.87;
  const keplerSpeedKmS = 29.5;

  const updateTick = () => {
    const now = Date.now();
    const secSince2026 = (now - epoch2026Ms) / 1000;
    const secSinceLoad = (now - pageLoadMs) / 1000;

    const pioneerTotal = Math.round(pioneerBaseKm + secSince2026 * pioneerSpeedKmS);
    const pioneerSession = (secSinceLoad * pioneerSpeedKmS).toFixed(1);
    const moonDriftCm = (((now - apollo11Ms) / msPerYear) * 3.8).toFixed(6);
    const keplerSession = (secSinceLoad * keplerSpeedKmS).toFixed(1);

    const pDistEl = document.getElementById('odo-pioneer-dist');
    const pSessEl = document.getElementById('odo-pioneer-session');
    const mDriftEl = document.getElementById('odo-moon-drift');
    const kSessEl = document.getElementById('odo-kepler-session');

    if (pDistEl) pDistEl.innerText = `${pioneerTotal.toLocaleString()} km`;
    if (pSessEl) pSessEl.innerText = `+${Number(pioneerSession).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
    if (mDriftEl) mDriftEl.innerText = `${moonDriftCm} cm`;
    if (kSessEl) kSessEl.innerText = `+${Number(keplerSession).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
  };

  updateTick();
  setInterval(updateTick, 100);
}

function initParallax() {
  const bg = document.getElementById('cosmic-bg');
  if (!bg) return;
  window.addEventListener('mousemove', (e) => {
    if (state.view !== 'map') return;
    const x = (e.clientX / window.innerWidth - 0.5) * -14;
    const y = (e.clientY / window.innerHeight - 0.5) * -14;
    bg.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
  });
}

/* ============================================================================
   LANDING AUDIO INTRO & CONTINUOUS STORY EXPEDITION
   ============================================================================ */
function launchExpeditionWithAudio() {
  const overlay = document.getElementById('intro-punch-overlay');
  const lineEl = document.getElementById('intro-punch-text');
  const heroCard = document.getElementById('hero-welcome-card');

  state.isAutoStory = true;
  state.storyOrderMode = 'journey';
  state.isPlayingIntro = true;
  updateAutoStoryUI();
  startAmbientAudio();

  if (heroCard) heroCard.classList.add('opacity-0', 'pointer-events-none');
  if (overlay) overlay.classList.remove('hidden');

  const fullIntro = INTRO_PUNCH_LINES.map(l => l.text).join(' ');
  speakText(fullIntro, () => {
    if (!state.isPlayingIntro) return;
    state.isPlayingIntro = false;
    if (overlay) overlay.classList.add('hidden');
    if (heroCard) heroCard.classList.remove('opacity-0', 'pointer-events-none');

    // Seamlessly transition into Zone-by-Zone Journey: Earth -> Moon -> Mars -> Deep Space
    if (state.isAutoStory) {
      const firstId = JOURNEY_ORDER[0];
      const firstIdx = ARTIFACTS.findIndex(a => a.id === firstId);
      openArtifact(firstIdx !== -1 ? firstIdx : 0);
    }
  });

  // Animate punch lines sequentially
  INTRO_PUNCH_LINES.forEach((item) => {
    setTimeout(() => {
      if (!lineEl || !state.isPlayingIntro) return;
      lineEl.classList.remove('animate-reveal');
      void lineEl.offsetWidth; // trigger reflow
      lineEl.innerText = item.text;
      lineEl.classList.add('animate-reveal');
    }, item.delay);
  });
}

function dismissIntroOverlay() {
  state.isPlayingIntro = false;
  state.isAutoStory = false;
  updateAutoStoryUI();
  stopSpeech();
  document.getElementById('intro-punch-overlay')?.classList.add('hidden');
  document.getElementById('hero-welcome-card')?.classList.remove('opacity-0', 'pointer-events-none');
}

/* ============================================================================
   COSMIC MAP NAVIGATION & ZONE JUMPING
   ============================================================================ */
function openZone(zoneId) {
  const idx = ARTIFACTS.findIndex(a => a.zone === zoneId);
  if (idx !== -1) {
    openArtifact(idx);
  }
}

function openArtifact(index) {
  if (index < 0 || index >= ARTIFACTS.length) return;
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  if (state.transitTimer) {
    clearTimeout(state.transitTimer);
    state.transitTimer = null;
  }
  if (state.cinemaTimer) {
    clearTimeout(state.cinemaTimer);
    state.cinemaTimer = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }
  stopSpeech();

  const artifact = ARTIFACTS[index];
  const zoneChanged = state.lastZone !== artifact.zone;
  state.lastZone = artifact.zone;
  state.view = 'story';
  state.activeIndex = index;
  state.mediaMode = 'image';

  state.visitedIds.add(artifact.id);
  updatePassportCount();

  // Zoom background map
  const bg = document.getElementById('cosmic-bg');
  if (bg) {
    bg.style.transform = '';
    bg.classList.add('zoomed');
  }

  document.getElementById('map-view').classList.add('hidden');
  const storyView = document.getElementById('story-view');
  storyView.classList.remove('hidden');
  storyView.scrollTop = 0;

  renderArtifactStage(artifact);
  highlightMasterTimeline(index);
  updateAutoStoryUI();

  const narrationDelay = zoneChanged ? 1500 : 450;
  if (zoneChanged) {
    showZoneTransitCard(artifact);
    state.cinemaTimer = setTimeout(() => {
      if (state.view === 'story' && state.activeIndex === index) {
        triggerCinemaSpotlight(artifact);
      }
    }, 1250);
  } else {
    triggerCinemaSpotlight(artifact);
  }

  // If Continuous Story Mode is active, narrate this artifact automatically
  if (state.isAutoStory) {
    setTimeout(() => {
      if (state.isAutoStory && state.view === 'story' && state.activeIndex === index) {
        startArtifactNarration(true);
      }
    }, narrationDelay);
  }
}

function triggerCinemaSpotlight(artifact, manual = false) {
  if (!artifact) return;
  const overlay = document.getElementById('cinema-spotlight-overlay');
  const frame = document.getElementById('cinema-spotlight-frame');
  const img = document.getElementById('cinema-spotlight-img');
  const meta = document.getElementById('cinema-spotlight-meta');
  const title = document.getElementById('cinema-spotlight-title');
  const punch = document.getElementById('cinema-spotlight-punch');
  if (!overlay || !frame || !img) return;

  if (state.cinemaTimer) {
    clearTimeout(state.cinemaTimer);
    state.cinemaTimer = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }

  const photos = artifact.gallery && artifact.gallery.length ? artifact.gallery : [artifact.image];
  let slideIdx = 0;

  img.src = photos[0];
  if (meta) meta.innerText = `${artifact.year} • ${artifact.zoneLabel} • PHOTO 1/${photos.length}`;
  if (title) title.innerText = artifact.name;
  if (punch) punch.innerText = `"${artifact.punchLine}"`;

  overlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0', 'scale-105');
    overlay.classList.add('opacity-100', 'scale-100');
    frame.classList.remove('scale-75');
    frame.classList.add('scale-100');
  });

  // Cycle through all original NASA mission photos while in Cinema Spotlight
  if (photos.length > 1) {
    state.cinemaSlideInterval = setInterval(() => {
      slideIdx = (slideIdx + 1) % photos.length;
      img.src = photos[slideIdx];
      if (meta) meta.innerText = `${artifact.year} • ${artifact.zoneLabel} • PHOTO ${slideIdx + 1}/${photos.length}`;
    }, 1800);
  }

  // Hold full-screen NASA photo slideshow, then smoothly shrink back to card size
  if (!manual) {
    const holdMs = photos.length > 1 ? photos.length * 1800 : 4200;
    state.cinemaTimer = setTimeout(() => {
      shrinkCinemaSpotlight();
    }, holdMs);
  }
}

function shrinkCinemaSpotlight() {
  const overlay = document.getElementById('cinema-spotlight-overlay');
  const frame = document.getElementById('cinema-spotlight-frame');
  if (!overlay || !frame) return;

  if (state.cinemaTimer) {
    clearTimeout(state.cinemaTimer);
    state.cinemaTimer = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }

  frame.classList.remove('scale-100');
  frame.classList.add('scale-75');
  overlay.classList.remove('opacity-100', 'scale-100');
  overlay.classList.add('opacity-0');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 650);
}

function showZoneTransitCard(artifact) {
  const overlay = document.getElementById('zone-transit-overlay');
  const titleEl = document.getElementById('transit-dest-title');
  const subEl = document.getElementById('transit-dest-sub');
  if (!overlay || !titleEl || !subEl) return;

  const zoneMeta = ZONES[artifact.zone];
  titleEl.innerText = zoneMeta ? zoneMeta.title.toUpperCase() : artifact.zoneLabel;
  subEl.innerText = `${zoneMeta ? zoneMeta.subtitle.toUpperCase() : ''} • YEAR ${artifact.year}`;

  overlay.classList.remove('hidden', 'opacity-0');
  state.transitTimer = setTimeout(() => {
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
  }, 1150);
}

function returnToMap() {
  stopTimelineAutoplay();
  stopSpeech();
  if (state.transitTimer) {
    clearTimeout(state.transitTimer);
    state.transitTimer = null;
  }
  if (state.cinemaTimer) {
    clearTimeout(state.cinemaTimer);
    state.cinemaTimer = null;
  }
  if (state.cinemaSlideInterval) {
    clearInterval(state.cinemaSlideInterval);
    state.cinemaSlideInterval = null;
  }
  state.isPlayingIntro = false;
  state.view = 'map';
  state.lastZone = null;

  const bg = document.getElementById('cosmic-bg');
  if (bg) bg.classList.remove('zoomed');

  // Stop any playing mission video
  const vidEl = document.getElementById('artifact-video');
  if (vidEl) { vidEl.pause(); vidEl.src = ''; }

  // Ensure all overlays/modals/story views are hidden and landing page is visible
  document.getElementById('cinema-spotlight-overlay')?.classList.add('hidden');
  document.getElementById('zone-transit-overlay')?.classList.add('hidden');
  document.getElementById('intro-punch-overlay')?.classList.add('hidden');
  document.getElementById('passport-modal')?.classList.add('hidden');
  document.getElementById('hero-welcome-card')?.classList.remove('opacity-0', 'pointer-events-none');
  document.getElementById('story-view').classList.add('hidden');
  document.getElementById('map-view').classList.remove('hidden');
}

/* ============================================================================
   RENDER ARTIFACT STORY, MEDIA & LIFECYCLE TIMELINE
   ============================================================================ */
function renderArtifactStage(a) {
  // Header & Badges
  document.getElementById('story-zone-pill').innerText = `${a.year} • ${a.zoneLabel}`;
  const archEl = document.getElementById('story-archetype-pill');
  if (archEl) archEl.innerText = a.archetype || '';
  const statusEl = document.getElementById('story-status-pill');
  statusEl.innerText = a.statusLabel;
  statusEl.className = `font-mono-tech text-[11px] font-bold px-3 py-1 rounded-full border ${a.statusClass}`;

  document.getElementById('story-title').innerText = a.name;
  document.getElementById('story-subtitle').innerText = a.subtitle;
  document.getElementById('story-punchline').innerText = `"${a.punchLine}"`;
  document.getElementById('story-location').innerText = `${a.location} (${a.coords})`;
  document.getElementById('story-nssdca').innerText = a.nssdcaId;

  // Kid-friendly comparisons, problem/trick & takeaway
  const probEl = document.getElementById('story-problem');
  const trickEl = document.getElementById('story-trick');
  const scaleEl = document.getElementById('story-everyday-scale');
  const gravEl = document.getElementById('story-gravity-check');
  const takeEl = document.getElementById('story-takeaway');
  if (probEl) probEl.innerText = a.problem || '';
  if (trickEl) trickEl.innerText = a.trick || '';
  if (scaleEl) scaleEl.innerText = a.everydayScale || '';
  if (gravEl) gravEl.innerText = a.gravityCheck || '';
  if (takeEl) takeEl.innerText = a.takeaway || '';

  // Resource Link
  const resLink = document.getElementById('story-resource-link');
  resLink.href = a.resourceUrl;

  // Live 2026 Telemetry
  document.getElementById('live-metric-label').innerText = a.liveMetricLabel;
  document.getElementById('live-metric-value').innerText = a.liveMetricValue;
  document.getElementById('last-echo-text').innerText = a.lastEcho;

  // Story Paragraphs (keep connected narrative on screen)
  const storyContainer = document.getElementById('story-paragraphs');
  storyContainer.innerHTML = a.story.map((p, i) => `
    <p id="story-p-${i}" class="text-slate-200 text-sm md:text-[15px] leading-relaxed p-1.5 transition-all">${p}</p>
  `).join('');

  // Media Theater (Photo + Video Toggle)
  const videoTabBtn = document.getElementById('media-tab-video');
  if (a.videoUrl) {
    videoTabBtn.classList.remove('hidden');
  } else {
    videoTabBtn.classList.add('hidden');
  }
  switchMediaMode('image');

  // Animated 4-Step Hardware Lifecycle Timeline
  const tlContainer = document.getElementById('artifact-lifecycle-timeline');
  tlContainer.innerHTML = a.timeline.map((step, idx) => `
    <div class="relative pl-6 pb-4 last:pb-0 border-l border-cyan-500/30 animate-reveal" style="animation-delay: ${idx * 120}ms">
      <span class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${idx === a.timeline.length - 1 ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' : 'bg-cyan-400'}"></span>
      <div class="font-mono-tech text-[11px] text-cyan-300 font-bold">${step.date} — <span class="text-white">${step.title}</span></div>
      <div class="text-xs text-slate-400 mt-0.5">${step.detail}</div>
    </div>
  `).join('');

  // Interactive Hardware Micro-Experiment
  renderExperimentWidget(a);

  // Reset to Problem & Clever Trick tab & set Curiosity Cliffhanger
  switchStoryTab('trick');
  const cliffEl = document.getElementById('cliffhanger-text');
  if (cliffEl) cliffEl.innerText = a.cliffhanger || 'Continue the expedition';

  // Zone Sibling Pills (quick switch within same planet or prev/next)
  document.getElementById('prev-artifact-btn').disabled = (state.activeIndex === 0);
  document.getElementById('next-artifact-btn').disabled = (state.activeIndex === ARTIFACTS.length - 1);
  document.getElementById('story-counter').innerText = `${state.activeIndex + 1} / ${ARTIFACTS.length}`;
}

function switchStoryTab(tabName) {
  ['trick', 'scale', 'timeline'].forEach(t => {
    const panel = document.getElementById(`tab-panel-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (!panel || !btn) return;
    if (t === tabName) {
      panel.classList.remove('hidden');
      btn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400 transition';
    } else {
      panel.classList.add('hidden');
      btn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs font-bold bg-slate-900 text-slate-400 border border-slate-700 hover:text-white transition';
    }
  });
}

function goNextWithCliffhanger() {
  const nextIdx = getNextStoryIndex(state.activeIndex);
  if (nextIdx !== -1) {
    openArtifact(nextIdx);
  } else if (state.activeIndex + 1 < ARTIFACTS.length) {
    openArtifact(state.activeIndex + 1);
  } else {
    togglePassportModal();
  }
}

function switchMediaMode(mode) {
  state.mediaMode = mode;
  const a = ARTIFACTS[state.activeIndex];
  const imgWrap = document.getElementById('media-image-wrap');
  const vidWrap = document.getElementById('media-video-wrap');
  const photoBtn = document.getElementById('media-tab-photo');
  const videoBtn = document.getElementById('media-tab-video');

  if (mode === 'video' && a.videoUrl) {
    imgWrap.classList.add('hidden');
    vidWrap.classList.remove('hidden');
    const vidEl = document.getElementById('artifact-video');
    vidEl.src = a.videoUrl;
    photoBtn.className = 'px-3 py-1 rounded text-xs font-mono-tech bg-slate-900 text-slate-400 border border-slate-700 hover:text-white';
    videoBtn.className = 'px-3 py-1 rounded text-xs font-mono-tech bg-cyan-500/20 text-cyan-300 border border-cyan-400';
  } else {
    vidWrap.classList.add('hidden');
    const vidEl = document.getElementById('artifact-video');
    if (vidEl) { vidEl.pause(); vidEl.src = ''; }
    imgWrap.classList.remove('hidden');
    state.galleryIndex = 0;
    setGalleryPhoto(0);
    photoBtn.className = 'px-3 py-1 rounded text-xs font-mono-tech bg-cyan-500/20 text-cyan-300 border border-cyan-400';
    if (videoBtn && a.videoUrl) {
      videoBtn.className = 'px-3 py-1 rounded text-xs font-mono-tech bg-slate-900 text-slate-400 border border-slate-700 hover:text-white';
    }
  }
}

function setGalleryPhoto(idx) {
  const a = ARTIFACTS[state.activeIndex];
  if (!a) return;
  const photos = a.gallery && a.gallery.length ? a.gallery : [a.image];
  state.galleryIndex = Math.max(0, Math.min(idx, photos.length - 1));

  const imgEl = document.getElementById('artifact-image');
  if (imgEl) imgEl.src = photos[state.galleryIndex];

  const capEl = document.getElementById('artifact-image-caption');
  if (capEl) capEl.innerText = `${a.imageCaption} (Photo ${state.galleryIndex + 1}/${photos.length} • NASA ID: ${a.nasaId})`;

  const dotsEl = document.getElementById('media-gallery-dots');
  if (dotsEl) {
    dotsEl.innerHTML = photos.map((_, i) => `
      <button onclick="setGalleryPhoto(${i})" title="Photo ${i + 1}"
        class="w-2.5 h-2.5 rounded-full transition ${i === state.galleryIndex ? 'bg-cyan-400 scale-110' : 'bg-slate-500 hover:bg-slate-300'}"></button>
    `).join('');
  }
}

/* ============================================================================
   INTERACTIVE HARDWARE EXPERIMENT WIDGET
   ============================================================================ */
function renderExperimentWidget(a) {
  const box = document.getElementById('experiment-widget-box');
  const exp = a.experiment;
  if (!exp || !box) return;

  if (exp.type === 'slider') {
    box.innerHTML = `
      <div class="flex justify-between items-center text-xs font-mono-tech mb-1.5">
        <span class="text-amber-300 font-bold">${exp.label}</span>
        <span id="exp-slider-val" class="text-cyan-300 font-bold">${exp.value} ${exp.unit}</span>
      </div>
      <input type="range" min="${exp.min}" max="${exp.max}" value="${exp.value}"
        class="w-full accent-cyan-400 cursor-pointer"
        oninput="handleExpSlider('${a.id}', this.value, '${exp.unit}')">
      <div class="mt-2 h-2.5 w-full rounded-full bg-slate-950 border border-white/10 overflow-hidden">
        <div id="exp-visual-bar" class="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-200" style="width: ${Math.round(((exp.value - exp.min) / (exp.max - exp.min)) * 100)}%"></div>
      </div>
      <div id="exp-feedback" class="text-[11px] font-mono-tech text-slate-300 mt-1.5">Drag slider to test live hardware telemetry.</div>
    `;
  } else {
    box.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="text-xs font-mono-tech text-amber-300 font-bold">${exp.label}</div>
          <div id="exp-feedback" class="text-[11px] font-mono-tech text-slate-300 mt-0.5">Ready for command</div>
        </div>
        <button onclick="handleExpButton('${a.id}')" class="shrink-0 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-tech text-xs font-bold transition shadow-[0_0_15px_rgba(56,189,248,0.35)]">
          ${exp.actionText}
        </button>
      </div>
      <div class="mt-2.5 h-2.5 w-full rounded-full bg-slate-950 border border-white/10 overflow-hidden">
        <div id="exp-visual-bar" class="h-full w-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 transition-all duration-700"></div>
      </div>
    `;
  }
}

function handleExpSlider(id, val, unit) {
  const a = ARTIFACTS.find(x => x.id === id);
  const valEl = document.getElementById('exp-slider-val');
  const fb = document.getElementById('exp-feedback');
  const bar = document.getElementById('exp-visual-bar');
  if (valEl) valEl.innerText = `${val} ${unit}`;
  if (bar && a?.experiment) {
    const pct = Math.max(4, Math.round(((val - a.experiment.min) / (a.experiment.max - a.experiment.min)) * 100));
    bar.style.width = `${pct}%`;
  }
  if (!fb) return;

  if (id === 'ingenuity') {
    fb.innerText = val >= 2400
      ? 'LIFT ACHIEVED! Spinning fast enough to fly in 1% Mars air.'
      : 'Spinning up... needs ~2,537 RPM to lift off on Mars.';
    fb.className = `text-[11px] font-mono-tech mt-1.5 ${val >= 2400 ? 'text-emerald-400' : 'text-amber-300'}`;
  } else if (id === 'pioneer') {
    const watts = Math.max(25, Math.round(155 * Math.pow(0.978, val - 1972)));
    fb.innerText = `SNAP-19 Output in ${val}: ~${watts} Watts (${watts < 65 ? 'Below transmitter threshold' : 'Transmitter active'})`;
    fb.className = 'text-[11px] font-mono-tech text-violet-300 mt-1.5';
  } else if (id === 'dawn') {
    fb.innerText = `Xenon Ion Exhaust: ${Math.round(val * 0.3)} km/s — 10x more efficient than chemical rockets.`;
    fb.className = 'text-[11px] font-mono-tech text-cyan-300 mt-1.5';
  } else {
    fb.innerText = `Carrier tuned to ${val} ${unit} — Deep Space Link locked.`;
    fb.className = 'text-[11px] font-mono-tech text-emerald-400 mt-1.5';
  }
}

function handleExpButton(id) {
  const a = ARTIFACTS.find(x => x.id === id);
  const fb = document.getElementById('exp-feedback');
  const bar = document.getElementById('exp-visual-bar');
  if (!a || !fb) return;

  if (bar) {
    bar.style.width = '0%';
    void bar.offsetWidth;
    bar.style.width = '100%';
  }

  if (a.experiment.type === 'laser') {
    fb.innerText = 'Firing 532 nm green pulse to Moon... (2.56s round trip)';
    fb.className = 'text-[11px] font-mono-tech text-amber-300 mt-0.5';
    setTimeout(() => {
      fb.innerText = a.experiment.resultText;
      fb.className = 'text-[11px] font-mono-tech text-emerald-400 mt-0.5';
    }, 1100);
  } else {
    fb.innerText = a.experiment.resultText;
    fb.className = 'text-[11px] font-mono-tech text-emerald-400 mt-0.5';
  }
}

/* ============================================================================
   MASTER CHRONOLOGICAL TIMELINE (1963 -> 2024)
   ============================================================================ */
function renderMasterTimeline() {
  const track = document.getElementById('master-timeline-track');
  if (!track) return;

  track.innerHTML = ARTIFACTS.map((a, idx) => `
    <button onclick="openArtifact(${idx})" id="tl-node-${idx}"
      class="timeline-node group flex flex-col items-center min-w-[78px] px-1.5 py-1 rounded hover:bg-white/5 transition text-center">
      <span class="font-mono-tech text-[10px] font-bold text-cyan-300 group-hover:text-white">${a.year}</span>
      <span class="node-dot w-2.5 h-2.5 rounded-full my-1 transition-transform ${
        a.zone === 'moon' ? 'bg-slate-200 text-slate-200' :
        a.zone === 'mars' ? 'bg-amber-400 text-amber-400' :
        a.zone === 'deepspace' ? 'bg-violet-400 text-violet-400' :
        'bg-cyan-400 text-cyan-400'
      }"></span>
      <span class="text-[10px] text-slate-400 group-hover:text-slate-200 truncate max-w-[76px]">${a.name.split(' ')[0]}</span>
    </button>
  `).join('');
}

function highlightMasterTimeline(index) {
  document.querySelectorAll('.timeline-node').forEach((el, i) => {
    if (i === index) {
      el.classList.add('active', 'bg-cyan-500/15');
    } else {
      el.classList.remove('active', 'bg-cyan-500/15');
    }
  });
  const activeNode = document.getElementById(`tl-node-${index}`);
  activeNode?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function toggleTimelineAutoplay() {
  if (state.isAutoStory) {
    stopTimelineAutoplay();
    stopSpeech();
  } else {
    state.isAutoStory = true;
    state.storyOrderMode = 'timeline';
    updateAutoStoryUI();
    startAmbientAudio();
    const startIdx = state.view === 'story' ? state.activeIndex : 0;
    openArtifact(startIdx);
  }
}

function getNextStoryIndex(currentIdx) {
  if (state.storyOrderMode === 'journey' && typeof JOURNEY_ORDER !== 'undefined') {
    const curId = ARTIFACTS[currentIdx]?.id;
    const jPos = JOURNEY_ORDER.indexOf(curId);
    if (jPos !== -1 && jPos + 1 < JOURNEY_ORDER.length) {
      const nextId = JOURNEY_ORDER[jPos + 1];
      return ARTIFACTS.findIndex(a => a.id === nextId);
    }
    return -1;
  }
  return currentIdx + 1 < ARTIFACTS.length ? currentIdx + 1 : -1;
}

function stopTimelineAutoplay() {
  state.isAutoStory = false;
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  updateAutoStoryUI();
}

function updateAutoStoryUI() {
  const mapBtn = document.getElementById('tl-play-label');
  if (mapBtn) mapBtn.innerText = state.isAutoStory ? 'PAUSE STORY' : 'PLAY TIMELINE';

  const storyAutoBtn = document.getElementById('story-auto-btn');
  const storyAutoLbl = document.getElementById('story-auto-label');
  if (storyAutoBtn && storyAutoLbl) {
    storyAutoLbl.innerText = state.isAutoStory ? '⏸ PAUSE STORY' : '▶ AUTO-PLAY STORY';
    storyAutoBtn.classList.toggle('bg-amber-500/25', state.isAutoStory);
    storyAutoBtn.classList.toggle('border-amber-400', state.isAutoStory);
    storyAutoBtn.classList.toggle('text-amber-200', state.isAutoStory);
  }
}

/* ============================================================================
   SPEECH SYNTHESIS & AMBIENT SPACE AUDIO
   ============================================================================ */
function toggleArtifactNarration() {
  if (state.isNarrating) {
    stopTimelineAutoplay();
    stopSpeech();
  } else {
    startArtifactNarration(false);
  }
}

function startArtifactNarration(autoAdvance = false) {
  const a = ARTIFACTS[state.activeIndex];
  if (!a) return;

  // Build structured 5-part audio narration: Name, Purpose, Parts, Science, Present & Future
  const brief = a.audioBrief || {};
  const punchSection = `${a.name}, ${a.year}. ${a.punchLine}`;
  const part0 = brief.purpose || a.story[0] || '';
  const part1 = brief.parts || a.story[1] || '';
  const part2 = brief.science || a.story[2] || '';
  const part3 = brief.presentFuture || a.lastEcho || '';

  const text = `${punchSection} ${part0} ${part1} ${part2} ${part3}`;
  state.isNarrating = true;
  updateNarrateBtn(true);

  const prefixLen = punchSection.length + 1;
  const p0End = prefixLen + part0.length + 1;
  const p1End = p0End + part1.length + 1;
  const p2End = p1End + part2.length + 1;

  const punchBox = document.getElementById('story-punchline')?.parentElement;
  if (punchBox) punchBox.classList.add('ring-2', 'ring-cyan-400');

  speakText(text, () => {
    state.isNarrating = false;
    updateNarrateBtn(false);
    clearSpokenHighlights();
    if (punchBox) punchBox.classList.remove('ring-2', 'ring-cyan-400');

    // Continuous Story Mode: advance automatically via Journey Order (Earth->Moon->Mars->DeepSpace) or Timeline
    if (autoAdvance && state.isAutoStory && state.view === 'story') {
      const nextIdx = getNextStoryIndex(state.activeIndex);
      if (nextIdx !== -1) {
        state.autoAdvanceTimer = setTimeout(() => {
          if (state.isAutoStory && state.view === 'story') {
            openArtifact(nextIdx);
          }
        }, 1200);
      } else {
        // Reached the end of the expedition!
        stopTimelineAutoplay();
        speakText('Our expedition from Earth to the Moon, Mars, and deep space is complete. Explore your Mission Passport to review every pioneer we visited.', () => {
          togglePassportModal();
        });
      }
    }
  }, (charIndex) => {
    clearSpokenHighlights();
    if (charIndex < prefixLen) {
      if (punchBox) punchBox.classList.add('ring-2', 'ring-cyan-400');
    } else {
      if (punchBox) punchBox.classList.remove('ring-2', 'ring-cyan-400');
    }
  });
}

function speakText(text, onEnd, onBoundaryChar, startOffset = 0) {
  if (!('speechSynthesis' in window)) return;
  state.speechSkipping = true;
  window.speechSynthesis.cancel();
  state.speechSkipping = false;

  state.speechFullText = text;
  state.speechCharOffset = startOffset;
  state.speechOnEnd = onEnd;
  state.speechOnBoundary = onBoundaryChar;

  const slice = text.slice(startOffset);
  if (!slice.trim()) {
    if (onEnd) onEnd();
    return;
  }

  const utt = new SpeechSynthesisUtterance(slice);
  utt.rate = 0.96;
  utt.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Aria')));
  if (preferred) utt.voice = preferred;

  utt.onboundary = (e) => {
    if (e.name === 'word' || e.name === 'sentence') {
      const absIdx = startOffset + e.charIndex;
      state.speechCharOffset = absIdx;
      if (onBoundaryChar) onBoundaryChar(absIdx);
    }
  };
  utt.onend = () => {
    if (state.speechSkipping) return;
    if (onEnd) onEnd();
  };
  utt.onerror = () => {
    if (state.speechSkipping) return;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utt);
}

function skipForwardSeconds(seconds = 5) {
  // 1. If mission video is playing, seek forward by seconds
  const vidEl = document.getElementById('artifact-video');
  if (state.mediaMode === 'video' && vidEl && !vidEl.paused && vidEl.duration) {
    vidEl.currentTime = Math.min(vidEl.duration, vidEl.currentTime + seconds);
    return true;
  }

  // 2. If speech narration is active, jump forward ~15 chars/sec (~75 chars for 5s) to next word boundary
  if (state.isNarrating && state.speechFullText) {
    const jumpChars = Math.round(seconds * 15);
    let nextPos = state.speechCharOffset + jumpChars;
    if (nextPos >= state.speechFullText.length - 10) {
      // Near end: finish current narration cleanly
      state.speechSkipping = true;
      window.speechSynthesis.cancel();
      state.speechSkipping = false;
      if (state.speechOnEnd) state.speechOnEnd();
      return true;
    }
    const spacePos = state.speechFullText.indexOf(' ', nextPos);
    if (spacePos !== -1 && spacePos < nextPos + 20) {
      nextPos = spacePos + 1;
    }
    speakText(state.speechFullText, state.speechOnEnd, state.speechOnBoundary, nextPos);
    return true;
  }
  return false;
}

function stopSpeech() {
  state.speechSkipping = true;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  state.speechSkipping = false;
  state.isNarrating = false;
  state.speechFullText = '';
  state.speechCharOffset = 0;
  updateNarrateBtn(false);
  clearSpokenHighlights();
}

function updateNarrateBtn(active) {
  const btn = document.getElementById('narrate-btn');
  const lbl = document.getElementById('narrate-label');
  if (!btn || !lbl) return;
  lbl.innerText = active ? 'STOP AUDIO' : 'LISTEN TO STORY';
  btn.classList.toggle('bg-cyan-500/30', active);
}

function clearSpokenHighlights() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`story-p-${i}`)?.classList.remove('spoken-active');
  }
}

function toggleAmbientAudio() {
  if (state.isAmbientOn) stopAmbientAudio();
  else startAmbientAudio();
}

function startAmbientAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (state.isAmbientOn) return;

    osc1 = audioCtx.createOscillator();
    osc2 = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(82.4, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc1.start();
    osc2.start();

    state.isAmbientOn = true;
    const lbl = document.getElementById('ambient-btn-label');
    if (lbl) lbl.innerText = 'SPACE AUDIO ON';
  } catch (e) {
    console.warn('Web Audio unavailable:', e);
  }
}

function stopAmbientAudio() {
  try { osc1?.stop(); osc2?.stop(); } catch (e) {}
  state.isAmbientOn = false;
  const lbl = document.getElementById('ambient-btn-label');
  if (lbl) lbl.innerText = 'SPACE AUDIO OFF';
}

/* ============================================================================
   EXPLORER'S PASSPORT & ACCESSIBILITY
   ============================================================================ */
function updatePassportCount() {
  const count = state.visitedIds.size;
  const el = document.getElementById('passport-count');
  if (el) el.innerText = `${count}/${ARTIFACTS.length}`;

  const rankEl = document.getElementById('explorer-rank-label');
  if (rankEl) {
    let rank = 'SPACE CADET';
    if (count >= ARTIFACTS.length) rank = 'MASTER PIONEER ★';
    else if (count >= 12) rank = 'DEEP SPACE CAPTAIN';
    else if (count >= 8) rank = 'MARS GEOLOGIST';
    else if (count >= 4) rank = 'LUNAR SCOUT';
    rankEl.innerText = rank;
  }
}

function togglePassportModal() {
  const modal = document.getElementById('passport-modal');
  if (!modal) return;
  const isHidden = modal.classList.contains('hidden');
  if (isHidden) {
    renderPassportGrid();
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function renderPassportGrid() {
  const grid = document.getElementById('passport-grid');
  if (!grid) return;

  grid.innerHTML = ARTIFACTS.map((a, idx) => {
    const visited = state.visitedIds.has(a.id);
    return `
      <button onclick="togglePassportModal(); openArtifact(${idx});"
        class="text-left p-3 rounded-xl border transition flex items-center gap-3 ${
          visited
            ? 'bg-cyan-950/50 border-cyan-400/50 hover:bg-cyan-900/50'
            : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
        }">
        <img src="${a.image}" alt="${a.name}" class="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0">
        <div class="min-w-0 flex-1">
          <div class="font-mono-tech text-[10px] ${visited ? 'text-emerald-400' : 'text-slate-500'} font-bold">
            ${visited ? '✓ STAMPED' : 'UNVISITED'} • ${a.year}
          </div>
          <div class="text-xs font-bold text-white truncate">${a.name}</div>
          <div class="text-[10px] text-slate-400 truncate">${a.zoneLabel}</div>
        </div>
      </button>
    `;
  }).join('');
}

function toggleA11y() {
  state.a11y = !state.a11y;
  document.body.classList.toggle('a11y-mode', state.a11y);
}

function setupKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    if (state.view !== 'story') return;
    if (e.key === 'ArrowRight') {
      if (!e.shiftKey && skipForwardSeconds(5)) {
        e.preventDefault();
        return;
      }
      openArtifact(state.activeIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      const vidEl = document.getElementById('artifact-video');
      if (!e.shiftKey && state.mediaMode === 'video' && vidEl && !vidEl.paused && vidEl.duration) {
        e.preventDefault();
        vidEl.currentTime = Math.max(0, vidEl.currentTime - 5);
        return;
      }
      openArtifact(state.activeIndex - 1);
    } else if (e.key === 'Escape') {
      returnToMap();
    }
  });
}
