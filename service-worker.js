!function(){"use strict";const e=1616536661015,t=`cache${e}`,a=["/client/client.5af9b3ea.js","/client/inject_styles.5607aec6.js","/client/index.9363f223.js","/client/index.88741864.js","/client/[slug].b31bc591.js"].concat(["/service-worker-index.html","/404.html","/CNAME","/favicon.png","/global.css","/images/imagePlaceholder.jpg","/images/logo-content-512.png","/images/paper-airplane.png","/images/sapper-small.png","/images/sapper.png","/images/svelte-small.png","/images/svelte.png","/images/t.png","/images/trajektorija.png","/logo-192.png","/logo-512.png","/logo_large.png","/manifest.json"]),s=new Set(a);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(a))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const a of e)a!==t&&await caches.delete(a);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const a=new URL(t.request.url),n=a.protocol.startsWith("http"),c=a.hostname===self.location.hostname&&a.port!==self.location.port,i=a.host===self.location.host&&s.has(a.pathname),l="only-if-cached"===t.request.cache&&!i;!n||c||l||t.respondWith((async()=>i&&await caches.match(t.request)||async function(t){const a=await caches.open(`offline${e}`);try{const e=await fetch(t);return a.put(t,e.clone()),e}catch(e){const s=await a.match(t);if(s)return s;throw e}}(t.request))())}))}();
