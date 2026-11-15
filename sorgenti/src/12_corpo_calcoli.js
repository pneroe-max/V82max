// ============================================================
// COMPOSIZIONE · STIME E FIGURA
// Grasso: formula Navy (vita, collo, altezza). Errore dichiarato ±3-4%.
// Massa magra: FFMI normalizzato.
// ============================================================
function stimaComposizione(_ref91) {
  let peso = _ref91.peso,
    vita = _ref91.vita,
    collo = _ref91.collo,
    altezza = _ref91.altezza;
  const p = parseFloat(peso),
    v = parseFloat(vita),
    c = parseFloat(collo),
    h = parseFloat(altezza);
  if (!p || !v || !c || !h || v <= c) return null;
  // Navy, versione metrica per uomini
  const bf = 495 / (1.0324 - 0.19077 * Math.log10(v - c) + 0.15456 * Math.log10(h)) - 450;
  if (!isFinite(bf) || bf <= 0 || bf > 60) return null;
  const hm = h / 100;
  const ffm = p * (1 - bf / 100);
  const ffmi = ffm / (hm * hm) + 6.1 * (1.8 - hm); // normalizzato all'altezza
  return {
    bf: Math.round(bf * 10) / 10,
    ffm: Math.round(ffm * 10) / 10,
    ffmi: Math.round(ffmi * 10) / 10
  };
}
function giudizioBF(bf) {
  if (bf < 10) return {
    t: 'molto asciutto',
    c: '#62BDB3',
    n: 'Sotto il 10% mantenere è difficile e la performance cala. Fascia da gara, non da blocco lungo.'
  };
  if (bf < 14) return {
    t: 'asciutto',
    c: '#6BBF8A',
    n: 'Fascia ideale per far partire una fase di crescita: la ripartizione dei nutrienti è favorevole.'
  };
  if (bf < 18) return {
    t: 'nella norma',
    c: '#6BBF8A',
    n: 'Zona sana e sostenibile. Sia crescita che definizione funzionano da qui.'
  };
  if (bf < 23) return {
    t: 'sopra la media',
    c: '#D9B25E',
    n: "Conviene smagrire prima di un surplus: sopra il 15-16% il grasso guadagnato durante la crescita aumenta."
  };
  return {
    t: 'alto',
    c: '#D9B25E',
    n: 'Priorità al deficit calorico. Da qui la ricomposizione funziona meglio che in un soggetto magro.'
  };
}
function giudizioFFMI(ffmi) {
  if (ffmi < 18) return {
    t: 'principiante',
    c: '#A9A9B2',
    n: 'Margine di crescita ampio: qui i guadagni arrivano in fretta.'
  };
  if (ffmi < 20) return {
    t: 'intermedio',
    c: '#86A8E6',
    n: 'Buona base costruita. Da qui il ritmo rallenta e la programmazione conta di più.'
  };
  if (ffmi < 22) return {
    t: 'avanzato',
    c: '#6BBF8A',
    n: 'Sopra la media di chi si allena. I guadagni si misurano in mesi, non settimane.'
  };
  if (ffmi < 25) return {
    t: 'molto avanzato',
    c: '#A893EC',
    n: 'Vicino al limite tipico dei natural (~25). Ogni chilo di magra costa un blocco intero.'
  };
  return {
    t: 'sopra il limite tipico',
    c: '#D9B25E',
    n: 'Il 25 di Kouri è il limite tipico, non un muro: circa il 5% dei natural verificati lo supera, con casi documentati a 26-27. Ma l\'errore sulla stima del grasso vale da solo 1-2 punti di FFMI, quindi prima di stupirti ricontrolla vita e collo.'
  };
}

// ============================================================
// ANALISI · funzioni comuni
// ============================================================
const e1RM = (kg, rep) => kg > 0 && rep > 0 ? kg * (1 + rep / 30) : 0; // Epley

