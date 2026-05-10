/* Futboldle — lógica del juego.
 * Sitio estático, sin dependencias.
 */

const STORAGE_PREFIX = "futboldle:";

// ---------- utilidades de fecha y aleatorio determinista ----------

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dayNumber(date) {
  const ref = new Date(2024, 0, 1);
  const ms = date.setHours(0, 0, 0, 0) - ref.setHours(0, 0, 0, 0);
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffleSeeded(arr, seed) {
  const rng = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Equipo del día — permutación por ciclos para evitar repeticiones. */
function getDailyTeam(leagueKey, date = new Date()) {
  const teams = LEAGUES[leagueKey].teams;
  const n = teams.length;
  const dn = dayNumber(new Date(date));
  const cycle = Math.floor(dn / n);
  const pos = ((dn % n) + n) % n;

  const order = shuffleSeeded(teams.map((_, i) => i), hashStr(`${leagueKey}|${cycle}`));
  if (pos === 0 && cycle > 0) {
    const orderPrev = shuffleSeeded(teams.map((_, i) => i), hashStr(`${leagueKey}|${cycle - 1}`));
    if (order[0] === orderPrev[n - 1] && n > 1) {
      [order[0], order[1]] = [order[1], order[0]];
    }
  }
  return teams[order[pos]];
}

// ---------- comparación ----------

function fmtNumber(val, attr) {
  if (attr.zeroAsX && val === 0) return "X";
  return String(val);
}

function compareAttr(attr, guessVal, targetVal) {
  if (attr.numeric) {
    const diff = guessVal - targetVal;
    const cls = diff === 0 ? "good" : "bad";
    const arrow = diff === 0 ? "" : diff < 0 ? "▲" : "▼";
    const numHTML = `<span class="num-val">${fmtNumber(guessVal, attr)}</span>`;
    const text = arrow
      ? `<span class="num-stack">${numHTML}<span class="arrow">${arrow}</span></span>`
      : numHTML;
    return { cls, text };
  }

  if (attr.key === "color") {
    const g = Array.isArray(guessVal) ? guessVal : [];
    const t = Array.isArray(targetVal) ? targetVal : [];
    const sameSet = g.length === t.length && g.every(c => t.includes(c));
    const display = g.map(capitalize).join(" / ");
    return { cls: sameSet ? "good" : "bad", text: display };
  }

  const g = String(guessVal ?? "");
  const t = String(targetVal ?? "");
  if (g.toLowerCase() === t.toLowerCase()) return { cls: "good", text: g };
  return { cls: "bad", text: g };
}

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------- estado ----------

const state = {
  leagueKey: null,
  attrs: [],
  target: null,
  guesses: [],
  won: false,
};

function storageKey() { return `${STORAGE_PREFIX}${state.leagueKey}:${todayKey()}`; }

function saveState() {
  if (!state.leagueKey) return;
  try {
    localStorage.setItem(storageKey(), JSON.stringify({
      guesses: state.guesses.map(t => t.name + "|" + t.league),
      won: state.won,
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return;
    const data = JSON.parse(raw);
    const teams = LEAGUES[state.leagueKey].teams;
    state.guesses = (data.guesses || [])
      .map(id => {
        const [name, league] = id.split("|");
        return teams.find(t => t.name === name && t.league === league);
      })
      .filter(Boolean);
    state.won = !!data.won;
  } catch (e) {}
}

// ---------- render ----------

const $ = (id) => document.getElementById(id);

function renderLeagueGrid() {
  const root = $("leagueGrid");
  root.innerHTML = "";

  const sortByLabel = (a, b) => LEAGUES[a].label.localeCompare(LEAGUES[b].label, "es");
  const sections = [
    {
      title: "Todas las Ligas",
      icon: "🌍",
      keys: ["all"],
    },
    {
      title: "Ligas Sudamericanas",
      icon: "🌎",
      keys: [
        "southam",
        ...["argentina", "brasileirao", "uruguay"].filter(k => LEAGUES[k]).sort(sortByLabel),
      ],
    },
    {
      title: "Ligas Europeas",
      icon: "🇪🇺",
      keys: [
        "europa",
        ...["bundesliga", "laliga", "ligue1", "premier", "seriea"].filter(k => LEAGUES[k]).sort(sortByLabel),
      ],
    },
  ];

  const FEATURED_KEYS = new Set(["all", "southam", "europa"]);
  const subtitleFor = (key, lg) => {
    if (key === "all")     return `${lg.teams.length} equipos · todas las ligas`;
    if (key === "southam") return `${lg.teams.length} equipos · Argentina · Brasil · Uruguay`;
    if (key === "europa")  return `${lg.teams.length} equipos · 5 ligas europeas`;
    return `${lg.teams.length} equipos · ${lg.country}`;
  };

  let i = 0;
  for (const section of sections) {
    const sectionEl = document.createElement("div");
    sectionEl.className = "league-section";

    const h = document.createElement("h3");
    h.className = "section-title";
    h.innerHTML = `<span class="section-icon">${section.icon}</span><span>${section.title}</span>`;
    sectionEl.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "league-grid";
    for (const key of section.keys) {
      const lg = LEAGUES[key];
      if (!lg) continue;
      const btn = document.createElement("button");
      btn.className = "league-btn" + (FEATURED_KEYS.has(key) ? " league-btn--featured" : "");
      btn.type = "button";
      btn.style.setProperty("--i", i++);
      btn.innerHTML = `
        <span class="flag">${lg.flag}</span>
        <strong>${lg.label}</strong>
        <span class="count">${subtitleFor(key, lg)}</span>
      `;
      btn.addEventListener("click", () => startGame(key));
      grid.appendChild(btn);
    }
    sectionEl.appendChild(grid);
    root.appendChild(sectionEl);
  }
}

function renderHeader() {
  const head = $("headerRow");
  head.innerHTML = "";
  const first = document.createElement("th");
  first.textContent = "Equipo";
  head.appendChild(first);
  for (const a of state.attrs) {
    const th = document.createElement("th");
    th.textContent = a.label;
    head.appendChild(th);
  }
}

function renderGuesses(animateLast = false) {
  const tbody = $("guessBody");
  tbody.innerHTML = "";
  // Mostrar el último intento arriba.
  const rows = state.guesses.slice().reverse();
  rows.forEach((team, idx) => {
    const tr = document.createElement("tr");
    if (animateLast && idx === 0) tr.classList.add("new");

    const tdName = document.createElement("td");
    tdName.className = "guess-name";
    tdName.style.setProperty("--ci", 0);
    tdName.textContent = team.name;
    tr.appendChild(tdName);

    state.attrs.forEach((a, ai) => {
      const td = document.createElement("td");
      const { cls, text } = compareAttr(a, team[a.key], state.target[a.key]);
      td.className = cls;
      // El nombre y la primera columna (Liga) entran a la vez (--ci=0).
      // Cada atributo posterior aparece 3s después del anterior.
      td.style.setProperty("--ci", ai);
      td.innerHTML = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  $("attemptCount").textContent = `Intentos: ${state.guesses.length}`;

  if (state.won) {
    $("winBanner").classList.remove("hidden");
    $("winText").textContent = `El equipo del día era ${state.target.name}. Lo has resuelto en ${state.guesses.length} intento${state.guesses.length === 1 ? "" : "s"}.`;
    $("guessInput").disabled = true;
  } else {
    $("winBanner").classList.add("hidden");
    $("guessInput").disabled = false;
  }
}

// ---------- autocompletar ----------

let activeSuggestion = -1;

function normalize(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function updateSuggestions() {
  const input = $("guessInput");
  const ul = $("suggestions");
  const q = normalize(input.value);
  if (!q) { ul.classList.add("hidden"); ul.innerHTML = ""; activeSuggestion = -1; return; }

  const teams = LEAGUES[state.leagueKey].teams;
  const used = new Set(state.guesses.map(t => `${t.name}|${t.league}`));
  const matches = teams
    .filter(t => normalize(t.name).includes(q))
    .slice(0, 8);

  if (matches.length === 0) { ul.classList.add("hidden"); ul.innerHTML = ""; return; }

  ul.innerHTML = "";
  matches.forEach((t) => {
    const li = document.createElement("li");
    const isCombined = LEAGUES[state.leagueKey].combined;
    li.innerHTML = isCombined
      ? `<span>${t.name}</span><span class="sugg-meta">${t.league}</span>`
      : `<span>${t.name}</span>`;
    li.dataset.id = `${t.name}|${t.league}`;
    if (used.has(`${t.name}|${t.league}`)) li.classList.add("disabled");
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (used.has(`${t.name}|${t.league}`)) return;
      submitGuessById(`${t.name}|${t.league}`);
    });
    ul.appendChild(li);
  });
  activeSuggestion = -1;
  ul.classList.remove("hidden");
}

function moveSuggestion(delta) {
  const ul = $("suggestions");
  const items = Array.from(ul.querySelectorAll("li:not(.disabled)"));
  if (!items.length) return;
  activeSuggestion = (activeSuggestion + delta + items.length) % items.length;
  ul.querySelectorAll("li").forEach(el => el.classList.remove("active"));
  items[activeSuggestion].classList.add("active");
  items[activeSuggestion].scrollIntoView({ block: "nearest" });
}

function pickActiveSuggestion() {
  const ul = $("suggestions");
  const items = Array.from(ul.querySelectorAll("li:not(.disabled)"));
  if (activeSuggestion >= 0 && items[activeSuggestion]) {
    submitGuessById(items[activeSuggestion].dataset.id);
    return true;
  }
  if (items.length === 1) {
    submitGuessById(items[0].dataset.id);
    return true;
  }
  // Match exacto por texto.
  const q = normalize($("guessInput").value);
  const teams = LEAGUES[state.leagueKey].teams;
  const exact = teams.find(t => normalize(t.name) === q);
  if (exact) { submitGuessById(`${exact.name}|${exact.league}`); return true; }
  return false;
}

// ---------- flujo ----------

function submitGuessById(id) {
  if (state.won) return;
  const teams = LEAGUES[state.leagueKey].teams;
  const team = teams.find(t => `${t.name}|${t.league}` === id);
  if (!team) return;
  if (state.guesses.some(t => `${t.name}|${t.league}` === id)) return;

  state.guesses.push(team);
  if (team.name === state.target.name && team.league === state.target.league) state.won = true;

  $("guessInput").value = "";
  $("suggestions").classList.add("hidden");
  $("suggestions").innerHTML = "";

  saveState();
  renderGuesses(true);
}

function startGame(leagueKey) {
  state.leagueKey = leagueKey;
  state.attrs = attrsForLeague(leagueKey);
  state.target = getDailyTeam(leagueKey);
  state.guesses = [];
  state.won = false;
  loadState();

  $("leagueSelect").classList.add("hidden");
  $("game").classList.remove("hidden");
  const lg = LEAGUES[leagueKey];
  $("leagueLabel").textContent = `${lg.flag} ${lg.label}`;
  $("dateLabel").textContent = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  renderHeader();
  renderGuesses(false);
  $("guessInput").focus();
}

function backToMenu() {
  $("game").classList.add("hidden");
  $("leagueSelect").classList.remove("hidden");
  state.leagueKey = null;
  state.target = null;
  state.guesses = [];
  state.won = false;
  $("guessInput").value = "";
  $("suggestions").classList.add("hidden");
  $("suggestions").innerHTML = "";
}

function resetTodaysGame() {
  if (!state.leagueKey) return;
  if (!confirm("¿Reiniciar la partida de hoy?")) return;
  try { localStorage.removeItem(storageKey()); } catch (e) {}
  state.guesses = [];
  state.won = false;
  renderGuesses(false);
  $("guessInput").disabled = false;
  $("guessInput").focus();
}

// ---------- inicialización ----------

document.addEventListener("DOMContentLoaded", () => {
  renderLeagueGrid();

  $("backBtn").addEventListener("click", backToMenu);
  $("resetBtn").addEventListener("click", resetTodaysGame);
  $("howtoBtn").addEventListener("click", () => $("howtoModal").showModal());

  const input = $("guessInput");
  input.addEventListener("input", updateSuggestions);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveSuggestion(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveSuggestion(-1); }
    else if (e.key === "Enter")   { e.preventDefault(); pickActiveSuggestion(); }
    else if (e.key === "Escape")  { $("suggestions").classList.add("hidden"); }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) $("suggestions").classList.add("hidden");
  });
});
