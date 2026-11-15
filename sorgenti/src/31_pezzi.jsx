// ============================================================
// PEZZI CONDIVISI — tutte le schermate sono fatte solo con questi.
// L'aspetto sta in style.css: qui niente colori né misure.
// ============================================================
const { useMemo, useLayoutEffect } = React;
const cx = (...a) => a.filter(Boolean).join(' ');

// ---------- numeri all'italiana ----------
const num = (v, dec = 1) => {
  if (v == null || v === '' || isNaN(Number(v))) return '—';
  const [i, d] = Math.abs(Number(v)).toFixed(dec).split('.');
  return (Number(v) < 0 ? '−' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (d ? ',' + d : '');
};
const intero = v => num(v, 0);
const kg = v => (v == null || v === '' || isNaN(Number(v))) ? '—' : Number(v).toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const conSegno = (v, dec = 1) => (v > 0 ? '+' : '') + num(v, dec);
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

// ---------- stato: pallino + parola (mai solo il colore) ----------
function Stato({ tipo, children }) {
  return <span className={cx('stato', tipo)}><i />{children}</span>;
}
// freccia + variazione, con la parola accanto
function Delta({ v, dec = 1, unita = '' }) {
  if (v == null || isNaN(v)) return null;
  return <b>{v > 0 ? '▲' : v < 0 ? '▼' : '='} {conSegno(v, dec)}{unita ? ' ' + unita : ''}</b>;
}

// ---------- testa della pagina: prima il numero che conta ----------
function Testa({ etichetta, valore, unita, misura, children }) {
  return (
    <header className="testa">
      <div className="etichetta">{etichetta}</div>
      {valore != null && (valore === '—' ? <div className="eroe vuoto"><b>Nessun dato</b></div> : <div className={cx('eroe', misura)}><b>{valore}</b>{unita && <span>{unita}</span>}</div>)}
      {children}
    </header>
  );
}
const Confronto = ({ children }) => <div className="confronto">{children}</div>;
function Secondari({ voci }) {
  const v = (voci || []).filter(Boolean);
  if (!v.length) return null;
  return <div className="secondari">{v.map((x, i) => <div key={i}><b>{x.v}</b><span>{x.e}</span></div>)}</div>;
}

// ---------- sezione: etichetta + riga sottile, niente riquadri ----------
function Sezione({ titolo, lato, children }) {
  return (
    <section className="sez">
      <div className="sez-t"><h3 className="etichetta">{titolo}</h3>{lato != null && <span>{lato}</span>}</div>
      {children}
    </section>
  );
}

// ---------- riga di lista ----------
function Riga({ nome, sotto, val, stato, prima, onClick, scelta, freccia }) {
  const T = onClick ? 'button' : 'div';
  return (
    <T className={cx('riga', scelta && 'scelta')} onClick={onClick}>
      {prima}
      <span className="cresce"><span className="nome" style={{ display: 'block' }}>{nome}</span>{sotto && <span className="sotto" style={{ display: 'block' }}>{sotto}</span>}</span>
      {val != null && <span className="val">{val}</span>}
      {stato}
      {(freccia || (onClick && freccia !== false)) && <span className="freccia"><Icona nome="destra" size={18} /></span>}
    </T>
  );
}

// ---------- tabella: <Tab col="c-giorni" testa={[..]}> <Tr>…</Tr> </Tab> ----------
function Tab({ col, testa, children }) {
  return (
    <div className="tab" role="table">
      {testa && <div className={cx('tr th', col)} role="row">{testa.map((t, i) => <span key={i} className={t && t.n ? 'n' : 't'} role="columnheader">{t && t.n ? t.n : t}</span>)}</div>}
      {React.Children.map(children, c => c && c.type === Tr ? React.cloneElement(c, { col: c.props.col || col }) : c)}
    </div>
  );
}
function Tr({ col, onClick, classe, children, etichetta }) {
  const T = onClick ? 'button' : 'div';
  return <T className={cx('tr', col, classe)} onClick={onClick} role="row" aria-label={etichetta}>{children}</T>;
}

// ---------- bottoni: il bottone dice cosa fa; solo il principale è pieno ----------
function Bottone({ tipo = 'neutro', icona, children, onClick, disabled, largo, alto, sotto, etichetta, cresce }) {
  return (
    <button type="button" className={cx('b', 'b-' + tipo, !children && 'b-icona', largo && 'b-largo', (alto || sotto) && 'b-alto', cresce && 'cresce')} onClick={onClick} disabled={disabled} aria-label={etichetta}>
      {sotto ? <React.Fragment><span>{children}</span><small>{sotto}</small></React.Fragment>
        : <React.Fragment>{icona && <Icona nome={icona} size={18} />}{children}</React.Fragment>}
    </button>
  );
}
const Fila = ({ children, fine }) => <div className={cx('fila', fine && 'fine')}>{children}</div>;

// ---------- scelte: una pillola viola = quella scelta ----------
function Scelte({ voci, valore, onChange, schede, etichetta }) {
  return (
    <div className={cx('scelte', schede && 'schede')} role="group" aria-label={etichetta}>
      {voci.map(v => <button type="button" key={v.id} aria-pressed={String(v.id) === String(valore)} onClick={() => onChange(v.id)}>{v.nome}</button>)}
    </div>
  );
}

// ---------- campo: etichetta sopra, messaggio d'errore sotto ----------
function Campo({ etichetta, errore, children }) {
  return <label className={cx('campo', errore && 'errore')}><span>{etichetta}</span>{children}{errore && <div className="msg">{errore}</div>}</label>;
}

// ---------- finestra centrata (conferme, scelte, dettagli) ----------
function Finestra({ titolo, onChiudi, larga, children }) {
  useAndroidBack(onChiudi, true);
  useEffect(() => {
    const giu = e => { if (e.key === 'Escape') onChiudi(); };
    document.addEventListener('keydown', giu);
    return () => document.removeEventListener('keydown', giu);
  }, [onChiudi]);
  return (
    <div className="velo" onClick={onChiudi}>
      <div className={cx('finestra', larga && 'larga')} role="dialog" aria-modal="true" aria-label={titolo} onClick={e => e.stopPropagation()}>
        {titolo && <h2>{titolo}</h2>}
        {children}
      </div>
    </div>
  );
}

// ---------- barra (sempre da zero) e linea ----------
function Barra({ v, max, tipo }) {
  const p = max > 0 ? Math.max(0, Math.min(100, (v / max) * 100)) : 0;
  return <div className={cx('barra', tipo)}><i style={{ width: p + '%' }} /></div>;
}
// linea semplice: una serie in evidenza, eventuale linea di riferimento in grigio
function Linea({ punti, altezza = 72, riferimento }) {
  const p = (punti || []).filter(x => x != null && !isNaN(x));
  if (p.length < 2) return null;
  const W = 320, H = altezza, m = 6;
  const tutti = riferimento != null ? p.concat([riferimento]) : p;
  const min = Math.min(...tutti), max = Math.max(...tutti), d = (max - min) || 1;
  const x = i => m + (i * (W - 2 * m)) / (p.length - 1), y = v => H - m - ((v - min) / d) * (H - 2 * m);
  return (
    <svg className="linea" viewBox={`0 0 ${W} ${H}`} height={H} preserveAspectRatio="none" role="img" aria-label="andamento">
      {riferimento != null && <line x1={m} x2={W - m} y1={y(riferimento)} y2={y(riferimento)} stroke="var(--linea)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />}
      <polyline points={p.map((v, i) => x(i) + ',' + y(v)).join(' ')} fill="none" stroke="var(--testo)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={x(p.length - 1)} cy={y(p[p.length - 1])} r="3.5" fill="var(--testo)" />
    </svg>
  );
}

// ---------- azioni della pagina: finiscono nella barra flottante in basso ----------
const DockCtx = createContext(null);
function Azioni({ children }) {
  const nodo = useContext(DockCtx);
  return nodo ? ReactDOM.createPortal(children, nodo) : null;
}

// ---------- navigazione tra le pagine ----------
const NavCtx = createContext(null);
const useNav = () => useContext(NavCtx);
// ricarica la schermata quando cambia un dato salvato da un'altra parte
function useRinfresca() {
  const [, set] = useState(0);
  return useCallback(() => set(n => n + 1), []);
}