// Estrae, per ogni esercizio del programma, la serie storica delle sedute.
function serieEsercizi(cfg) {
  const log = storage.get(cfg.storageKey) || {};
  const out = [];
  (cfg.days || []).forEach(d => {
    (cfg.exercises[d.id] || []).forEach((ex, idx) => {
      const sedute = [];
      (cfg.weeks || []).forEach(w => {
        const rec = ((log[w] || {})[d.id] || {}).esercizi;
        const r = rec && rec[idx];
        if (!r || !r.kg) return;
        const kg = parseFloat(r.kg) || 0;
        const reps = (r.reps || []).map(x => parseInt(x, 10)).filter(x => x > 0);
        if (!kg || !reps.length) return;
        sedute.push({
          w,
          kg,
          reps,
          max1rm: Math.max(...reps.map(rp => e1RM(kg, rp))),
          prima: reps[0],
          ultima: reps[reps.length - 1],
          calo: reps[0] > 0 ? (reps[0] - reps[reps.length - 1]) / reps[0] * 100 : 0
        });
      });
      if (sedute.length) out.push({
        ex,
        idx,
        giorno: d,
        sedute
      });
    });
  });
  return out;
}

// ============================================================
// ANALISI · RILEVATORE DI STALLI
// Uno stallo è: nelle ultime 3 sedute nessun 1RM stimato ha superato
// il migliore delle sedute precedenti.
// ============================================================
function stalli(cfg) {
  return serieEsercizi(cfg).map(e => {
    const s = e.sedute;
    if (s.length < 4) return {
      ...e,
      stato: 'pochi dati',
      n: s.length
    };
    const recenti = s.slice(-3),
      prima = s.slice(0, -3);
    const megPrima = Math.max(...prima.map(x => x.max1rm));
    const megRecenti = Math.max(...recenti.map(x => x.max1rm));
    const guadagno = megPrima > 0 ? (megRecenti - megPrima) / megPrima * 100 : 0;
    let stato = 'in progressione';
    if (guadagno <= 0) stato = 'fermo';else if (guadagno < 1.5) stato = 'rallentato';
    return {
      ...e,
      stato,
      guadagno,
      megRecenti,
      megPrima,
      n: s.length
    };
  }).filter(x => x.stato !== 'pochi dati' || x.n > 0);
}

// Alternative dello stesso gruppo primario, con la tua attrezzatura
function alternativePer(ex) {
  const twin = BUILTIN_TWIN[ex.id] ? EXERCISE_DB[BUILTIN_TWIN[ex.id]] : null;
  const primo = (ex.tags || [])[0];
  const eq = ex.equip || twin && twin.equip;
  return Object.values(EXERCISE_DB).filter(e => e.id !== ex.id && !BUILTIN_TWIN[e.id] && (e.tags || [])[0] === primo && ['Manubri', 'Bilanciere', 'Bilanciere EZ', 'Cavi', 'Corpo libero'].indexOf(e.equip) >= 0 && !!e.isCompound === !!ex.isCompound).sort((a, b) => (a.equip === eq ? -1 : 0) - (b.equip === eq ? -1 : 0)).slice(0, 3);
}

// ============================================================
// ANALISI · CURVA DI DECADIMENTO DELLE SERIE
// Quanto perdi dalla prima all'ultima serie dello stesso esercizio.
// ============================================================

// ============================================================
// ANALISI · PROIEZIONE DELLA COMPOSIZIONE
// ============================================================
function proietta(_ref96) {
  let peso = _ref96.peso,
    bf = _ref96.bf,
    altezza = _ref96.altezza,
    tdee = _ref96.tdee,
    intake = _ref96.intake,
    settimane = _ref96.settimane;
  const h = altezza / 100;
  let p = peso,
    grasso = peso * bf / 100,
    magra = peso - grasso;
  const kcalPerKg = tdee / peso;
  const tappe = [];
  for (let w = 1; w <= settimane; w++) {
    // il mantenimento scende col peso, più una quota di adattamento in deficit
    const adatt = intake < tdee ? Math.min(0.06, 0.006 * w) : 0;
    const tdeeOra = kcalPerKg * p * (1 - adatt);
    // Densità energetica dei tessuti (Hall): grasso ~9450 kcal/kg, magra ~1130.
    // Il forfait di 7700 vale per soggetti grassi e sovrastima nei magri.
    const dKcal = (intake - tdeeOra) * 7;
    const qGrasso = dKcal < 0 ? 0.85 : 0.55;
    const densita = qGrasso * 9450 + (1 - qGrasso) * 1130;
    const dKg = dKcal / densita;
    grasso += dKg * qGrasso;
    magra += dKg * (1 - qGrasso);
    // ricomposizione: vicino al pareggio un allenato con proteine alte sposta
    // lentamente grasso in magra. ~0,7 kg in 12 settimane, non di più.
    const vicinoPareggio = Math.abs(intake - tdeeOra) / tdeeOra < 0.04;
    if (vicinoPareggio) {
      grasso -= 0.058;
      magra += 0.058;
    }
    p = grasso + magra;
    if (w % 4 === 0 || w === settimane) {
      const bfOra = grasso / p * 100;
      tappe.push({
        w,
        peso: p,
        bf: bfOra,
        magra,
        ffmi: magra / (h * h) + 6.1 * (1.8 - h)
      });
    }
  }
  return tappe;
}

