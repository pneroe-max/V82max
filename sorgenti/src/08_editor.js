// ============================================================
// V10 · CONVERSIONE SCHEDA <-> FORMATO EDITABILE
// ============================================================
const uid = pfx => pfx + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const numOr = (v, d) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? d : n;
};
const toEditRow = item => {
  if (typeof item === 'string') {
    const b = EXERCISE_DB[item];
    return {
      kind: 'ref',
      ref: item,
      name: b ? b.name : item,
      sets: b ? b.sets : 3,
      reps: b ? b.reps : '8-12',
      rir: b ? b.rir : '1-2',
      rest: b ? b.rest : '90s'
    };
  }
  if (item && item.inline) {
    const x = item.inline;
    return {
      kind: 'inline',
      full: x,
      name: x.name,
      sets: x.sets,
      reps: x.reps,
      rir: x.rir,
      rest: x.rest
    };
  }
  if (item && item.ref) {
    const b = EXERCISE_DB[item.ref] || {};
    return {
      kind: 'ref',
      ref: item.ref,
      name: b.name || item.ref,
      sets: item.sets != null ? item.sets : b.sets,
      reps: item.reps != null ? item.reps : b.reps,
      rir: item.rir != null ? item.rir : b.rir,
      rest: item.rest != null ? item.rest : b.rest
    };
  }
  return null;
};
const fromEditRow = r => {
  if (r.kind === 'inline') {
    const base = r.full || {};
    return {
      inline: {
        id: base.id || uid('cx'),
        name: r.name || 'Esercizio',
        sets: numOr(r.sets, 3),
        reps: String(r.reps || '8-12'),
        rir: String(r.rir || '1-2'),
        rest: String(r.rest || '90s'),
        isCompound: !!base.isCompound,
        tags: base.tags || [],
        badges: base.badges || [],
        shortNote: base.shortNote || '',
        execution: base.execution || [],
        cues: base.cues || ''
      }
    };
  }
  const b = EXERCISE_DB[r.ref];
  if (b && String(b.sets) === String(r.sets) && String(b.reps) === String(r.reps) && String(b.rir) === String(r.rir) && String(b.rest) === String(r.rest)) return r.ref;
  return {
    ref: r.ref,
    sets: numOr(r.sets, 3),
    reps: String(r.reps),
    rir: String(r.rir),
    rest: String(r.rest)
  };
};
const toEditableSched = v8w => ({
  id: v8w.id || uid('sched'),
  name: v8w.name || 'Nuova scheda',
  subtitle: v8w.subtitle || '',
  nWeeks: Array.isArray(v8w.weeks) ? v8w.weeks.length : v8w.weeks || 3,
  storageKey: v8w.storageKey,
  days: (v8w.days || []).map((d, i) => ({
    id: d.id || 'd' + i,
    label: d.label || 'G' + (i + 1),
    dayName: d.dayName || '',
    color: d.color || '#86A8E6',
    subtitle: d.subtitle || '',
    dur: d.dur || '',
    exercises: (d.exercises || []).map(toEditRow).filter(Boolean)
  }))
});
const fromEditableSched = ed => ({
  format: 'v8w/1',
  id: ed.id,
  name: ed.name || 'Scheda',
  subtitle: ed.subtitle || '',
  weeks: Array.from({
    length: Math.max(1, numOr(ed.nWeeks, 3))
  }, (_, i) => i + 1),
  rotation: false,
  storageKey: ed.storageKey || 'sched_' + ed.id,
  days: ed.days.map(d => ({
    id: d.id,
    label: d.label,
    dayName: d.dayName,
    color: d.color,
    subtitle: d.subtitle,
    dur: d.dur,
    exercises: d.exercises.map(fromEditRow)
  }))
});

// Trasforma un programma integrato in una scheda .v8w modificabile
const configToV8w = (config, name, subtitle) => ({
  format: 'v8w/1',
  id: uid('sched'),
  name: name,
  subtitle: subtitle || '',
  weeks: config.weeks,
  rotation: !!config.rotation,
  days: (config.days || []).map(d => ({
    id: d.id,
    label: d.label,
    dayName: d.dayName,
    color: d.color,
    subtitle: d.subtitle,
    dur: d.dur,
    exercises: (config.exercises[d.id] || []).map(ex => EXERCISE_DB[ex.id] ? ex.id : {
      inline: ex
    })
  }))
});
const DAY_COLORS = ['#86A8E6', '#A893EC', '#D9B25E', '#62BDB3', '#6BBF8A', '#E0A374'];
