// ============================================================
// CORPO — peso, misure, calorie di mantenimento, recupero
// ============================================================
const ORDINE_GIORNI = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];
const soloNumero = v => String(v).replace(/[^0-9.,]/g, '').replace(',', '.');

// ---------- PESO ----------
function CorpoPeso() {
  const rinfresca = useRinfresca();
  const [pesa, setPesa] = useState(false);
  const [tutte, setTutte] = useState(false);
  const a = andamentoPeso();
  const sett = settimanaCorrente();
  const oggi = GIORNI_SETT[new Date().getDay()];
  const questa = a.peso[sett] || {};
  const scrivi = (g, v) => {
    const d = storage.get('peso') || {};
    if (!d[sett]) d[sett] = { media: 0, note: '' };
    d[sett][g] = v; d[sett].media = mediaSett(d[sett]);
    storage.set('peso', d); rinfresca();
  };
  const medie = a.sett.slice().reverse();
  return (
    <React.Fragment>
      <Testa etichetta={'Peso · media settimana ' + sett} valore={a.ult ? num(a.ult, 1) : '—'} unita="kg">
        <Confronto>
          {a.ritmo != null ? <React.Fragment><Delta v={a.ritmo} dec={2} unita="kg a settimana" /><StatoRitmo stato={a.stato} /></React.Fragment> : <span>Servono due settimane per vedere il ritmo.</span>}
        </Confronto>
        <Secondari voci={[
          { v: questa[oggi] ? num(questa[oggi], 1) : '—', e: 'kg oggi' },
          { v: ORDINE_GIORNI.filter(g => parseFloat(questa[g]) > 0).length + ' di 7', e: 'pesate questa settimana' },
          { v: a.f.label, e: a.f.testo }
        ]} />
      </Testa>
      {a.sett.length > 1 && <Linea punti={a.sett.map(w => a.peso[w].media)} altezza={96} />}
      <Sezione titolo={'Settimana ' + sett} lato="scrivi o correggi i chili">
        <Tab col="c-giorno">
          {ORDINE_GIORNI.map(g => (
            <Tr key={g} classe={g === oggi ? 'forte' : ''}>
              <span className={g === oggi ? 't' : 't s'}>{NOMI_GIORNI[g]}{g === oggi ? ' · oggi' : ''}</span>
              <span><input className="inp-cella" type="text" inputMode="decimal" value={questa[g] || ''} placeholder="—" onChange={e => scrivi(g, soloNumero(e.target.value))} aria-label={'Peso di ' + NOMI_GIORNI[g]} /></span>
            </Tr>
          ))}
        </Tab>
      </Sezione>
      <Sezione titolo="Medie settimanali" lato={medie.length + ' settimane'}>
        {medie.length === 0 ? <p className="vuoto">Ancora nessuna pesata.</p> : (
          <Tab col="c-4" testa={['Settimana', { n: 'Pesate' }, { n: 'Variazione' }, { n: 'Media kg' }]}>
            {(tutte ? medie : medie.slice(0, 8)).map((w, i) => {
              const prima = medie[i + 1];
              const d = prima != null ? a.peso[w].media - a.peso[prima].media : null;
              return (
                <Tr key={w}>
                  <span className="t">Settimana {w}</span>
                  <span className="n s">{ORDINE_GIORNI.filter(g => parseFloat((a.peso[w] || {})[g]) > 0).length}</span>
                  <span className="n s">{d != null ? conSegno(d, 1) : '—'}</span>
                  <span className="n forte">{num(a.peso[w].media, 1)}</span>
                </Tr>
              );
            })}
          </Tab>
        )}
        {!tutte && medie.length > 8 && <Bottone tipo="testo" onClick={() => setTutte(true)}>Mostra tutte le {medie.length} settimane</Bottone>}
      </Sezione>
      <Azioni><Bottone tipo="pieno" cresce onClick={() => setPesa(true)}>{questa[oggi] ? 'Correggi il peso di oggi' : 'Segna il peso di oggi'}</Bottone></Azioni>
      {pesa && <FinestraPeso onChiudi={() => { setPesa(false); rinfresca(); }} />}
    </React.Fragment>
  );
}

