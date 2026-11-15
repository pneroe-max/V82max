// ============================================================
// REGISTRO · CARICO E DISCHI
// ============================================================
const plateCfg = () => {
  const c = storage.get('bilanciere') || {};
  return {
    barra: c.barra != null ? parseFloat(c.barra) : 20,
    disponibili: Array.isArray(c.disponibili) && c.disponibili.length ? c.disponibili : DISC.map(d => d.kg)
  };
};

// Scompone un carico totale nei dischi per lato.
function scomponi(totale, cfg) {
  const c = cfg || plateCfg();
  const lato = (totale - c.barra) / 2;
  if (isNaN(lato)) return {
    err: 'carico non valido'
  };
  if (lato < 0) return {
    err: 'sotto il peso del bilanciere (' + c.barra + ' kg)'
  };
  const lista = [];
  let resto = Math.round(lato * 100) / 100;
  DISC.filter(d => c.disponibili.indexOf(d.kg) >= 0).forEach(d => {
    const n = Math.floor(resto / d.kg + 1e-9);
    if (n > 0) {
      lista.push({
        d,
        n
      });
      resto = Math.round((resto - n * d.kg) * 100) / 100;
    }
  });
  return {
    lista,
    resto,
    lato
  };
}

// ============================================================
// REGISTRO · L'ULTIMA VOLTA CHE HAI FATTO QUESTO ESERCIZIO
// ============================================================
// Cerca a ritroso nelle settimane precedenti il log dello stesso esercizio.
function ultimaVolta(log, week, dayId, exIdx) {
  for (let w = week - 1; w >= 1; w--) {
    const d = log[w] && log[w][dayId];
    const rec = d && d.esercizi && d.esercizi[exIdx];
    if (!rec) continue;
    const reps = (rec.reps || []).map(r => parseInt(r, 10)).filter(r => !isNaN(r) && r > 0);
    if (!rec.kg || reps.length === 0) continue;
    return {
      week: w,
      kg: parseFloat(rec.kg),
      reps,
      rir: rec.rir,
      ts: d.ts || d.startedAt
    };
  }
  return null;
}

// Un esercizio va caricato a bilanciere?
const usaBilanciere = ex => {
  const twin = BUILTIN_TWIN[ex.id] ? EXERCISE_DB[BUILTIN_TWIN[ex.id]] : null;
  const eq = ex.equip || twin && twin.equip;
  if (eq) return eq === 'Bilanciere' || eq === 'Bilanciere EZ';
  return /bilanciere|panca|squat|stacco|rematore con bilanciere|military|lento/i.test(ex.name || '');
};

// ============================================================
// LAYOUT · AVANZAMENTO DELLA SEDUTA
// Una tacca per esercizio: piena se finito, a metà se iniziato.
// ============================================================
let _barraGiu = false;

// ============================================================
// REGISTRO · ELENCO UNIFICATO DELLE SCHEDE
// Integrate e personali nello stesso posto. Una sola è "attiva":
// la home e la dashboard seguono quella.
// ============================================================
const SCHEDE_INTEGRATE = () => [];
// Ripiego: solo se non c'è nessuna scheda personale, perché l'app non resti vuota
const SCHEDE_RIPIEGO = () => [{
  id: 'main',
  label: 'V8.3.4',
  sub: '5 giorni · blocco 8 settimane',
  config: MAIN_CONFIG,
  integrata: true
}, {
  id: 'summer2',
  label: 'Estate · 4 giorni',
  sub: 'Solo manubri · viaggio',
  config: SUMMER2_CONFIG,
  integrata: true
}];
let _cacheSchede = { raw: undefined, val: null };
function tutteLeSchede() {
  // le schede si ricostruiscono solo quando cambiano: prima a ogni render
  let raw = null;
  try { raw = localStorage.getItem(KEY_PREFIX + 'custom_schedules'); } catch (e) {}
  if (_cacheSchede.val && _cacheSchede.raw === raw) return _cacheSchede.val;
  const custom = (storage.get('custom_schedules') || []).map(s => {
    let cfg = null;
    try {
      cfg = rehydrateSchedule(s);
    } catch (e) {
      cfg = null;
    }
    return cfg ? {
      id: s.id,
      label: s.name || 'Scheda',
      sub: s.subtitle || '',
      config: cfg,
      raw: s,
      integrata: false
    } : null;
  }).filter(Boolean);
  const val = custom.length ? custom : SCHEDE_RIPIEGO();
  _cacheSchede = { raw, val };
  return val;
}
const schedaAttivaId = () => storage.get('scheda_attiva') || ((storage.get('custom_schedules') || [])[0] || {}).id || 'main';
function schedaAttiva() {
  const tutte = tutteLeSchede();
  return tutte.find(s => s.id === schedaAttivaId()) || tutte[0];
}

