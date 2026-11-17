(() => {
  const {
    SITE_CONFIG,
    DAILY_DROPS,
    BIRTHDAY_HOME,
    ABOUT_DECK,
    DAILY_QUOTES,
    MOOD_JARS,
  } = window.AWEB_CONTENT;

  function safeGetStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeSetStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }

const UNLOCK_MS = Date.parse(SITE_CONFIG.unlockIso);
const JAR_STORAGE_KEY = 'aqeelah_daily_jar_v1';
const BOARDING_STORAGE_KEY = 'aqeelah_boarding_checked_v1';
const WORDLE_STORAGE_KEY = 'aqeelah_wordle_v1';

const state = {
  previewMode: null,
  countdownTimer: null,
  unlockedRendered: false,
  activeView: 'home',
  activeSubtab: 'letter',
  deckOrder: ABOUT_DECK.map((_, idx) => idx),
  deckIndex: 0,
  cardFlipped: false,
};

// =========================================================
// TIMEZONE & DATE HELPERS (SAST / Africa/Johannesburg)
// =========================================================
function getNowMs() {
  if (state.previewMode && state.previewMode !== 'unlocked' && state.previewMode !== 'live') {
    return Date.parse(`${state.previewMode}T12:00:00+02:00`);
  }
  return Date.now();
}

function getSastDateKey(ms = getNowMs()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE_CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(ms));
}

