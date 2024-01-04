// Service Worker Logic
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('your-cache-name').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/app.js',
          // Add other files you want to cache
        ]);
      })
    );
  });
  
  // Fetch event for serving cached assets
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  