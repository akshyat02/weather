self.addEventListener('install', (event) => {
  console.log('service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('service worker activated');
});
self.addEventListener('fetch', e =>{
  let response = fetch(e.request);
  e.respondWith(response);
});