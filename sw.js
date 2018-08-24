//importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/gallery.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/css/main.css',
       '/js/main.js',
       '/img/**'
     ]);
   })
 );
});