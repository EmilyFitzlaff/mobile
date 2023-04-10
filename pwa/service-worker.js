const cacheName = 'ToDoList';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/assets/list.svg'
];

// Install the service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch from cache if available, otherwise fetch from network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});