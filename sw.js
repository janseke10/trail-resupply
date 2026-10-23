// Keeps the app working without signal: the page and scanner library come from the cache.
// Product lookups still need the internet; products scanned before are remembered in the app itself.
const CACHE = "resupply-v2";
const SHELL = ["./", "index.html", "manifest.webmanifest",
  "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname.endsWith("openfoodfacts.org")) return;
  if (e.request.mode === "navigate") {
    // Newest version when online, cached copy when not
    e.respondWith(fetch(e.request).then((r) => {
      caches.open(CACHE).then((c) => c.put("index.html", r.clone()));
      return r;
    }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  })));
});
