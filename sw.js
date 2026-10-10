/* Banc Vidéo Hockey — fonctionnement hors ligne.
   Changer VERSION à chaque mise en ligne d'une nouvelle version de l'app.
   La page est toujours revalidée auprès du serveur (cache:'no-cache') pour recevoir les mises à jour tout de suite. */
const VERSION='bvh-2026-10-10n';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  /* page : réseau d'abord (pour recevoir les mises à jour), sinon la copie locale */
  if(r.mode==='navigate'){e.respondWith(fetch(r.url,{cache:'no-cache'}).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
  /* polices Google et fichiers de l'app : copie locale d'abord */
  const font=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
  if(u.origin===location.origin||font){e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res})))}
});
