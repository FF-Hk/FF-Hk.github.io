self.addEventListener('install', event => {
    event.waitUntil(
          caches
            .open('v1')
            .then(cache => {
              return cache.addAll([
                'index.html',
                'navbar.js',
                'scanner.js',
                'show.js',
                'showdata.html',
                'style.css',
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
