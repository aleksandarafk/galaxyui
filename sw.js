//service worker initializer - chaches the assets and initializes the install button + fetch function
const staticCache = 'site-static';
const dynamicCache = 'site-dynamic';
const assets = [
    '/',
    '/index.html',
    '/app.js',
    '/index.js',
    '/style.css',
    'img/spaceship.png',
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png',
    'img/star.png',
    'img/tutorial.gif',
    'hammer.js'
]

//install service worker 
self.addEventListener('install', evt => {
    //this method prevents chrome to stop the sw before 
    //the chache assets have been installed
    evt.waitUntil( 
    caches.open(staticCache).then(cache => { 
        console.log('caching assets') 
        cache.addAll(assets);
    })
   );
});

// activate events
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => { 
           return Promise.all(keys 
                .filter(key => key !== staticCache)
                .map(key => caches.delete(key))
            )
        })
    )
});


//fetch events 
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes  || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                  cache.put(evt.request.url, fetchRes.clone());
                  return fetchRes;
                })
            });
        })
    );
});