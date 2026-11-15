// ============================================================
// IMPOSTAZIONI — a schede: generale, schede, diete, consegne,
// esercizi, dischi, tecniche, backup
// ============================================================
const nomeFile = s => (s || 'file').replace(/[^\w\-]+/g, '_');

// ---------- GENERALE: fase, dimensioni, versione ----------
const SCALE = [{ id: 'piccola', nome: 'Piccole' }, { id: '', nome: 'Normali' }, { id: 'grande', nome: 'Grandi' }, { id: 'grandissima', nome: 'Molto grandi' }];
function ImpGenerale() {
  const rinfresca = useRinfresca();
  const fid = faseId();
  const att = schedaAttiva();
  const c = coppiaDiete();
  const auto = storage.get('dieta_auto') !== false;
  const u = storageUsage();
  return (
    <React.Fragment>
      <Testa etichetta="Fase del ciclo" valore={FASI[fid].label} misura="medio">
        <Confronto><span>ritmo atteso <b>{FASI[fid].testo}</b></span></Confronto>
      </Testa>
      <Scelte etichetta="Fase" voci={Object.keys(FASI).map(k => ({ id: k, nome: FASI[k].label }))} valore={fid} onChange={k => { storage.set('fase', k); rinfresca(); }} />
      <Sezione titolo="In uso">
        <Riga nome={att ? att.label : 'Nessuna scheda'} sotto="scheda di allenamento" />
        {auto ? <React.Fragment>
          <Riga nome={c.on ? c.on.name : '—'} sotto="dieta nei giorni di allenamento" />
          <Riga nome={c.off ? c.off.name : '—'} sotto="dieta nei giorni di riposo" />
        </React.Fragment> : <Riga nome={(dietaAttiva() || {}).name || '—'} sotto="dieta, sempre la stessa" />}
      </Sezione>
      <Sezione titolo="Dimensione delle scritte">
        <div className="colonna"><Scelte etichetta="Dimensione" voci={SCALE} valore={storage.get('scala') || ''} onChange={v => { storage.set('scala', v); applicaScala(); rinfresca(); }} /></div>
      </Sezione>
      <Sezione titolo="App" lato={APP_VERSION}>
        <Riga nome="Spazio usato" val={u.kb + ' KB'} sotto={u.voci + ' voci salvate'} />
        <div className="colonna">
          <Bottone onClick={async () => {
            try { flushSaves(); if ('caches' in window) { const k = await caches.keys(); await Promise.all(k.map(x => caches.delete(x))); } if (navigator.serviceWorker) { const rs = await navigator.serviceWorker.getRegistrations(); await Promise.all(rs.map(r => r.unregister())); } } catch (e) {}
            location.reload();
          }}>Scarica di nuovo l'app</Bottone>
          <p className="sotto">Usalo se l'app sembra ferma a una versione vecchia. I tuoi dati non si toccano.</p>
        </div>
      </Sezione>
    </React.Fragment>
  );
}

