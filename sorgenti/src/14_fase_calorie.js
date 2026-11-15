// ---------- fase del ciclo: colori, ritmo atteso, verifica calorie ----------
const FASI = {
  massa: { label: 'Massa', col: '#6BBF8A', min: 0.2, max: 0.45, testo: '+0,2 / +0,45 kg a settimana' },
  mantenimento: { label: 'Mantenimento', col: '#86A8E6', min: -0.15, max: 0.15, testo: '±0,15 kg a settimana' },
  cut: { label: 'Cut', col: '#E0A374', min: -0.8, max: -0.35, testo: '−0,35 / −0,8 kg a settimana' }
};
const faseId = () => { const f = storage.get('fase'); return FASI[f] ? f : 'massa'; };
const faseAttiva = () => FASI[faseId()];

const dataOggi = () => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};
const nomeOggi = () => NOMI_GIORNI[GIORNI_SETT[new Date().getDay()]];

function oggiSiAllena() {
  try {
    const att = schedaAttiva();
    if (!att) return false;
    return (att.config.days || []).some(d => (d.dayName || '').toUpperCase() === nomeOggi());
  } catch (e) {
    return false;
  }
}

// ---------- coppia di diete: giorni di allenamento / giorni di riposo ----------
function coppiaDiete() {
  const tutte = storage.get('custom_diets') || [];
  const trova = id => id ? tutte.find(d => d.id === id) : null;
  let on = trova(storage.get('dieta_on'));
  let off = trova(storage.get('dieta_off'));
  if (!on) {
    const att = trova(storage.get('dieta_attiva'));
    on = att && att.dayType !== 'riposo' ? att : tutte.find(d => d.dayType === 'allenamento') || att || tutte[0] || null;
  }
  if (!off) {
    const pref = on ? String(on.id).replace(/_[^_]*$/, '') : '';
    off = tutte.find(d => d.dayType === 'riposo' && pref && String(d.id).indexOf(pref) === 0)
      || tutte.find(d => d.dayType === 'riposo') || on;
  }
  return { on, off, tutte };
}

// La dieta di oggi: segue il giorno della scheda; si puo forzare per la sola giornata
function dietaDiOggi() {
  const c = coppiaDiete();
  if (!c.on && !c.off) return { dieta: null, tipo: null, forzata: false };
  if (storage.get('dieta_auto') === false) {
    const a = c.tutte.find(d => d.id === storage.get('dieta_attiva')) || c.on || c.off;
    return { dieta: a, tipo: a ? a.dayType : null, forzata: false, manuale: true };
  }
  let tipo = oggiSiAllena() ? 'allenamento' : 'riposo';
  let forzata = false;
  const f = storage.get('dieta_oggi');
  if (f && f.data === dataOggi() && (f.tipo === 'allenamento' || f.tipo === 'riposo')) {
    tipo = f.tipo;
    forzata = true;
  }
  return { dieta: tipo === 'allenamento' ? c.on || c.off : c.off || c.on, tipo, forzata };
}

