// ============================================================
// OGGI — il peso medio in alto, poi la seduta e la dieta della giornata
// ============================================================

// peso medio per settimana, andamento e giudizio rispetto alla fase
function andamentoPeso() {
  const f = faseAttiva();
  const peso = storage.get('peso') || {};
  const sett = Object.keys(peso).map(Number).filter(w => (peso[w] || {}).media > 0).sort((a, b) => a - b);
  const ult = sett.length ? peso[sett[sett.length - 1]].media : null;
  let ritmo = null;
  if (sett.length >= 2) {
    const da = sett[Math.max(0, sett.length - 4)], a = sett[sett.length - 1];
    if (a > da) ritmo = (peso[a].media - peso[da].media) / (a - da);
  }
  const stato = ritmo == null ? null : ritmo < f.min ? 'sotto' : ritmo > f.max ? 'sopra' : 'ok';
  return { f, peso, sett, ult, ritmo, stato, punti: sett.slice(-10).map(w => peso[w].media) };
}
const PAROLA_RITMO = { ok: 'Nel ritmo', sotto: 'Sotto il ritmo', sopra: 'Sopra il ritmo' };
function StatoRitmo({ stato }) {
  if (!stato) return null;
  return <Stato tipo={stato === 'ok' ? 'ok' : 'att'}>{PAROLA_RITMO[stato]}</Stato>;
}

// finestra per segnare il peso di oggi
function FinestraPeso({ onChiudi }) {
  const oggi = GIORNI_SETT[new Date().getDay()];
  const sett = settimanaCorrente();
  const gia = ((storage.get('peso') || {})[sett] || {})[oggi] || '';
  const [v, setV] = useState(gia ? String(gia).replace('.', ',') : '');
  const n = parseFloat(String(v).replace(',', '.'));
  const valido = !isNaN(n) && n > 20 && n < 300;
  const salva = () => {
    if (!valido) return;
    const d = storage.get('peso') || {};
    if (!d[sett]) d[sett] = { media: 0, note: '' };
    d[sett][oggi] = String(Math.round(n * 10) / 10);
    d[sett].media = mediaSett(d[sett]);
    storage.set('peso', d);
    onChiudi();
  };
  return (
    <Finestra titolo="Peso di oggi" onChiudi={onChiudi}>
      <Campo etichetta={'Chili, a digiuno · settimana ' + sett} errore={v && !valido ? 'Scrivi un peso in chili, per esempio 92,4' : null}>
        <input type="text" inputMode="decimal" autoFocus value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') salva(); }} placeholder="92,4" />
      </Campo>
      <Fila fine>
        <Bottone onClick={onChiudi}>Annulla</Bottone>
        <Bottone tipo="pieno" onClick={salva} disabled={!valido}>{gia ? 'Correggi peso' : 'Salva peso'}</Bottone>
      </Fila>
    </Finestra>
  );
}

// avviso: backup vecchio (e backup automatico ogni tot giorni)
function AvvisoBackup() {
  const [chiuso, setChiuso] = useState(false);
  const giorni = giorniDaBackup();
  const dati = quantiDati();
  const haRoba = dati.sedute > 0 || dati.pesate > 2;
  useEffect(() => { chiediPersistenza(null); }, []);
  useEffect(() => {
    if (!haRoba || storage.get('backup_auto') === false) return;
    const g = giorniDaBackup();
    if (g === null || g >= BACKUP_OGNI_GIORNI) { const t = setTimeout(() => scaricaBackup(true), 2500); return () => clearTimeout(t); }
  }, []);
  if (chiuso || !haRoba || (giorni !== null && giorni < BACKUP_OGNI_GIORNI)) return null;
  return (
    <div className="avviso" role="status">
      <div className="cresce">
        <Stato tipo="att">{giorni === null ? 'Nessun backup' : 'Backup di ' + giorni + ' giorni fa'}</Stato>
        <p>{dati.sedute} sedute e {dati.pesate} pesate stanno solo su questo telefono.</p>
        <Fila>
          <Bottone tipo="pieno" onClick={() => { if (scaricaBackup(false)) setChiuso(true); }}>Scarica backup</Bottone>
          <Bottone onClick={() => setChiuso(true)}>Dopo</Bottone>
        </Fila>
      </div>
    </div>
  );
}

