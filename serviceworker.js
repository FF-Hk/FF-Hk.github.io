self.addEventListener('install', event => {
    event.waitUntil(
          caches
            .open('v1')
            .then(cache => {
              cache.addAll([
                'navbar.js',
                'scanner.js',
                'show.js',
                '/classes/camera.js',
                '/classes/init.js',
                '/classes/pdf.js'
              ]);
            })
            .then(() => self.skipWaiting())
        );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});
