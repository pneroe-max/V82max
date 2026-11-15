// ============================================================
// SEDUTA — un esercizio per volta: il carico grande in alto,
// le serie in tabella, l'azione sempre in basso.
// ============================================================

// immagine dell'esercizio: prova gli indirizzi in ordine, se mancano non mostra niente
function Immagine({ ex, classe = 'immagine' }) {
  const urls = useMemo(() => (EXERCISE_IMAGES[ex.id] || []).concat([ex.img, ex.img2].filter(Boolean)), [ex.id]);
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [ex.id]);
  if (!urls[i]) return null;
  return <img className={classe} src={urls[i]} alt="" loading="lazy" onError={() => setI(i + 1)} />;
}

// dischi per lato: disegno piccolo + testo
function Dischi({ peso }) {
  const r = scomponi(parseFloat(peso) || 0);
  if (r.err) return <div className="dischi-testo">{r.err}</div>;
  return (
    <div className="fila">
      <div className="dischi" aria-hidden="true">
        <span className="asta" />
        {r.lista.map((x, i) => Array.from({ length: x.n }).map((_, j) => <span key={i + '-' + j} className="disco" style={{ height: Math.round(x.d.h * 0.4) + 'px', background: x.d.col }} />))}
        <span className="asta" />
      </div>
      <div className="dischi-testo">
        {r.lista.length === 0 ? <span>solo bilanciere · {kg(plateCfg().barra)} kg</span>
          : <span>per lato: <b>{r.lista.map(x => (x.n > 1 ? x.n + '×' : '') + kg(x.d.kg)).join(' · ')}</b></span>}
        {r.resto > 0.01 && <span> · restano {kg(r.resto)} kg per lato</span>}
      </div>
    </div>
  );
}

// finestra: come si fa l'esercizio
function FinestraEsercizio({ ex, onChiudi }) {
  const tec = ex.tec && TECNICHE[ex.tec];
  const prof = ex.prof && PROFILI[ex.prof];
  return (
    <Finestra titolo={ex.name} onChiudi={onChiudi} larga>
      <Immagine ex={ex} />
      <div className="etichette">{(ex.tags || []).map(t => <span key={t}>{NOMI_MUSCOLI[t] || t}</span>)}{ex.equip && <span>{ex.equip}</span>}</div>
      {ex.shortNote && <p className="testo-lungo">{ex.shortNote}</p>}
      {tec && <div><div className="etichetta">Tecnica · {tec.nome}</div><ol className="passaggi testo-lungo">{tec.passi.map((p, i) => <li key={i}>{p}</li>)}</ol></div>}
      {ex.execution && ex.execution.length > 0 && <div><div className="etichetta">Esecuzione</div><ol className="passaggi testo-lungo">{ex.execution.map((p, i) => <li key={i}>{p}</li>)}</ol></div>}
      {ex.cues && <div><div className="etichetta">Da ricordare</div><p className="testo-lungo">{ex.cues}</p></div>}
      {prof && <div><div className="etichetta">Carico {prof.t}</div><p className="testo-lungo">{prof.n}</p></div>}
      {(ex.badges || []).filter(b => TECH_INFO[b]).map(b => <div key={b}><div className="etichetta">{TECH_INFO[b].name}</div><p className="testo-lungo">{TECH_INFO[b].desc}</p></div>)}
      <Fila fine><Bottone tipo="pieno" onClick={onChiudi}>Chiudi</Bottone></Fila>
    </Finestra>
  );
}

