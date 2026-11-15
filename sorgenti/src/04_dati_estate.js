// ============= WORKOUT =============

const MAIN_CONFIG = {
  exercises: EXERCISES,
  days: DAYS,
  blocks: BLOCKS,
  phase: WEEK_PHASE,
  applyLogic: applyBlockLogic,
  suggestWeight: getSuggestedWeight,
  storageKey: 'workouts',
  weeks: [1, 2, 3, 4, 5, 6, 7, 8],
  rotation: true
};

// ============= ESTATE / VIAGGIO =============

// Logica progressione estiva (riusa il motore, con SUMMER_PHASE)
const summerApplyLogic = (exercise, week) => {
  let sets = exercise.sets,
    reps = exercise.reps,
    isCompound = exercise.isCompound;
  const phase = SUMMER_PHASE[week] || SUMMER_PHASE[1];
  const rir = isCompound ? phase.compRir : phase.accRir;
  let outReps = reps;
  if (!reps.includes('+') && !reps.includes('AMRAP')) outReps = repTargetForPhase(reps, phase.repPos);
  return {
    sets,
    reps: outReps,
    rir,
    rest: exercise.rest,
    blockName: phase.name,
    variable: phase.variable,
    loadCue: phase.load
  };
};
const SUMMER_BLOCKS = [{
  id: 'S',
  label: 'ESTATE · Mantenimento',
  weeks: [1, 2, 3],
  color: '#D9B25E',
  reps: 'rep salgono al top',
  rir: 'conservativo'
}];
const SUMMER_CONFIG = {
  exercises: SUMMER_EXERCISES,
  days: SUMMER_DAYS,
  blocks: SUMMER_BLOCKS,
  phase: SUMMER_PHASE,
  applyLogic: summerApplyLogic,
  suggestWeight: getSuggestedWeight,
  storageKey: 'summer_workouts',
  weeks: [1, 2, 3],
  rotation: false
};

// ============================================================
// MOTORE PROGRESSIONE PARAMETRICO + PROGRAMMA ESTIVO V2 (4 giorni)
// ============================================================

// Come summerApplyLogic ma la fase è iniettata (riusabile da più schede).
const makeApplyLogic = phaseMap => (exercise, week) => {
  let sets = exercise.sets,
    reps = exercise.reps,
    isCompound = exercise.isCompound;
  const phase = phaseMap[week] || phaseMap[1];
  // deload: metà serie, arrotondate per eccesso
  if ((phase.loadCue || phase.load) === 'deload') sets = Math.max(1, Math.ceil(sets / 2));
  const rir = isCompound ? phase.compRir : phase.accRir;
  let outReps = reps;
  if (!reps.includes('+') && !reps.includes('AMRAP')) outReps = repTargetForPhase(reps, phase.repPos);
  return {
    sets,
    reps: outReps,
    rir,
    rest: exercise.rest,
    blockName: phase.name,
    variable: phase.variable,
    loadCue: phase.load
  };
};