// ---------- SCHEDE: elenco ----------
function ImpSchede() {
  const nav = useNav();
  const rinfresca = useRinfresca();
  const [fin, setFin] = useState(null);
  const proprie = storage.get('custom_schedules') || [];
  const tutte = tutteLeSchede();
  const attId = (schedaAttiva() || {}).id;
  const scrivi = l => { storage.set('custom_schedules', l); setFin(null); rinfresca(); };
  const importa = raw => {
    let o; try { o = JSON.parse(raw); } catch (e) { return 'Il testo non è un JSON valido: ' + e.message; }
    const err = validateV8w(o); if (err) return err;
    if (!o.id) o.id = uid('sched');
    scrivi(proprie.filter(x => x.id !== o.id).concat([o])); return null;
  };
  const p = fin && fin.p, raw = p && proprie.find(x => x.id === p.id);
  return (
    <React.Fragment>
      <Testa etichetta="Scheda in uso" valore={(tutte.find(x => x.id === attId) || {}).label || '—'} misura="medio">
        <Confronto>{tutte.find(x => x.id === attId) && (() => { const c = tutte.find(x => x.id === attId).config; return <span><b>{(c.days || []).length}</b> giorni · <b>{(c.weeks || []).length}</b> settimane</span>; })()}</Confronto>
      </Testa>
      <Sezione titolo="Schede" lato={tutte.length + ' salvate'}>
        <Tab col="c-3" testa={['Scheda', { n: 'Giorni' }, { n: 'In uso' }]}>
          {tutte.map(x => (
            <Tr key={x.id} onClick={() => setFin({ tipo: 'azioni', p: x })}>
              <span className="t"><span className="forte">{x.label}</span><span className="sotto" style={{ display: 'block' }}>{(x.config.weeks || []).length} settimane{x.sub ? ' · ' + x.sub : ''}</span></span>
              <span className="n s">{(x.config.days || []).length}</span>
              <span className="n">{x.id === attId ? <Stato tipo="ok">In uso</Stato> : <Stato tipo="vuoto">No</Stato>}</span>
            </Tr>
          ))}
        </Tab>
        <Fila>
          <Bottone tipo="pieno" icona="piu" onClick={() => nav.apri({ tipo: 'editorScheda', scheda: { format: 'v8w/1', id: uid('sched'), name: 'Nuova scheda', weeks: [1, 2, 3, 4], days: [{ id: 'd0', label: 'GIORNO A', dayName: 'LUN', color: DAY_COLORS[0], exercises: [] }] } })}>Nuova scheda</Bottone>
          <Bottone icona="carica" onClick={() => setFin({ tipo: 'importa' })}>Importa</Bottone>
        </Fila>
      </Sezione>
      {fin && fin.tipo === 'azioni' && (
        <Finestra titolo={p.label} onChiudi={() => setFin(null)}>
          <div className="colonna">
            <Bottone tipo="pieno" largo disabled={p.id === attId} onClick={() => { storage.set('scheda_attiva', p.id); setFin(null); rinfresca(); }}>{p.id === attId ? 'Già in uso' : 'Usa questa scheda'}</Bottone>
            {raw && <Bottone largo icona="matita" onClick={() => { setFin(null); nav.apri({ tipo: 'editorScheda', scheda: raw }); }}>Apri e modifica</Bottone>}
            <Bottone largo icona="copia" onClick={() => { const k = raw ? JSON.parse(JSON.stringify(raw)) : configToV8w(p.config, p.label); k.id = uid('sched'); k.name = (raw ? raw.name : p.label) + ' (copia)'; delete k.storageKey; scrivi(proprie.concat([k])); }}>Duplica</Bottone>
            {raw && <Bottone largo icona="scarica" onClick={() => { downloadFile(nomeFile(raw.name) + '.v8w', JSON.stringify(raw, null, 2)); setFin(null); }}>Esporta il file .v8w</Bottone>}
            {raw && <Bottone largo tipo="testo" onClick={() => { setFin(null); askConfirm('Eliminare la scheda ' + p.label + '?', 'Le sedute registrate restano salvate, ma la scheda sparisce.', () => scrivi(proprie.filter(x => x.id !== p.id))); }}>Elimina la scheda</Bottone>}
          </div>
        </Finestra>
      )}
      {fin && fin.tipo === 'importa' && <FinestraImporta titolo="Importa una scheda" accetta=".v8w,.json,application/json" esempio={'{ "format": "v8w/1", "name": "…", "days": [ … ] }'} onTesto={importa} onChiudi={() => setFin(null)} />}
    </React.Fragment>
  );
}