// finestra: cambia l'esercizio con un'alternativa sullo stesso muscolo
function FinestraCambia({ exercise, hasSwap, onPick, onReset, onChiudi }) {
  const [eq, setEq] = useState('');
  const primary = (exercise.tags || [])[0];
  const twinId = BUILTIN_TWIN[exercise.id];
  const twin = twinId ? EXERCISE_DB[twinId] : null;
  const refEquip = exercise.equip || (twin && twin.equip);
  const refTags = twin && twin.tags && twin.tags.length ? twin.tags : exercise.tags || [];
  const refWord = ((twin && twin.name) || exercise.name || '').toLowerCase().split(' ')[0];
  const alts = useMemo(() => Object.values(EXERCISE_DB).filter(e => e.id !== exercise.id && e.id !== twinId && !BUILTIN_TWIN[e.id] && (e.tags || []).indexOf(primary) === 0 && (!eq || e.equip === eq) && SWAP_EQUIP.indexOf(e.equip) >= 0).map(e => {
    let s = 0;
    if (refEquip && e.equip === refEquip) s -= 60;
    if (!!e.isCompound === !!exercise.isCompound) s -= 20;
    const t2 = refTags.slice(1);
    s -= (e.tags || []).slice(1).filter(t => t2.indexOf(t) >= 0).length * 8;
    if (refWord && refWord.length > 3 && e.name.toLowerCase().indexOf(refWord) === 0) s -= 45;
    if (e.lang !== 'it') s += 15;
    return { e, s };
  }).sort((a, b) => a.s - b.s || a.e.name.localeCompare(b.e.name)).map(x => x.e), [exercise.id, eq]);
  return (
    <Finestra titolo={'Cambia ' + exercise.name} onChiudi={onChiudi} larga>
      <Scelte etichetta="Attrezzo" voci={[{ id: '', nome: 'Tutti' }].concat(SWAP_EQUIP.map(x => ({ id: x, nome: x })))} valore={eq} onChange={setEq} />
      <p className="sotto">{alts.length} alternative per {(NOMI_MUSCOLI[primary] || primary || 'questo gruppo').toLowerCase()}</p>
      <div>
        {alts.slice(0, 60).map(e => <Riga key={e.id} onClick={() => onPick(e)} prima={<Immagine ex={e} classe="miniatura" />} nome={e.name} sotto={e.equip} freccia={false} />)}
        {alts.length === 0 && <p className="vuoto sotto">Nessuna alternativa con questo attrezzo.</p>}
      </div>
      <Fila fine>
        {hasSwap && <Bottone onClick={onReset}>Torna all'originale</Bottone>}
        <Bottone tipo="pieno" onClick={onChiudi}>Chiudi</Bottone>
      </Fila>
    </Finestra>
  );
}

// un esercizio sulla pagina della seduta
function EsercizioSeduta({ ex, idx, numero, totale, week, dayId, data, logic, suggerito, PHASE, aggiorna, spunta, apriInfo, apriCambia, compatto }) {
  const rec = (((data[week] || {})[dayId] || {}).esercizi || {})[idx] || { kg: '', reps: [], rir: '', sets_done: [] };
  const peso = rec.kg || '';
  const mostrato = peso || suggerito || '';
  const p = ultimaVolta(data, week, dayId, idx);
  const passo = d => { const v = parseFloat(peso) || parseFloat(suggerito) || (p && p.kg) || (usaBilanciere(ex) ? plateCfg().barra : 0); aggiorna(idx, 'kg', String(Math.max(0, Math.round((v + (parseFloat(peso) || parseFloat(suggerito) || (p && p.kg) ? d : 0)) * 10) / 10))); };
  const dKg = p && parseFloat(mostrato) > 0 ? Math.round((parseFloat(mostrato) - p.kg) * 10) / 10 : null;
  const bersagli = parseRepRange(logic.reps);
  const fatteRep = (rec.reps || []).map(r => parseInt(r, 10)).filter(r => !isNaN(r) && r > 0);
  const obiettivo = !!suggerito && !!peso && fatteRep.length >= logic.sets && fatteRep.every(r => r >= bersagli.max);
  const tec = ex.tec && TECNICHE[ex.tec];
  const sale = ((PHASE[week] || {}).loadCue || (PHASE[week] || {}).load) === 'up';
  return (
    <section>
      <header className="testa">
        <div className="etichetta">{ex.sup ? 'Superset ' + ex.sup + ' · ' : ''}Esercizio {numero} di {totale}{(ex.tags || [])[0] ? ' · ' + (NOMI_MUSCOLI[ex.tags[0]] || ex.tags[0]) : ''}</div>
        <button type="button" className="titolo" onClick={apriInfo}>{ex.name}</button>
        {ex._orig && <div className="sotto">al posto di {ex._orig}</div>}
        <div className="carico">
          <label className={cx('eroe', compatto && 'medio')}>
            <span className="nascosto">Chili</span>
            <input type="text" inputMode="decimal" value={String(peso).replace('.', ',')} placeholder={suggerito ? String(suggerito).replace('.', ',').replace(/,0$/, '') : '0'}
              onChange={e => aggiorna(idx, 'kg', e.target.value.replace(',', '.').replace(/[^0-9.]/g, ''))} aria-label="Chili" />
            <span>kg{!peso && suggerito ? ' proposti' : ''}</span>
          </label>
          <div className="fila">
            <Bottone onClick={() => passo(-2.5)} etichetta="Togli 2,5 chili">−2,5</Bottone>
            <Bottone onClick={() => passo(2.5)} etichetta="Aggiungi 2,5 chili">+2,5</Bottone>
          </div>
        </div>
        <Confronto>
          <b>{logic.sets} × {logic.reps}</b><span>RIR {logic.rir}</span><span>recupero {logic.rest}</span>{tec && <span>{tec.nome}</span>}
        </Confronto>
        {p && <Confronto>
          <span>Settimana {p.week}: <b>{kg(p.kg)} kg × {p.reps.join(' · ')}</b></span>
          {dKg != null && (dKg !== 0 ? <Delta v={dKg} dec={1} unita="kg" /> : <span>stesso carico: cerca una ripetizione in più</span>)}
        </Confronto>}
        {!p && suggerito && sale && <Confronto><span>questa settimana sale il carico</span></Confronto>}
        {obiettivo && <Confronto><Stato tipo="ok">Obiettivo raggiunto: la prossima volta +{isLowerBody(ex.tags) ? '5' : '2,5'} kg</Stato></Confronto>}
        {usaBilanciere(ex) && mostrato ? <Dischi peso={mostrato} /> : null}
      </header>

      <Tab col={ex.tec ? 'c-serie-tec' : 'c-serie'} testa={[ex.tec ? 'Fase' : 'Serie', { n: 'Rep' }, { n: 'RIR' }, { n: 'Fatta' }]}>
        {Array.from({ length: logic.sets }).map((_, i) => {
          const rep = (rec.reps || [])[i] || '';
          const fatta = !!(rec.sets_done || [])[i];
          const bersaglio = repFase(ex.tec, i, logic.sets, logic.reps);
          const t = parseRepRange(bersaglio);
          return (
            <Tr key={i} classe={fatta ? 'fatta' : ''}>
              <span className="t s">{ex.tec ? rigaSerie(ex.tec, i, logic.sets).toLowerCase() : i + 1}</span>
              <span><input className="inp-cella" type="text" inputMode="numeric" value={rep} placeholder={String(bersaglio).indexOf('-') > 0 ? String(bersaglio) : String(t.max || bersaglio)}
                onChange={e => aggiorna(idx, 'reps', e.target.value.replace(/[^0-9]/g, ''), i)} aria-label={'Ripetizioni serie ' + (i + 1)} /></span>
              <span>{i === 0 ? <input className="inp-cella" type="text" inputMode="numeric" value={rec.rir || ''} placeholder={String(rirFase(ex.tec, i, logic.sets, logic.rir || '—'))}
                onChange={e => aggiorna(idx, 'rir', e.target.value.replace(/[^0-9]/g, ''))} aria-label="RIR della prima serie" /> : <span className="n s" style={{ display: 'block' }}>{rirFase(ex.tec, i, logic.sets, '')}</span>}</span>
              <span className="n"><button type="button" className={cx('spunta', fatta && 'fatta')} onClick={() => spunta(idx, i, !fatta, t.max, rep)} aria-label={fatta ? 'Annulla la serie ' + (i + 1) : 'Segna fatta la serie ' + (i + 1)} aria-pressed={fatta}>{fatta && <Icona nome="spunta" size={18} />}</button></span>
            </Tr>
          );
        })}
      </Tab>
      <Fila>
        <Bottone tipo="testo" onClick={apriInfo}>Come si fa</Bottone>
        <Bottone tipo="testo" onClick={apriCambia}>{ex._orig ? 'Cambia ancora' : 'Cambia esercizio'}</Bottone>
      </Fila>
    </section>
  );
}

function Seduta({ giorno, week }) {
  const nav = useNav();
  const att = schedaAttiva();
  const cfg = att.config;
  const { exercises: EXS, days: DYS, phase: PHASE, applyLogic, suggestWeight, storageKey } = cfg;
  const { startTimer } = useTimer();
  const [data, setData] = useState(() => storage.get(storageKey) || {});
  const [swaps, setSwaps] = useState(() => storage.get('swaps') || {});
  const [cur, setCur] = useState(0);
  const [fin, setFin] = useState(null); // {tipo:'info'|'cambia'|'elenco', idx}
  const tocco = useRef(null);
  const day = DYS.find(d => d.id === giorno) || { label: '', dayName: '' };
  const swapKey = i => storageKey + '|' + giorno + '|' + i;

  useEffect(() => () => flushSaves(), []);
  // schermo acceso durante la seduta
  useEffect(() => {
    let lock = null, vivo = true;
    const prendi = async () => { try { if ('wakeLock' in navigator) lock = await navigator.wakeLock.request('screen'); } catch (e) {} };
    prendi();
    const vis = () => { if (vivo && document.visibilityState === 'visible') prendi(); };
    document.addEventListener('visibilitychange', vis);
    return () => { vivo = false; document.removeEventListener('visibilitychange', vis); try { if (lock) lock.release(); } catch (e) {} };
  }, []);

  const exercises = useMemo(() => (EXS[giorno] || []).map((ex, i) => {
    const alt = EXERCISE_DB[swaps[swapKey(i)]];
    return alt ? { ...alt, sets: ex.sets, reps: ex.reps, rir: ex.rir, rest: ex.rest, isCompound: ex.isCompound, tec: ex.tec, sup: ex.sup, _orig: ex.name } : ex;
  }), [giorno, swaps]);
  // un superset occupa una pagina sola
  const blocchi = useMemo(() => {
    const out = [], visti = {};
    exercises.forEach((e, i) => {
      if (e.sup) { if (visti[e.sup] != null) { out[visti[e.sup]].push(i); return; } visti[e.sup] = out.length; }
      out.push([i]);
    });
    return out;
  }, [exercises]);

  // i dati si scrivono subito (non dentro l'aggiornamento di React): chiudendo la seduta non si perde niente
  const dataRef = useRef(data);
  const scrivi = (next, subito) => {
    dataRef.current = next; setData(next);
    if (subito) { clearTimeout(_saveTimers[storageKey]); delete _pendingSaves[storageKey]; storage.set(storageKey, next); }
    else scheduleSave(storageKey, next);
  };
  const aggiorna = (exIdx, campo, valore, setIdx) => {
    const prev = dataRef.current;
    const wk = prev[week] || {};
    const dy = wk[giorno] || { esercizi: {}, completato: false };
    const ex = (dy.esercizi || {})[exIdx] || { kg: '', reps: ['', '', '', ''], rir: '', sets_done: [] };
    let nuovo;
    if (campo === 'kg' || campo === 'rir') nuovo = { ...ex, [campo]: valore };
    else if (campo === 'reps') { const reps = [...(ex.reps || [])]; reps[setIdx] = valore; nuovo = { ...ex, reps }; }
    else { const sd = [...(ex.sets_done || [])]; sd[setIdx] = valore; nuovo = { ...ex, sets_done: sd }; }
    const ora = Date.now();
    scrivi({ ...prev, [week]: { ...wk, [giorno]: { ...dy, startedAt: dy.startedAt || ora, ts: ora, esercizi: { ...(dy.esercizi || {}), [exIdx]: nuovo } } } }, campo === 'sets_done');
  };
  const recDi = i => (((dataRef.current[week] || {})[giorno] || {}).esercizi || {})[i] || {};
  const suggeritoDi = i => suggestWeight(exercises[i], week, giorno, data, i, PHASE);
  // segna una serie: se mancano, mette le ripetizioni previste e il carico proposto
  const segna = (i, setIdx, fatta, repMax, repOra) => {
    if (fatta) {
      if (!repOra) aggiorna(i, 'reps', String(repMax), setIdx);
      if (!recDi(i).kg && suggeritoDi(i)) aggiorna(i, 'kg', String(suggeritoDi(i)));
    }
    aggiorna(i, 'sets_done', fatta, setIdx);
  };
  const vibra = () => { try { if (navigator.vibrate) navigator.vibrate(40); } catch (e) {} };
  const spuntaRiga = (i, setIdx, fatta, repMax, repOra) => {
    segna(i, setIdx, fatta, repMax, repOra);
    if (fatta) {
      const ex = exercises[i], lg = applyLogic(ex, week);
      startTimer(recuperoSerie(ex.tec, setIdx, parseRestSeconds(lg.rest)), ex.name);
      vibra();
    }
  };
  const completato = !!((data[week] || {})[giorno] || {}).completato;
  const completa = () => {
    const prev = dataRef.current;
    const wk = prev[week] || {}; const dy = wk[giorno] || { esercizi: {}, completato: false }; const ora = Date.now();
    scrivi({ ...prev, [week]: { ...wk, [giorno]: { ...dy, startedAt: dy.startedAt || ora, ts: ora, completato: !dy.completato } } }, true);
  };

  // ---- stato del blocco corrente, per il bottone in basso ----
  const gruppo = blocchi[cur] || [];
  const primo = exercises[gruppo[0]] || {};
  const lg = applyLogic(primo, week);
  const recPrimo = recDi(gruppo[0]);
  const tot = lg.sets || 4;
  const fatte = (recPrimo.sets_done || []).filter(Boolean).length;
  const libera = Array.from({ length: tot }).findIndex((_, i) => !(recPrimo.sets_done || [])[i]);
  const ultimo = cur >= blocchi.length - 1;
  const prossimoEx = exercises[(blocchi[cur + 1] || [])[0]];
  const serieFatta = () => {
    const setIdx = libera;
    gruppo.forEach(i => { const l = applyLogic(exercises[i], week); segna(i, setIdx, true, parseRepRange(l.reps).max, (recDi(i).reps || [])[setIdx]); });
    const ultimaSerie = setIdx >= tot - 1;
    const poi = ultimaSerie ? prossimoEx : null;
    const secondi = poi ? parseRestSeconds(applyLogic(poi, week).rest) : recuperoSerie(primo.tec, setIdx, parseRestSeconds(lg.rest));
    startTimer(secondi, poi ? 'poi ' + poi.name : ultimaSerie ? 'ultima serie fatta' : 'poi ' + (gruppo.length > 1 ? 'giro ' + (setIdx + 2) : primo.tec ? rigaSerie(primo.tec, setIdx + 1, tot).toLowerCase() : 'serie ' + (setIdx + 2)) + ' di ' + tot);
    vibra();
  };
  const statoBlocco = b => {
    const tutti = b.every(i => { const l = applyLogic(exercises[i], week); return ((recDi(i).sets_done || []).filter(Boolean).length) >= (l.sets || 1); });
    const qualcuno = b.some(i => (recDi(i).sets_done || []).some(Boolean));
    return tutti ? 'fatto' : qualcuno ? 'parte' : '';
  };
  let principale;
  if (libera >= 0) principale = <Bottone tipo="pieno" cresce onClick={serieFatta} sotto={fatte + ' di ' + tot + ' · recupero ' + (primo.tec && recuperoSerie(primo.tec, libera, 0) ? recuperoSerie(primo.tec, libera, 0) + ' s' : lg.rest)}>{gruppo.length > 1 ? 'Giro ' + (libera + 1) + ' fatto' : primo.tec ? 'Fatta: ' + rigaSerie(primo.tec, libera, tot).toLowerCase() : 'Serie ' + (libera + 1) + ' fatta'}</Bottone>;
  else if (!ultimo) principale = <Bottone tipo="pieno" cresce onClick={() => setCur(cur + 1)} sotto={prossimoEx ? prossimoEx.name : ''}>Esercizio successivo</Bottone>;
  else if (!completato) principale = <Bottone tipo="pieno" cresce onClick={() => { completa(); nav.chiudi(); }} sotto="salva e torna a Oggi">Chiudi la seduta</Bottone>;
  else principale = <Bottone cresce onClick={completa} sotto="tocca per riaprirla">Seduta completata</Bottone>;

  return (
    <div className="pagina" onTouchStart={e => { tocco.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={e => {
        if (!tocco.current) return;
        const dx = e.changedTouches[0].clientX - tocco.current.x, dy = e.changedTouches[0].clientY - tocco.current.y;
        tocco.current = null;
        if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx)) return;
        if (dx < 0 && cur < blocchi.length - 1) setCur(cur + 1);
        if (dx > 0 && cur > 0) setCur(cur - 1);
      }}>
      <div>
        <div className="fila">
          <span className="etichetta cresce">Settimana {week} · {day.dayName} · {day.label}</span>
          <Bottone tipo="testo" onClick={() => setFin({ tipo: 'elenco' })}>Elenco</Bottone>
          <Bottone tipo="testo" onClick={nav.chiudi}>Esci</Bottone>
        </div>
        <div className="passi" role="group" aria-label="Avanzamento della seduta">
          {blocchi.map((b, i) => <button type="button" key={i} className={cx(statoBlocco(b) === 'fatto' && 'fatto', i === cur && 'ora')} onClick={() => setCur(i)} aria-label={'Vai all\'esercizio ' + (i + 1)} aria-current={i === cur}><i /></button>)}
        </div>
      </div>

      {gruppo.map(i => (
        <EsercizioSeduta key={i} ex={exercises[i]} idx={i} numero={i + 1} totale={exercises.length} week={week} dayId={giorno} data={data}
          logic={applyLogic(exercises[i], week)} suggerito={suggeritoDi(i)} PHASE={PHASE} aggiorna={aggiorna} spunta={spuntaRiga}
          apriInfo={() => setFin({ tipo: 'info', idx: i })} apriCambia={() => setFin({ tipo: 'cambia', idx: i })} compatto={gruppo.length > 1} />
      ))}
      {gruppo.length > 1 && <p className="testo-lungo">Una serie del primo, subito una del secondo, <b>poi recuperi</b>.</p>}

      <Azioni>
        <Bottone alto icona="sinistra" disabled={cur === 0} onClick={() => setCur(cur - 1)} etichetta="Esercizio precedente" />
        {principale}
        <Bottone alto icona="destra" disabled={ultimo} onClick={() => setCur(cur + 1)} etichetta="Esercizio successivo" />
      </Azioni>

      {fin && fin.tipo === 'info' && <FinestraEsercizio ex={exercises[fin.idx]} onChiudi={() => setFin(null)} />}
      {fin && fin.tipo === 'cambia' && <FinestraCambia exercise={exercises[fin.idx]} hasSwap={!!exercises[fin.idx]._orig} onChiudi={() => setFin(null)}
        onPick={alt => { const n = { ...swaps, [swapKey(fin.idx)]: alt.id }; setSwaps(n); storage.set('swaps', n); setFin(null); }}
        onReset={() => { const n = { ...swaps }; delete n[swapKey(fin.idx)]; setSwaps(n); storage.set('swaps', n); setFin(null); }} />}
      {fin && fin.tipo === 'elenco' && (
        <Finestra titolo={day.label + ' · ' + exercises.length + ' esercizi'} onChiudi={() => setFin(null)} larga>
          <Tab col="c-esercizi" testa={['', 'Esercizio', { n: 'Serie' }, { n: 'Stato' }]}>
            {blocchi.map((b, bi) => b.map(i => {
              const l = applyLogic(exercises[i], week), st = statoBlocco([i]);
              return (
                <Tr key={i} onClick={() => { setCur(bi); setFin(null); }} classe={bi === cur ? 'forte' : ''}>
                  <span className="s">{i + 1}</span>
                  <span className="t">{exercises[i].name}</span>
                  <span className="n s">{l.sets} × {l.reps}</span>
                  <span className="n">{st === 'fatto' ? <Stato tipo="ok">Fatto</Stato> : st === 'parte' ? <Stato tipo="info">In corso</Stato> : <Stato tipo="vuoto">Da fare</Stato>}</span>
                </Tr>
              );
            }))}
          </Tab>
          <Fila fine><Bottone tipo="pieno" onClick={() => setFin(null)}>Chiudi</Bottone></Fila>
        </Finestra>
      )}
    </div>
  );
}