// avviso: verifica calorie dal peso medio (solo quando è ora e sei fuori ritmo)
function AvvisoCalorie({ sempre, onFatto }) {
  const rinfresca = useRinfresca();
  const [esito, setEsito] = useState(null);
  const v = verificaCalorie();
  if (esito) return <div className="avviso" role="status"><div className="cresce"><Stato tipo="ok">Calorie aggiornate</Stato>{esito.map((t, i) => <p key={i}>{t}</p>)}</div></div>;
  if (v.stato === 'pochi') {
    if (!sempre) return null;
    return <p className="testo-lungo">Servono 3 settimane complete con almeno 3 pesate ciascuna: ne hai <b>{v.piene}</b>. Poi ogni 2 settimane ti propongo se alzare o abbassare le calorie.</p>;
  }
  const fuori = v.stato !== 'ok';
  if (!sempre && !(v.dovuta && fuori)) return null;
  const segno = v.stato === 'sotto' ? 1 : -1;
  const prev = fuori ? anteprimaVerifica(segno) : [];
  return (
    <div className="avviso">
      <div className="cresce">
        <StatoRitmo stato={v.stato} />
        <p><b>{kgSett(v.rate)}</b> tra le settimane {v.da} e {v.a}. Atteso in {v.fase.label.toLowerCase()}: {v.fase.testo}.</p>
        {fuori && [...new Set(prev.map(x => x.p.nome + ' ' + (x.p.dg > 0 ? '+' : '') + x.p.dg + ' g'))].map((t, i) => <p key={i}>{t}{prev.length > 1 ? ' nelle diete in uso' : ''}</p>)}
        {fuori && prev.length === 0 && <p>Nessun carboidrato base nelle diete in uso: correggi a mano di {segno > 0 ? '+' : '−'}40 g di carboidrati.</p>}
        {!v.dovuta && <p>Prossima verifica tra {Math.max(1, 14 - v.giorni)} giorni.</p>}
        {v.dovuta && <Fila>
          {fuori && prev.length > 0 && <Bottone tipo="pieno" onClick={() => { setEsito(applicaVerifica(segno)); onFatto && onFatto(); }}>{segno > 0 ? 'Aggiungi 150 kcal' : 'Togli 150 kcal'}</Bottone>}
          <Bottone tipo={fuori && prev.length > 0 ? 'neutro' : 'pieno'} onClick={() => { registraVerifica(fuori ? 'rinviata' : 'confermata'); rinfresca(); onFatto && onFatto(); }}>{fuori ? 'Rimanda di 2 settimane' : 'Va bene così'}</Bottone>
        </Fila>}
      </div>
    </div>
  );
}

// stato di una seduta in parole
function statoSeduta(s) {
  if (!s) return null;
  if (s.completata) return <Stato tipo="ok">Fatta</Stato>;
  if (s.iniziata) return <Stato tipo="info">In corso · {s.finiti} di {s.lista.length}</Stato>;
  if (s.arretrata) return <Stato tipo="att">In arretrato</Stato>;
  return <Stato tipo="vuoto">Da fare</Stato>;
}

