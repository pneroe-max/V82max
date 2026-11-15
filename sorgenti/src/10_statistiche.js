// ============================================================
// V10.2 · DATABASE ESERCIZI — consultazione
// ============================================================
const EQUIP_LIST = ['Manubri', 'Bilanciere', 'Cavi', 'Macchina', 'Corpo libero', 'Bilanciere EZ', 'Elastici', 'Varie'];
const TAG_LIST = ['PETTO', 'DORSO', 'D.ANT', 'D.MED', 'D.POST', 'BI', 'TRI', 'AVB', 'QUAD', 'HAM', 'GLUTE', 'POLP', 'CORE'];

// ============================================================
// V11.2 · VOLUME SETTIMANALE PER GRUPPO MUSCOLARE
// ============================================================
// Convenzione: il primo tag dell'esercizio prende 1 serie piena,
// i tag successivi mezza serie (pratica standard per il volume indiretto).
const VOL_RANGES = {
  min: 10,
  max: 20
};
const VOL_MUSCLES = ['PETTO', 'DORSO', 'D.ANT', 'D.MED', 'D.POST', 'BI', 'TRI', 'QUAD', 'HAM', 'GLUTE', 'POLP', 'CORE', 'AVB'];
function computeVolume(config, weekLog) {
  const out = {};
  VOL_MUSCLES.forEach(m => {
    out[m] = 0;
  });
  if (!weekLog) return out;
  (config.days || []).forEach(day => {
    const dayLog = weekLog[day.id];
    if (!dayLog || !dayLog.esercizi) return;
    const list = config.exercises[day.id] || [];
    Object.entries(dayLog.esercizi).forEach(_ref62 => {
      let _ref63 = _slicedToArray(_ref62, 2),
        idx = _ref63[0],
        rec = _ref63[1];
      const ex = list[parseInt(idx, 10)];
      if (!ex) return;
      const done = (rec.sets_done || []).filter(Boolean).length;
      if (!done) return;
      (ex.tags || []).forEach((t, i) => {
        if (out[t] === undefined) return;
        out[t] += done * (i === 0 ? 1 : 0.5);
      });
    });
  });
  return out;
}

// ============================================================
// V11.2 · TDEE ADATTIVO
// ============================================================
// Densità energetica del peso perso/guadagnato, calcolata dai tessuti anziché
// dal forfait di 7700, che sovrastima nei soggetti magri (Hall 2008).
const KCAL_PER_KG = 8200;

// ============================================================
// V11.2 · SOSTITUZIONE ESERCIZIO AL VOLO
// ============================================================
const SWAP_EQUIP = ['Manubri', 'Bilanciere', 'Bilanciere EZ', 'Cavi', 'Corpo libero'];

