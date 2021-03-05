self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('ktzr').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/static/css/main.css',
       'https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono',
       'https://use.fontawesome.com/releases/v5.0.4/js/all.js',
       'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
       'https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2',
       '/manifest.json',
       '/static/favicon/favicon-32x32.png',
       '/static/favicon/android-chrome-192x192.png',
       '/art',
       '/art.html',
       '/static/css/page.css',
       '/static/art/1-small.jpg',
       '/static/art/2-small.jpg',
       '/static/art/3-small.jpg',
       '/static/art/4-small.jpg',
       '/static/photo/1-small.jpg',
       '/static/photo/2-small.jpg',
       '/static/photo/3-small.jpg',
       '/static/photo/4-small.jpg',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(request){
  return fetch(request)
    .then(function(res) {
        return caches.open('ktzr')
          .then(function(cache) {
//            console.log("adding to cache:", request.url);
            cache.put(request.url, res.clone());
              return res;
          })
    })
}