// ---------- scegli un esercizio dal database ----------
function FinestraEsercizioDB({ titolo, onPick, onChiudi }) {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const ql = q.trim().toLowerCase();
  const lista = useMemo(() => Object.values(EXERCISE_DB).filter(e => !BUILTIN_TWIN[e.id] && (!ql || (e.name || '').toLowerCase().indexOf(ql) >= 0 || (e.nameEn || '').toLowerCase().indexOf(ql) >= 0) && (!tag || (e.tags || [])[0] === tag)).sort((a, b) => (a.lang === 'it' ? 0 : 1) - (b.lang === 'it' ? 0 : 1) || a.name.localeCompare(b.name)), [ql, tag]);
  return (
    <Finestra titolo={titolo} onChiudi={onChiudi} larga>
      <Campo etichetta="Cerca"><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="panca, squat, curl…" /></Campo>
      <Scelte etichetta="Muscolo" voci={[{ id: '', nome: 'Tutti' }].concat(VOL_MUSCLES.map(m => ({ id: m, nome: NOMI_MUSCOLI[m] || m })))} valore={tag} onChange={setTag} />
      <p className="sotto">{lista.length} esercizi</p>
      <div>{lista.slice(0, 80).map(e => <Riga key={e.id} prima={<Immagine ex={e} classe="miniatura" />} nome={e.name} sotto={[(e.tags || [])[0] && (NOMI_MUSCOLI[e.tags[0]] || e.tags[0]), e.equip].filter(Boolean).join(' · ')} onClick={() => onPick(e)} freccia={false} />)}</div>
      {lista.length > 80 && <p className="sotto">Scrivi qualcosa per restringere: ne vedi 80 su {lista.length}.</p>}
      <Fila fine><Bottone tipo="pieno" onClick={onChiudi}>Chiudi</Bottone></Fila>
    </Finestra>
  );
}

