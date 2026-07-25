/* V8 Tracker — service worker
 * Strategia:
 *  - HTML/navigazione : network-first  -> online vedi SEMPRE l'ultima versione,
 *                                         offline parte dalla copia in cache.
 *                                         Non devi più alzare la versione a ogni consegna.
 *  - immagini esercizi: cache-first    -> non cambiano mai, si salvano man mano che le apri.
 *                                         NON sono in precache: 19 MB bloccherebbero l'installazione.
 *  - resto             : stale-while-revalidate
 */

const VERSION      = 'v10.5';
const SHELL_CACHE  = 'v8-shell-' + VERSION;
const IMG_CACHE    = 'v8-img';     // volutamente NON versionata: le foto non cambiano
const SHELL_ASSETS = ['./', './index.html', './manifest.json'];

// ---------- install: precarico solo il guscio ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => c.addAll(SHELL_ASSETS).catch(() => c.add('./index.html')))
      .then(() => self.skipWaiting())
  );
});

// ---------- activate: pulisco le vecchie shell, tengo le immagini ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== IMG_CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

const isImage = (url) => /\/exercises\/.+\.(webp|jpg|jpeg|png)$/i.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // CDN e terzi: lascio passare

  // 1) immagini esercizi -> cache-first
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

  // 2) navigazione / HTML -> network-first
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // 3) tutto il resto -> stale-while-revalidate
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

// Permette all'app di forzare l'aggiornamento immediato, se un giorno vorrai aggiungerlo
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
