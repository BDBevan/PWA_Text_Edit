const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Caching for pages (HTML)
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }),
  ],
});

// Warming up cache for important pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigation requests (page navigation)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Caching for static assets (JS, CSS, images)
registerRoute(
  // Define the caching for CSS, JS, and images
  ({ request }) => ['style', 'script', 'image'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days
        maxEntries: 60, // Limit the number of assets to cache
      }),
    ],
  })
);
