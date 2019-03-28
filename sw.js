const staticAssets = [
    './style.css',
    './main.js'
];
self.addEventListener('install', async () => {
    console.log('service worker installed');
    const cache = await caches.open('static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    let req = event.request;
    event.respondWith(cacheFirst(req));
});

const cacheFirst = async req => {
    const cachedResponse = await caches.match(req);
    console.log(cachedResponse)
    return cachedResponse || fetch(req);
}