const CACHE_NAME = "toko-static-v1";
const CACHE_PREFIX = "toko-static-";

const STATIC_PATTERNS = [
  /^\/icons\//,
  /^\/produk\/.*\.(?:svg|jpe?g|png|webp)$/,
  /^\/_next\/static\//,
];

function isStaticAsset(request) {
  const url = new URL(request.url);

  return (
    request.method === "GET" &&
    url.origin === self.location.origin &&
    request.mode !== "navigate" &&
    STATIC_PATTERNS.some((pattern) => pattern.test(url.pathname))
  );
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (!isStaticAsset(request)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok && response.type === "basic") {
        await cache.put(request, response.clone());
      }
      return response;
    })()
  );
});