// ---------- verifica calorie dal peso medio ----------
const CARBO_BASE = ['f_basmati', 'f_riso', 'f_pasta', 'f_pastaint', 'f_couscous', 'f_farro', 'f_patate', 'f_patatedolci', 'f_avena', 'f_paneint', 'f_pane', 'f_gallette'];
function verificaCalorie() {
  const f = faseAttiva();
  const log = storage.get('peso') || {};
  const corrente = settimanaCorrente();
  const piene = Object.keys(log).map(Number)
    .filter(w => !isNaN(w) && w < corrente)
    .filter(w => GIORNI_SETT.filter(g => parseFloat((log[w] || {})[g]) > 0).length >= 3)
    .sort((a, b) => a - b);
  const stato0 = storage.get('calorie_auto') || {};
  const giorni = stato0.ultima ? Math.floor((Date.now() - new Date(stato0.ultima).getTime()) / 86400000) : 999;
  if (piene.length < 3) return { stato: 'pochi', piene: piene.length, fase: f, giorni, dovuta: false };
  const a = piene[piene.length - 3],
    b = piene[piene.length - 1];
  const ma = mediaSett(log[a]),
    mb = mediaSett(log[b]);
  const rate = (mb - ma) / (b - a);
  const stato = rate < f.min ? 'sotto' : rate > f.max ? 'sopra' : 'ok';
  return { stato, rate, da: a, a: b, ma, mb, fase: f, giorni, dovuta: giorni >= 14 };
}
function propostaCarbo(dieta, deltaC) {
  let best = null;
  (dieta.meals || []).forEach((m, mi) => (m.items || []).forEach((it, ii) => {
    if (CARBO_BASE.indexOf(it.ref) < 0) return;
    const per = per100Of(it);
    if (!per.c) return;
    const c = per.c * (parseFloat(it.g) || 0) / 100;
    if (!best || c > best.c) best = { mi, ii, c, per, it, pasto: m.name };
  }));
  if (!best) return null;
  const g0 = parseFloat(best.it.g) || 0;
  let dg = Math.round(deltaC / (best.per.c / 100) / 5) * 5;
  if (g0 + dg < 0) dg = -g0;
  return { mi: best.mi, ii: best.ii, dg, nome: nameOf(best.it), pasto: best.pasto, nuovoG: g0 + dg };
}
function registraVerifica(azione, dettagli) {
  const s = storage.get('calorie_auto') || {};
  const st = (s.storico || []).slice(0, 19);
  const ora = new Date().toISOString();
  storage.set('calorie_auto', { ultima: ora, storico: [{ quando: ora, azione, dettagli: dettagli || [] }].concat(st) });
}
function anteprimaVerifica(segno) {
  const c = coppiaDiete();
  const viste = {};
  return [c.on, c.off].filter(d => d && !viste[d.id] && (viste[d.id] = true)).map(d => {
    const p = propostaCarbo(d, 40 * segno);
    return p ? { id: d.id, nome: d.name, p } : null;
  }).filter(Boolean);
}
function applicaVerifica(segno) {
  const prev = anteprimaVerifica(segno);
  const tutte = storage.get('custom_diets') || [];
  const fatti = [];
  prev.forEach(x => {
    const k = tutte.findIndex(d => d.id === x.id);
    if (k < 0) return;
    const d = JSON.parse(JSON.stringify(tutte[k]));
    d.meals[x.p.mi].items[x.p.ii].g = x.p.nuovoG;
    if (d.target) d.target.c = Math.max(0, (parseFloat(d.target.c) || 0) + 40 * segno);
    tutte[k] = d;
    fatti.push(x.nome + ': ' + x.p.nome + ' ' + (x.p.dg > 0 ? '+' : '') + x.p.dg + ' g');
  });
  storage.set('custom_diets', tutte);
  registraVerifica(segno > 0 ? '+150 kcal' : '−150 kcal', fatti);
  return fatti;
}
const kgSett = v => (v > 0 ? '+' : v < 0 ? '−' : '') + String(Math.abs(Math.round(v * 100) / 100)).replace('.', ',') + ' kg/sett';
const minutiDi = t => {
  const m = String(t || '').match(/(\d+)[:.](\d+)/);
  return m ? +m[1] * 60 + +m[2] : 9999;
};

// ---------- migrazione una tantum ----------
(function migraV24() {
  try {
    if (storage.get('migrazione_v24')) return;
    const arch = storage.get('archivio') || [];
    let cambiato = false;
    [{ cfg: MAIN_CONFIG, label: 'V8.3.4 · cut', id: 'main' }, { cfg: SUMMER2_CONFIG, label: 'Estate · 4 giorni', id: 'summer2' }].forEach(p => {
      const log = storage.get(p.cfg.storageKey) || {};
      const st = statsBlocco(p.cfg, log);
      if (!st || !st.sessioni) return;
      if (arch.some(a => a.storageKey === p.cfg.storageKey && a.sessioni === st.sessioni)) return;
      arch.unshift({ id: 'blk_' + Date.now() + '_' + p.id, programma: p.label, storageKey: p.cfg.storageKey, progId: p.id, creato: Date.now(), dal: st.primo, al: st.ultimo, sessioni: st.sessioni, serie: st.serie, tonnellaggio: st.tonnellaggio, vol: st.vol, log, auto: true });
      cambiato = true;
    });
    if (cambiato) {
      try { localStorage.setItem(KEY_PREFIX + 'archivio', JSON.stringify(arch)); } catch (e) { return; } // spazio pieno: riprovo al prossimo avvio
    }
    const att = storage.get('scheda_attiva');
    const custom = storage.get('custom_schedules') || [];
    if ((att === 'main' || att === 'summer2' || !att) && custom.length) storage.set('scheda_attiva', custom[0].id);
    if (!storage.get('dieta_on')) {
      const cp = coppiaDiete();
      if (cp.on) storage.set('dieta_on', cp.on.id);
      if (cp.off) storage.set('dieta_off', cp.off.id);
    }
    if (!storage.get('fase')) storage.set('fase', 'massa');
    storage.set('migrazione_v24', true);
  } catch (e) {}
})();
