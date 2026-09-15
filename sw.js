// Service worker con due strategie diverse:
// - "network-first" per la pagina e il manifest: ogni volta che il telefono
//   ha connessione, scarica la versione più recente. Se sei offline, usa
//   l'ultima versione salvata. Con questa strategia NON serve più alzare
//   manualmente un numero ogni volta che aggiorni eventi/news/testi.
// - "cache-first" per le icone: cambiano raramente, quindi si risparmiano
//   dati riusando quelle salvate.
//
// Alza CACHE_NAME solo se cambi i NOMI dei file delle icone o ne aggiungi
// di nuovi — non serve più per i normali aggiornamenti di contenuto.
const CACHE_NAME = "comune-app-v6";
const APP_SHELL = ["icon-192.png", "icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  const isIcon = APP_SHELL.some(name => url.pathname.endsWith(name));

  if (isIcon) {
    // Icone: usa la copia salvata, scarica solo se manca
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Pagina, manifest e tutto il resto: prova sempre la rete per primo
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match("./index.html"))
      )
  );
});
