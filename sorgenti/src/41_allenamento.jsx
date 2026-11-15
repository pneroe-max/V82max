// ============================================================
// ALLENAMENTO — la settimana in una tabella
// ============================================================
const serieFatteSettimana = (cfg, log, w) => (cfg.days || []).reduce((tot, d) => {
  const es = (((log[w] || {})[d.id] || {}).esercizi) || {};
  return tot + Object.values(es).reduce((a, r) => a + ((r.sets_done || []).filter(Boolean).length), 0);
}, 0);

function Allenamento() {
  const nav = useNav();
  const att = schedaAttiva();
  const s = sedutaDiOggi();
  const [sel, setSel] = useState(s ? s.week : 1);
  if (!att) return <div className="pagina"><Testa etichetta="Allenamento" valore="—" /><p className="testo-lungo">Nessuna scheda in uso.</p></div>;
  const cfg = att.config;
  const log = storage.get(cfg.storageKey) || {};
  const giorni = cfg.days || [];
  const fatte = giorni.filter(d => ((log[sel] || {})[d.id] || {}).completato).length;
  const blocco = (cfg.blocks || []).find(b => (b.weeks || []).includes(sel)) || (cfg.blocks || [])[0] || {};
  const fase = (cfg.phase || {})[sel] || {};
  const serieOra = serieFatteSettimana(cfg, log, sel), seriePrima = sel > cfg.weeks[0] ? serieFatteSettimana(cfg, log, sel - 1) : null;
  const prossima = s && s.giorno && !s.completata ? s : null;
  return (
    <div className="pagina">
      <Testa etichetta={'Allenamento · ' + att.label} valore={fatte + ' di ' + giorni.length} unita="sedute">
        <Confronto>
          <b>Settimana {sel} di {cfg.weeks.length}</b>
          {fase.name && <span>{fase.name}</span>}
        </Confronto>
        <Secondari voci={[
          { v: intero(serieOra), e: 'serie fatte' },
          seriePrima != null && { v: intero(seriePrima), e: 'la settimana prima' }
        ]} />
      </Testa>

      <Scelte etichetta="Settimana" voci={cfg.weeks.map(w => ({ id: w, nome: String(w) }))} valore={sel} onChange={w => setSel(Number(w))} />

      <Sezione titolo={'Settimana ' + sel} lato={fase.variable || null}>
        <Tab col="c-giorni" testa={['', 'Seduta', { n: 'Stato' }]}>
          {giorni.map(d => {
            const dl = (log[sel] || {})[d.id] || {};
            const iniziata = Object.keys(dl.esercizi || {}).length > 0;
            const eLei = prossima && prossima.week === sel && prossima.giorno.id === d.id;
            return (
              <Tr key={d.id} onClick={() => nav.apri({ tipo: 'seduta', giorno: d.id, week: sel })} etichetta={d.dayName + ' ' + d.label}>
                <span className="s">{d.dayName}</span>
                <span className="t"><span className="forte">{d.label}</span>{d.subtitle ? <span className="sotto" style={{ display: 'block' }}>{d.subtitle}</span> : null}</span>
                <span className="n">{dl.completato ? <Stato tipo="ok">Fatta</Stato> : iniziata ? <Stato tipo="info">In corso</Stato> : eLei ? <Stato tipo="att">Prossima</Stato> : <Stato tipo="vuoto">Da fare</Stato>}</span>
              </Tr>
            );
          })}
        </Tab>
      </Sezione>

      <Azioni>
        {prossima && <Bottone tipo="pieno" cresce onClick={() => nav.apri({ tipo: 'seduta', giorno: prossima.giorno.id, week: prossima.week })} sotto={'settimana ' + prossima.week + ' · ' + prossima.giorno.dayName}>{(prossima.iniziata ? 'Riprendi ' : 'Inizia ') + prossima.giorno.label}</Bottone>}
        <Bottone alto cresce={!prossima} onClick={() => nav.vai('impostazioni', 'schede')}>Cambia scheda</Bottone>
      </Azioni>
    </div>
  );
}
