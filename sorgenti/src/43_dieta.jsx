// ============================================================
// DIETA — quella di oggi, la spesa, l'editor, l'elenco
// ============================================================
const kcalObiettivo = d => { const t = (d && d.target) || {}; return kcalOf(parseFloat(t.p) || 0, parseFloat(t.c) || 0, parseFloat(t.f) || 0); };
const salvaDieta = d => { const l = storage.get('custom_diets') || []; storage.set('custom_diets', l.some(x => x.id === d.id) ? l.map(x => x.id === d.id ? d : x) : l.concat([d])); };

// una riga per macro: quanto c'è, quanto serve, barra da zero
function Macro({ nome, v, obiettivo }) {
  const o = parseFloat(obiettivo) || 0;
  return (
    <div className="macro">
      <div className="fila"><span className="cresce">{nome}</span><span><b>{intero(v)}</b>{o ? ' di ' + intero(o) : ''} g</span></div>
      <Barra v={v} max={o || v || 1} tipo={o && Math.abs(v - o) / o <= 0.07 ? 'ok' : 'evid'} />
    </div>
  );
}
function TreMacro({ tot, target }) {
  const t = target || {};
  return <div className="macro-gruppo"><Macro nome="Proteine" v={tot.p} obiettivo={t.p} /><Macro nome="Carboidrati" v={tot.c} obiettivo={t.c} /><Macro nome="Grassi" v={tot.f} obiettivo={t.f} /></div>;
}

// ---------- lista della spesa ----------
function spesa(d, n) {
  const agg = {};
  (d.meals || []).forEach(m => (m.items || []).forEach(it => {
    const k = nameOf(it);
    const cat = it.per100 ? 'Altro' : (FOOD_BY_ID[it.ref] && FOOD_BY_ID[it.ref].cat) || 'Altro';
    if (!agg[k]) agg[k] = { nome: k, g: 0, cat };
    agg[k].g += (parseFloat(it.g) || 0) * n;
  }));
  return Object.values(agg).sort((a, b) => a.cat.localeCompare(b.cat) || b.g - a.g);
}
const quanto = g => g >= 1000 ? num(g / 1000, 1) + ' kg' : intero(g) + ' g';
const spesaTesto = (d, n) => {
  let out = 'LISTA SPESA — ' + d.name + ' × ' + n + ' giorni\n', cat = null;
  spesa(d, n).forEach(x => { if (x.cat !== cat) { cat = x.cat; out += '\n' + cat.toUpperCase() + '\n'; } out += '  • ' + x.nome + ' — ' + quanto(x.g) + '\n'; });
  return out;
};
function FinestraSpesa({ dieta, onChiudi }) {
  const [n, setN] = useState(7);
  const [copiata, setCopiata] = useState(false);
  const righe = spesa(dieta, n);
  return (
    <Finestra titolo={'Spesa · ' + dieta.name} onChiudi={onChiudi} larga>
      <Scelte etichetta="Giorni" voci={[1, 3, 5, 7, 14].map(x => ({ id: x, nome: x + (x === 1 ? ' giorno' : ' giorni') }))} valore={n} onChange={x => { setN(Number(x)); setCopiata(false); }} />
      <Tab col="c-2" testa={['Alimento', { n: 'Quantità' }]}>
        {righe.map(x => <Tr key={x.nome}><span className="t">{x.nome}<span className="s"> · {x.cat.toLowerCase()}</span></span><span className="n forte">{quanto(x.g)}</span></Tr>)}
      </Tab>
      <Fila fine>
        <Bottone onClick={() => downloadFile('lista_spesa.txt', spesaTesto(dieta, n), 'text/plain')}>Scarica .txt</Bottone>
        <Bottone tipo="pieno" onClick={() => { copyText(spesaTesto(dieta, n)); setCopiata(true); }}>{copiata ? 'Lista copiata' : 'Copia la lista'}</Bottone>
      </Fila>
    </Finestra>
  );
}

