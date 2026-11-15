// ============================================================
// PROGRESSI — forza, volume, stalli, blocchi archiviati
// ============================================================
const dataBreve = ts => { if (!ts) return '—'; const d = new Date(ts); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getFullYear()).slice(2); };
const settimanaInCorso = cfg => { const s = sedutaDiOggi(); return s ? s.week : (cfg.weeks || [1])[0]; };

// ---------- FORZA: massimale stimato dei multiarticolari ----------
function ProgForza({ att }) {
  const [sel, setSel] = useState(null);
  const serie = serieEsercizi(att.config).filter(e => e.ex.isCompound);
  const righe = serie.map(e => {
    const s = e.sedute, primo = s[0].max1rm, ult = s[s.length - 1].max1rm, best = Math.max(...s.map(x => x.max1rm));
    return { e, primo, ult, best, d: ult - primo };
  }).sort((a, b) => b.best - a.best);
  const scelto = righe.find(r => r.e.ex.name + r.e.giorno.id === sel) || righe[0];
  return (
    <React.Fragment>
      <Testa etichetta={scelto ? 'Massimale stimato · ' + scelto.e.ex.name : 'Massimale stimato'} valore={scelto ? num(scelto.ult, 1) : '—'} unita="kg">
        <Confronto>
          {scelto ? scelto.e.sedute.length < 2 ? <span>una sola seduta: il confronto arriva dalla prossima</span> : <React.Fragment><span>dalla settimana {scelto.e.sedute[0].w}</span><Delta v={scelto.d} dec={1} unita="kg" />{scelto.d > 0 ? <Stato tipo="ok">Sale</Stato> : scelto.e.sedute.length > 1 ? <Stato tipo="att">Fermo</Stato> : null}</React.Fragment>
            : <span>Registra qualche seduta: qui vedi come salgono i multiarticolari.</span>}
        </Confronto>
      </Testa>
      {scelto && scelto.e.sedute.length > 1 && <Linea punti={scelto.e.sedute.map(x => x.max1rm)} altezza={96} riferimento={scelto.primo} />}
      <Sezione titolo="Multiarticolari" lato="kg × (1 + rep ÷ 30)">
        {righe.length === 0 ? <p className="vuoto">Nessun dato ancora.</p> : (
          <Tab col="c-4" testa={['Esercizio', { n: 'Inizio' }, { n: 'Variaz.' }, { n: 'Ora' }]}>
            {righe.map(r => (
              <Tr key={r.e.ex.name + r.e.giorno.id} onClick={() => setSel(r.e.ex.name + r.e.giorno.id)} classe={r === scelto ? 'forte' : ''}>
                <span className="t">{r.e.ex.name}<span className="sotto" style={{ display: 'block' }}>{r.e.giorno.label} · {r.e.sedute.length} sedute</span></span>
                <span className="n s">{num(r.primo, 1)}</span>
                <span className="n s">{conSegno(r.d, 1)}</span>
                <span className="n forte">{num(r.ult, 1)}</span>
              </Tr>
            ))}
          </Tab>
        )}
      </Sezione>
    </React.Fragment>
  );
}

