// 콩콩 미션 - 알림 서비스 워커 (앱이 꺼져 있어도 푸시 알림을 보여줘요)
const TE=new TextEncoder(),TD=new TextDecoder();
function idbGet(k){return new Promise(res=>{try{const q=indexedDB.open("kongkong-sw",1);q.onupgradeneeded=()=>q.result.createObjectStore("kv");q.onsuccess=()=>{const r=q.result.transaction("kv").objectStore("kv").get(k);r.onsuccess=()=>res(r.result||"");r.onerror=()=>res("")};q.onerror=()=>res("")}catch(e){res("")}})}
const unb64=t=>Uint8Array.from(atob(t),c=>c.charCodeAt(0));
async function dec(code,w){const m=await crypto.subtle.importKey("raw",TE.encode(code),"PBKDF2",false,["deriveKey"]);const k=await crypto.subtle.deriveKey({name:"PBKDF2",salt:TE.encode("kongkong-mission-v1"),iterations:100000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["decrypt"]);const raw=unb64(w.e);const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:raw.slice(0,12)},k,raw.slice(12));return JSON.parse(TD.decode(pt))}
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{e.waitUntil((async()=>{
 let o={t:"🔔 콩콩 미션",b:"알림이 도착했어요",g:"m"};
 try{const j=e.data.json(),code=await idbGet("fam");if(code&&j&&j.e)o=Object.assign(o,await dec(code,j))}catch(_){}
 await self.registration.showNotification(o.t,{body:o.b,icon:"/icon-192.png",badge:"/icon-192.png",tag:o.tag||o.g||"kk",renotify:true,vibrate:[120,60,120,60,200],data:{g:o.g||"m"}})
})())});
self.addEventListener("notificationclick",e=>{e.notification.close();const g=(e.notification.data&&e.notification.data.g)||"m";
 e.waitUntil((async()=>{const L=await self.clients.matchAll({type:"window",includeUncontrolled:true});
  for(const c of L){try{await c.focus();c.postMessage({go:g});return}catch(_){}}
  await self.clients.openWindow("/?go="+g)})())});
