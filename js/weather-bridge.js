/* GENIE weather bridge: public, sanitized forecast endpoint only. Never expose upstream API keys. */
(function(){'use strict';
const ENDPOINT=''; // Set only after verifying ONEULHARU's public weather response schema and CORS.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setWeather(message){const node=document.getElementById('genieWeatherStatus');if(node)node.textContent=message;}
async function load(){if(!ENDPOINT){setWeather('오늘하루 날씨 API 연결 확인 대기 중 · 현재 예보를 임의로 표시하지 않습니다.');return;}
try{const url=new URL(ENDPOINT,location.href);if(url.protocol!=='https:'&&url.hostname!=='localhost')throw Error('HTTPS 필수');const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),7000);let response;try{response=await fetch(url.toString(),{mode:'cors',credentials:'omit',signal:ctl.signal,headers:{'Accept':'application/json'}})}finally{clearTimeout(timer)}if(!response.ok)throw Error('날씨 서버 오류');const data=await response.json(); // Explicit schema, no guessed fields.
if(!data||typeof data!=='object'||typeof data.summary!=='string'||typeof data.updatedAt!=='string')throw Error('응답 형식 불일치');
const timestamp=Date.parse(data.updatedAt);if(!Number.isFinite(timestamp)||Date.now()-timestamp>3*60*60*1000||timestamp>Date.now()+5*60*1000)throw Error('오래된 예보');setWeather(data.summary.slice(0,180)+' · '+new Date(timestamp).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})+' 기준');
}catch(e){setWeather('날씨 정보를 가져오지 못했습니다. 기상청에서 확인해 주세요.')}}
window.genieWeatherRefresh=load;document.addEventListener('DOMContentLoaded',()=>{load()});
})();