// ---------- la dieta di oggi ----------
function DietaOggi() {
  const nav = useNav();
  const rinfresca = useRinfresca();
  const [spesaAperta, setSpesaAperta] = useState(false);
  const o = dietaDiOggi();
  const d = o.dieta;
  if (!d) return (
    <div className="pagina">
      <Testa etichetta="Dieta di oggi" valore="—" unita="kcal" />
      <p className="testo-lungo">Nessuna dieta salvata. Creala o importala da Impostazioni.</p>
      <Azioni><Bottone alto icona="sinistra" onClick={nav.chiudi} etichetta="Indietro" /><Bottone tipo="pieno" cresce onClick={() => nav.vai('impostazioni', 'diete')}>Vai alle diete</Bottone></Azioni>
    </div>
  );
  const tot = dietTotals(d), obiettivo = kcalObiettivo(d);
  const imposta = tipo => { storage.set('dieta_oggi', tipo ? { data: dataOggi(), tipo } : null); rinfresca(); };
  const grammi = (mi, ii, v) => { const n = JSON.parse(JSON.stringify(d)); n.meals[mi].items[ii].g = v; salvaDieta(n); rinfresca(); };
  return (
    <div className="pagina">
      <Testa etichetta={'Dieta · giorno di ' + o.tipo} valore={intero(tot.kcal)} unita="kcal">
        <Confronto>
          <span>{d.name}</span>
          {obiettivo ? <span>obiettivo <b>{intero(obiettivo)}</b></span> : null}
          {obiettivo ? <Delta v={Math.round(tot.kcal - obiettivo)} dec={0} unita="kcal" /> : null}
        </Confronto>
      </Testa>
      {!o.manuale && <Scelte etichetta="Tipo di giorno" valore={o.forzata ? o.tipo : ''} onChange={imposta}
        voci={[{ id: '', nome: 'Automatica' }, { id: 'allenamento', nome: 'Allenamento' }, { id: 'riposo', nome: 'Riposo' }]} />}
      <TreMacro tot={tot} target={d.target} />
      {(d.meals || []).map((m, mi) => (
        <Sezione key={m.id || mi} titolo={(m.time ? m.time + ' · ' : '') + m.name} lato={<b>{intero(sumMacros(m.items || []).kcal)} kcal</b>}>
          <Tab col="c-cibi">
            {(m.items || []).map((it, ii) => (
              <Tr key={ii}>
                <span className="t">{nameOf(it)}</span>
                <span><input className="inp-cella" type="text" inputMode="decimal" value={it.g} onChange={e => grammi(mi, ii, e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.'))} aria-label={'Grammi di ' + nameOf(it)} /></span>
                <span className="n s">g</span>
              </Tr>
            ))}
          </Tab>
        </Sezione>
      ))}
      <Azioni>
        <Bottone alto icona="sinistra" onClick={nav.chiudi} etichetta="Indietro" />
        <Bottone tipo="pieno" cresce onClick={() => setSpesaAperta(true)}>Lista della spesa</Bottone>
        <Bottone alto onClick={() => nav.vai('impostazioni', 'diete')}>Tutte le diete</Bottone>
      </Azioni>
      {spesaAperta && <FinestraSpesa dieta={d} onChiudi={() => setSpesaAperta(false)} />}
    </div>
  );
}

// ---------- scegli un alimento ----------
function FinestraCibo({ onPick, onChiudi }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const ql = q.trim().toLowerCase();
  const lista = FOOD_DB.filter(f => (!ql || f.n.toLowerCase().indexOf(ql) >= 0) && (!cat || f.cat === cat));
  return (
    <Finestra titolo="Aggiungi alimento" onChiudi={onChiudi} larga>
      <Campo etichetta="Cerca"><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="riso, pollo, yogurt…" autoFocus /></Campo>
      <Scelte etichetta="Categoria" voci={[{ id: '', nome: 'Tutti' }].concat(FOOD_CATS.map(c => ({ id: c, nome: c })))} valore={cat} onChange={setCat} />
      <Tab col="c-2" testa={['Alimento · per 100 g', { n: 'kcal' }]}>
        {lista.map(f => (
          <Tr key={f.id} onClick={() => onPick({ ref: f.id, g: 100 })}>
            <span className="t">{f.n}<span className="sotto" style={{ display: 'block' }}>P {f.p} · C {f.c} · G {f.f}{f.nota ? ' · ' + f.nota : ''}</span></span>
            <span className="n forte">{kcalOf(f.p, f.c, f.f)}</span>
          </Tr>
        ))}
      </Tab>
      {lista.length === 0 && <p className="sotto">Nessun alimento trovato.</p>}
      <Fila fine>
        <Bottone onClick={() => onPick({ name: q.trim() || 'Alimento personalizzato', g: 100, per100: { p: 0, c: 0, f: 0 } })}>Crea {ql ? '"' + q.trim() + '"' : 'un alimento'}</Bottone>
        <Bottone tipo="pieno" onClick={onChiudi}>Chiudi</Bottone>
      </Fila>
    </Finestra>
  );
}

// ---------- editor della dieta ----------
function EditorDieta({ dieta }) {
  const nav = useNav();
  const [d, setD] = useState(() => JSON.parse(JSON.stringify(dieta)));
  const [scegli, setScegli] = useState(null);
  const pasti = f => setD(p => ({ ...p, meals: f(p.meals.map(m => ({ ...m, items: (m.items || []).slice() }))) }));
  const voce = (mi, ii, pezza) => pasti(ms => { ms[mi].items[ii] = { ...ms[mi].items[ii], ...pezza }; return ms; });
  const tot = dietTotals(d), tgt = d.target || {}, obiettivo = kcalObiettivo(d);
  const numero = v => v.replace(/[^0-9.,]/g, '').replace(',', '.');
  return (
    <div className="pagina">
      <Testa etichetta="Modifica dieta" valore={intero(tot.kcal)} unita="kcal">
        <Confronto>{obiettivo ? <React.Fragment><span>obiettivo <b>{intero(obiettivo)}</b></span><Delta v={Math.round(tot.kcal - obiettivo)} dec={0} unita="kcal" /></React.Fragment> : <span>scrivi l'obiettivo qui sotto</span>}</Confronto>
      </Testa>
      <Sezione titolo="Nome e tipo">
        <div className="colonna">
          <Campo etichetta="Nome"><input value={d.name || ''} onChange={e => setD({ ...d, name: e.target.value })} /></Campo>
          <Campo etichetta="Nota"><input value={d.subtitle || ''} onChange={e => setD({ ...d, subtitle: e.target.value })} /></Campo>
          <Scelte etichetta="Tipo di giorno" voci={DIET_TYPES.map(t => ({ id: t.id, nome: t.label }))} valore={d.dayType} onChange={v => setD({ ...d, dayType: v })} />
        </div>
      </Sezione>
      <Sezione titolo="Obiettivo del giorno" lato={obiettivo ? <b>{intero(obiettivo)} kcal</b> : null}>
        <div className="colonna">
          <div className="griglia3">
            {[['p', 'Proteine g'], ['c', 'Carboidrati g'], ['f', 'Grassi g']].map(([k, e]) => <Campo key={k} etichetta={e}><input type="text" inputMode="decimal" value={tgt[k] == null ? '' : tgt[k]} onChange={ev => setD({ ...d, target: { ...tgt, [k]: numero(ev.target.value) } })} /></Campo>)}
          </div>
          <TreMacro tot={tot} target={tgt} />
        </div>
      </Sezione>
      {d.meals.map((m, mi) => (
        <Sezione key={m.id || mi} titolo={'Pasto ' + (mi + 1)} lato={<b>{intero(sumMacros(m.items || []).kcal)} kcal</b>}>
          <div className="colonna">
            <div className="griglia-pasto">
              <Campo etichetta="Nome"><input value={m.name || ''} onChange={e => pasti(ms => { ms[mi].name = e.target.value; return ms; })} /></Campo>
              <Campo etichetta="Ora"><input value={m.time || ''} placeholder="13:00" onChange={e => pasti(ms => { ms[mi].time = e.target.value; return ms; })} /></Campo>
            </div>
            <Tab col="c-cibi-mod" testa={['Alimento', { n: 'g' }, { n: 'kcal' }, '']}>
              {(m.items || []).map((it, ii) => (
                <React.Fragment key={ii}>
                  <Tr col="c-cibi-mod">
                    <span className="t">{it.per100 ? <input className="inp-cella sinistra" value={it.name || ''} onChange={e => voce(mi, ii, { name: e.target.value })} aria-label="Nome dell'alimento" /> : nameOf(it)}</span>
                    <span><input className="inp-cella" type="text" inputMode="decimal" value={it.g} onChange={e => voce(mi, ii, { g: numero(e.target.value) })} aria-label={'Grammi di ' + nameOf(it)} /></span>
                    <span className="n s">{intero(macrosOf(it).kcal)}</span>
                    <span className="n"><Bottone tipo="testo" icona="cestino" onClick={() => pasti(ms => { ms[mi].items.splice(ii, 1); return ms; })} etichetta={'Togli ' + nameOf(it)} /></span>
                  </Tr>
                  {it.per100 && <div className="griglia3 per100">
                    {[['p', 'P per 100 g'], ['c', 'C per 100 g'], ['f', 'G per 100 g']].map(([k, e]) => <Campo key={k} etichetta={e}><input type="text" inputMode="decimal" value={it.per100[k]} onChange={ev => voce(mi, ii, { per100: { ...it.per100, [k]: numero(ev.target.value) } })} /></Campo>)}
                  </div>}
                </React.Fragment>
              ))}
            </Tab>
            <Fila>
              <Bottone icona="piu" onClick={() => setScegli(mi)}>Aggiungi alimento</Bottone>
              <Bottone tipo="testo" onClick={() => askConfirm('Eliminare il pasto ' + (m.name || '') + '?', 'Perdi gli alimenti che contiene.', () => pasti(ms => { ms.splice(mi, 1); return ms; }))}>Elimina pasto</Bottone>
            </Fila>
          </div>
        </Sezione>
      ))}
      <Bottone icona="piu" largo onClick={() => setD(p => ({ ...p, meals: p.meals.concat([{ id: uid('m'), name: 'Nuovo pasto', time: '', items: [] }]) }))}>Aggiungi pasto</Bottone>
      <Azioni>
        <Bottone alto icona="sinistra" onClick={nav.chiudi} etichetta="Indietro senza salvare" />
        <Bottone tipo="pieno" cresce onClick={() => { salvaDieta(d); nav.chiudi(); }}>Salva dieta</Bottone>
        <Bottone alto onClick={() => downloadFile((d.name || 'dieta').replace(/[^\w\-]+/g, '_') + '.v8d', JSON.stringify(d, null, 2))}>Esporta</Bottone>
      </Azioni>
      {scegli != null && <FinestraCibo onChiudi={() => setScegli(null)} onPick={item => { pasti(ms => { ms[scegli].items.push(item); return ms; }); setScegli(null); }} />}
    </div>
  );
}

// ---------- importa un file o un testo (diete e schede) ----------
function FinestraImporta({ titolo, accetta, esempio, onTesto, onChiudi }) {
  const [testo, setTesto] = useState('');
  const [errore, setErrore] = useState(null);
  const file = useRef(null);
  const prova = raw => { const e = onTesto(raw); if (e) setErrore(e); else onChiudi(); };
  return (
    <Finestra titolo={titolo} onChiudi={onChiudi}>
      <input ref={file} type="file" accept={accetta} className="nascosto" onChange={e => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        const r = new FileReader(); r.onload = () => prova(String(r.result)); r.onerror = () => setErrore('Non riesco a leggere il file.'); r.readAsText(f); e.target.value = '';
      }} />
      <Bottone tipo="pieno" largo icona="carica" onClick={() => file.current && file.current.click()}>Scegli il file</Bottone>
      <Campo etichetta="Oppure incolla qui il codice" errore={errore}><textarea value={testo} onChange={e => { setTesto(e.target.value); setErrore(null); }} placeholder={esempio} /></Campo>
      <Fila fine>
        <Bottone onClick={onChiudi}>Annulla</Bottone>
        <Bottone onClick={() => prova(testo)} disabled={!testo.trim()}>Importa il testo</Bottone>
      </Fila>
    </Finestra>
  );
}

// ---------- elenco delle diete (scheda DIETE delle impostazioni) ----------
function ElencoDiete() {
  const nav = useNav();
  const rinfresca = useRinfresca();
  const [fin, setFin] = useState(null); // {tipo:'azioni'|'spesa', d} | {tipo:'nuova'} | {tipo:'importa'}
  const c = coppiaDiete();
  const auto = storage.get('dieta_auto') !== false;
  const lista = c.tutte;
  const metti = (k, v) => { storage.set(k, v); setFin(null); rinfresca(); };
  const scrivi = l => { storage.set('custom_diets', l); setFin(null); rinfresca(); };
  const uso = d => {
    if (!auto) return storage.get('dieta_attiva') === d.id ? 'In uso' : null;
    const on = c.on && c.on.id === d.id, off = c.off && c.off.id === d.id;
    return on && off ? 'Sempre' : on ? 'Allenamento' : off ? 'Riposo' : null;
  };
  const importa = raw => {
    let o; try { o = JSON.parse(raw); } catch (e) { return 'Il testo non è un JSON valido: ' + e.message; }
    const err = validateV8d(o); if (err) return err;
    if (!o.id) o.id = uid('diet');
    scrivi(lista.filter(x => x.id !== o.id).concat([o]));
    return null;
  };
  const d = fin && fin.d;
  return (
    <React.Fragment>
      <Sezione titolo="Diete" lato={lista.length + (lista.length === 1 ? ' salvata' : ' salvate')}>
        {lista.length === 0 ? <p className="vuoto">Nessuna dieta. Creane una o importa un file .v8d.</p> : (
          <Tab col="c-3" testa={['Dieta', { n: 'kcal' }, { n: 'In uso' }]}>
            {lista.map(x => {
              const t = dietTotals(x), u = uso(x);
              return (
                <Tr key={x.id} onClick={() => setFin({ tipo: 'azioni', d: x })}>
                  <span className="t"><span className="forte">{x.name}</span><span className="sotto" style={{ display: 'block' }}>P {intero(t.p)} · C {intero(t.c)} · G {intero(t.f)} · {(x.meals || []).length} pasti</span></span>
                  <span className="n forte">{intero(t.kcal)}</span>
                  <span className="n">{u ? <Stato tipo="ok">{u}</Stato> : <Stato tipo="vuoto">No</Stato>}</span>
                </Tr>
              );
            })}
          </Tab>
        )}
        <Fila>
          <Bottone tipo="pieno" icona="piu" onClick={() => setFin({ tipo: 'nuova' })}>Nuova dieta</Bottone>
          <Bottone icona="carica" onClick={() => setFin({ tipo: 'importa' })}>Importa</Bottone>
        </Fila>
      </Sezione>
      <Sezione titolo="Dieta automatica" lato={auto ? <Stato tipo="ok">Accesa</Stato> : <Stato tipo="vuoto">Spenta</Stato>}>
        <p className="testo-lungo vuoto">{auto ? 'Nei giorni con la seduta usa la dieta di allenamento, negli altri quella di riposo.' : 'Usa sempre la stessa dieta, quella segnata in uso.'}</p>
        <Bottone onClick={() => metti('dieta_auto', !auto)}>{auto ? 'Spegni: usa sempre la stessa' : 'Accendi la dieta automatica'}</Bottone>
      </Sezione>

      {fin && fin.tipo === 'azioni' && (
        <Finestra titolo={d.name} onChiudi={() => setFin(null)}>
          <div className="colonna">
            <Bottone tipo="pieno" largo icona="matita" onClick={() => { setFin(null); nav.apri({ tipo: 'editorDieta', dieta: d }); }}>Apri e modifica</Bottone>
            {auto ? <React.Fragment>
              <Bottone largo onClick={() => metti('dieta_on', d.id)} disabled={c.on && c.on.id === d.id}>Usa nei giorni di allenamento</Bottone>
              <Bottone largo onClick={() => metti('dieta_off', d.id)} disabled={c.off && c.off.id === d.id}>Usa nei giorni di riposo</Bottone>
            </React.Fragment> : <Bottone largo onClick={() => metti('dieta_attiva', d.id)} disabled={storage.get('dieta_attiva') === d.id}>Usa questa dieta</Bottone>}
            <Bottone largo icona="carrello" onClick={() => setFin({ tipo: 'spesa', d })}>Lista della spesa</Bottone>
            <Bottone largo icona="copia" onClick={() => { const k = JSON.parse(JSON.stringify(d)); k.id = uid('diet'); k.name = d.name + ' (copia)'; scrivi(lista.concat([k])); }}>Duplica</Bottone>
            <Bottone largo icona="scarica" onClick={() => { downloadFile((d.name || 'dieta').replace(/[^\w\-]+/g, '_') + '.v8d', JSON.stringify(d, null, 2)); setFin(null); }}>Esporta il file .v8d</Bottone>
            <Bottone largo tipo="testo" onClick={() => { setFin(null); askConfirm('Eliminare la dieta ' + d.name + '?', 'Non si può annullare.', () => scrivi(lista.filter(x => x.id !== d.id))); }}>Elimina la dieta</Bottone>
          </div>
        </Finestra>
      )}
      {fin && fin.tipo === 'spesa' && <FinestraSpesa dieta={d} onChiudi={() => setFin(null)} />}
      {fin && fin.tipo === 'nuova' && (
        <Finestra titolo="Nuova dieta" onChiudi={() => setFin(null)}>
          <div className="colonna">
            {DIET_PRESETS.map(p => <Bottone key={p.name} largo sotto={kcalOf(p.target.p, p.target.c, p.target.f) + ' kcal · P ' + p.target.p + ' · C ' + p.target.c + ' · G ' + p.target.f} onClick={() => { setFin(null); nav.apri({ tipo: 'editorDieta', dieta: newDiet(p) }); }}>{p.name}</Bottone>)}
            <Bottone largo onClick={() => { setFin(null); nav.apri({ tipo: 'editorDieta', dieta: newDiet() }); }}>Vuota</Bottone>
          </div>
        </Finestra>
      )}
      {fin && fin.tipo === 'importa' && <FinestraImporta titolo="Importa una dieta" accetta=".v8d,.json,application/json" esempio={'{ "format": "v8d/1", "name": "…", "meals": [ … ] }'} onTesto={importa} onChiudi={() => setFin(null)} />}
    </React.Fragment>
  );
}
