this.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/classes/',
          '/classes/camera.js',
          '/classes/init.js',
          '/classes/pdf.js'
        ]);
      })
    );
  });
this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});
