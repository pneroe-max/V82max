// ============================================================
// OGGI · la dieta attiva, aperta direttamente
// ============================================================
const dietaAttivaId = () => storage.get('dieta_attiva') || null;
function dietaAttiva() {
  return dietaDiOggi().dieta || null;
}


// ============================================================
// SALVATAGGIO AUTOMATICO
// Tre livelli: memoria persistente richiesta al browser, backup
// automatico scaricato a intervalli, avviso quando e vecchio.
// ============================================================
var BACKUP_OGNI_GIORNI = 5;

function quantiDati() {
  try {
    var d = storage.get('peso') || {};
    var pesate = 0;
    Object.keys(d).forEach(function (w) {
      GIORNI_SETT.forEach(function (g) { if ((d[w] || {})[g]) pesate++; });
    });
    var sedute = 0;
    tutteLeSchede().forEach(function (p) {
      var log = storage.get(p.config.storageKey) || {};
      Object.keys(log).forEach(function (w) {
        (p.config.days || []).forEach(function (dd) {
          if ((log[w][dd.id] || {}).completato) sedute++;
        });
      });
    });
    return { pesate: pesate, sedute: sedute,
             schede: (storage.get('custom_schedules') || []).length,
             diete: (storage.get('custom_diets') || []).length };
  } catch (e) { return { pesate: 0, sedute: 0, schede: 0, diete: 0 }; }
}

function scaricaBackup(automatico) {
  try {
    var data = storage.exportAll();
    var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    var d = new Date();
    var stamp = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    a.download = 'v8tracker-backup-' + stamp + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    storage.set('ultimo_backup', new Date().toISOString());
    if (automatico) storage.set('ultimo_backup_auto', new Date().toISOString());
    return true;
  } catch (e) { return false; }
}

function giorniDaBackup() {
  var u = storage.get('ultimo_backup');
  if (!u) return null;
  return Math.floor((Date.now() - new Date(u).getTime()) / 86400000);
}

// Chiede al browser di NON cancellare i dati per fare spazio.
function chiediPersistenza(cb) {
  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persisted().then(function (gia) {
        if (gia) { if (cb) cb(true); return; }
        navigator.storage.persist().then(function (ok) { if (cb) cb(ok); });
      });
    } else if (cb) cb(null);
  } catch (e) { if (cb) cb(null); }
}

// Le quattro destinazioni: cosa mangio oggi · come sto · come va l'allenamento · come è configurato

// Le quattro voci in home, con il dato vivo

// ============================================================
// CONSEGNE · schede e diete pubblicate per questo dispositivo
// L'app legge un file pubblico da GitHub Pages. Non puo scriverci:
// servirebbe un token dentro l'app, leggibile da chiunque.
// ============================================================
function idDispositivo() {
  let id = storage.get('device_id');
  if (!id) {
    const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // niente 0/O/1/I: si leggono male
    const blocco = () => Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
    id = blocco() + '-' + blocco();
    storage.set('device_id', id);
  }
  return id;
}

async function leggiConsegna(codice) {
  const c = String(codice || '').trim().toUpperCase().replace(/\s/g, '');
  if (!c) return { esito: 'vuoto' };
  try {
    const r = await fetch('consegne/' + c + '.json?t=' + Date.now(), { cache: 'no-store' });
    if (r.status === 404) return { esito: 'assente' };
    if (!r.ok) return { esito: 'errore', dettaglio: 'HTTP ' + r.status };
    const j = await r.json();
    if (!j || (!j.schede && !j.diete)) return { esito: 'malformato' };
    return { esito: 'ok', dati: j };
  } catch (e) {
    return { esito: 'errore', dettaglio: String(e).slice(0, 60) };
  }
}

// Applica la consegna: aggiunge il nuovo, sostituisce cio che ha lo stesso id
function applicaConsegna(dati) {
  const rep = { schede: 0, schedeAgg: 0, diete: 0, dieteAgg: 0 };
  if (Array.isArray(dati.schede) && dati.schede.length) {
    const attuali = storage.get('custom_schedules') || [];
    dati.schede.forEach(s => {
      if (!s || !s.id) return;
      const i = attuali.findIndex(x => x.id === s.id);
      if (i >= 0) { attuali[i] = s; rep.schedeAgg++; } else { attuali.push(s); rep.schede++; }
    });
    storage.set('custom_schedules', attuali);
  }
  if (Array.isArray(dati.diete) && dati.diete.length) {
    const attuali = storage.get('custom_diets') || [];
    dati.diete.forEach(d => {
      if (!d || !d.id) return;
      const i = attuali.findIndex(x => x.id === d.id);
      if (i >= 0) { attuali[i] = d; rep.dieteAgg++; } else { attuali.push(d); rep.diete++; }
    });
    storage.set('custom_diets', attuali);
  }
  if (dati.attiva) storage.set('scheda_attiva', dati.attiva);
  if (dati.dietaAttiva) storage.set('dieta_attiva', dati.dietaAttiva);
  storage.set('ultima_consegna', { quando: Date.now(), nota: dati.nota || '', rep });
  return rep;
}
