// ============================================================
// APP — pagine, barra flottante in basso, schermate sopra
// ============================================================
const PAGINE = [
  { id: 'oggi', nome: 'Oggi', icona: 'sole' },
  { id: 'allenamento', nome: 'Allenamento', icona: 'manubrio' },
  { id: 'corpo', nome: 'Corpo', icona: 'bilancia' },
  { id: 'progressi', nome: 'Progressi', icona: 'grafico' },
  { id: 'impostazioni', nome: 'Impostazioni', icona: 'ingranaggio' }
];
const applicaScala = () => { try { document.documentElement.dataset.scala = storage.get('scala') || ''; } catch (e) {} };
applicaScala();

// una schermata aperta sopra le pagine: il tasto indietro la chiude
function Livello({ onIndietro, children }) {
  useAndroidBack(onIndietro, true);
  return children;
}

function App() {
  const [tab, setTab] = useState('oggi');
  const [sezione, setSezione] = useState(null); // scheda da aprire dentro la pagina (es. impostazioni → schede)
  const [pila, setPila] = useState([]);
  const [nodoAzioni, setNodoAzioni] = useState(null);
  const dock = useRef(null);
  const chiudi = useCallback(() => setPila(p => p.slice(0, -1)), []);
  const nav = useMemo(() => ({
    apri: s => setPila(p => p.concat([s])),
    chiudi,
    vai: (t, sez) => { setPila([]); setSezione(sez || null); setTab(t); }
  }), [chiudi]);
  useAndroidBack(() => setTab('oggi'), tab !== 'oggi' && pila.length === 0);
  useEffect(() => { window.scrollTo(0, 0); }, [tab, pila.length]);
  // l'altezza della barra decide quanto spazio lasciare in fondo alla pagina
  useLayoutEffect(() => {
    const el = dock.current; if (!el) return;
    const misura = () => document.documentElement.style.setProperty('--dock-h', el.offsetHeight + 'px');
    misura();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(misura); ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cima = pila[pila.length - 1];
  let corpo;
  if (cima) {
    const k = pila.length + '_' + cima.tipo;
    if (cima.tipo === 'seduta') corpo = <Seduta key={k + cima.giorno + cima.week} giorno={cima.giorno} week={cima.week} />;
    else if (cima.tipo === 'dieta') corpo = <DietaOggi key={k} />;
    else corpo = <SchermataSopra key={k} cosa={cima} />;
    corpo = <Livello key={'l' + pila.length} onIndietro={chiudi}>{corpo}</Livello>;
  } else if (tab === 'allenamento') corpo = <Allenamento />;
  else if (tab === 'corpo') corpo = <Corpo iniziale={sezione} />;
  else if (tab === 'progressi') corpo = <Progressi iniziale={sezione} />;
  else if (tab === 'impostazioni') corpo = <Impostazioni key={sezione || 'i'} iniziale={sezione} />;
  else corpo = <Oggi />;

  return (
    <NavCtx.Provider value={nav}>
      <DockCtx.Provider value={nodoAzioni}>
        {corpo}
        <div className="dock" ref={dock}>
          <div className="dock-in">
            <RigaRecupero />
            <div className="dock-azioni" ref={setNodoAzioni} />
            {!cima && (
              <nav className="dock-nav" aria-label="Pagine">
                {PAGINE.map(p => <button type="button" key={p.id} className={p.id === 'impostazioni' ? 'solo-icona' : undefined} aria-current={tab === p.id ? 'page' : undefined} onClick={() => { setSezione(null); setTab(p.id); }}><Icona nome={p.icona} size={20} /><span>{p.nome}</span></button>)}
              </nav>
            )}
          </div>
        </div>
        <ConfermaHost />
        <AvvisoMemoria />
        <AvvisoVersione />
      </DockCtx.Provider>
    </NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ErrorBoundary><BackStackProvider><TimerProvider><App /></TimerProvider></BackStackProvider></ErrorBoundary>);
if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