// ============================================================
// V11.2 · EXPORT CSV
// ============================================================
const csvEsc = v => {
  const s = v == null ? '' : String(v);
  return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const toCSV = rows => '\uFEFF' + rows.map(r => r.map(csvEsc).join(';')).join('\r\n');
function exportAllenamentiCSV() {
  const rows = [['Programma', 'Settimana', 'Giorno', 'N', 'Esercizio', 'Gruppi', 'Kg', 'Rep1', 'Rep2', 'Rep3', 'Rep4', 'RIR', 'SerieFatte', 'Completato']];
  const progs = [{
    label: 'V8.3.4',
    config: MAIN_CONFIG
  }, {
    label: 'Estate',
    config: SUMMER2_CONFIG
  }].concat((storage.get('custom_schedules') || []).map(s => {
    try {
      return {
        label: s.name || 'Scheda',
        config: rehydrateSchedule(s)
      };
    } catch (e) {
      return null;
    }
  }).filter(Boolean));
  progs.forEach(p => {
    const log = storage.get(p.config.storageKey) || {};
    Object.keys(log).sort((a, b) => a - b).forEach(week => {
      (p.config.days || []).forEach(day => {
        const dl = log[week][day.id];
        if (!dl || !dl.esercizi) return;
        const list = p.config.exercises[day.id] || [];
        Object.keys(dl.esercizi).sort((a, b) => a - b).forEach(idx => {
          const rec = dl.esercizi[idx];
          const ex = list[parseInt(idx, 10)];
          if (!ex) return;
          const reps = rec.reps || [];
          rows.push([p.label, week, day.label, parseInt(idx, 10) + 1, ex.name, (ex.tags || []).join('/'), rec.kg || '', reps[0] || '', reps[1] || '', reps[2] || '', reps[3] || '', rec.rir || '', (rec.sets_done || []).filter(Boolean).length, dl.completato ? 'si' : 'no']);
        });
      });
    });
  });
  downloadFile('v8_allenamenti.csv', toCSV(rows), 'text/csv');
  return rows.length - 1;
}
function exportPesoCSV() {
  const log = storage.get('peso') || {};
  const rows = [['Settimana', 'Lun', 'Mer', 'Ven', 'Dom', 'Media', 'Note']];
  Object.keys(log).map(Number).sort((a, b) => a - b).forEach(w => {
    const r = log[w] || {};
    rows.push([w, r.lun || '', r.mer || '', r.ven || '', r.dom || '', r.media ? r.media.toFixed(2) : '', r.note || '']);
  });
  downloadFile('v8_peso.csv', toCSV(rows), 'text/csv');
  return rows.length - 1;
}
function exportDieteCSV() {
  const diets = storage.get('custom_diets') || [];
  const rows = [['Dieta', 'Tipo', 'Pasto', 'Ora', 'Alimento', 'Grammi', 'Proteine', 'Carboidrati', 'Grassi', 'Kcal']];
  diets.forEach(d => (d.meals || []).forEach(m => (m.items || []).forEach(it => {
    const mm = macrosOf(it);
    rows.push([d.name, d.dayType || '', m.name, m.time || '', nameOf(it), it.g, r1(mm.p), r1(mm.c), r1(mm.f), r0(mm.kcal)]);
  })));
  downloadFile('v8_diete.csv', toCSV(rows), 'text/csv');
  return rows.length - 1;
}

// ============================================================
// V11.4 · CONFERME PER LE AZIONI DISTRUTTIVE
// ============================================================
let _confirmSetter = null;
const askConfirm = (titolo, dettaglio, onOk, verbo) => {
  if (_confirmSetter) _confirmSetter({
    titolo,
    dettaglio,
    onOk,
    verbo
  });else if (window.confirm(titolo)) onOk();
};

// ============================================================
// V11.4 · AVVISO SE UN SALVATAGGIO FALLISCE
// ============================================================
let _storageErrSetter = null;
const notifyStorageError = () => {
  if (_storageErrSetter) _storageErrSetter(Date.now());
};

// Spazio occupato dai dati dell'app (per le impostazioni)
const storageUsage = () => {
  let bytes = 0,
    n = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(KEY_PREFIX) === 0) {
        bytes += (localStorage.getItem(k) || '').length + k.length;
        n++;
      }
    }
  } catch (e) {}
  return {
    kb: Math.round(bytes / 1024),
    voci: n
  };
};

// ============================================================
// V11.4 · STORICO DEI BLOCCHI
// ============================================================
const fmtData = ts => {
  if (!ts) return '—';
  const d = new Date(ts);
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
};

// Statistiche complete di un blocco: sessioni, serie, tonnellaggio, volume per muscolo, date
function statsBlocco(config, log) {
  const vol = {};
  VOL_MUSCLES.forEach(m => {
    vol[m] = 0;
  });
  let sessioni = 0,
    serie = 0,
    tonnellaggio = 0,
    primo = null,
    ultimo = null;
  Object.keys(log || {}).forEach(week => {
    (config.days || []).forEach(day => {
      const dl = log[week][day.id];
      if (!dl || !dl.esercizi) return;
      let serieGiorno = 0;
      const list = config.exercises[day.id] || [];
      Object.entries(dl.esercizi).forEach(_ref69 => {
        let _ref70 = _slicedToArray(_ref69, 2),
          idx = _ref70[0],
          rec = _ref70[1];
        const ex = list[parseInt(idx, 10)];
        const fatte = (rec.sets_done || []).filter(Boolean).length;
        if (!fatte) return;
        serieGiorno += fatte;
        const kg = parseFloat(rec.kg) || 0;
        (rec.reps || []).forEach((r, i) => {
          if ((rec.sets_done || [])[i] && kg > 0) tonnellaggio += kg * (parseInt(r, 10) || 0);
        });
        if (ex) (ex.tags || []).forEach((t, i) => {
          if (vol[t] !== undefined) vol[t] += fatte * (i === 0 ? 1 : 0.5);
        });
      });
      if (serieGiorno > 0) {
        sessioni++;
        serie += serieGiorno;
      }
      const ts = dl.startedAt || dl.ts;
      if (ts) {
        if (!primo || ts < primo) primo = ts;
        if (!ultimo || ts > ultimo) ultimo = ts;
      }
    });
  });
  return {
    sessioni,
    serie,
    tonnellaggio: Math.round(tonnellaggio),
    vol,
    primo,
    ultimo
  };
}
const PROGRAMMI = () => ((storage.get('custom_schedules') || []).length ? [] : [{
  id: 'main',
  label: 'V8.3.4',
  config: MAIN_CONFIG
}]).concat((storage.get('custom_schedules') || []).map(s => {
  try {
    return {
      id: s.id,
      label: s.name || 'Scheda',
      config: rehydrateSchedule(s)
    };
  } catch (e) {
    return null;
  }
}).filter(Boolean));
