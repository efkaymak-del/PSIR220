var CACHE = 'psir220-v3';
var ASSETS = [
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
  '/PSIR220/lectures/causality-and-paradigms.html',
  '/PSIR220/lectures/Literature-review-presentation.html',
  '/PSIR220/sidequest/sorting-hat.html'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE; })
          .map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).then(function(response) {
      var clone = response.clone();
      caches.open(CACHE).then(function(cache) {
        cache.put(e.request, clone);
      });
      return response;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