// ---------- editor della scheda: tiene tutto quello che non tocca (fasi, blocchi, tecniche) ----------
const voceEsercizio = it => toEditRow(it) || { name: '?', sets: 3, reps: '8-12', rir: '1-2', rest: '90s' };
function cambiaVoce(it, campo, v) {
  if (typeof it === 'string') return { ref: it, ...pick(voceEsercizio(it)), [campo]: v };
  if (it && it.inline) return { ...it, inline: { ...it.inline, [campo]: v } };
  return { ...it, [campo]: v };
}
const pick = r => ({ sets: r.sets, reps: r.reps, rir: r.rir, rest: r.rest });
function EditorScheda({ scheda }) {
  const nav = useNav();
  const [s, setS] = useState(() => JSON.parse(JSON.stringify(scheda)));
  const [g, setG] = useState(0);
  const [fin, setFin] = useState(null);
  const giorno = s.days[g] || s.days[0];
  const setGiorno = f => setS(p => { const days = p.days.slice(); days[g] = f({ ...days[g], exercises: (days[g].exercises || []).slice() }); return { ...p, days }; });
  const salva = () => {
    if (s.days.some(d => !(d.exercises || []).length)) { askConfirm('Ogni giorno deve avere almeno un esercizio', 'Aggiungi un esercizio o elimina il giorno vuoto.', () => {}, 'Ho capito'); return; }
    const l = storage.get('custom_schedules') || [];
    storage.set('custom_schedules', l.some(x => x.id === s.id) ? l.map(x => x.id === s.id ? s : x) : l.concat([s]));
    nav.chiudi();
  };
  const settimane = Array.isArray(s.weeks) ? s.weeks.length : s.weeks || 3;
  const haFasi = s.phase && typeof s.phase === 'object' && Object.keys(s.phase).length;
  return (
    <div className="pagina">
      <Testa etichetta="Modifica scheda" valore={s.days.length + ' giorni'} misura="medio">
        <Confronto><span><b>{settimane}</b> settimane</span><span><b>{s.days.reduce((a, d) => a + (d.exercises || []).length, 0)}</b> esercizi</span></Confronto>
      </Testa>
      <Sezione titolo="Scheda">
        <div className="colonna">
          <Campo etichetta="Nome"><input value={s.name || ''} onChange={e => setS({ ...s, name: e.target.value })} /></Campo>
          {!haFasi && <Campo etichetta="Settimane"><input type="text" inputMode="numeric" value={settimane} onChange={e => { const n = Math.max(1, Math.min(16, parseInt(e.target.value, 10) || 1)); setS({ ...s, weeks: Array.from({ length: n }, (_, i) => i + 1) }); }} /></Campo>}
          {haFasi && <p className="sotto">Settimane e fasi vengono dal file della scheda e restano come sono.</p>}
        </div>
      </Sezione>
      <Scelte schede etichetta="Giorno" voci={s.days.map((d, i) => ({ id: i, nome: d.label || 'G' + (i + 1) }))} valore={g} onChange={i => setG(Number(i))} />
      <Sezione titolo={'Giorno ' + (g + 1)} lato={(giorno.exercises || []).length + ' esercizi'}>
        <div className="colonna">
          <div className="griglia-pasto">
            <Campo etichetta="Nome"><input value={giorno.label || ''} onChange={e => setGiorno(d => ({ ...d, label: e.target.value }))} /></Campo>
            <Campo etichetta="Giorno"><input value={giorno.dayName || ''} placeholder="LUN" onChange={e => setGiorno(d => ({ ...d, dayName: e.target.value.toUpperCase().slice(0, 3) }))} /></Campo>
          </div>
          <Campo etichetta="Descrizione"><input value={giorno.subtitle || ''} placeholder="Petto · spalle · tricipiti" onChange={e => setGiorno(d => ({ ...d, subtitle: e.target.value }))} /></Campo>
        </div>
        <Tab col="c-scheda" testa={['Esercizio', { n: 'Serie' }, { n: 'Rep' }, { n: 'Rec.' }]}>
          {(giorno.exercises || []).map((it, i) => {
            const r = voceEsercizio(it);
            const cella = (campo, w) => <input className="inp-cella" style={{ width: w }} type="text" inputMode={campo === 'sets' ? 'numeric' : 'text'} value={r[campo] == null ? '' : r[campo]} onChange={e => setGiorno(d => { d.exercises[i] = cambiaVoce(d.exercises[i], campo, campo === 'sets' ? (parseInt(e.target.value, 10) || '') : e.target.value); return d; })} aria-label={campo + ' di ' + r.name} />;
            return (
              <Tr key={i}>
                <button type="button" className="t" onClick={() => setFin({ tipo: 'voce', i })}><span className="forte">{r.name}</span>{(it.tec || it.sup) && <span className="sotto" style={{ display: 'block' }}>{[it.sup && 'superset ' + it.sup, it.tec && TECNICHE[it.tec] && TECNICHE[it.tec].nome].filter(Boolean).join(' · ')}</span>}</button>
                <span>{cella('sets')}</span><span>{cella('reps')}</span><span>{cella('rest')}</span>
              </Tr>
            );
          })}
        </Tab>
        <Fila>
          <Bottone icona="piu" onClick={() => setFin({ tipo: 'aggiungi' })}>Aggiungi esercizio</Bottone>
          <Bottone tipo="testo" onClick={() => setS(p => ({ ...p, days: p.days.concat([{ id: uid('d'), label: 'GIORNO ' + String.fromCharCode(65 + p.days.length), dayName: '', color: DAY_COLORS[p.days.length % DAY_COLORS.length], exercises: [] }]) }))}>Aggiungi giorno</Bottone>
          {s.days.length > 1 && <Bottone tipo="testo" onClick={() => askConfirm('Eliminare il giorno ' + giorno.label + '?', 'Togli il giorno e i suoi esercizi dalla scheda.', () => { setS(p => ({ ...p, days: p.days.filter((_, j) => j !== g) })); setG(0); })}>Elimina giorno</Bottone>}
        </Fila>
      </Sezione>
      <Azioni>
        <Bottone alto icona="sinistra" onClick={nav.chiudi} etichetta="Indietro senza salvare" />
        <Bottone tipo="pieno" cresce onClick={salva}>Salva scheda</Bottone>
      </Azioni>
      {fin && fin.tipo === 'aggiungi' && <FinestraEsercizioDB titolo={'Aggiungi a ' + giorno.label} onChiudi={() => setFin(null)} onPick={e => { setGiorno(d => { d.exercises.push(e.id); return d; }); setFin(null); }} />}
      {fin && fin.tipo === 'voce' && (() => {
        const i = fin.i, it = giorno.exercises[i], r = voceEsercizio(it);
        const muovi = dz => { setGiorno(d => { const j = i + dz; if (j < 0 || j >= d.exercises.length) return d; const t = d.exercises[i]; d.exercises[i] = d.exercises[j]; d.exercises[j] = t; return d; }); setFin(null); };
        return (
          <Finestra titolo={r.name} onChiudi={() => setFin(null)}>
            <Campo etichetta="RIR"><input value={r.rir || ''} onChange={e => setGiorno(d => { d.exercises[i] = cambiaVoce(d.exercises[i], 'rir', e.target.value); return d; })} /></Campo>
            <div className="colonna">
              <Bottone largo onClick={() => setFin({ tipo: 'sostituisci', i })}>Sostituisci con un altro</Bottone>
              <Bottone largo disabled={i === 0} onClick={() => muovi(-1)}>Sposta su</Bottone>
              <Bottone largo disabled={i === giorno.exercises.length - 1} onClick={() => muovi(1)}>Sposta giù</Bottone>
              <Bottone largo tipo="testo" onClick={() => { setGiorno(d => { d.exercises.splice(i, 1); return d; }); setFin(null); }}>Togli dalla scheda</Bottone>
            </div>
            <Fila fine><Bottone tipo="pieno" onClick={() => setFin(null)}>Fatto</Bottone></Fila>
          </Finestra>
        );
      })()}
      {fin && fin.tipo === 'sostituisci' && <FinestraEsercizioDB titolo="Sostituisci con" onChiudi={() => setFin(null)} onPick={e => { setGiorno(d => { const v = d.exercises[fin.i]; const r = voceEsercizio(v); const extra = typeof v === 'object' && v ? { tec: v.tec, sup: v.sup } : {}; d.exercises[fin.i] = JSON.parse(JSON.stringify({ ref: e.id, ...pick(r), ...extra })); return d; }); setFin(null); }} />}
    </div>
  );
}

