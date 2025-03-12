const CACHE_NAME = 'edubridge-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other important assets (CSS, JS, images)
  '/favicon.ico'
];

// Install and cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network first, falling back to cache strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseClone = response.clone();
        
        // Open cache
        caches.open(CACHE_NAME)
          .then(cache => {
            // Add response to cache
            cache.put(event.request, responseClone);
          });
        
        return response;
      })
      .catch(() => {
        // If network request fails, try to get from cache
        return caches.match(event.request);
      })
  );
});