// ---------- MISURE ----------
function FinestraMisure({ data, onChiudi }) {
  const [m, setM] = useState(() => ({ ...((storage.get('misure') || {})[data] || {}) }));
  const [h, setH] = useState(() => storage.get('altezza') || '');
  const salva = () => {
    const tutte = storage.get('misure') || {};
    tutte[data] = m; storage.set('misure', tutte); storage.set('altezza', h); onChiudi();
  };
  return (
    <Finestra titolo={'Misure del ' + data} onChiudi={onChiudi}>
      <p className="sotto">In centimetri, a digiuno, col metro aderente ma non stretto.</p>
      <div className="griglia2">
        {PUNTI.map(p => <Campo key={p} etichetta={p}><input type="text" inputMode="decimal" value={m[p] || ''} onChange={e => setM({ ...m, [p]: soloNumero(e.target.value) })} /></Campo>)}
        <Campo etichetta="Altezza"><input type="text" inputMode="decimal" value={h} onChange={e => setH(soloNumero(e.target.value))} placeholder="178" /></Campo>
      </div>
      <Fila fine>
        <Bottone onClick={onChiudi}>Annulla</Bottone>
        <Bottone tipo="pieno" onClick={salva}>Salva le misure</Bottone>
      </Fila>
    </Finestra>
  );
}
function CorpoMisure() {
  const rinfresca = useRinfresca();
  const [apri, setApri] = useState(null);
  const a = andamentoPeso();
  const misure = storage.get('misure') || {};
  const date = Object.keys(misure);
  const ultimo = date.length ? misure[date[date.length - 1]] : {};
  const primo = date.length ? misure[date[0]] : {};
  const h = storage.get('altezza') || '';
  const comp = stimaComposizione({ peso: a.ult, vita: ultimo['Vita ombelicale'], collo: ultimo['Collo'], altezza: h });
  const gB = comp ? giudizioBF(comp.bf) : null, gF = comp ? giudizioFFMI(comp.ffmi) : null;
  const hm = parseFloat(h) / 100, bmi = hm > 0 && a.ult ? a.ult / (hm * hm) : 0;
  const oggiData = () => { const d = new Date(); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
  return (
    <React.Fragment>
      <Testa etichetta={'Grasso stimato' + (date.length ? ' · ' + date[date.length - 1] : '')} valore={comp ? num(comp.bf, 1) : '—'} unita="%">
        <Confronto>
          {comp ? <React.Fragment><Stato tipo="info">{gB.t}</Stato>{bmi > 27 && <Stato tipo="att">Probabile {num(comp.bf + 2.5, 1)}–{num(comp.bf + 4.5, 1)} %</Stato>}</React.Fragment>
            : <span>Servono altezza, vita e collo.</span>}
        </Confronto>
        {comp && <Secondari voci={[{ v: num(comp.ffmi, 1), e: 'FFMI · ' + gF.t }, { v: num(comp.ffm, 1), e: 'kg di massa magra' }, { v: h ? intero(h) : '—', e: 'cm di altezza' }]} />}
      </Testa>
      {comp && <p className="testo-lungo">Stima Navy da vita, collo e altezza: sbaglia di <b>3–4 punti</b>{bmi > 27 ? ' e con molto muscolo legge basso' : ''}. Guarda come si muove nel tempo.</p>}
      <Sezione titolo="Ultima rilevazione" lato={date.length > 1 ? 'rispetto al ' + date[0] : null}>
        {date.length === 0 ? <p className="vuoto">Nessuna rilevazione. Bastano vita e collo per la stima del grasso.</p> : (
          <Tab col="c-3" testa={['Punto', { n: 'Variazione' }, { n: 'cm' }]}>
            {PUNTI.map(p => {
              const b = parseFloat(ultimo[p]); if (isNaN(b)) return null;
              const x = parseFloat(primo[p]); const d = !isNaN(x) && date.length > 1 ? b - x : null;
              return <Tr key={p}><span className="t">{p}</span><span className="n s">{d != null && d !== 0 ? conSegno(d, 1) : '—'}</span><span className="n forte">{num(b, 1)}</span></Tr>;
            })}
          </Tab>
        )}
      </Sezione>
      {date.length > 0 && <Sezione titolo="Rilevazioni" lato="tocca per correggere">
        {date.slice().reverse().map(d => <Riga key={d} nome={d} sotto={PUNTI.filter(p => parseFloat(misure[d][p]) > 0).length + ' punti misurati'} onClick={() => setApri(d)} />)}
      </Sezione>}
      <Azioni><Bottone tipo="pieno" cresce onClick={() => setApri(oggiData())}>Nuova rilevazione</Bottone></Azioni>
      {apri && <FinestraMisure data={apri} onChiudi={() => { setApri(null); rinfresca(); }} />}
    </React.Fragment>
  );
}

// ---------- CALORIE: mantenimento stimato dai tuoi dati ----------
function CorpoCalorie() {
  const rinfresca = useRinfresca();
  const [tutteD, setTutteD] = useState(false);
  const a = andamentoPeso();
  const diete = storage.get('custom_diets') || [];
  const salvati = storage.get('tdee_giorni') || {};
  // se non hai scelto i giorni, li prendo dalla scheda: giorni di seduta e di riposo
  const predefiniti = () => {
    const c = coppiaDiete(), att = schedaAttiva(); const out = {};
    const n = att ? Math.min(7, (att.config.days || []).length) : 0;
    if (c.on) out[c.on.id] = n; if (c.off && (!c.on || c.off.id !== c.on.id)) out[c.off.id] = 7 - n; else if (c.on) out[c.on.id] = 7;
    return out;
  };
  const giorni = Object.keys(salvati).length ? salvati : predefiniti();
  const manuale = storage.get('tdee_manuale') || '';
  let gTot = 0, kTot = 0;
  diete.forEach(d => { const n = parseFloat(giorni[d.id]) || 0; if (!n) return; gTot += n; kTot += dietTotals(d).kcal * n; });
  const intake = gTot >= 1 ? kTot / gTot : parseFloat(manuale) || 0;
  const serie = a.sett.map(w => ({ w, kg: a.peso[w].media }));
  const n = serie.length, primo = n >= 2 ? serie[n - Math.min(n, 4)] : null, ultimo = n >= 2 ? serie[n - 1] : null;
  const settimane = primo && ultimo ? ultimo.w - primo.w : 0;
  const kgS = settimane > 0 ? (ultimo.kg - primo.kg) / settimane : 0;
  const tdee = intake > 0 && settimane > 0 ? Math.round(intake - kgS * KCAL_PER_KG / 7) : 0;
  const ok = settimane >= 2 && intake > 0;
  return (
    <React.Fragment>
      <Testa etichetta="Mantenimento stimato · al giorno" valore={ok ? intero(tdee) : '—'} unita="kcal">
        <Confronto>
          {ok ? <React.Fragment><span>mangi in media <b>{intero(intake)}</b></span><Delta v={Math.round(intake - tdee)} dec={0} unita="kcal" /></React.Fragment>
            : <span>Servono 2 settimane di peso e le calorie qui sotto. Hai {n} {n === 1 ? 'settimana' : 'settimane'}.</span>}
        </Confronto>
        {ok && <Secondari voci={[{ v: conSegno(kgS, 2), e: 'kg a settimana' }, { v: settimane, e: 'settimane lette (' + primo.w + '→' + ultimo.w + ')' }]} />}
      </Testa>
      <Sezione titolo="Verifica calorie" lato={'fase ' + a.f.label.toLowerCase()}>
        <div className="colonna"><AvvisoCalorie sempre onFatto={rinfresca} /></div>
      </Sezione>
      <Sezione titolo="Giorni a settimana per dieta" lato={gTot ? gTot + ' di 7' : null}>
        {diete.length === 0 && <div className="colonna"><Campo etichetta="Nessuna dieta: scrivi le calorie medie al giorno"><input type="text" inputMode="numeric" value={manuale} placeholder="3000" onChange={e => { storage.set('tdee_manuale', soloNumero(e.target.value)); rinfresca(); }} /></Campo></div>}
        {diete.filter(d => tutteD || parseFloat(giorni[d.id]) > 0).map(d => (
          <div key={d.id} className="dieta-giorni">
            <div className="fila"><span className="cresce forte">{d.name}</span><span className="sotto">{intero(dietTotals(d).kcal)} kcal</span></div>
            <Scelte etichetta={'Giorni con ' + d.name} voci={[0, 1, 2, 3, 4, 5, 6, 7].map(x => ({ id: x, nome: String(x) }))} valore={parseFloat(giorni[d.id]) || 0} onChange={v => { storage.set('tdee_giorni', { ...giorni, [d.id]: Number(v) }); rinfresca(); }} />
          </div>
        ))}
        {!tutteD && diete.some(d => !(parseFloat(giorni[d.id]) > 0)) && <Bottone tipo="testo" onClick={() => setTutteD(true)}>Mostra le altre {diete.filter(d => !(parseFloat(giorni[d.id]) > 0)).length} diete</Bottone>}
      </Sezione>
      <p className="testo-lungo">Mantenimento = calorie medie − variazione di peso × {num(KCAL_PER_KG, 0)} kcal ÷ 7. Vale quanto sono precise pesate e porzioni.</p>
    </React.Fragment>
  );
}

// ---------- RECUPERO ----------
const CAMPI_REC = [['sonno', 'Sonno, ore per notte'], ['energia', 'Energia da 1 a 10'], ['recupero', 'Recupero da 1 a 10'], ['stress', 'Stress da 1 a 10']];
const recAllarme = r => (parseFloat(r.sonno) > 0 && parseFloat(r.sonno) < 7) || (parseFloat(r.energia) > 0 && parseFloat(r.energia) < 5);
function FinestraRecupero({ week, onChiudi }) {
  const [r, setR] = useState(() => ({ sonno: '', energia: '', recupero: '', stress: '', note: '', ...((storage.get('recovery') || {})[week] || {}) }));
  const salva = () => { const d = storage.get('recovery') || {}; d[week] = r; storage.set('recovery', d); onChiudi(); };
  return (
    <Finestra titolo={'Recupero · settimana ' + week} onChiudi={onChiudi}>
      <div className="griglia2">{CAMPI_REC.map(([k, e]) => <Campo key={k} etichetta={e}><input type="text" inputMode="decimal" value={r[k] || ''} onChange={ev => setR({ ...r, [k]: soloNumero(ev.target.value) })} /></Campo>)}</div>
      <Campo etichetta="Nota"><input value={r.note || ''} onChange={e => setR({ ...r, note: e.target.value })} /></Campo>
      <Fila fine><Bottone onClick={onChiudi}>Annulla</Bottone><Bottone tipo="pieno" onClick={salva}>Salva la settimana</Bottone></Fila>
    </Finestra>
  );
}
function CorpoRecupero() {
  const rinfresca = useRinfresca();
  const [apri, setApri] = useState(null);
  const dati = storage.get('recovery') || {};
  const s = sedutaDiOggi();
  const att = schedaAttiva();
  const settimane = (att && att.config.weeks) || [1, 2, 3, 4, 5, 6, 7, 8];
  const piene = settimane.filter(w => dati[w] && parseFloat(dati[w].sonno) > 0);
  const ult = piene.length ? dati[piene[piene.length - 1]] : null, prima = piene.length > 1 ? dati[piene[piene.length - 2]] : null;
  const ora = s ? s.week : settimane[0];
  return (
    <React.Fragment>
      <Testa etichetta={'Sonno · media per notte' + (ult ? ' · settimana ' + piene[piene.length - 1] : '')} valore={ult ? num(ult.sonno, 1) : '—'} unita="ore">
        <Confronto>
          {ult ? <React.Fragment>
            {prima && <Delta v={parseFloat(ult.sonno) - parseFloat(prima.sonno)} dec={1} unita="ore" />}
            {recAllarme(ult) ? <Stato tipo="att">{parseFloat(ult.sonno) < 7 ? 'Sonno sotto 7 ore' : 'Energia sotto 5'}</Stato> : <Stato tipo="ok">Recupero a posto</Stato>}
          </React.Fragment> : <span>Compila una volta a settimana.</span>}
        </Confronto>
        {ult && <Secondari voci={[{ v: ult.energia || '—', e: 'energia su 10' }, { v: ult.recupero || '—', e: 'recupero su 10' }, { v: ult.stress || '—', e: 'stress su 10' }]} />}
      </Testa>
      {ult && recAllarme(ult) && prima && recAllarme(prima) && <p className="testo-lungo"><b>Due settimane di fila sotto soglia:</b> riduci lo stimolo oppure aggiungi 100 kcal di carboidrati.</p>}
      <Sezione titolo="Settimane" lato="tocca per compilare">
        <Tab col="c-rec" testa={['Sett.', { n: 'Sonno' }, { n: 'Energia' }, { n: 'Recup.' }, { n: 'Stress' }]}>
          {settimane.map(w => {
            const r = dati[w] || {};
            return (
              <Tr key={w} onClick={() => setApri(w)} classe={w === ora ? 'forte' : ''} etichetta={'Settimana ' + w}>
                <span className="t">{w}{recAllarme(r) ? ' · bassa' : ''}</span>
                <span className="n">{r.sonno ? num(r.sonno, 1) : '—'}</span><span className="n">{r.energia || '—'}</span><span className="n">{r.recupero || '—'}</span><span className="n">{r.stress || '—'}</span>
              </Tr>
            );
          })}
        </Tab>
      </Sezione>
      <Azioni><Bottone tipo="pieno" cresce onClick={() => setApri(ora)}>Compila la settimana {ora}</Bottone></Azioni>
      {apri != null && <FinestraRecupero week={apri} onChiudi={() => { setApri(null); rinfresca(); }} />}
    </React.Fragment>
  );
}

const SCHEDE_CORPO = [{ id: 'peso', nome: 'Peso' }, { id: 'misure', nome: 'Misure' }, { id: 'calorie', nome: 'Calorie' }, { id: 'recupero', nome: 'Recupero' }];
function Corpo({ iniziale }) {
  const [s, setS] = useState(iniziale || 'peso');
  return (
    <div className="pagina">
      <Scelte schede etichetta="Sezioni di Corpo" voci={SCHEDE_CORPO} valore={s} onChange={setS} />
      {s === 'peso' && <CorpoPeso />}
      {s === 'misure' && <CorpoMisure />}
      {s === 'calorie' && <CorpoCalorie />}
      {s === 'recupero' && <CorpoRecupero />}
    </div>
  );
}