function getSastReadableDate(ms = getNowMs()) {
  return new Intl.DateTimeFormat('en-ZA', {
    timeZone: SITE_CONFIG.timezone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(ms));
}

function getSastDayIndex(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

// =========================================================
// PREVIEW BAR (ONLY WHEN ?preview OR ?day IS IN URL)
// =========================================================
function initPreviewControls() {
  const params = new URLSearchParams(window.location.search);
  const previewParam = params.get('preview');
  const dayParam = params.get('day');
  const initial = dayParam || previewParam;

  if (!initial) return;

  const bar = document.getElementById('preview-bar');
  bar.hidden = false;

  if (initial === '1' || initial === 'true') {
    state.previewMode = 'live';
  } else {
    state.previewMode = initial;
  }

  const chips = bar.querySelectorAll('.preview-chip');
  const syncActiveChip = () => {
    chips.forEach((chip) => {
      const mode = chip.dataset.previewMode;
      chip.classList.toggle('is-active', mode === (state.previewMode || 'live'));
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const mode = chip.dataset.previewMode;
      state.previewMode = mode === 'live' ? null : mode;
      syncActiveChip();
      evaluateGate();
    });
  });

  syncActiveChip();
}

// =========================================================
// PHASE GATE & COUNTDOWN
// =========================================================
function evaluateGate() {
  const isUnlocked =
    state.previewMode === 'unlocked' || getNowMs() >= UNLOCK_MS;

  if (isUnlocked) {
    showUnlockedSite(false);
  } else {
    showCountdownView();
  }
}

function showCountdownView() {
  document.getElementById('countdown-view').hidden = false;
  document.getElementById('birthday-site').hidden = true;
  document.title = `Something for ${SITE_CONFIG.recipientName} | Countdown`;

  renderDailyDrops();
  updateCountdownClock();

  if (state.countdownTimer) clearInterval(state.countdownTimer);
  state.countdownTimer = setInterval(() => {
    const remaining = UNLOCK_MS - getNowMs();
    if (remaining <= 0 && state.previewMode !== 'unlocked') {
      clearInterval(state.countdownTimer);
      state.countdownTimer = null;
      showUnlockedSite(true);
      return;
    }
    updateCountdownClock();
  }, 1000);
}

function updateCountdownClock() {
  const remaining = Math.max(0, UNLOCK_MS - getNowMs());
  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

function renderDailyDrops() {
  const listEl = document.getElementById('drops-list');
  const todayKey = getSastDateKey();
  listEl.innerHTML = '';

  DAILY_DROPS.forEach((drop) => {
    const isOpen = drop.date <= todayKey;
    const isToday = drop.date === todayKey;

    const card = document.createElement('article');
    card.className = `drop-card${isOpen ? '' : ' drop-card--locked'}`;

    const top = document.createElement('div');
    top.className = 'drop-card__top';

    const meta = document.createElement('div');
    meta.className = 'drop-card__meta';

    const dayPill = document.createElement('span');
    dayPill.className = `pill${isToday ? '' : ' pill--champagne'}`;
    dayPill.textContent = `Day ${drop.dayNumber} \u00B7 ${drop.badge}`;
    meta.appendChild(dayPill);

    const statusBadge = document.createElement('span');
    statusBadge.className = 'chart-code';
    statusBadge.textContent = isOpen ? (isToday ? 'Unlocked Today' : 'Unlocked') : `Opens ${drop.badge}`;
    top.append(meta, statusBadge);

    const title = document.createElement('h3');
    title.className = 'drop-card__title';
    title.textContent = isOpen ? drop.title : `Locked Surprise (${drop.badge})`;

    const teaser = document.createElement('p');
    teaser.className = 'drop-card__teaser';
    teaser.textContent = isOpen
      ? drop.teaser
      : 'Check back on this date for your next countdown unlock.';

    card.append(top, title, teaser);

    if (isOpen) {
      if (drop.type === 'boarding-pass') {
        card.appendChild(buildBoardingPass(drop));
      } else {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'btn btn--secondary';
        toggleBtn.style.marginTop = '14px';
        const expandedByDefault = isToday;
        toggleBtn.setAttribute('aria-expanded', String(expandedByDefault));
        toggleBtn.textContent = expandedByDefault ? 'Hide Note' : 'Read Note';

        const body = document.createElement('div');
        body.className = 'drop-card__body';
        body.hidden = !expandedByDefault;

        const p = document.createElement('p');
        p.textContent = drop.body;
        body.appendChild(p);
        if (drop.signOff) {
          const sign = document.createElement('p');
          sign.className = 'drop-card__signoff';
          sign.textContent = `With love, ${drop.signOff}`;
          body.appendChild(sign);
        }

        toggleBtn.addEventListener('click', () => {
          const next = body.hidden;
          body.hidden = !next;
          toggleBtn.setAttribute('aria-expanded', String(next));
          toggleBtn.textContent = next ? 'Hide Note' : 'Read Note';
        });

        card.append(toggleBtn, body);
      }
    }

    listEl.appendChild(card);
  });
}

function buildBoardingPass(drop) {
  const { trip } = SITE_CONFIG;
  const stage = document.createElement('div');
  stage.className = 'boarding-pass-stage';

  const wasChecked = safeGetStorage(BOARDING_STORAGE_KEY) === 'true';

  const pass = document.createElement('div');
  pass.className = `boarding-pass${wasChecked ? ' is-flipped' : ''}`;

  const front = document.createElement('div');
  front.className = 'boarding-pass__face boarding-pass__front';
  front.innerHTML = `
    <div class="bp-header">
      <span class="bp-airline">Rio &amp; Aqeelah Air</span>
      <span class="bp-code">Flight ${trip.flightCode} &middot; Priority</span>
    </div>
    <div class="bp-body">
      <div class="bp-route">
        <div class="bp-airport">
          <strong>${trip.fromCode}</strong>
          <span>${trip.fromCity}</span>
        </div>
        <div class="bp-line">
          <span class="bp-distance-tag">~${trip.distanceKm.toLocaleString('en-ZA')} km</span>
        </div>
        <div class="bp-airport">
          <strong>${trip.toCode}</strong>
          <span>${trip.toCity}</span>
        </div>
      </div>
      <div class="bp-details">
        <div class="bp-field"><span>Passenger</span><strong>${SITE_CONFIG.recipientTitle}</strong></div>
        <div class="bp-field"><span>Arrival</span><strong>${trip.arrivalLabel}</strong></div>
        <div class="bp-field"><span>Seat</span><strong>${trip.seat}</strong></div>
        <div class="bp-field"><span>Status</span><strong>Girlfriend En Route</strong></div>
      </div>
      <div class="bp-footer">
        <span class="bp-stamp">${wasChecked ? 'Confirmed: Girlfriend En Route' : 'Ready for Check-In'}</span>
        <button type="button" class="btn btn--primary" data-action="check-in">
          ${wasChecked ? 'View Flight Card' : 'Check In Now'}
        </button>
      </div>
    </div>
  `;

  const back = document.createElement('div');
  back.className = 'boarding-pass__face boarding-pass__back';
  back.innerHTML = `
    <div>
      <div class="bp-footer" style="margin-bottom: 10px;">
        <span class="pill">Checked In</span>
        <span class="bp-stamp" style="border-color: var(--accent-rose-light); color: var(--accent-rose-light);">
          Confirmed: Girlfriend En Route
        </span>
      </div>
      <div class="bp-flight-anim" aria-hidden="true">
        <div class="bp-flight-anim__ports">
          <span>${trip.fromCode} (${trip.fromCity})</span>
          <span>${trip.toCode} (${trip.toCity})</span>
        </div>
        <div class="bp-flight-anim__track">
          <span class="bp-flight-anim__plane">&#9992;</span>
        </div>
      </div>
      <p class="bp-back-note">${drop.body}</p>
    </div>
    <div class="bp-footer" style="margin-top: 16px;">
      <span class="drop-card__signoff" style="color: var(--accent-rose-light);">With love, ${drop.signOff}</span>
      <button type="button" class="btn btn--secondary" data-action="flip-front">Flip Ticket Back</button>
    </div>
  `;

  pass.append(front, back);
  stage.appendChild(pass);

  front.querySelector('[data-action="check-in"]').addEventListener('click', () => {
    safeSetStorage(BOARDING_STORAGE_KEY, 'true');
    front.querySelector('.bp-stamp').textContent = 'Confirmed: Girlfriend En Route';
    front.querySelector('[data-action="check-in"]').textContent = 'View Flight Card';
    pass.classList.add('is-flipped');
  });

  back.querySelector('[data-action="flip-front"]').addEventListener('click', () => {
    pass.classList.remove('is-flipped');
  });

  return stage;
}

function triggerPetals() {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const layer = document.getElementById('petal-layer');
  layer.innerHTML = '';

  const colours = ['#E4B5BC', '#C87D87', '#EFE5DE', '#F5E6E8'];
  for (let i = 0; i < 24; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.backgroundColor = colours[i % colours.length];
    petal.style.setProperty('--fall-dur', `${3 + Math.random() * 2.5}s`);
    petal.style.animationDelay = `${Math.random() * 0.9}s`;
    layer.appendChild(petal);
  }

  setTimeout(() => {
    layer.innerHTML = '';
  }, 6200);
}

// =========================================================
// PHASE 2: UNLOCKED SITE & NAVIGATION
// =========================================================
function showUnlockedSite(withCelebration) {
  if (state.countdownTimer) {
    clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }

  document.getElementById('countdown-view').hidden = true;
  document.getElementById('birthday-site').hidden = false;

  if (!state.unlockedRendered) {
    renderBirthdayHome();
    initHomeSubtabs();
    initWordle();
    initDistanceSlider();
    initDeck();
    initDailyJar();
    initNavigation();
    initDialogFallbacks();
    state.unlockedRendered = true;
  } else {
    initWordle();
    initDailyJar();
  }

  const hashView = window.location.hash.replace('#', '');
  if (['home', 'about', 'jar'].includes(hashView)) {
    switchView(hashView, false);
  } else {
    switchView(state.activeView, false);
  }

  if (withCelebration) {
    triggerPetals();
  }
}

function initNavigation() {
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view, true);
    });
  });

  window.addEventListener('hashchange', () => {
    const hashView = window.location.hash.replace('#', '');
    if (['home', 'about', 'jar'].includes(hashView)) {
      switchView(hashView, false);
    }
  });
}