// ---------- VOLUME: serie per muscolo nella settimana ----------
const NOMI_MUSCOLI = { PETTO: 'Petto', DORSO: 'Dorso', 'D.ANT': 'Deltoide anteriore', 'D.MED': 'Deltoide laterale', 'D.POST': 'Deltoide posteriore', BI: 'Bicipiti', TRI: 'Tricipiti', QUAD: 'Quadricipiti', HAM: 'Femorali', GLUTE: 'Glutei', POLP: 'Polpacci', CORE: 'Addome', AVB: 'Avambracci' };
function ProgVolume({ att }) {
  const cfg = att.config, log = storage.get(cfg.storageKey) || {};
  const [w, setW] = useState(() => settimanaInCorso(cfg));
  const vol = computeVolume(cfg, log[w]), prima = w > 1 ? computeVolume(cfg, log[w - 1]) : null;
  const tot = Object.values(vol).reduce((a, b) => a + b, 0), totPrima = prima ? Object.values(prima).reduce((a, b) => a + b, 0) : null;
  const righe = VOL_MUSCLES.map(m => ({ m, v: vol[m] })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  const sotto = righe.filter(x => x.v < VOL_RANGES.min).length;
  const max = Math.max(VOL_RANGES.max, ...righe.map(x => x.v));
  return (
    <React.Fragment>
      <Testa etichetta={'Serie allenanti · settimana ' + w} valore={num(tot, tot % 1 ? 1 : 0)} unita="serie">
        <Confronto>{totPrima != null && <React.Fragment><span>settimana prima <b>{num(totPrima, totPrima % 1 ? 1 : 0)}</b></span><Delta v={tot - totPrima} dec={0} /></React.Fragment>}{righe.length > 0 && <Stato tipo={sotto ? 'att' : 'ok'}>{sotto ? sotto + ' muscoli sotto 10' : 'Tutti tra 10 e 20'}</Stato>}</Confronto>
      </Testa>
      <Scelte etichetta="Settimana" voci={cfg.weeks.map(x => ({ id: x, nome: String(x) }))} valore={w} onChange={x => setW(Number(x))} />
      <Sezione titolo="Per muscolo" lato="obiettivo 10–20 serie">
        {righe.length === 0 ? <p className="vuoto">Nessuna serie fatta in questa settimana.</p> : righe.map(x => (
          <div key={x.m} className="vol">
            <div className="fila"><span className="cresce">{NOMI_MUSCOLI[x.m] || x.m}</span><b>{num(x.v, x.v % 1 ? 1 : 0)}</b></div>
            <Barra v={x.v} max={max} tipo={x.v < VOL_RANGES.min ? 'att' : x.v > VOL_RANGES.max ? 'att' : 'evid'} />
          </div>
        ))}
      </Sezione>
      <p className="testo-lungo">Una serie conta intera per il muscolo principale e mezza per i secondari.</p>
    </React.Fragment>
  );
}

// ---------- STALLI ----------
const PAROLA_STALLO = { fermo: ['per', 'Fermo'], rallentato: ['att', 'Rallenta'], 'in progressione': ['ok', 'Sale'], 'pochi dati': ['vuoto', 'Pochi dati'] };
function ProgStalli({ att }) {
  const [alt, setAlt] = useState(null);
  const lista = stalli(att.config);
  const ordine = { fermo: 0, rallentato: 1, 'in progressione': 2, 'pochi dati': 3 };
  lista.sort((a, b) => ordine[a.stato] - ordine[b.stato]);
  const fermi = lista.filter(x => x.stato === 'fermo').length, lenti = lista.filter(x => x.stato === 'rallentato').length;
  return (
    <React.Fragment>
      <Testa etichetta="Esercizi fermi · ultime 3 sedute" valore={String(fermi)} unita={'di ' + lista.length}>
        <Confronto>{lenti > 0 && <Stato tipo="att">{lenti} rallentano</Stato>}{fermi === 0 && lista.length > 0 && <Stato tipo="ok">Nessuno fermo</Stato>}</Confronto>
      </Testa>
      <Sezione titolo="Esercizi" lato="massimale stimato, ultime 3 contro prima">
        {lista.length === 0 ? <p className="vuoto">Servono almeno 4 sedute per esercizio.</p> : (
          <Tab col="c-3" testa={['Esercizio', { n: 'Variaz.' }, { n: 'Stato' }]}>
            {lista.map(x => {
              const [t, p] = PAROLA_STALLO[x.stato] || ['vuoto', x.stato];
              return (
                <Tr key={x.ex.name + x.giorno.id} onClick={x.stato === 'fermo' ? () => setAlt(x.ex) : undefined}>
                  <span className="t">{x.ex.name}<span className="sotto" style={{ display: 'block' }}>{x.giorno.label} · {x.n} sedute</span></span>
                  <span className="n s">{x.guadagno != null ? conSegno(x.guadagno, 1) + ' %' : '—'}</span>
                  <span className="n"><Stato tipo={t}>{p}</Stato></span>
                </Tr>
              );
            })}
          </Tab>
        )}
      </Sezione>
      {fermi > 0 && <p className="testo-lungo">Tocca un esercizio fermo per vedere le alternative. Prima di cambiarlo controlla sonno, calorie e RIR.</p>}
      {alt && (
        <Finestra titolo={'Alternative a ' + alt.name} onChiudi={() => setAlt(null)}>
          {alternativePer(alt).slice(0, 8).map(e => <Riga key={e.id} nome={e.name} sotto={e.equip} />)}
          <p className="sotto">Le cambi nella seduta con «Cambia esercizio».</p>
          <Fila fine><Bottone tipo="pieno" onClick={() => setAlt(null)}>Chiudi</Bottone></Fila>
        </Finestra>
      )}
    </React.Fragment>
  );
}

// ---------- STORICO: blocchi archiviati ----------
function ProgStorico({ att }) {
  const rinfresca = useRinfresca();
  const [apri, setApri] = useState(null);
  const archivio = storage.get('archivio') || [];
  const cfg = att.config, log = storage.get(cfg.storageKey) || {};
  const ora = statsBlocco(cfg, log);
  const scrivi = l => { storage.set('archivio', l); rinfresca(); };
  const archivia = () => {
    const voce = { id: 'blk_' + Date.now(), programma: att.label, storageKey: cfg.storageKey, progId: att.id, creato: Date.now(), dal: ora.primo, al: ora.ultimo, sessioni: ora.sessioni, serie: ora.serie, tonnellaggio: ora.tonnellaggio, vol: ora.vol, log };
    storage.set('archivio', [voce].concat(archivio)); storage.set(cfg.storageKey, {}); rinfresca();
  };
  const ultimo = archivio[0];
  return (
    <React.Fragment>
      <Testa etichetta={'Blocco in corso · ' + att.label} valore={intero(ora.tonnellaggio / 1000)} unita="tonnellate">
        <Confronto><span><b>{ora.sessioni}</b> sedute · <b>{ora.serie}</b> serie</span>{ultimo && <span>blocco prima <b>{intero(ultimo.tonnellaggio / 1000)} t</b></span>}</Confronto>
        {ora.primo && <Confronto><span>dal {dataBreve(ora.primo)} al {dataBreve(ora.ultimo)}</span></Confronto>}
      </Testa>
      <Sezione titolo="Blocchi archiviati" lato={archivio.length ? archivio.length + ' blocchi' : null}>
        {archivio.length === 0 ? <p className="vuoto">Nessun blocco archiviato. A fine mesociclo archivialo per ripartire dalla settimana 1.</p> : (
          <Tab col="c-4" testa={['Blocco', { n: 'Sedute' }, { n: 'Serie' }, { n: 'Tonn.' }]}>
            {archivio.map(a => (
              <Tr key={a.id} onClick={() => setApri(a)}>
                <span className="t">{a.programma}<span className="sotto" style={{ display: 'block' }}>{dataBreve(a.dal)} → {dataBreve(a.al)}</span></span>
                <span className="n s">{a.sessioni}</span><span className="n s">{a.serie}</span><span className="n forte">{num((a.tonnellaggio || 0) / 1000, 1)}</span>
              </Tr>
            ))}
          </Tab>
        )}
      </Sezione>
      <Azioni>
        <Bottone tipo="pieno" cresce disabled={ora.sessioni === 0} onClick={() => askConfirm('Archiviare il blocco ' + att.label + '?', 'Le sedute vanno nello storico e la scheda riparte dalla settimana 1.', archivia, 'Archivia')}>Archivia il blocco</Bottone>
        <Bottone alto onClick={() => exportAllenamentiCSV()}>Scarica CSV</Bottone>
      </Azioni>
      {apri && (
        <Finestra titolo={apri.programma} onChiudi={() => setApri(null)}>
          <p className="sotto">{dataBreve(apri.dal)} → {dataBreve(apri.al)} · {apri.sessioni} sedute · {apri.serie} serie · {num((apri.tonnellaggio || 0) / 1000, 1)} t</p>
          <div className="colonna">
            <Bottone largo onClick={() => { const a = apri; setApri(null); askConfirm('Rimettere in uso le sedute di ' + a.programma + '?', 'Sostituiscono quelle registrate adesso su quella scheda.', () => { storage.set(a.storageKey, a.log || {}); rinfresca(); }, 'Rimetti in uso'); }}>Rimetti in uso queste sedute</Bottone>
            <Bottone largo tipo="testo" onClick={() => { const a = apri; setApri(null); askConfirm('Eliminare il blocco ' + a.programma + '?', 'Le sue sedute si perdono.', () => scrivi(archivio.filter(x => x.id !== a.id))); }}>Elimina il blocco</Bottone>
          </div>
          <Fila fine><Bottone tipo="pieno" onClick={() => setApri(null)}>Chiudi</Bottone></Fila>
        </Finestra>
      )}
    </React.Fragment>
  );
}

const SCHEDE_PROG = [{ id: 'forza', nome: 'Forza' }, { id: 'volume', nome: 'Volume' }, { id: 'stalli', nome: 'Stalli' }, { id: 'storico', nome: 'Storico' }];
function Progressi({ iniziale }) {
  const [s, setS] = useState(iniziale || 'forza');
  const att = schedaAttiva();
  return (
    <div className="pagina">
      <Scelte schede etichetta="Sezioni di Progressi" voci={SCHEDE_PROG} valore={s} onChange={setS} />
      {!att ? <p className="testo-lungo">Nessuna scheda in uso.</p> : <React.Fragment>
        {s === 'forza' && <ProgForza att={att} />}
        {s === 'volume' && <ProgVolume att={att} />}
        {s === 'stalli' && <ProgStalli att={att} />}
        {s === 'storico' && <ProgStorico att={att} />}
      </React.Fragment>}
    </div>
  );
}
