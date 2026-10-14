const CACHE_NAME = 'mult-weather-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Установка воркера и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Перехват запросов (чтобы приложение открывалось без сети)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем файл из кэша, если он есть, иначе идем в сеть
        return response || fetch(event.request);
      })
  );
});