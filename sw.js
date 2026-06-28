// VIM Store Service Worker — v1
const CACHE = 'vim-store-v1';
const ASSETS = [
  './VIM_Store_Database-10.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jsqr/1.4.0/jsQR.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(()=>
      new Response('<h2 style="font-family:sans-serif;direction:rtl;padding:20px">📶 ئینتەرنێت نییە — داتاکانت پارێزراون</h2>', {headers:{'Content-Type':'text/html'}})
    ))
  );
});
