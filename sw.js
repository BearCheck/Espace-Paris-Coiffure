/**
 * Service Worker pour le mode hors-ligne et la mise en cache
 */

const CACHE_NAME = 'espace-paris-coiffure-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/js/app.js',
    '/js/models/SalonModel.js',
    '/js/viewmodels/SalonViewModel.js',
    '/js/views/SalonView.js',
    '/Photos/1.jpg',
    '/Photos/2.png.avif',
    '/Photos/3.jpg',
    '/Photos/4.jpg',
    '/Photos/5.jpg',
    '/Photos/7.jpg',
    '/Photos/8.jpg',
    '/Photos/9.jpg',
    '/Photos/10.jpg'
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Mise en cache des fichiers');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Suppression de l\'ancien cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retourner la version en cache si disponible
                if (response) {
                    return response;
                }

                // Sinon, faire la requête réseau
                return fetch(event.request).then(response => {
                    // Mettre en cache les nouvelles requêtes réussies
                    if (response.status === 200 && event.request.url.includes('Photos/')) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
            .catch(() => {
                // En cas d'erreur réseau, retourner une page hors-ligne
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});
