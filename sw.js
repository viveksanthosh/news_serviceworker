self.addEventListener('install', () => {
    console.log('service worker installed')
});

self.addEventListener('fetch', event => {
    console.log('fetch')
});