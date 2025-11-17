// static/sw.js
const CACHE = 'sentry-decoder-v20251117';

const ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/bootstrap.min.css',
  '/bootstrap.bundle.min.js',
  '/vis-network.min.js',
  '/html2canvas.min.js',
  '/filesaver.min.js'
];

self.addEventListener('install', e => {
  console.log('[SW] Installing v20251117');
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('[SW] Activating');
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== CACHE ? caches.delete(k) : null)
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Only cache same-origin assets
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});