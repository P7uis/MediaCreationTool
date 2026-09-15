const MC_CACHE_VERSION = 'media-creation-tool-v1.2.1';
const MC_INDEX_URL = new URL('./index.html', self.registration.scope).toString();
const MC_APP_SHELL = [
  new URL('./', self.registration.scope).toString(),
  MC_INDEX_URL,
  new URL('./manifest.webmanifest', self.registration.scope).toString(),
  new URL('./images/glados.ico', self.registration.scope).toString(),
  new URL('./images/icon-192.png', self.registration.scope).toString(),
  new URL('./images/icon-512.png', self.registration.scope).toString()
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(MC_CACHE_VERSION).then((cache) => cache.addAll(MC_APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== MC_CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(MC_CACHE_VERSION).then((cache) => cache.put(MC_INDEX_URL, copy));
          return response;
        })
        .catch(() => caches.match(MC_INDEX_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(MC_CACHE_VERSION).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
