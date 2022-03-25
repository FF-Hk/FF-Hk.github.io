self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/navbar.js',
          '/scanner.js',
          '/show.js',
          '/showdata.js',
          '/style.css',
          '/classes/camera.js',
          '/classes/init.js',
          '/classes/pdf.js'
        ]);
      })
    );
  });
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});
