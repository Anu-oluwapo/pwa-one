var cacheName = 'petstore v-1';
var cacheFiles = [
    'index.html',
    'products.js',
    'style.css',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/cat-house.jpg',
    'images/laser-pointer.jpg',
    'images/icon-store-512.png',
    
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching All Files');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the files if its in the cache
            return r || fetch (e.request).then(function(response) {
                // add all the new files to the cache
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response
                })
            })
        })
    )
})