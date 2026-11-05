// Casa Mallow offline support: the app shell is cached, fonts and icons are cached as they load.
const V='cm-v'+1793898029;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','vendor/lucide.min.js','vendor/fonts.css','vendor/lexend-latin-500-normal.woff2','vendor/lexend-latin-600-normal.woff2','vendor/lexend-latin-700-normal.woff2','vendor/atkinson-hyperlegible-latin-400-normal.woff2','vendor/atkinson-hyperlegible-latin-700-normal.woff2'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com|unpkg\.com|cdn\.jsdelivr\.net/.test(u.host))){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))});
