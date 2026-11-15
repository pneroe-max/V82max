/* V8 Tracker — service worker v11
 * Strategia:
 *  - HTML/navigazione : cache-first  -> l'app si apre subito dalla copia salvata,
 *                                       anche con poco campo. Intanto scarica la
 *                                       versione nuova e, se è cambiata, avvisa
 *                                       l'app ("Nuova versione pronta").
 *  - consegne/        : solo rete     -> il pacchetto va letto sempre fresco.
 *  - immagini esercizi: cache-first   -> non cambiano mai, si salvano man mano.
 *  - font Google      : cache-first   -> dopo la prima volta funzionano offline.
 *  - resto            : stale-while-revalidate
 */

const VERSION     = 'v11.0';
const SHELL_CACHE = 'v8-shell-' + VERSION;
const IMG_CACHE   = 'v8-img';    // volutamente NON versionata: le foto non cambiano
const FONT_CACHE  = 'v8-font';
const SHELL_ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => c.addAll(SHELL_ASSETS).catch(() => c.add('./index.html')))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== IMG_CACHE && k !== FONT_CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

const isImage = (url) => /\/exercises\/.+\.(webp|jpg|jpeg|png)$/i.test(url.pathname);
const isFont = (url) => url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

const avvisa = () => self.clients.matchAll({ type: 'window' })
  .then((cs) => cs.forEach((c) => c.postMessage({ tipo: 'NUOVA_VERSIONE' })));

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // font: cache-first
  if (isFont(url)) {
    event.respondWith(
      caches.open(FONT_CACHE).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
        return res;
      })))
    );
    return;
  }
  if (url.origin !== self.location.origin) return;   // altri terzi: lascio passare

  // consegne: sempre dalla rete, mai in cache
  if (url.pathname.indexOf('/consegne/') >= 0) return;

  // immagini esercizi: cache-first
  if (isImage(url)) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(IMG_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // navigazione / HTML: cache-first con aggiornamento in background
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    const inCache = () => caches.open(SHELL_CACHE).then((c) => c.match('./index.html'));
    const salvata = inCache();
    const rete = fetch(req.url, { cache: 'no-store', credentials: 'same-origin' }).then(async (res) => {
      if (!res || !res.ok) return res;
      const nuovo = await res.clone().text();
      const hit = await inCache();            // copia separata: quella servita alla pagina è già consumata
      const vecchio = hit ? await hit.text() : null;
      if (vecchio !== nuovo) {
        const c = await caches.open(SHELL_CACHE);
        await c.put('./index.html', new Response(nuovo, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
        if (vecchio !== null) await avvisa();
      }
      return res;
    });
    event.waitUntil(rete.then(() => {}, () => {}));
    event.respondWith(
      salvata.then((hit) => hit || rete).catch(() => caches.match('./'))
    );
    return;
  }

  // tutto il resto: stale-while-revalidate
  event.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  // l'app chiede quale versione c'è in cache: se è diversa dalla sua, mostra l'avviso
  if (e.data && e.data.tipo === 'VERSIONE?' && e.source) {
    e.waitUntil(caches.open(SHELL_CACHE)
      .then((c) => c.match('./index.html'))
      .then((hit) => hit ? hit.text() : '')
      .then((t) => {
        const m = t.match(/APP_VERSION = '([^']+)'/);
        e.source.postMessage({ tipo: 'VERSIONE', v: m ? m[1] : null });
      }));
  }
});
