!function(){"use strict";const e=1615413092693,t=`cache${e}`,n=["/client/client.54df8eb2.js","/client/inject_styles.5607aec6.js","/client/index.a10cc96e.js","/client/index.4a190ae4.js","/client/[slug].9a1d7703.js"].concat(["/service-worker-index.html","/favicon.png","/global.css","/images/imagePlaceholder.jpg","/images/logo-content-512.png","/images/svelte-logo-outline.svg","/logo-192.png","/logo-512.png","/logo_large.png","/manifest.json","/tw.jpg"]),s=new Set(n);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const n of e)n!==t&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url),a=n.protocol.startsWith("http"),c=n.hostname===self.location.hostname&&n.port!==self.location.port,o=n.host===self.location.host&&s.has(n.pathname),i="only-if-cached"===t.request.cache&&!o;!a||c||i||t.respondWith((async()=>o&&await caches.match(t.request)||async function(t){const n=await caches.open(`offline${e}`);try{const e=await fetch(t);return n.put(t,e.clone()),e}catch(e){const s=await n.match(t);if(s)return s;throw e}}(t.request))())}))}();
