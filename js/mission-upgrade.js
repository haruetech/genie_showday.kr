/* 콩콩 미션 개선: 원본 게임 로직을 보존하며 반복/확인/기록을 보완 */
(function(){
const KEY='kong_mission_rules_v1',LOG='kong_mission_log_v1',DAY='kong_mission_day_v1';
const today=()=>new Date().toLocaleDateString('sv');
const cats=['☀️ 매일 습관','🧸 정리·심부름','📚 배움·공부','💗 마음·예절','🏃 몸 움직이기','🌟 특별 도전'];
let rules={};try{rules=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
let logs=[];try{logs=JSON.parse(localStorage.getItem(LOG)||'[]')}catch(e){}
let approval=localStorage.getItem('kong_mission_approval')==='true';
const safe=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const persist=()=>localStorage.setItem(KEY,JSON.stringify(rules));
function rollover(){const d=today(),old=localStorage.getItem(DAY)||localStorage.getItem('mobileKongDay');if(old&&old!==d){
  const names=missions.slice();const completed=names.filter((_,i)=>done[i]);if(completed.length)logs.push({date:old,completed});
  logs=logs.slice(-60);localStorage.setItem(LOG,JSON.stringify(logs));
  for(let i=missions.length-1;i>=0;i--){if((rules[missions[i]]||{}).repeat==='once'){const name=missions[i];missions.splice(i,1);done.splice(i,1);mt.splice(i,1);mp.splice(i,1);delete rules[name]}}
  persist();save();
}localStorage.setItem(DAY,d)}
rollover();
function active(i){const r=rules[missions[i]]||{};return r.repeat!=='weekday'||(r.days||[]).includes(new Date().getDay())}
const baseItems=items;items=function(){return baseItems().filter(x=>x.pre||active(x.id))};
const baseRender=render;render=function(){baseRender();drawMissionRules()};
window.missionSetApproval=function(v){approval=v;localStorage.setItem('kong_mission_approval',String(v))};
window.missionRule=function(i,k,v){const name=missions[i];if(!name)return;const r=rules[name]||(rules[name]={});if(k==='repeat')r.repeat=v;if(k==='cat')r.cat=v;if(k==='days')r.days=v.split(',').map(Number);persist();render()};
function drawMissionRules(){const el=document.getElementById('missionConfigList');if(!el)return;
 const ap=document.getElementById('parentApprove');if(ap)ap.checked=approval;
 el.innerHTML=missions.map((name,i)=>{const r=rules[name]||{};return `<div style="background:#faf6ff;border-radius:13px;padding:10px;margin:7px 0"><b>${safe(name)}</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:7px"><select aria-label="카테고리" onchange="missionRule(${i},'cat',this.value)" style="min-width:0">${cats.map(c=>`<option ${r.cat===c?'selected':''}>${c}</option>`).join('')}</select><select aria-label="반복 주기" onchange="missionRule(${i},'repeat',this.value)"><option value="daily" ${!r.repeat||r.repeat==='daily'?'selected':''}>매일</option><option value="weekday" ${r.repeat==='weekday'?'selected':''}>요일 선택</option><option value="once" ${r.repeat==='once'?'selected':''}>오늘만</option></select></div>${r.repeat==='weekday'?`<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:7px">${['일','월','화','수','목','금','토'].map((d,n)=>`<label style="font-size:12px"><input type="checkbox" ${((r.days||[]).includes(n))?'checked':''} onchange="missionDays(${i},${n},this.checked)">${d}</label>`).join('')}</div>`:''}</div>`}).join('')||'<p>미션을 등록하면 여기서 반복 주기를 설정할 수 있어요.</p>';
 const h=document.getElementById('missionHistory');if(h)h.textContent='최근 기록: '+(logs.slice(-7).map(x=>x.date+' '+x.completed.length+'개 성공').join(' · ')||'아직 기록이 없어요');
}
window.missionDays=function(i,d,on){const n=missions[i];if(!n)return;const r=rules[n]||(rules[n]={});const a=new Set(r.days||[]);on?a.add(d):a.delete(d);r.days=[...a];persist();render()};
const originalStamp=stampIt;
stampIt=function(id){if(approval&&!((id==='pre')||done[id])){const name=missions[id];if(!confirm('부모님 확인: '+name+' 미션을 완료했나요?'))return}originalStamp(id)};
window.finishToday=function(){const completed=missions.filter((_,i)=>done[i]);const d=today();logs.push({date:d,completed,early:true});logs=logs.slice(-60);localStorage.setItem(LOG,JSON.stringify(logs));alert('오늘도 수고했어! 💗 '+completed.length+'개나 해냈구나!');};
const button=document.createElement('button');button.textContent='🌙 오늘은 여기까지 · 오늘 한 일 칭찬하기';button.style.cssText='width:100%;border:0;border-radius:14px;background:#fff0b7;padding:12px;margin:9px 0;font-weight:900;color:#5c4270';button.onclick=finishToday;document.getElementById('pageMission')?.querySelector('.tscroll')?.appendChild(button);
render();
})();