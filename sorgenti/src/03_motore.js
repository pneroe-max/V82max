// ============= LOGICA BLOCCHI =============

// ===== V8.3.4 — Progressione evidence-based =====
// Volume FISSO sett 1-7 (Grgic 2017). Una sola variabile per settimana
// (Plotkin 2022/Chaves 2024): rep nelle sett di accumulo (2,3,5,6),
// carico nelle sett di salita (4,7). RIR conservativo in deficit
// (compound mai sotto 1). Deload vero solo a sett 8.
const WEEK_PHASE = {
  1: {
    name: 'ADATTAMENTO',
    variable: 'Stabilisci i carichi',
    repPos: 'bottom',
    compRir: '3',
    accRir: '2',
    load: 'base'
  },
  2: {
    name: 'ACCUMULO REP',
    variable: '+1 rep · carico fermo',
    repPos: 'mid',
    compRir: '2-3',
    accRir: '1-2',
    load: 'hold'
  },
  3: {
    name: 'ACCUMULO REP',
    variable: '+1 rep → top range',
    repPos: 'top',
    compRir: '2',
    accRir: '1',
    load: 'hold'
  },
  4: {
    name: 'SALITA CARICO',
    variable: '+carico · rep al fondo',
    repPos: 'bottom',
    compRir: '2',
    accRir: '1',
    load: 'up'
  },
  5: {
    name: 'ACCUMULO REP',
    variable: '+1 rep · carico fermo',
    repPos: 'mid',
    compRir: '2',
    accRir: '0-1',
    load: 'hold'
  },
  6: {
    name: 'ACCUMULO REP',
    variable: '+1 rep → top range',
    repPos: 'top',
    compRir: '1-2',
    accRir: '0-1',
    load: 'hold'
  },
  7: {
    name: 'SALITA + PICCO',
    variable: '+carico · rep al fondo',
    repPos: 'bottom',
    compRir: '1',
    accRir: '0-1',
    load: 'up'
  },
  8: {
    name: 'DELOAD + OFF',
    variable: '−15% carico · metà set',
    repPos: 'mid',
    compRir: '3-4',
    accRir: '3',
    load: 'deload'
  }
};

// Ricava i target rep per la fase a partire dal range base "min-max"
const repTargetForPhase = (baseReps, repPos) => {
  const r = parseRepRange(baseReps);
  if (!r.max || r.max === r.min) return baseReps;
  if (repPos === 'bottom') return String(r.min);
  if (repPos === 'top') return String(r.max);
  // mid = un gradino sopra il fondo (doppia progressione)
  return String(Math.min(r.max, r.min + 1));
};
const applyBlockLogic = (exercise, week) => {
  let sets = exercise.sets,
    reps = exercise.reps,
    rir = exercise.rir,
    rest = exercise.rest,
    isCompound = exercise.isCompound;
  const phase = WEEK_PHASE[week] || WEEK_PHASE[1];
  // Volume fisso S1-7; deload S8 = metà serie (min 1)
  if (week >= 8) sets = Math.max(1, Math.round(sets / 2));
  // RIR dalla fase (compound vs accessori)
  rir = isCompound ? phase.compRir : phase.accRir;
  // Rep: doppia progressione a singola variabile, su superset/AMRAP non tocco il formato
  if (!reps.includes('+') && !reps.includes('AMRAP')) {
    reps = repTargetForPhase(reps, phase.repPos);
  }
  return {
    sets,
    reps,
    rir,
    rest,
    blockName: phase.name,
    variable: phase.variable,
    loadCue: phase.load
  };
};
const parseRepRange = repString => {
  if (!repString) return {
    min: 0,
    max: 0
  };
  const cleaned = repString.replace('AMRAP', '').replace('+', '').trim();
  if (cleaned.includes('-')) {
    const _cleaned$split$map = cleaned.split('-').map(r => parseInt(r)),
      _cleaned$split$map2 = _slicedToArray(_cleaned$split$map, 2),
      min = _cleaned$split$map2[0],
      max = _cleaned$split$map2[1];
    return {
      min: min || 0,
      max: isNaN(max) ? min : max
    };
  }
  return {
    min: parseInt(cleaned) || 0,
    max: parseInt(cleaned) || 0
  };
};
const isLowerBody = tags => tags.some(t => ['QUAD', 'HAM', 'GLUTE', 'POLP'].includes(t));
const getSuggestedWeight = (exercise, currentWeek, dayId, allWorkouts, exIdx, phaseMap) => {
  var _allWorkouts;
  const PH = phaseMap || WEEK_PHASE;
  if (currentWeek <= 1) return null;
  const prevWeekData = (_allWorkouts = allWorkouts[currentWeek - 1]) === null || _allWorkouts === void 0 || (_allWorkouts = _allWorkouts[dayId]) === null || _allWorkouts === void 0 ? void 0 : _allWorkouts.esercizi;
  if (!prevWeekData) return null;
  if (exIdx == null || exIdx === -1) return null;
  const prevLog = prevWeekData[exIdx];
  if (!prevLog || !prevLog.kg) return null;
  const prevWeight = parseFloat(prevLog.kg);
  if (isNaN(prevWeight)) return null;
  const increment = isLowerBody(exercise.tags) ? 5 : 2.5;
  const phase = PH[currentWeek] || PH[1];
  // Carico sale solo nelle settimane di "salita" (loadCue 'up'),
  // scende al deload, resta fermo nelle settimane di accumulo rep.
  const cue = phase.loadCue || phase.load; // le fasi scrivono "load": prima si leggeva solo "loadCue"
  if (cue === 'up') return (prevWeight + increment).toFixed(1);
  if (cue === 'deload') return (Math.round(prevWeight * 0.85 / 2.5) * 2.5).toFixed(1);
  return prevWeight.toFixed(1); // hold: aggiungi rep, non carico
};
const parseRestSeconds = restStr => {
  if (!restStr) return 90;
  const firstPart = restStr.split('-')[0].trim();
  if (firstPart.includes('s')) return parseInt(firstPart);
  const _firstPart$split$map = firstPart.split(':').map(n => parseInt(n)),
    _firstPart$split$map2 = _slicedToArray(_firstPart$split$map, 2),
    m = _firstPart$split$map2[0],
    s = _firstPart$split$map2[1];
  return (m || 0) * 60 + (s || 0);
};