function Oggi() {
  const nav = useNav();
  const rinfresca = useRinfresca();
  const [pesa, setPesa] = useState(false);
  const a = andamentoPeso();
  const s = sedutaDiOggi();
  const o = dietaDiOggi();
  const oggi = GIORNI_SETT[new Date().getDay()];
  const pesoOggi = ((a.peso[settimanaCorrente()] || {})[oggi]) || '';
  const tot = o.dieta ? dietTotals(o.dieta) : null;
  const ora = new Date().getHours() * 60 + new Date().getMinutes();
  const pasti = o.dieta ? (o.dieta.meals || []) : [];
  const prossimo = pasti.find(m => minutiDi(m.time) >= ora);
  const altro = o.tipo === 'allenamento' ? 'riposo' : 'allenamento';
  const fatteSett = s ? s.totGiorni - s.restaSett : 0;
  const apriSeduta = () => s && s.giorno && nav.apri({ tipo: 'seduta', giorno: s.giorno.id, week: s.week });
  return (
    <div className="pagina">
      <Testa etichetta={'Peso · media settimana ' + settimanaCorrente()} valore={a.ult ? num(a.ult, 1) : '—'} unita="kg">
        <Confronto>
          {a.ritmo != null ? <React.Fragment><Delta v={a.ritmo} dec={2} unita="kg a settimana" /><StatoRitmo stato={a.stato} /></React.Fragment>
            : <span>Segna il peso per qualche settimana e vedrai il ritmo.</span>}
        </Confronto>
        <Secondari voci={[
          { v: a.f.label, e: 'fase' },
          s && { v: fatteSett + ' di ' + s.totGiorni, e: 'sedute, settimana ' + s.week },
          tot && { v: intero(tot.kcal), e: 'kcal di oggi' }
        ]} />
      </Testa>
      {a.punti.length > 1 && <Linea punti={a.punti} altezza={56} />}

      <AvvisoBackup />
      <AvvisoCalorie onFatto={rinfresca} />

      <Sezione titolo="Allenamento" lato={s ? s.att.label : null}>
        {s && s.giorno ? (
          <Riga onClick={apriSeduta}
            prima={<span className="punto" style={{ background: s.giorno.color }} />}
            nome={s.giorno.label + (s.giorno.dayName ? ' · ' + s.giorno.dayName : '')}
            sotto={s.lista.length + ' esercizi · ' + s.serie + ' serie' + (s.giorno.dur ? ' · ' + s.giorno.dur : '')}
            stato={statoSeduta(s)} />
        ) : <p className="vuoto">Nessuna scheda in uso. Importala o creala da Impostazioni.</p>}
      </Sezione>

      <Sezione titolo={'Dieta · giorno di ' + (o.tipo || '—')} lato={o.manuale ? 'scelta fissa' : o.forzata ? 'scelta da te' : 'automatica'}>
        {o.dieta ? (
          <React.Fragment>
            <Tab col="c-pasti">
              {pasti.map((m, i) => {
                const k = sumMacros(m.items || []);
                return (
                  <Tr key={m.id || i} onClick={() => nav.apri({ tipo: 'dieta' })} classe={m === prossimo ? 'forte' : ''}>
                    <span className="s">{m.time || ''}</span>
                    <span className="t">{m.name}{m === prossimo ? ' · prossimo' : ''}</span>
                    <span className="n">{intero(k.kcal)} kcal</span>
                  </Tr>
                );
              })}
              <Tr classe="totale">
                <span />
                <span className="t s">P {intero(tot.p)} · C {intero(tot.c)} · G {intero(tot.f)} g</span>
                <span className="n">{intero(tot.kcal)} kcal</span>
              </Tr>
            </Tab>
            {!o.manuale && <Bottone tipo="testo" onClick={() => { storage.set('dieta_oggi', o.forzata ? null : { data: dataOggi(), tipo: altro }); rinfresca(); }}>
              {o.forzata ? 'Torna alla dieta automatica' : 'Oggi è ' + altro + ': usa la dieta di ' + altro}
            </Bottone>}
          </React.Fragment>
        ) : <p className="vuoto">Nessuna dieta. Importala o creala da Impostazioni.</p>}
      </Sezione>

      <p className="sotto centro">V8 Tracker {APP_VERSION} · dati salvati sul telefono</p>

      <Azioni>
        {s && s.giorno && !s.completata
          ? <React.Fragment>
              <Bottone tipo="pieno" cresce onClick={apriSeduta} sotto={'settimana ' + s.week + ' · ' + s.lista.length + ' esercizi'}>{(s.iniziata ? 'Riprendi ' : 'Inizia ') + s.giorno.label}</Bottone>
              <Bottone alto onClick={() => setPesa(true)}>{pesoOggi ? 'Correggi peso' : 'Segna peso'}</Bottone>
            </React.Fragment>
          : <Bottone tipo="pieno" cresce onClick={() => setPesa(true)}>{pesoOggi ? 'Correggi il peso di oggi' : 'Segna il peso di oggi'}</Bottone>}
      </Azioni>
      {pesa && <FinestraPeso onChiudi={() => setPesa(false)} />}
    </div>
  );
}
