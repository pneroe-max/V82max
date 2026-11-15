// Fase di default per una scheda importata che non ne porta una propria.
const DEFAULT_V8W_PHASE = {
  1: {
    name: 'SETT. 1',
    variable: 'Stabilisci i carichi',
    repPos: 'bottom',
    compRir: '2',
    accRir: '1',
    load: 'base'
  },
  2: {
    name: 'SETT. 2',
    variable: '+1 rep · carico fermo',
    repPos: 'mid',
    compRir: '1-2',
    accRir: '0-1',
    load: 'hold'
  },
  3: {
    name: 'SETT. 3',
    variable: '+1 rep → top range',
    repPos: 'top',
    compRir: '1',
    accRir: '0-1',
    load: 'hold'
  }
};

// Risolve un elemento exercises[] (stringa-ID | {ref,override} | {inline}) in esercizio completo.
const resolveV8wExercise = (item, localDb) => {
  if (typeof item === 'string') {
    const base = localDb && localDb[item] || EXERCISE_DB[item];
    return base ? {
      ...base
    } : null;
  }
  if (item && item.inline) return {
    ...item.inline
  };
  if (item && item.ref) {
    const base = localDb && localDb[item.ref] || EXERCISE_DB[item.ref];
    if (!base) return null;
    const out = {
      ...base
    };
    ['sets', 'reps', 'rir', 'rest', 'tec', 'sup', 'prof'].forEach(k => {
      if (item[k] != null) out[k] = item[k];
    });
    return out;
  }
  return null;
};

// Valida uno schema .v8w. Ritorna null se ok, altrimenti un messaggio d'errore.
const validateV8w = obj => {
  if (!obj || typeof obj !== 'object') return 'File non valido.';
  if (!Array.isArray(obj.days) || obj.days.length === 0) return 'Manca la lista "days" (i giorni).';
  for (const d of obj.days) {
    if (!d || !Array.isArray(d.exercises) || d.exercises.length === 0) return 'Un giorno non ha esercizi.';
  }
  return null;
};

// "Gonfia" una scheda leggera .v8w in un config completo per WorkoutScreen.
const rehydrateSchedule = v8w => {
  const localDb = {};
  if (v8w.newExercises) Object.entries(v8w.newExercises).forEach(_ref28 => {
    let _ref29 = _slicedToArray(_ref28, 2),
      id = _ref29[0],
      def = _ref29[1];
    localDb[id] = {
      id,
      ...def
    };
  });
  const phase = v8w.phase && typeof v8w.phase === 'object' ? v8w.phase : DEFAULT_V8W_PHASE;
  const weeksArr = Array.isArray(v8w.weeks) ? v8w.weeks : Array.from({
    length: v8w.weeks || Object.keys(phase).length || 3
  }, (_, i) => i + 1);
  const days = [];
  const exercises = {};
  (v8w.days || []).forEach((d, di) => {
    const dayId = d.id || 'd' + di;
    days.push({
      id: dayId,
      label: d.label || 'G' + (di + 1),
      dayName: d.dayName || '',
      color: tintaGiorno(d.color || '#86A8E6'),
      subtitle: d.subtitle || '',
      dur: d.dur || ''
    });
    exercises[dayId] = (d.exercises || []).map((it, ei) => {
      const ex = resolveV8wExercise(it, localDb);
      if (!ex) return null;
      if (!ex.id) ex.id = dayId + '_' + ei;
      if (!Array.isArray(ex.tags)) ex.tags = [];
      if (!Array.isArray(ex.badges)) ex.badges = [];
      if (ex.sets == null) ex.sets = 3;
      if (ex.reps == null) ex.reps = '8-12';
      if (ex.rir == null) ex.rir = '1-2';
      if (ex.rest == null) ex.rest = '90s';
      return ex;
    }).filter(Boolean);
  });
  return {
    exercises,
    days,
    phase,
    blocks: (v8w.blocks || [{
      id: 'X',
      label: v8w.name || 'Scheda importata',
      weeks: weeksArr,
      color: '#A893EC',
      reps: '',
      rir: ''
    }]).map(b => Object.assign({}, b, { color: tintaGiorno(b.color || '#A893EC') })),
    applyLogic: makeApplyLogic(phase),
    suggestWeight: getSuggestedWeight,
    storageKey: v8w.storageKey || 'sched_' + (v8w.id || 'custom'),
    weeks: weeksArr,
    rotation: !!v8w.rotation
  };
};