// ===== ESTATE V2 (viaggio: solo manubri, 4 giorni bilanciati) =====
const SUMMER2_DAYS = [{
  id: 's2_push',
  label: 'PUSH',
  dayName: 'LUN',
  color: '#86A8E6',
  subtitle: 'Petto / Spalle / Tricipiti',
  dur: '~45 min'
}, {
  id: 's2_pull',
  label: 'PULL',
  dayName: 'MAR',
  color: '#A893EC',
  subtitle: 'Dorso / Bicipiti / Post.',
  dur: '~45 min'
}, {
  id: 's2_legs',
  label: 'GAMBE',
  dayName: 'GIO',
  color: '#D9B25E',
  subtitle: 'Quad / Ham / Glutei / Polp',
  dur: '~45 min'
}, {
  id: 's2_upper',
  label: 'UPPER',
  dayName: 'VEN',
  color: '#62BDB3',
  subtitle: "Tutto l'alto · bilanciato",
  dur: '~45 min'
}];
const SUMMER2_EXERCISES = {
  s2_push: [{
    id: 's2p_1',
    name: 'Panca piana manubri',
    sets: 4,
    reps: '8-12',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['PETTO'],
    badges: ['C'],
    shortNote: "Compound petto. Coi manubri ROM più ampio del bilanciere.",
    execution: ["Sdraiato su panca piana, manubri sopra il petto", "Discesa controllata fino all'altezza del petto, gomiti ~45°", "Fermo 1 sec in basso per lo stretch", "Spingi senza sbattere in alto e senza bloccare del tutto i gomiti"],
    cues: "Scapole retratte e depresse. Non far toccare i manubri in alto per mantenere tensione."
  }, {
    id: 's2p_2',
    name: 'Spinte sopra la testa (seduto/in piedi)',
    sets: 3,
    reps: '8-12',
    rir: '1-2',
    rest: '90s',
    isCompound: true,
    tags: ['D.ANT', 'D.MED'],
    badges: ['C'],
    shortNote: "Deltoide anteriore/mediale. Schiena protetta, core attivo.",
    execution: ["Manubri all'altezza delle spalle, gomiti leggermente avanti", "Spinta verso l'alto lungo un arco naturale", "Manubri si avvicinano in alto senza scontrarsi", "Eccentrica controllata"],
    cues: "Niente iperlordosi lombare. Gomiti a ~30° dal corpo, non a 90°."
  }, {
    id: 's2p_3',
    name: 'Croci su panca (o a terra)',
    sets: 3,
    reps: '12-15',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['PETTO'],
    badges: ['SMH'],
    shortNote: "Petto in stretch. Movimento dalle spalle, non dalle braccia.",
    execution: ["Manubri sopra il petto, gomiti morbidi e fissi", "Apri sentendo lo stiramento del pettorale", "Pausa 1 sec nel massimo allungamento", "Chiudi senza far toccare i manubri"],
    cues: "Gomiti leggermente flessi e bloccati. Niente kickback col peso."
  }, {
    id: 's2p_4',
    name: 'Alzate laterali manubri',
    sets: 3,
    reps: '15-20',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.MED'],
    badges: ['SMH'],
    shortNote: "Deltoide mediale. Il controllo conta più del carico.",
    execution: ["In piedi, manubri ai lati", "Salita laterale guidata dal gomito fino all'altezza spalla", "Pausa breve in alto, eccentrica 2 sec"],
    cues: "Spalle basse, niente slancio del busto. Mignolo leggermente in alto."
  }, {
    id: 's2p_5',
    name: 'French press manubrio (overhead)',
    sets: 3,
    reps: '10-15',
    rir: '1',
    rest: '75s',
    isCompound: false,
    tags: ['TRI'],
    badges: ['SMH'],
    shortNote: "Tricipiti, capo lungo in stretch dietro la testa.",
    execution: ["Seduto/sdraiato, manubrio sopra la testa a due mani", "Gomiti fissi e stretti puntati in alto", "Discesa dietro la nuca (stretch capo lungo)", "Estensione fino a quasi blocco gomito"],
    cues: "Solo gli avambracci si muovono. Gomiti che non si aprono."
  }, {
    id: 's2p_6',
    name: 'Dip tra due appoggi (o kickback)',
    sets: 2,
    reps: '12-15',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['TRI'],
    badges: [],
    shortNote: "Finisher tricipiti/petto basso a corpo libero. Alt: kickback manubrio.",
    execution: ["Mani su due superfici stabili alla stessa altezza", "Scendi piegando i gomiti indietro (non aperti)", "Risali estendendo, senza bloccare di scatto"],
    cues: "Busto leggermente avanti per il petto, verticale per i tricipiti."
  }],
  s2_pull: [{
    id: 's2l_1',
    name: 'Rematore manubri (bent-over)',
    sets: 4,
    reps: '8-12',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['DORSO', 'D.POST'],
    badges: ['C'],
    shortNote: "Spessore dorsale. Busto ~45°, schiena neutra.",
    execution: ["Busto inclinato a ~45°, manubri appesi", "Tira coi gomiti verso i fianchi", "Stringi le scapole in contrazione", "Eccentrica 2 sec, allunga bene in basso"],
    cues: "Niente curva lombare. Gomiti che scorrono lungo i fianchi."
  }, {
    id: 's2l_2',
    name: 'Rematore manubrio 1 braccio',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '90s',
    isCompound: true,
    tags: ['DORSO'],
    badges: ['C'],
    shortNote: "Dorsali, ROM ampio. Ginocchio e mano in appoggio.",
    execution: ["Ginocchio e mano dello stesso lato in appoggio", "Braccio libero teso in basso (stretch lat)", "Tira il manubrio verso l'anca", "Eccentrica controllata fino all'allungo completo"],
    cues: "Tira col gomito. Niente rotazione del busto per aiutarti."
  }, {
    id: 's2l_3',
    name: 'Pullover manubrio',
    sets: 3,
    reps: '12-15',
    rir: '1',
    rest: '75s',
    isCompound: false,
    tags: ['DORSO'],
    badges: ['SMH'],
    shortNote: "Lat in stretch. Braccia quasi tese.",
    execution: ["Sdraiato, manubrio a due mani sopra il petto", "Braccia quasi tese (gomito leggermente flesso e fisso)", "Scendi dietro la testa finché senti tirare i dorsali", "Risali controllando"],
    cues: "È estensione di spalla, non piega del gomito."
  }, {
    id: 's2l_4',
    name: 'Alzate posteriori (busto in avanti)',
    sets: 3,
    reps: '15-20',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.POST'],
    badges: ['SMH'],
    shortNote: "Deltoide posteriore. Volume alto, controllo.",
    execution: ["Busto inclinato in avanti, manubri appesi", "Apri sul piano dei deltoidi posteriori, gomiti morbidi", "Pausa 1 sec a fine ROM", "Ritorno controllato"],
    cues: "Niente squeeze dei trapezi. Pollici in basso a fine rep."
  }, {
    id: 's2l_5',
    name: 'Curl manubri (alternato, supino)',
    sets: 3,
    reps: '10-15',
    rir: '1',
    rest: '75s',
    isCompound: false,
    tags: ['BI'],
    badges: [],
    shortNote: "Bicipite. Supinazione completa in salita.",
    execution: ["In piedi, gomiti fissi ai fianchi", "Curl ruotando il polso (supinazione)", "Squeeze in alto", "Eccentrica 2 sec"],
    cues: "Gomito fermo. Niente swing del busto."
  }, {
    id: 's2l_6',
    name: 'Curl a martello (hammer)',
    sets: 3,
    reps: '10-15',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['BI'],
    badges: [],
    shortNote: "Brachiale + avambraccio. Presa neutra.",
    execution: ["Manubri presa neutra (palmi affacciati)", "Curl mantenendo la presa neutra", "Squeeze in alto, eccentrica controllata"],
    cues: "Gomiti fissi. Frena la discesa."
  }],
  s2_legs: [{
    id: 's2g_1',
    name: 'Affondo bulgaro manubri',
    sets: 4,
    reps: '8-12',
    rir: '1',
    rest: '2:00',
    isCompound: true,
    tags: ['QUAD', 'GLUTE'],
    badges: ['SMH'],
    shortNote: "Quad+gluteo. Rep PER GAMBA. Il più prezioso coi manubri.",
    execution: ["Piede posteriore rialzato su panca/sedia", "Manubri ai lati, busto leggermente avanti", "Scendi verticale finché la coscia è sotto il parallelo", "Spingi col tallone anteriore. Finisci una gamba poi cambia"],
    cues: "Profondità = più stretch del quad. Ginocchio segue la punta, non cede dentro."
  }, {
    id: 's2g_2',
    name: 'Stacco rumeno manubri (RDL)',
    sets: 4,
    reps: '10-12',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['HAM', 'GLUTE'],
    badges: ['SMH'],
    shortNote: "Femorali+glutei. Eccentrica 3 sec, schiena neutra.",
    execution: ["In piedi, manubri davanti alle cosce", "Hip hinge: bacino indietro, busto avanti", "Manubri scivolano lungo le gambe fino a stretch", "Eccentrica 3 sec, risali contraendo i glutei"],
    cues: "Senti lo stretch dei femorali, non la lombare. Non curvare la schiena."
  }, {
    id: 's2g_3',
    name: 'Goblet squat',
    sets: 3,
    reps: '12-15',
    rir: '1',
    rest: '90s',
    isCompound: false,
    tags: ['QUAD'],
    badges: ['SMH'],
    shortNote: "Quad. Un manubrio al petto, sotto il parallelo.",
    execution: ["Manubrio tenuto verticale al petto", "Scendi in squat sotto il parallelo, busto eretto", "Spingi coi talloni risalendo"],
    cues: "Talloni a terra. Rep alte vicino al cedimento coi carichi leggeri."
  }, {
    id: 's2g_4',
    name: 'Nordic curl (o leg curl con slider)',
    sets: 3,
    reps: '6-10',
    rir: '1',
    rest: '90s',
    isCompound: false,
    tags: ['HAM'],
    badges: ['SMH'],
    shortNote: "Femorali. Tutto nell'eccentrica lenta 3-4 sec.",
    execution: ["In ginocchio, caviglie bloccate (sotto panca o manubrio pesante)", "Busto e cosce in linea, glutei contratti", "Scendi il più lento possibile frenando coi femorali", "Risali aiutandoti con le mani se serve"],
    cues: "Eccentriche assistite se 6 rep complete sono troppe."
  }, {
    id: 's2g_5',
    name: 'Hip thrust manubrio',
    sets: 3,
    reps: '12-15',
    rir: '1',
    rest: '75s',
    isCompound: false,
    tags: ['GLUTE'],
    badges: [],
    shortNote: "Glutei. Spalle su panca, pausa 1 sec in alto.",
    execution: ["Schiena alta appoggiata su panca/divano", "Manubrio sul bacino (usa un cuscino)", "Spingi coi talloni allineando anche-spalle-ginocchia", "Pausa 1 sec in massima contrazione"],
    cues: "Mento al petto, costole basse. Spinta dai glutei, non dalla lombare."
  }, {
    id: 's2g_6',
    name: 'Calf raise in piedi manubri',
    sets: 4,
    reps: '15-20',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['POLP'],
    badges: ['SMH'],
    shortNote: "Polpacci. Su un gradino, stretch 1-2 sec in basso.",
    execution: ["Avampiede su un gradino, manubri in mano", "Scendi col tallone sotto il gradino (stretch)", "Pausa 1-2 sec in basso", "Salita completa fino a max contrazione"],
    cues: "Niente bouncing. Escursione piena, rep alte controllate."
  }],
  s2_upper: [{
    id: 's2u_1',
    name: 'Panca inclinata manubri 30°',
    sets: 3,
    reps: '10-12',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['PETTO', 'D.ANT'],
    badges: ['C'],
    shortNote: "Alto petto. Discesa controllata e ampia.",
    execution: ["Panca a 30°, manubri sopra il petto alto", "Discesa fino a stretch del pettorale superiore", "Spingi convergendo leggermente in alto"],
    cues: "Non oltre 30-45°: oltre diventa spalla-dominante."
  }, {
    id: 's2u_2',
    name: 'Rematore manubri',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '90s',
    isCompound: true,
    tags: ['DORSO'],
    badges: ['C'],
    shortNote: "Spessore dorsale, come nel giorno Pull.",
    execution: ["Busto ~45°, manubri appesi", "Tira coi gomiti verso i fianchi", "Squeeze scapole, eccentrica controllata"],
    cues: "Schiena neutra. Priorità spessore."
  }, {
    id: 's2u_3',
    name: 'Arnold press (o shoulder press)',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '90s',
    isCompound: true,
    tags: ['D.ANT', 'D.MED'],
    badges: ['C'],
    shortNote: "Deltoidi completi. Ruota i palmi in salita.",
    execution: ["Partenza manubri davanti, palmi verso di te", "Ruota i palmi in avanti mentre spingi in alto", "Discesa invertendo la rotazione, controllata"],
    cues: "Core attivo, niente iperlordosi. Movimento fluido."
  }, {
    id: 's2u_4',
    name: 'Alzate laterali manubri',
    sets: 3,
    reps: '15-20',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.MED'],
    badges: ['SMH'],
    shortNote: "Volume extra deltoide mediale.",
    execution: ["In piedi, manubri ai lati", "Salita laterale guidata dal gomito", "Eccentrica 2 sec"],
    cues: "Spalle basse, movimento pulito e costante."
  }, {
    id: 's2u_5',
    name: 'Superset Curl + French press',
    sets: 3,
    reps: '12-15',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['BI', 'TRI'],
    badges: ['MYO'],
    shortNote: "Braccia. I due esercizi di fila senza pausa: pump di fine settimana.",
    execution: ["Curl manubri 12-15 rep", "Subito, senza pausa, French press manubrio 12-15 rep", "Riposo solo a fine coppia"],
    cues: "Ottimo pump. Gomiti fissi su entrambi gli esercizi."
  }, {
    id: 's2u_6',
    name: 'Croci o Pullover (accessorio)',
    sets: 2,
    reps: '15',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['PETTO', 'DORSO'],
    badges: ['SMH'],
    shortNote: "Accessorio finale a scelta, sul gruppo più indietro.",
    execution: ["Croci per il petto OPPURE pullover per il dorso", "ROM completo con stretch marcato", "Controllo in entrambe le fasi"],
    cues: "Scegli in base a cosa senti più carente a fine settimana."
  }]
};
const SUMMER2_PHASE = {
  1: {
    name: 'ADATTAMENTO',
    variable: 'Stabilisci i carichi',
    repPos: 'bottom',
    compRir: '2',
    accRir: '1',
    load: 'base'
  },
  2: {
    name: 'ACCUMULO REP',
    variable: '+1 rep · carico fermo',
    repPos: 'mid',
    compRir: '1-2',
    accRir: '0-1',
    load: 'hold'
  },
  3: {
    name: 'PICCO REP',
    variable: '+1 rep → top range',
    repPos: 'top',
    compRir: '1',
    accRir: '0-1',
    load: 'hold'
  }
};
const SUMMER2_BLOCKS = [{
  id: 'S2',
  label: 'ESTATE · 4 giorni · Mantenimento',
  weeks: [1, 2, 3],
  color: '#62BDB3',
  reps: 'rep salgono al top',
  rir: 'conservativo'
}];
const SUMMER2_CONFIG = {
  exercises: SUMMER2_EXERCISES,
  days: SUMMER2_DAYS,
  blocks: SUMMER2_BLOCKS,
  phase: SUMMER2_PHASE,
  applyLogic: makeApplyLogic(SUMMER2_PHASE),
  suggestWeight: getSuggestedWeight,
  storageKey: 'summer2_workouts',
  weeks: [1, 2, 3],
  rotation: false
};
