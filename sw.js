var CACHE='psir220-v1';
var ASSETS=[
'/PSIR220/',
'/PSIR220/index.html',
'/PSIR220/manifest.json',
'/PSIR220/icon.svg',
'/PSIR220/tools/annotated-bib.html',
'/PSIR220/tools/lit-review.html',
'/PSIR220/tools/character-card.html',
'/PSIR220/tools/scholar-selector.html',
'/PSIR220/tools/lit-map.html',
'/PSIR220/tools/paradigm-crisis.html',
'/PSIR220/tools/n-size-slider.html',
'/PSIR220/lectures/causal-engine.html',
'/PSIR220/lectures/lit-review-lecture.html'
];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});

self.addEventListener('fetch',function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r||fetch(e.request).then(function(res){
        if(res.status===200){var cl=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,cl);});}
        return res;
      });
    }).catch(function(){if(e.request.mode==='navigate')return caches.match('/PSIR220/index.html');})
  );
});
