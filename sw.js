// Modificare CACHE_NAME ad ogni rilascio per invalidare la vecchia cache PWA.
const CACHE_NAME = 'orario-sam-v2-20261030';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('orario-sam-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // Network-first per HTML e navigazioni: non mantiene bloccata la vecchia versione.
  if (request.mode === 'navigate' || new URL(request.url).pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache:'no-cache'});
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(request)) || (await caches.match('./index.html')) ||
          Response.error();
      }
    })());
    return;
  }
  // File statici: cache-first con fallback di rete.
  event.respondWith((async () => {
    const saved = await caches.match(request);
    if (saved) return saved;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  })());
});
