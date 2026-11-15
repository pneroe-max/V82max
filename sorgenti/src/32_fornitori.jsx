// ============================================================
// FORNITORI — tasto indietro, timer del recupero, conferme, avvisi
// ============================================================

// ---------- tasto indietro (Android): pila di gestori ----------
function BackStackProvider({ children }) {
  const pila = useRef([]);
  useEffect(() => {
    try { if (!window.history.state || !window.history.state.vbBase) window.history.replaceState({ vbBase: true }, ''); } catch (e) {}
    const onPop = () => { const cima = pila.current[pila.current.length - 1]; if (cima) cima.handler(); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const pushHandler = useCallback(handler => {
    const id = Math.random().toString(36).slice(2);
    pila.current.push({ id, handler });
    try { window.history.pushState({ vbStackId: id }, ''); } catch (e) {}
    return id;
  }, []);
  const popHandler = useCallback(id => {
    const i = pila.current.findIndex(h => h.id === id);
    if (i !== -1) pila.current.splice(i, 1);
  }, []);
  const valore = useMemo(() => ({ pushHandler, popHandler }), [pushHandler, popHandler]);
  return <BackStackContext.Provider value={valore}>{children}</BackStackContext.Provider>;
}

// ---------- timer del recupero: sopravvive alla ricarica (startedAt salvato) ----------
function TimerProvider({ children }) {
  const [active, setActive] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const finito = useRef(false);
  useEffect(() => {
    const s = storage.get('soundEnabled'); if (s !== null) setSoundEnabled(s);
    const t = storage.get('activeTimer');
    if (t && t.startedAt) {
      const resta = t.totalSeconds - Math.floor((Date.now() - t.startedAt) / 1000);
      if (resta > 0) { setActive(t); setRemaining(resta); setRunning(true); } else storage.set('activeTimer', null);
    }
  }, []);
  const startTimer = useCallback((seconds, exerciseName = '') => {
    const t = { totalSeconds: seconds, startedAt: Date.now(), exerciseName };
    finito.current = false; setActive(t); setRemaining(seconds); setRunning(true); storage.set('activeTimer', t);
  }, []);
  const stopTimer = useCallback(() => { setActive(null); setRemaining(0); setRunning(false); storage.set('activeTimer', null); }, []);
  const aggiungi = useCallback(s => {
    setActive(a => {
      if (!a) return a;
      const t = { ...a, totalSeconds: a.totalSeconds + s };
      storage.set('activeTimer', t); finito.current = false; setRunning(true);
      setRemaining(r => Math.max(0, r) + s);
      return t;
    });
  }, []);
  const toggleSound = useCallback(() => setSoundEnabled(p => { storage.set('soundEnabled', !p); return !p; }), []);
  // il tempo si calcola dall'ora di partenza: resta giusto anche se il telefono va in pausa
  useEffect(() => {
    if (!running || !active || !active.startedAt) return;
    const batti = () => {
      const resta = active.totalSeconds - Math.floor((Date.now() - active.startedAt) / 1000);
      if (resta <= 0) {
        setRemaining(0); setRunning(false);
        if (!finito.current) {
          finito.current = true;
          if (soundEnabled) {
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator(), gain = ctx.createGain();
              osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = 880;
              gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
              osc.start(); osc.stop(ctx.currentTime + 0.5);
            } catch (e) {}
          }
          try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
        }
      } else setRemaining(resta);
    };
    batti();
    const id = setInterval(batti, 500);
    document.addEventListener('visibilitychange', batti);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', batti); };
  }, [running, active, soundEnabled]);
  const valore = useMemo(() => ({ active, remaining, running, soundEnabled, startTimer, stopTimer, aggiungi, toggleSound }), [active, remaining, running, soundEnabled, startTimer, stopTimer, aggiungi, toggleSound]);
  return <TimerContext.Provider value={valore}>{children}</TimerContext.Provider>;
}
// riga del recupero dentro la barra flottante
function RigaRecupero() {
  const t = useTimer();
  if (!t || !t.active) return null;
  const fine = t.remaining <= 0;
  return (
    <div className={cx('dock-tempo', fine && 'finito')} role="timer" aria-live="off">
      <b>{fine ? 'Via' : mmss(t.remaining)}</b>
      <span className="cresce">{fine ? 'Recupero finito' : 'Recupero'}{t.active.exerciseName ? <React.Fragment><br />{t.active.exerciseName}</React.Fragment> : null}</span>
      {!fine && <Bottone onClick={() => t.aggiungi(30)} etichetta="Aggiungi 30 secondi">+30 s</Bottone>}
      <Bottone onClick={t.stopTimer}>{fine ? 'Chiudi' : 'Salta'}</Bottone>
    </div>
  );
}

// ---------- conferme: finestra piccola al centro, il bottone dice cosa fa ----------
function ConfermaHost() {
  const [c, setC] = useState(null);
  useEffect(() => { _confirmSetter = setC; return () => { _confirmSetter = null; }; }, []);
  const chiudi = useCallback(() => setC(null), []);
  if (!c) return null;
  const { verbo, rosso } = verboConferma(c.titolo);
  return (
    <Finestra titolo={c.titolo} onChiudi={chiudi}>
      {c.dettaglio && <p className="testo-lungo">{c.dettaglio}</p>}
      <Fila fine>
        <Bottone onClick={chiudi}>Annulla</Bottone>
        <Bottone tipo={rosso ? 'pericolo' : 'pieno'} onClick={() => { const f = c.onOk; setC(null); f && f(); }}>{c.verbo || verbo}</Bottone>
      </Fila>
    </Finestra>
  );
}

// ---------- strisce in alto: memoria piena, nuova versione ----------
function AvvisoMemoria() {
  const [quando, setQuando] = useState(0);
  useEffect(() => { _storageErrSetter = setQuando; return () => { _storageErrSetter = null; }; }, []);
  useEffect(() => { if (!quando) return; const id = setTimeout(() => setQuando(0), 8000); return () => clearTimeout(id); }, [quando]);
  if (!quando) return null;
  return <div className="striscia errore" role="alert"><button className="b" onClick={() => setQuando(0)}>Memoria piena: l'ultimo dato non è stato salvato. Scarica un backup.</button></div>;
}
function AvvisoVersione() {
  const [pronta, setPronta] = useState(false);
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const senti = e => {
      if (!e.data) return;
      if (e.data.tipo === 'NUOVA_VERSIONE') setPronta(true);
      if (e.data.tipo === 'VERSIONE' && e.data.v && e.data.v !== APP_VERSION) setPronta(true);
    };
    navigator.serviceWorker.addEventListener('message', senti);
    // l'aggiornamento può finire prima che l'app ascolti: lo chiedo io
    const chiedi = () => { try { const c = navigator.serviceWorker.controller; if (c) c.postMessage({ tipo: 'VERSIONE?' }); } catch (e) {} };
    const t1 = setTimeout(chiedi, 1500), t2 = setTimeout(chiedi, 8000);
    const vis = () => { if (document.visibilityState === 'visible') chiedi(); };
    document.addEventListener('visibilitychange', vis);
    return () => { clearTimeout(t1); clearTimeout(t2); navigator.serviceWorker.removeEventListener('message', senti); document.removeEventListener('visibilitychange', vis); };
  }, []);
  if (!pronta) return null;
  return <div className="striscia"><button className="b b-pieno" onClick={() => { try { flushSaves(); } catch (e) {} window.location.reload(); }}>Nuova versione pronta: aggiorna ora</button></div>;
}

// ---------- errore imprevisto: mai schermo bianco ----------
class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { try { console.error('V8 Tracker error:', error, info); } catch (e) {} }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="pagina">
        <Testa etichetta="Errore" valore="Ops" />
        <p className="testo-lungo"><b>Qualcosa è andato storto.</b> I tuoi dati sono al sicuro sul telefono. Ricarica per continuare.</p>
        <Bottone tipo="pieno" onClick={() => window.location.reload()}>Ricarica l'app</Bottone>
      </div>
    );
  }
}