// ============================================================
// REGISTRO · SUPERSET E TECNICHE DI ESECUZIONE
// Nel .v8w un esercizio può portare due campi in più:
//   "sup": "A"    → superset: gli esercizi con la stessa lettera si alternano
//   "tec": "MYO"  → tecnica: cambia la struttura delle serie a schermo
// ============================================================
const TECNICHE = {
  MYO: {
    nome: 'Myo-reps',
    colore: '#A893EC',
    riga: (i, tot) => i === 0 ? 'ATTIVAZIONE' : 'MINI ' + i,
    recupero: () => 20,
    breve: 'Una serie di attivazione a RIR 0-1, poi mini-serie da 3-5 rep staccando 20 secondi ogni volta.',
    passi: ['Serie di attivazione: 12-15 ripetizioni fino a RIR 0-1', 'Stacca 20 secondi restando in posizione, senza mollare il peso', 'Mini-serie da 3-5 ripetizioni', 'Ripeti finché non chiudi più 3 ripetizioni pulite: le mini-serie in scheda sono un massimo, non un obbligo']
  },
  LLP: {
    nome: 'Parziali allungati',
    colore: '#62BDB3',
    riga: (i, tot) => i === tot - 1 ? 'PARZIALI' : String(i + 1).padStart(2, '0'),
    recupero: () => null,
    breve: "Dopo l'ultima serie completa, continui solo nella metà bassa del movimento.",
    passi: ['Esegui le serie a ROM completo come previsto', "Sull'ultima, raggiunto il cedimento tecnico, non fermarti", 'Continua 5-8 ripetizioni nella sola metà allungata', 'Nessun rimbalzo: la posizione allungata è quella che stimola']
  },
  AMRAP: {
    nome: 'Ultima serie a esaurimento',
    colore: '#D9B25E',
    riga: (i, tot) => i === tot - 1 ? 'AMRAP' : String(i + 1).padStart(2, '0'),
    recupero: () => null,
    breve: "Sull'ultima serie vai a RIR 0 e registri quante ripetizioni chiudi.",
    passi: ['Serie normali come da scheda', "Sull'ultima, stesso carico, massimo numero di ripetizioni", 'Fermati alla perdita di tecnica, non oltre', "Il numero serve a stimare l'1RM: registralo con precisione"]
  },
  ECC: {
    nome: 'Eccentrica accentuata',
    colore: '#6BBF8A',
    riga: i => String(i + 1).padStart(2, '0'),
    recupero: () => null,
    breve: 'Discesa controllata in 3 secondi su ogni ripetizione.',
    passi: ['Conta tre secondi nella fase di discesa', 'Nessuna pausa in fondo: inverti subito', 'Salita normale, senza slancio', 'Se non riesci a contare fino a tre, il carico è troppo alto']
  },
  DROP: {
    nome: 'Drop set',
    colore: '#62BDB3',
    riga: (i, tot) => i === tot - 1 ? 'DROP' : String(i + 1).padStart(2, '0'),
    recupero: () => null,
    breve: "Sull'ultima serie togli carico e riparti subito, senza recupero.",
    passi: ["Porta l'ultima serie a RIR 0", 'Togli il 20-30% del carico in pochi secondi', 'Riparti subito fino a nuovo cedimento', 'Una sola riduzione: due o più aggiungono fatica senza stimolo']
  }
};

// Etichetta di riga della serie secondo la tecnica
// Ripetizioni e RIR attesi nella singola fase: nelle myo-reps le mini-serie
// non hanno lo stesso bersaglio della serie di attivazione.
const repFase = (tec, i, tot, base) => {
  if (tec === 'MYO') return i === 0 ? base : '3-5';
  if (tec === 'LLP') return i === tot - 1 ? '5-8' : base;
  if (tec === 'AMRAP') return i === tot - 1 ? 'max' : base;
  return base;
};
const rirFase = (tec, i, tot, base) => {
  if (tec === 'MYO') return i === 0 ? '0-1' : '0';
  if (tec === 'AMRAP' || tec === 'DROP' || tec === 'LLP') return i === tot - 1 ? '0' : base;
  return base;
};
const rigaSerie = (tec, i, tot) => {
  const t = TECNICHE[tec];
  return t ? t.riga(i, tot) : String(i + 1).padStart(2, '0');
};
// Recupero specifico fra le serie (le myo-reps hanno stacchi brevissimi)
const recuperoSerie = (tec, i, standard) => {
  const t = TECNICHE[tec];
  const r = t && t.recupero ? t.recupero(i) : null;
  return r != null ? r : standard;
};

// ============================================================
// PESO · INSERIMENTO RAPIDO
// Un campo solo: scrive nel giorno di oggi della settimana corrente.
// ============================================================
const GIORNI_SETT = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
const PUNTI = ['Vita ombelicale', 'Collo', 'Petto', 'Braccio (flesso)', 'Coscia (max)', 'Polpaccio', 'Avambraccio'];
const NOMI_GIORNI = {
  lun: 'LUN',
  mar: 'MAR',
  mer: 'MER',
  gio: 'GIO',
  ven: 'VEN',
  sab: 'SAB',
  dom: 'DOM'
};

// La settimana corrente segue la scheda attiva: prima non ancora completata.
function settimanaCorrente() {
  // La settimana del PESO segue il calendario, non la scheda di allenamento:
  // se ricominci un blocco il peso non deve tornare indietro nel tempo.
  try {
    const lunedi = (d) => {
      const x = new Date(d); const g = (x.getDay() + 6) % 7;
      x.setHours(0,0,0,0); x.setDate(x.getDate() - g); return x;
    };
    const oggiLun = lunedi(new Date());
    const log = storage.get('peso') || {};
    const numeri = Object.keys(log).map(Number).filter(n => !isNaN(n));
    const maxReg = numeri.length ? Math.max.apply(null, numeri) : 0;
    let anc = storage.get('peso_ancora');
    if (!anc || !anc.lunedi || !anc.settimana || maxReg > anc.settimana) {
      if (!maxReg) return 1;
      anc = { settimana: maxReg, lunedi: oggiLun.toISOString().slice(0, 10) };
      storage.set('peso_ancora', anc);
    }
    const diff = Math.round((oggiLun - lunedi(anc.lunedi)) / 604800000);
    return Math.max(1, anc.settimana + diff);
  } catch (e) { return 1; }
}
const mediaSett = r => {
  const v = GIORNI_SETT.map(g => parseFloat((r || {})[g])).filter(x => !isNaN(x) && x > 0);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
};