// ============================================================
// FISICA DEL MOVIMENTO · PROFILO DI RESISTENZA
// Non conta solo quale muscolo alleni, ma in che punto della curva
// lunghezza-tensione lo carichi. La meta del 2026 trova un vantaggio
// per il muscolo allungato, marcato soprattutto nelle regioni
// distale e centrale.
// ============================================================
const PROFILI = {
  ALLUNGATO: {
    c: '#6BBF8A',
    t: 'allungato',
    n: 'La resistenza è massima quando il muscolo è lungo. È la zona con il vantaggio ipertrofico documentato, soprattutto sulle regioni distale e centrale.'
  },
  MEDIO: {
    c: '#A9A9B2',
    t: 'medio',
    n: 'Picco a metà escursione. Tipico dei multiarticolari con bilanciere: buon carico assoluto, stimolo distribuito.'
  },
  ACCORCIATO: {
    c: '#D9B25E',
    t: 'accorciato',
    n: 'Massima tensione quando il muscolo è corto. Utile per la contrazione di picco e le regioni prossimali, ma da solo copre meno.'
  }
};

// ============================================================
// HOME · SEI RIQUADRI INVECE DI DICIANNOVE RIGHE
// Le voci che facevano la stessa cosa stanno ora dentro un unico
// riquadro. Ogni riquadro porta un dato vivo, non solo un'etichetta.
// ============================================================

// Il dato vivo che compare su ogni riquadro

// Griglia della home: due colonne, ogni riquadro con la sua cifra

// ============================================================
// ACCESSO RAPIDO · la seduta di oggi in un tocco
// Prima il pulsante portava alla libreria quando era attiva una
// scheda personale: tre tocchi, e per giunta apriva il programma
// sbagliato. Ora apre direttamente la seduta di oggi.
// ============================================================

// Cosa c'è da fare oggi, sulla scheda attiva
function sedutaDiOggi() {
  try {
    const att = schedaAttiva();
    const cfg = att.config;
    const log = storage.get(cfg.storageKey) || {};
    const giorni = cfg.days || [];

    // Scorro il programma in ordine e prendo la PRIMA seduta non completata.
    // Il calendario suggerisce, non comanda: se salti un giorno la scheda non
    // salta con te, la ritrovi qui.
    let week = null,
      giorno = null,
      arretrata = false;
    for (const w of cfg.weeks) {
      const manca = giorni.find(d => !((log[w] || {})[d.id] || {}).completato);
      if (manca) {
        week = w;
        giorno = manca;
        break;
      }
    }
    if (!giorno) {
      // programma finito: mostro l'ultima
      week = cfg.weeks[cfg.weeks.length - 1];
      giorno = giorni[giorni.length - 1];
    }

    // Oggi in calendario corrisponde a questa seduta?
    const oggi = GIORNI_SETT[new Date().getDay()];
    const diOggi = giorni.find(d => (d.dayName || '').toUpperCase() === NOMI_GIORNI[oggi]);
    arretrata = !!(diOggi && diOggi.id !== giorno.id) || !diOggi && !!giorno;
    const dl = (log[week] || {})[giorno.id] || {};
    const lista = cfg.exercises[giorno.id] || [];
    const finiti = lista.filter((ex, i) => {
      const r = (dl.esercizi || {})[i] || {};
      const sv = (cfg.applyLogic(ex, week) || {}).sets || ex.sets || 4;
      return (r.sets_done || []).filter(Boolean).length >= sv;
    }).length;
    // quante sedute restano in questa settimana
    const restaSett = giorni.filter(d => !((log[week] || {})[d.id] || {}).completato).length;
    const posizione = giorni.findIndex(d => d.id === giorno.id) + 1;
    return {
      att,
      cfg,
      week,
      giorno,
      lista,
      finiti,
      arretrata,
      restaSett,
      posizione,
      totGiorni: giorni.length,
      completata: !!dl.completato,
      iniziata: finiti > 0 || Object.keys(dl.esercizi || {}).length > 0,
      serie: lista.reduce((a, e) => a + (e.sets || 0), 0)
    };
  } catch (e) {
    return null;
  }
}