function switchView(viewName, updateHash) {
  state.activeView = viewName;

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const isActive = btn.dataset.view === viewName;
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  document.getElementById('view-home').hidden = viewName !== 'home';
  document.getElementById('view-about').hidden = viewName !== 'about';
  document.getElementById('view-jar').hidden = viewName !== 'jar';

  const titles = {
    home: `Happy Birthday, ${SITE_CONFIG.recipientName}`,
    about: `About You | For ${SITE_CONFIG.recipientName}`,
    jar: `The Daily Jar | For ${SITE_CONFIG.recipientName}`,
  };
  document.title = titles[viewName] || titles.home;

  if (updateHash) {
    window.history.replaceState(null, '', `#${viewName}`);
  }
}

// =========================================================
// VIEW 1: BIRTHDAY HOME, WORDLE & DISTANCE SLIDER
// =========================================================
function renderBirthdayHome() {
  document.getElementById('home-eyebrow').textContent = BIRTHDAY_HOME.eyebrow;
  document.getElementById('home-hero-title').textContent = BIRTHDAY_HOME.heroTitle;
  document.getElementById('home-hero-subtitle').textContent = BIRTHDAY_HOME.heroSubtitle;

  document.getElementById('letter-heading').textContent = BIRTHDAY_HOME.letterHeading;
  const letterBody = document.getElementById('letter-body');
  letterBody.innerHTML = '';
  BIRTHDAY_HOME.letterParagraphs.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    letterBody.appendChild(p);
  });
  document.getElementById('letter-signoff').textContent = BIRTHDAY_HOME.letterSignOff;

  document.getElementById('chart-heading').textContent = BIRTHDAY_HOME.chart.heading;
  document.getElementById('chart-code').textContent = BIRTHDAY_HOME.chart.fileCode;
  const chartRows = document.getElementById('chart-rows');
  chartRows.innerHTML = '';
  BIRTHDAY_HOME.chart.rows.forEach((row) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chart-row';
    const dt = document.createElement('dt');
    dt.textContent = row.label;
    const dd = document.createElement('dd');
    dd.textContent = row.value;
    wrapper.append(dt, dd);
    chartRows.appendChild(wrapper);
  });
}

