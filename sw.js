const version = 9;
const cacheStorageKey = 'minimal-pwa-'+version;

var cacheList = [
  "index.html",
  "index.js",
  "logo@2x.png",
  'ad.json',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', function(e) {
  console.log('sw activate');
  e.waitUntil(
    Promise.all(
      [caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
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