// ---------- CONSEGNE ----------
function ImpConsegne() {
  const [mio] = useState(() => idDispositivo());
  const [codice, setCodice] = useState('');
  const [stato, setStato] = useState(null);
  const [attesa, setAttesa] = useState(false);
  const [copiato, setCopiato] = useState(false);
  const ultima = storage.get('ultima_consegna');
  const controlla = async c => {
    setAttesa(true); setStato(null);
    const r = await leggiConsegna(c); setAttesa(false);
    if (r.esito !== 'ok') { setStato(r); return; }
    setStato({ esito: 'importato', rep: applicaConsegna(r.dati), nota: r.dati.nota || '' });
  };
  const riassunto = rep => [rep.schede && rep.schede + ' schede nuove', rep.schedeAgg && rep.schedeAgg + ' schede aggiornate', rep.diete && rep.diete + ' diete nuove', rep.dieteAgg && rep.dieteAgg + ' diete aggiornate'].filter(Boolean).join(' · ') || 'nessuna novità';
  return (
    <React.Fragment>
      <Testa etichetta="Codice di questo telefono" valore={mio} misura="medio">
        <Confronto><span>Mandamelo: pubblico qui schede e diete per te.</span></Confronto>
      </Testa>
      {stato && <div className="avviso" role="status"><div className="cresce">
        {stato.esito === 'importato' && <React.Fragment><Stato tipo="ok">Consegna ricevuta</Stato><p>{(stato.nota ? stato.nota + ' · ' : '') + riassunto(stato.rep)}</p></React.Fragment>}
        {stato.esito === 'assente' && <React.Fragment><Stato tipo="att">Nessuna consegna</Stato><p>Per questo codice non c'è ancora niente. Riprova più tardi.</p></React.Fragment>}
        {stato.esito === 'errore' && <React.Fragment><Stato tipo="per">Non riesco a scaricare</Stato><p>Controlla la connessione. {stato.dettaglio || ''}</p></React.Fragment>}
        {stato.esito === 'malformato' && <React.Fragment><Stato tipo="per">File non valido</Stato><p>Il file trovato non contiene schede né diete.</p></React.Fragment>}
      </div></div>}
      <Sezione titolo="Un altro codice" lato="per esempio uno condiviso">
        <div className="colonna">
          <Campo etichetta="Codice"><input value={codice} onChange={e => setCodice(e.target.value.toUpperCase())} placeholder="FRATELLO" /></Campo>
          <Bottone disabled={attesa || !codice.trim()} onClick={() => controlla(codice)}>Scarica da questo codice</Bottone>
        </div>
      </Sezione>
      {ultima && <Sezione titolo="Ultima consegna" lato={dataBreve(ultima.quando)}><p className="vuoto">{(ultima.nota ? ultima.nota + ' · ' : '') + riassunto(ultima.rep || {})}</p></Sezione>}
      <p className="testo-lungo">I file stanno su GitHub, leggibili da chiunque abbia il codice: <b>niente dati personali</b>. Se cancelli i dati del sito il codice cambia.</p>
      <Azioni>
        <Bottone tipo="pieno" cresce disabled={attesa} onClick={() => controlla(mio)}>{attesa ? 'Controllo…' : 'Controlla consegne'}</Bottone>
        <Bottone alto onClick={() => { copyText(mio); setCopiato(true); }}>{copiato ? 'Copiato' : 'Copia codice'}</Bottone>
      </Azioni>
    </React.Fragment>
  );
}

// ---------- ESERCIZI: consultazione ----------
function ImpEsercizi() {
  const [ex, setEx] = useState(null);
  return (
    <React.Fragment>
      <Testa etichetta="Database esercizi" valore={intero(Object.keys(EXERCISE_DB).length)} unita="esercizi" misura="medio" />
      <EsercizioCerca onPick={setEx} />
      {ex && <FinestraEsercizio ex={ex} onChiudi={() => setEx(null)} />}
    </React.Fragment>
  );
}
function EsercizioCerca({ onPick }) {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const ql = q.trim().toLowerCase();
  const lista = useMemo(() => Object.values(EXERCISE_DB).filter(e => !BUILTIN_TWIN[e.id] && (!ql || (e.name || '').toLowerCase().indexOf(ql) >= 0 || (e.nameEn || '').toLowerCase().indexOf(ql) >= 0) && (!tag || (e.tags || [])[0] === tag)).sort((a, b) => a.name.localeCompare(b.name)), [ql, tag]);
  const [quanti, setQuanti] = useState(40);
  return (
    <React.Fragment>
      <Campo etichetta="Cerca"><input type="search" value={q} onChange={e => { setQ(e.target.value); setQuanti(40); }} placeholder="panca, squat, curl…" /></Campo>
      <Scelte etichetta="Muscolo" voci={[{ id: '', nome: 'Tutti' }].concat(VOL_MUSCLES.map(m => ({ id: m, nome: NOMI_MUSCOLI[m] || m })))} valore={tag} onChange={v => { setTag(v); setQuanti(40); }} />
      <Sezione titolo="Risultati" lato={lista.length + ' esercizi'}>
        {lista.slice(0, quanti).map(e => <Riga key={e.id} prima={<Immagine ex={e} classe="miniatura" />} nome={e.name} sotto={[(e.tags || [])[0] && (NOMI_MUSCOLI[e.tags[0]] || e.tags[0]), e.equip].filter(Boolean).join(' · ')} onClick={() => onPick(e)} />)}
        {lista.length > quanti && <Bottone tipo="testo" onClick={() => setQuanti(quanti + 60)}>Mostrane altri {Math.min(60, lista.length - quanti)}</Bottone>}
      </Sezione>
    </React.Fragment>
  );
}

// ---------- DISCHI ----------
function ImpDischi() {
  const [cfg, setCfg] = useState(plateCfg);
  const salva = n => { setCfg(n); storage.set('bilanciere', n); };
  const prova = cfg.barra + 2 * (cfg.disponibili.reduce((a, b) => Math.max(a, b), 0) + 10);
  return (
    <React.Fragment>
      <Testa etichetta="Bilanciere" valore={kg(cfg.barra)} unita="kg" misura="medio">
        <Confronto><span><b>{cfg.disponibili.length}</b> tipi di disco disponibili</span></Confronto>
      </Testa>
      <Sezione titolo="Peso del bilanciere"><div className="colonna"><Scelte etichetta="Bilanciere" voci={[7.5, 10, 15, 20, 25].map(b => ({ id: b, nome: kg(b) + ' kg' }))} valore={cfg.barra} onChange={b => salva({ ...cfg, barra: Number(b) })} /></div></Sezione>
      <Sezione titolo="Dischi che hai" lato="tocca per togliere o aggiungere">
        {DISC.map(d => {
          const c = cfg.disponibili.indexOf(d.kg) >= 0;
          return <Riga key={d.kg} prima={<span className="punto" style={{ background: d.col, width: '1rem', height: '1rem' }} />} nome={kg(d.kg) + ' kg'} stato={c ? <Stato tipo="ok">Ce l'ho</Stato> : <Stato tipo="vuoto">No</Stato>} freccia={false}
            onClick={() => salva({ ...cfg, disponibili: c ? cfg.disponibili.filter(x => x !== d.kg) : cfg.disponibili.concat([d.kg]) })} />;
        })}
      </Sezione>
      <Sezione titolo={'Prova con ' + kg(prova) + ' kg'}><div className="colonna"><Dischi peso={prova} /></div></Sezione>
    </React.Fragment>
  );
}

// ---------- TECNICHE ----------
function ImpTecniche() {
  const [ap, setAp] = useState(null);
  const voci = Object.entries(TECNICHE).map(([k, t]) => ({ k, nome: t.nome, breve: t.breve, passi: t.passi }))
    .concat(Object.entries(TECH_INFO).filter(([k]) => !TECNICHE[k]).map(([k, t]) => ({ k, nome: t.name, breve: t.when, desc: t.desc })));
  const v = voci.find(x => x.k === ap);
  return (
    <React.Fragment>
      <Testa etichetta="Tecniche della scheda" valore={String(voci.length)} unita="tecniche" misura="medio" />
      <Sezione titolo="Elenco" lato="tocca per i passaggi">
        {voci.map(x => <Riga key={x.k} nome={x.nome} sotto={x.breve} onClick={() => setAp(x.k)} />)}
      </Sezione>
      {v && (
        <Finestra titolo={v.nome} onChiudi={() => setAp(null)}>
          {v.breve && <p className="testo-lungo">{v.breve}</p>}
          {v.passi && <ol className="passaggi testo-lungo">{v.passi.map((p, i) => <li key={i}>{p}</li>)}</ol>}
          {v.desc && <p className="testo-lungo">{v.desc}</p>}
          <Fila fine><Bottone tipo="pieno" onClick={() => setAp(null)}>Chiudi</Bottone></Fila>
        </Finestra>
      )}
    </React.Fragment>
  );
}

// ---------- BACKUP ----------
function ImpBackup() {
  const rinfresca = useRinfresca();
  const [pers, setPers] = useState(null);
  const [msg, setMsg] = useState(null);
  const file = useRef(null);
  const dati = quantiDati();
  const giorni = giorniDaBackup();
  const auto = storage.get('backup_auto') !== false;
  useEffect(() => { chiediPersistenza(ok => setPers(ok)); }, []);
  const ripristina = e => {
    const f = e.target.files && e.target.files[0]; if (!f) return; e.target.value = '';
    const r = new FileReader();
    r.onload = () => {
      let d; try { d = JSON.parse(String(r.result)); } catch (err) { setMsg({ t: 'per', s: 'Il file non è un backup valido.' }); return; }
      askConfirm('Sostituire tutti i dati con il backup?', 'Quello che c\'è adesso sul telefono viene sovrascritto. Prima scarico una copia dei dati attuali.', () => {
        scaricaBackup(false); storage.importAll(d); setMsg({ t: 'ok', s: 'Backup ripristinato. Ricarico l\'app…' }); setTimeout(() => location.reload(), 1200);
      }, 'Sostituisci');
    };
    r.readAsText(f);
  };
  return (
    <React.Fragment>
      <Testa etichetta="Ultimo backup" valore={giorni === null ? 'Mai' : giorni === 0 ? 'Oggi' : giorni + ' giorni fa'} misura="medio">
        <Confronto>
          {giorni === null ? <Stato tipo="per">Nessun backup</Stato> : giorni >= BACKUP_OGNI_GIORNI ? <Stato tipo="att">Da rifare</Stato> : <Stato tipo="ok">Recente</Stato>}
          <span>automatico {auto ? <b>ogni {BACKUP_OGNI_GIORNI} giorni</b> : <b>spento</b>}</span>
        </Confronto>
        <Secondari voci={[{ v: dati.sedute, e: 'sedute' }, { v: dati.pesate, e: 'pesate' }, { v: dati.schede, e: 'schede' }, { v: dati.diete, e: 'diete' }]} />
      </Testa>
      {msg && <div className="avviso" role="status"><Stato tipo={msg.t}>{msg.s}</Stato></div>}
      <Sezione titolo="Protezione">
        <Riga nome="Backup automatico" sotto={'scarica un file all\'apertura ogni ' + BACKUP_OGNI_GIORNI + ' giorni'} stato={auto ? <Stato tipo="ok">Acceso</Stato> : <Stato tipo="vuoto">Spento</Stato>} freccia={false} onClick={() => { storage.set('backup_auto', !auto); rinfresca(); }} />
        <Riga nome="Memoria persistente" sotto={pers === true ? 'il browser non cancella i dati per fare spazio' : pers === false ? 'non concessa: installa l\'app sulla schermata home' : 'non disponibile in questo browser'} stato={pers === true ? <Stato tipo="ok">Attiva</Stato> : <Stato tipo="att">No</Stato>} freccia={false} />
      </Sezione>
      <Sezione titolo="Ripristino ed esportazioni">
        <input ref={file} type="file" accept="application/json,.json" className="nascosto" onChange={ripristina} />
        <Riga nome="Ripristina da un backup" sotto="sostituisce tutti i dati del telefono" onClick={() => file.current && file.current.click()} />
        <Riga nome="CSV degli allenamenti" onClick={() => exportAllenamentiCSV()} />
        <Riga nome="CSV del peso" onClick={() => exportPesoCSV()} />
        <Riga nome="CSV delle diete" onClick={() => exportDieteCSV()} />
      </Sezione>
      <p className="testo-lungo">Il file finisce nei Download: sopravvive se cancelli i dati del sito, <b>non se cambi telefono</b>. Ogni tanto mandatene una copia per mail o in chat.</p>
      <Azioni><Bottone tipo="pieno" cresce onClick={() => { setMsg(scaricaBackup(false) ? { t: 'ok', s: 'Backup scaricato nei Download.' } : { t: 'per', s: 'Scaricamento non riuscito.' }); }}>Scarica backup adesso</Bottone></Azioni>
    </React.Fragment>
  );
}

const SCHEDE_IMP = [{ id: 'generale', nome: 'Generale' }, { id: 'schede', nome: 'Schede' }, { id: 'diete', nome: 'Diete' }, { id: 'consegne', nome: 'Consegne' }, { id: 'esercizi', nome: 'Esercizi' }, { id: 'dischi', nome: 'Dischi' }, { id: 'tecniche', nome: 'Tecniche' }, { id: 'backup', nome: 'Backup' }];
function Impostazioni({ iniziale }) {
  const [s, setS] = useState(iniziale || 'generale');
  return (
    <div className="pagina">
      <Scelte schede etichetta="Sezioni delle impostazioni" voci={SCHEDE_IMP} valore={s} onChange={setS} />
      {s === 'generale' && <ImpGenerale />}
      {s === 'schede' && <ImpSchede />}
      {s === 'diete' && <ElencoDiete />}
      {s === 'consegne' && <ImpConsegne />}
      {s === 'esercizi' && <ImpEsercizi />}
      {s === 'dischi' && <ImpDischi />}
      {s === 'tecniche' && <ImpTecniche />}
      {s === 'backup' && <ImpBackup />}
    </div>
  );
}

// schermate aperte sopra le pagine
function SchermataSopra({ cosa }) {
  if (cosa.tipo === 'editorDieta') return <EditorDieta dieta={cosa.dieta} />;
  if (cosa.tipo === 'editorScheda') return <EditorScheda scheda={cosa.scheda} />;
  return null;
}