function initHomeSubtabs() {
  const root = document.getElementById('home-subtabs');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

  function selectSubtab(targetTab, focusTab = false) {
    const key = targetTab.dataset.subtab;
    state.activeSubtab = key;

    tabs.forEach((tab) => {
      const selected = tab === targetTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.toggleAttribute('focusgroupstart', selected);
    });

    panels.forEach((panel) => {
      const active = panel.dataset.subpanel === key;
      if (active) {
        panel.hidden = false;
        panel.tabIndex = 0;
      } else {
        panel.hidden = 'until-found';
        panel.removeAttribute('tabindex');
      }
    });

    targetTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (focusTab) targetTab.focus();
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => selectSubtab(tab, false));

    tab.addEventListener('keydown', (e) => {
      let nextIdx = null;
      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = tabs.length - 1;

      if (nextIdx !== null) {
        e.preventDefault();
        selectSubtab(tabs[nextIdx], true);
      }
    });
  });

  panels.forEach((panel) => {
    panel.addEventListener('beforematch', () => {
      const matchingTab = tabs.find((t) => t.dataset.subtab === panel.dataset.subpanel);
      if (matchingTab) selectSubtab(matchingTab, false);
    });
  });

  selectSubtab(tabs[0], false);
}

let wordleControlsReady = false;
let wordleState = {
  dateKey: '',
  target: 'HEART',
  winMessage: '',
  guesses: [],
  currentGuess: '',
  gameOver: false,
  keyStates: {},
};

function getDailyWordleEntry(dateKey) {
  const { words, startDate } = BIRTHDAY_HOME.wordle;
  const offset = getSastDayIndex(dateKey) - getSastDayIndex(startDate);
  const idx = ((offset % words.length) + words.length) % words.length;
  return words[idx];
}

