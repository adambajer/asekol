const CACHE_NAME = 'map-app-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/data.json',
    'https://unpkg.com/leaflet/dist/leaflet.css',
    'https://unpkg.com/leaflet/dist/leaflet.js',
    'https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js',
    'https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css',
    'https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js',
    'https://unpkg.com/leaflet.fullscreen/Control.FullScreen.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        )
    );
});
