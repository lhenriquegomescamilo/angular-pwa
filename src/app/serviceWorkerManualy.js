
const CACHE_GROUP = 'v1';

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const NOT_FOUND = '/index.html';
    console.log('event request', event.request);

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetchRequestAndCache(event.request))
    );

    function fetchRequestAndCache(request) {
        return fetch(request)
            .then(networkResponse => {
                caches.open(CACHE_GROUP).then(cache => {
                    cache.put(request, networkResponse);
                });
                return networkResponse.clone();
            });
    }
});

self.addEventListener('activate', event => {
    console.log("From SW: Activate Event");
    self.clients.claim();
    event.waitUntil(
        caches.keys()
            .then(function (cacheKeys) {
                var deletePromises = [];
                for (var i = 0; i < cacheKeys.length; i++) {
                    if (cacheKeys[i] != CACHE_GROUP) {
                        deletePromises.push(caches.delete(cacheKeys[i]));
                    }
                }
                return Promise.all(deletePromises);
            })
    );
});