function readWordleStorage(dateKey, targetWord) {
  try {
    const raw = safeGetStorage(WORDLE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.dateKey === dateKey && parsed.target === targetWord && Array.isArray(parsed.guesses)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function saveWordleStorage() {
  safeSetStorage(
    WORDLE_STORAGE_KEY,
    JSON.stringify({
      dateKey: wordleState.dateKey,
      target: wordleState.target,
      guesses: wordleState.guesses,
      gameOver: wordleState.gameOver,
    })
  );
}

function initWordle() {
  const todayKey = getSastDateKey();
  const entry = getDailyWordleEntry(todayKey);
  const target = entry.word.toUpperCase().slice(0, 5);

  document.getElementById('wordle-heading').textContent = BIRTHDAY_HOME.wordle.heading;
  document.getElementById('wordle-subheading').textContent = BIRTHDAY_HOME.wordle.subheading;
  document.getElementById('wordle-date').textContent = getSastReadableDate();

  const boardEl = document.getElementById('wordle-board');
  const keyboardEl = document.getElementById('wordle-keyboard');
  const statusEl = document.getElementById('wordle-status');
  const resetBtn = document.getElementById('wordle-reset');
  const openRewardBtn = document.getElementById('wordle-open-reward');
  const dialog = document.getElementById('wordle-dialog');

  const rowsLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  function scoreGuess(guess, answer) {
    const result = Array(5).fill('absent');
    const remainingCounts = {};

    for (let i = 0; i < 5; i += 1) {
      if (guess[i] === answer[i]) {
        result[i] = 'correct';
      } else {
        const ch = answer[i];
        remainingCounts[ch] = (remainingCounts[ch] || 0) + 1;
      }
    }

    for (let i = 0; i < 5; i += 1) {
      if (result[i] === 'correct') continue;
      const ch = guess[i];
      if (remainingCounts[ch] > 0) {
        result[i] = 'present';
        remainingCounts[ch] -= 1;
      }
    }
    return result;
  }

  function recomputeKeyStates() {
    const rank = { absent: 1, present: 2, correct: 3 };
    wordleState.keyStates = {};
    wordleState.guesses.forEach((guess) => {
      const scores = scoreGuess(guess, wordleState.target);
      for (let i = 0; i < 5; i += 1) {
        const ch = guess[i];
        const next = scores[i];
        if (!wordleState.keyStates[ch] || rank[next] > rank[wordleState.keyStates[ch]]) {
          wordleState.keyStates[ch] = next;
        }
      }
    });
  }

  function renderBoard() {
    boardEl.innerHTML = '';
    for (let r = 0; r < 6; r += 1) {
      const row = document.createElement('div');
      row.className = 'wordle-row';

      const committed = wordleState.guesses[r];
      const active = r === wordleState.guesses.length && !wordleState.gameOver ? wordleState.currentGuess : '';
      const scores = committed ? scoreGuess(committed, wordleState.target) : null;

      for (let c = 0; c < 5; c += 1) {
        const tile = document.createElement('div');
        tile.className = 'wordle-tile';
        const letter = committed ? committed[c] : active[c] || '';
        tile.textContent = letter;

        if (committed) {
          tile.dataset.state = scores[c];
        } else if (letter) {
          tile.dataset.state = 'filled';
        }
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
  }

  function renderKeyboard() {
    keyboardEl.innerHTML = '';
    rowsLayout.forEach((keys) => {
      const row = document.createElement('div');
      row.className = 'kb-row';
      keys.forEach((key) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `kb-key${key.length > 1 ? ' kb-key--wide' : ''}`;
        if (key === 'ENTER') {
          btn.textContent = 'Go';
          btn.setAttribute('aria-label', 'Submit guess');
        } else if (key === 'DEL') {
          btn.textContent = '\u232B';
          btn.setAttribute('aria-label', 'Delete letter');
        } else {
          btn.textContent = key;
        }
        btn.dataset.key = key;
        if (wordleState.keyStates[key]) {
          btn.dataset.state = wordleState.keyStates[key];
        }
        btn.addEventListener('click', () => handleKey(key));
        row.appendChild(btn);
      });
      keyboardEl.appendChild(row);
    });
  }

  function openWinDialog() {
    document.getElementById('wordle-dialog-title').textContent = BIRTHDAY_HOME.wordle.winTitle;
    document.getElementById('wordle-dialog-body').textContent = wordleState.winMessage;
    dialog.showModal();
  }

  function handleKey(key) {
    if (wordleState.gameOver) return;

    if (key === 'DEL' || key === 'BACKSPACE') {
      wordleState.currentGuess = wordleState.currentGuess.slice(0, -1);
      statusEl.textContent = '';
      renderBoard();
      return;
    }

    if (key === 'ENTER') {
      if (wordleState.currentGuess.length < 5) {
        statusEl.textContent = 'Type all 5 letters first.';
        return;
      }
      wordleState.guesses.push(wordleState.currentGuess);
      recomputeKeyStates();

      if (wordleState.currentGuess === wordleState.target) {
        wordleState.gameOver = true;
        statusEl.textContent = `Solved in ${wordleState.guesses.length} ${wordleState.guesses.length === 1 ? 'try' : 'tries'}!`;
        openRewardBtn.hidden = false;
        resetBtn.hidden = true;
        openWinDialog();
      } else if (wordleState.guesses.length >= 6) {
        wordleState.gameOver = true;
        statusEl.textContent = `Today's word was ${wordleState.target}.`;
        resetBtn.hidden = false;
      } else {
        statusEl.textContent = '';
      }

      wordleState.currentGuess = '';
      saveWordleStorage();
      renderBoard();
      renderKeyboard();
      return;
    }

    if (/^[A-Z]$/.test(key) && wordleState.currentGuess.length < 5) {
      wordleState.currentGuess += key;
      statusEl.textContent = '';
      renderBoard();
    }
  }

  const saved = readWordleStorage(todayKey, target);
  wordleState = {
    dateKey: todayKey,
    target,
    winMessage: entry.message,
    guesses: saved ? saved.guesses : [],
    currentGuess: '',
    gameOver: saved ? Boolean(saved.gameOver) : false,
    keyStates: {},
  };
  recomputeKeyStates();

  const solved = wordleState.guesses.includes(target);
  if (solved) {
    statusEl.textContent = `Solved in ${wordleState.guesses.length} ${wordleState.guesses.length === 1 ? 'try' : 'tries'}!`;
    openRewardBtn.hidden = false;
    resetBtn.hidden = true;
  } else if (wordleState.gameOver) {
    statusEl.textContent = `Today's word was ${target}.`;
    openRewardBtn.hidden = true;
    resetBtn.hidden = false;
  } else {
    statusEl.textContent = '';
    openRewardBtn.hidden = true;
    resetBtn.hidden = true;
  }

  if (!wordleControlsReady) {
    resetBtn.addEventListener('click', () => {
      wordleState.guesses = [];
      wordleState.currentGuess = '';
      wordleState.gameOver = false;
      wordleState.keyStates = {};
      statusEl.textContent = '';
      resetBtn.hidden = true;
      openRewardBtn.hidden = true;
      saveWordleStorage();
      renderBoard();
      renderKeyboard();
    });

    openRewardBtn.addEventListener('click', openWinDialog);

    document.addEventListener('keydown', (e) => {
      if (document.getElementById('birthday-site').hidden) return;
      if (state.activeView !== 'home' || state.activeSubtab !== 'wordle') return;
      if (dialog.open) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === 'Backspace') {
        handleKey('DEL');
      } else if (e.key === 'Enter') {
        handleKey('ENTER');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    });

    wordleControlsReady = true;
  }

  renderBoard();
  renderKeyboard();
}

function initDistanceSlider() {
  document.getElementById('distance-heading').textContent = BIRTHDAY_HOME.distance.heading;
  document.getElementById('distance-subheading').textContent = BIRTHDAY_HOME.distance.subheading;

  const slider = document.getElementById('distance-slider');
  const readout = document.getElementById('distance-readout');
  const plane = document.getElementById('slider-plane');
  const badge = document.getElementById('milestone-badge');
  const title = document.getElementById('milestone-title');
  const text = document.getElementById('milestone-text');
  const maxKm = SITE_CONFIG.trip.distanceKm;

  function syncSlider() {
    const travelled = Number(slider.value);
    const remaining = Math.max(0, maxKm - travelled);
    const pct = (travelled / maxKm) * 100;

    slider.style.setProperty('--attr-min', slider.min || '0');
    slider.style.setProperty('--attr-max', slider.max || String(maxKm));
    slider.style.setProperty('--control-value', String(travelled));

    slider.setAttribute('aria-valuetext', `${remaining} kilometres remaining`);
    readout.textContent = remaining === 0 ? '0 km apart!' : `${remaining.toLocaleString('en-ZA')} km apart`;
    plane.style.insetInlineStart = `${Math.min(92, Math.max(2, pct * 0.9 + 2))}%`;

    const match =
      BIRTHDAY_HOME.distance.milestones.find((m) => remaining >= m.minKm) ||
      BIRTHDAY_HOME.distance.milestones[BIRTHDAY_HOME.distance.milestones.length - 1];

    badge.textContent = match.badge;
    title.textContent = match.title;
    text.textContent = match.text;
  }

  syncSlider();
  slider.addEventListener('input', syncSlider);
}

// =========================================================
// VIEW 2: ABOUT YOU (INTERACTIVE CARD DECK)
// =========================================================
function initDeck() {
  const cardBtn = document.getElementById('keepsake-card');
  const frontEl = document.getElementById('card-front');
  const backEl = document.getElementById('card-back');
  const counterEl = document.getElementById('deck-counter');
  const dotsEl = document.getElementById('deck-dots');

  function setFlipped(next) {
    state.cardFlipped = next;
    cardBtn.classList.toggle('is-flipped', next);
    cardBtn.setAttribute('aria-pressed', String(next));
  }

  function renderDeck() {
    const item = ABOUT_DECK[state.deckOrder[state.deckIndex]];
    const total = state.deckOrder.length;
    counterEl.textContent = `Card ${state.deckIndex + 1} of ${total}`;

    if (item.photo) {
      frontEl.innerHTML = `
        <div class="keepsake-photo-box">
          <img src="${item.photo}" alt="${item.alt || item.title}" loading="eager">
        </div>
        <div class="keepsake-front-meta">
          <div>
            <span class="pill">${item.tag}</span>
            <h2 class="keepsake-card-title" style="margin-top: 8px;">${item.title}</h2>
          </div>
          <span class="keepsake-hint">Tap to flip</span>
        </div>
      `;
    } else {
      frontEl.innerHTML = `
        <div class="keepsake-text-front">
          <span class="pill pill--champagne">${item.tag}</span>
          <h2 class="keepsake-card-title" style="margin-top: 16px; font-size: 2rem;">${item.title}</h2>
          <p class="keepsake-hint" style="margin-top: 12px;">Tap to read the note on the back</p>
        </div>
      `;
    }

    backEl.innerHTML = `
      <div>
        <span class="pill">${item.tag}</span>
        <h2 class="keepsake-card-title" style="margin-top: 14px; color: var(--surface-white);">${item.title}</h2>
        <p class="keepsake-back-note">${item.note}</p>
      </div>
      <div class="keepsake-back-footer">
        <span>Signed, ${SITE_CONFIG.senderName}</span>
        <span>Tap to flip back</span>
      </div>
    `;

    dotsEl.innerHTML = '';
    state.deckOrder.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `deck-dot${idx === state.deckIndex ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to card ${idx + 1}`);
      dot.addEventListener('click', () => {
        state.deckIndex = idx;
        setFlipped(false);
        renderDeck();
      });
      dotsEl.appendChild(dot);
    });
  }

  cardBtn.addEventListener('click', () => setFlipped(!state.cardFlipped));
  document.getElementById('deck-flip').addEventListener('click', () => setFlipped(!state.cardFlipped));

  document.getElementById('deck-prev').addEventListener('click', () => {
    state.deckIndex = (state.deckIndex - 1 + state.deckOrder.length) % state.deckOrder.length;
    setFlipped(false);
    renderDeck();
  });

  document.getElementById('deck-next').addEventListener('click', () => {
    state.deckIndex = (state.deckIndex + 1) % state.deckOrder.length;
    setFlipped(false);
    renderDeck();
  });

  document.getElementById('deck-shuffle').addEventListener('click', () => {
    for (let i = state.deckOrder.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.deckOrder[i], state.deckOrder[j]] = [state.deckOrder[j], state.deckOrder[i]];
    }
    state.deckIndex = 0;
    setFlipped(false);
    renderDeck();
  });

  renderDeck();
}

