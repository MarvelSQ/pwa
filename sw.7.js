console.log('sw.6.js loaded');

var cacheStorageKey = 'minimal-pwa-6'

var cacheList = [
  '/',
  "index.html",
  "index.js",
  "logo@2x.png",
  'ad.json'
]

self.addEventListener('install', e => {
  console.log('sw install', e);
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log('sw response',response);
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('sw activate');
  e.waitUntil(
    Promise.all(
      [caches.keys().then(cacheNames => {
        console.log('running')
        return cacheNames.map(name => {
          console.log('inner running')
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
          return 0;
        })
      })]
    ).then((res) => {
      console.log(res)
      return 0;
    })
  )
})

console.log(self)