// ============= STORAGE =============

const KEY_PREFIX = 'v8tracker_';
const storage = {
  get(key) {
    try {
      const v = localStorage.getItem(KEY_PREFIX + key);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      try {
        notifyStorageError();
      } catch (e2) {}
      return false;
    }
  },
  exportAll() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY_PREFIX)) data[k.replace(KEY_PREFIX, '')] = JSON.parse(localStorage.getItem(k));
    }
    return data;
  },
  importAll(data) {
    Object.entries(data).forEach(_ref4 => {
      let _ref5 = _slicedToArray(_ref4, 2),
        k = _ref5[0],
        v = _ref5[1];
      localStorage.setItem(KEY_PREFIX + k, JSON.stringify(v));
    });
  },
  clearAll() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY_PREFIX)) keys.push(k);
    }
    keys.forEach(k => localStorage.removeItem(k));
  }
};

// Salvataggio debounced: evita una scrittura sincrona su localStorage a ogni
// tasto premuto (jank su mobile). Flush garantito quando l'app va in background.
const _saveTimers = {};
const _pendingSaves = {};
const scheduleSave = function (key, data) {
  let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 350;
  _pendingSaves[key] = data;
  clearTimeout(_saveTimers[key]);
  _saveTimers[key] = setTimeout(() => {
    if (key in _pendingSaves) {
      storage.set(key, _pendingSaves[key]);
      delete _pendingSaves[key];
    }
  }, delay);
};
const flushSaves = () => {
  Object.keys(_pendingSaves).forEach(k => {
    clearTimeout(_saveTimers[k]);
    storage.set(k, _pendingSaves[k]);
    delete _pendingSaves[k];
  });
};
window.addEventListener('pagehide', flushSaves);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushSaves();
});

// ============= STYLES =============

// ============= TEMA v5 "VETRO & VIOLA" =============
// Card-vetro semitrasparenti (img2) che lasciano filtrare le sfere viola;
// accento UI viola elettrico (img1). Colori-disco solo per i giorni.
const APP_VERSION = 'v26.0';
const APP_BUILD = '2026-11-15';
// DISCHI DI GARA — il colore qui significa un carico
const DISC = [{
  kg: 25,
  col: '#D8342C',
  h: 112,
  w: 15
}, {
  kg: 20,
  col: '#1F62D2',
  h: 104,
  w: 13
}, {
  kg: 15,
  col: '#E5A82B',
  h: 96,
  w: 11
}, {
  kg: 10,
  col: '#2FA055',
  h: 84,
  w: 9
}, {
  kg: 5,
  col: '#EDEBE4',
  h: 66,
  w: 8
}, {
  kg: 2.5,
  col: '#D8342C',
  h: 52,
  w: 7
}, {
  kg: 1.25,
  col: '#C2762F',
  h: 40,
  w: 6
}];
// colore di un giorno o di un blocco: tinta tenue, mai rossa (il rosso è solo pericolo)
function tintaGiorno(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return '#86A8E6';
  const n = parseInt(m[1], 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (d < 0.08) return '#A9A9B2';
  let hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  hue = (hue * 60 + 360) % 360;
  if (hue < 15 || hue >= 330) return '#62BDB3';
  if (hue < 35) return '#E0A374';
  if (hue < 70) return '#D9B25E';
  if (hue < 165) return '#6BBF8A';
  if (hue < 200) return '#62BDB3';
  if (hue < 250) return '#86A8E6';
  return '#A893EC';
}
// "Eliminare la scheda?" -> bottone "Elimina", rosso; "Archiviare il blocco?" -> "Archivia", neutro
function verboConferma(titolo) {
  const p = String(titolo || '').trim().split(/\s+/)[0] || '';
  let v = p.replace(/[?:,.]$/, '');
  if (/are$/i.test(v)) v = v.replace(/are$/i, 'a');
  else if (/ere$/i.test(v)) v = v.replace(/ere$/i, 'i');
  else if (/ire$/i.test(v)) v = v.replace(/ire$/i, 'i');
  else v = 'Conferma';
  v = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  const rosso = /^(elimin|cancell|rimuov|sovrascriv|ripristin|azzer|svuot|ricominc)/i.test(v);
  return { verbo: v, rosso };
}
// ============= TIMER CONTEXT (persistente cross-screen) =============
const TimerContext = createContext(null);
function useTimer() {
  return useContext(TimerContext);
}