// =========================================================
// VIEW 3: THE DAILY JAR (QUOTE OF THE DAY + 2 MOOD JARS)
// =========================================================
function readJarStorage() {
  try {
    const raw = localStorage.getItem(JAR_STORAGE_KEY);
    if (!raw) return { lastPullDate: null, lastPullJarId: null, lastPullText: null, seen: {} };
    const parsed = JSON.parse(raw);
    return {
      lastPullDate: parsed.lastPullDate || null,
      lastPullJarId: parsed.lastPullJarId || null,
      lastPullText: parsed.lastPullText || null,
      seen: parsed.seen || {},
    };
  } catch {
    return { lastPullDate: null, lastPullJarId: null, lastPullText: null, seen: {} };
  }
}

function saveJarStorage(data) {
  safeSetStorage(JAR_STORAGE_KEY, JSON.stringify(data));
}

function initDailyJar() {
  const todayKey = getSastDateKey();
  const dayIndex = getSastDayIndex(todayKey);
  const quoteIndex = ((dayIndex % DAILY_QUOTES.length) + DAILY_QUOTES.length) % DAILY_QUOTES.length;

  document.getElementById('quote-date').textContent = getSastReadableDate();
  document.getElementById('daily-quote-text').textContent = `\u201C${DAILY_QUOTES[quoteIndex]}\u201D`;

  const banner = document.getElementById('jar-status-banner');
  const revealCard = document.getElementById('jar-reveal-card');
  const jarButtons = document.querySelectorAll('.jar-card');

  function renderJarState() {
    const stored = readJarStorage();
    const pulledToday = stored.lastPullDate === todayKey && stored.lastPullText;

    jarButtons.forEach((btn) => {
      const id = btn.dataset.jarId;
      const cta = btn.querySelector('[data-jar-cta]');
      btn.disabled = Boolean(pulledToday);
      cta.textContent = pulledToday ? 'Come Back Tomorrow' : "Pull Today's Note";
      if (pulledToday && stored.lastPullJarId === id) {
        cta.textContent = 'Opened Today';
      }
    });

    if (pulledToday) {
      const jarMeta = MOOD_JARS[stored.lastPullJarId] || MOOD_JARS.pickMeUp;
      banner.textContent = "Today's jar pull is open below. Come back tomorrow for a fresh note.";
      document.getElementById('revealed-jar-badge').textContent = jarMeta.name;
      document.getElementById('revealed-jar-date').textContent = getSastReadableDate();
      document.getElementById('revealed-jar-text').textContent = stored.lastPullText;
      revealCard.hidden = false;
    } else {
      banner.textContent = 'Ready for today: choose 1 note from either jar (1 pull per day).';
      revealCard.hidden = true;
    }
  }

  jarButtons.forEach((btn) => {
    btn.onclick = () => {
      const jarId = btn.dataset.jarId;
      const jar = MOOD_JARS[jarId];
      if (!jar || !jar.notes.length) return;

      const stored = readJarStorage();
      if (stored.lastPullDate === todayKey) return;

      let seenForJar = Array.isArray(stored.seen[jarId]) ? stored.seen[jarId] : [];
      let availableIndices = jar.notes
        .map((_, idx) => idx)
        .filter((idx) => !seenForJar.includes(idx));

      if (availableIndices.length === 0) {
        seenForJar = [];
        availableIndices = jar.notes.map((_, idx) => idx);
      }

      const chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const chosenText = jar.notes[chosenIndex];

      stored.lastPullDate = todayKey;
      stored.lastPullJarId = jarId;
      stored.lastPullText = chosenText;
      stored.seen[jarId] = [...seenForJar, chosenIndex];

      saveJarStorage(stored);
      renderJarState();
    };
  });

  renderJarState();
}

// =========================================================
// ACCESSIBLE DIALOG FALLBACKS (PER MODERN-WEB-GUIDANCE)
// =========================================================
function initDialogFallbacks() {
  const dialog = document.getElementById('wordle-dialog');
  dialog.addEventListener('close', () => {
    dialog.returnValue = '';
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e, dlg) => {
      const r = dlg.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = outside(e, dialog);
    });
    dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && outside(e, dialog)) dialog.close();
    });
  }
}

// Boot
initPreviewControls();
evaluateGate();
})();
