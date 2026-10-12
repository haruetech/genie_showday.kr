/* ---- 예약 알림: 등록 · 수정 · 삭제 (프리올쏘 고정 항목 대체) ----
   rems = [{id, n:이름, t:"HH:MM", on:true/false, d:[요일들] (빈 배열 = 매일)}]  */
let rems=[],remEditId="",remDays=[];
(function(){let raw=null;try{raw=localStorage.getItem("mobileKongRem")}catch(e){}
 if(raw!==null){try{const a=JSON.parse(raw);if(Array.isArray(a))rems=a}catch(e){}}
 else{/* 처음 한 번: 예전 '프리올쏘 하기'를 일반 예약 알림으로 옮겨요 (이후엔 고치고 지울 수 있어요) */
  if(pre&&pre.on){rems.push({id:"r"+Date.now().toString(36),n:"프리올쏘 하기",t:pre.time||"20:00",on:true,d:[]});pre.on=false;try{save()}catch(e){}}
  try{localStorage.setItem("mobileKongRem",JSON.stringify(rems))}catch(e){}}})();
function remSave(){try{localStorage.setItem("mobileKongRem",JSON.stringify(rems))}catch(e){}try{schedulePush()}catch(e){}}
const remDayTxt=d=>!d||!d.length||d.length===7?"매일":WORD.filter(x=>d.includes(x)).map(x=>WDN[x]).join("·")+"요일";
const remHit=(r,wd)=>!r.d||!r.d.length||r.d.includes(wd);
function remUI(){const box=document.getElementById("remList");if(!box)return;
 const L=rems.slice().sort((a,b)=>(a.t||"").localeCompare(b.t||""));
 box.innerHTML=L.length?L.map(r=>`<div class="wkrow" style="${r.on?"":"opacity:.5"}"><span style="flex:none">⏰</span><span style="flex:1;font-size:14px;overflow-wrap:anywhere"><b>${esc(r.n)}</b><br><small style="color:#83778b">${fmt(r.t)} · ${remDayTxt(r.d)}${r.on?"":" · 꺼짐"}</small></span><button onclick="remToggle('${r.id}')" style="background:#f3edf5;color:#745cff;border-radius:9px;padding:6px 8px;margin-right:4px">${r.on?"끄기":"켜기"}</button><button onclick="remEdit('${r.id}')" style="background:#efeaff;color:#745cff;border-radius:9px;padding:6px 8px;margin-right:4px">수정</button><button onclick="remDel('${r.id}')" style="background:#fff0f4;color:#a9677e;border-radius:9px;padding:6px 8px">삭제</button></div>`).join(""):'<div style="font-size:13px;color:#a094aa;margin:4px 0">등록된 예약 알림이 없어요. 아래에서 추가해 주세요.</div>';
 const dayBox=document.getElementById("remDays");if(dayBox)dayBox.innerHTML=`<button class="${remDays.length?"":"on"}" onclick="remDayTog(-1)">매일</button>`+WORD.map(d=>`<button class="${remDays.includes(d)?"on":""}" onclick="remDayTog(${d})">${WDN[d]}</button>`).join("");
 const sv=document.getElementById("remSaveBtn"),cn=document.getElementById("remCancelBtn");if(sv)sv.textContent=remEditId?"✔ 수정 저장":"＋ 알림 추가";if(cn)cn.style.display=remEditId?"":"none"}
function remDayTog(d){if(d<0)remDays=[];else{const i=remDays.indexOf(d);if(i<0)remDays.push(d);else remDays.splice(i,1)}remUI()}
function remClear(){remEditId="";remDays=[];const n=document.getElementById("remName"),t=document.getElementById("remTime");if(n)n.value="";if(t)t.value="";remUI()}
function remAdd(){const n=remName.value.trim(),t=remTime.value;if(!n){alert("알림 이름을 넣어 주세요");return}if(!t){alert("알림 시간을 정해 주세요");return}
 const d=remDays.length>=7?[]:remDays.slice();
 if(remEditId){const r=rems.find(x=>x.id===remEditId);if(r){r.n=n;r.t=t;r.d=d}}else rems.push({id:"r"+Date.now().toString(36)+Math.floor(Math.random()*99),n,t,on:true,d});
 remClear();remSave();try{pushSync(true)}catch(e){}}
function remEdit(id){const r=rems.find(x=>x.id===id);if(!r)return;remEditId=id;remDays=(r.d||[]).slice();remName.value=r.n;remTime.value=r.t;remUI();remName.scrollIntoView({block:"center",behavior:"smooth"})}
function remDel(id){const r=rems.find(x=>x.id===id);if(!r||!confirm("'"+r.n+"' 알림을 지울까요?"))return;rems=rems.filter(x=>x.id!==id);if(remEditId===id)remClear();remSave();remUI();try{pushSync(true)}catch(e){}}
function remToggle(id){const r=rems.find(x=>x.id===id);if(!r)return;r.on=!r.on;remSave();remUI();try{pushSync(true)}catch(e){}}

/* 앱이 열려 있을 때: 시간이 되면 팝업 + 소리 */
function remFired(){let r={day:dsn(),keys:[]};try{const q=JSON.parse(localStorage.getItem("mobileKongRemFired")||"null");if(q&&q.day===dsn())r=q}catch(e){}return r}
function remTick(){try{const now=new Date(),nm=now.getHours()*60+now.getMinutes(),wd=now.getDay(),f=remFired(),due=[];
 rems.forEach(r=>{if(!r.on||!r.t||!remHit(r,wd))return;const tm=toMin(r.t),k=r.id+"@"+r.t;if(nm>=tm&&nm<tm+30&&!f.keys.includes(k)){f.keys.push(k);due.push(r)}});
 if(!due.length)return;try{localStorage.setItem("mobileKongRemFired",JSON.stringify(f))}catch(e){}
 if(document.querySelector(".modal.show"))return;
 remWrap.style.display="none";remEmo.style.display="";remEmo.textContent="⏰";remTitle.textContent="🔔 알림 시간이에요!";
 remText.innerHTML=due.map(r=>`<b>${esc(r.n)}</b> (${fmt(r.t)})`).join("<br>");
 remindModal.classList.add("show");sound(false);if(navigator.vibrate)navigator.vibrate([80,60,80]);
 try{if(window.Notification&&Notification.permission==="granted")new Notification("예약 알림 ⏰",{body:due.map(r=>r.n).join(", ")})}catch(e){}}catch(e){}}
setInterval(remTick,20000);setTimeout(remTick,3000);

/* 앱이 꺼져 있어도 오는 푸시 알림 계획에 예약 알림을 넣어요 */
const _basePushPlan=pushPlan;
pushPlan=function(){const out=_basePushPlan(),now=Date.now();
 for(let n=0;n<=7;n++){const d=new Date();d.setDate(d.getDate()+n);const k=ds(d),at0=new Date(k+"T00:00:00").getTime(),wd=d.getDay();
  rems.forEach(r=>{if(!r.on||!r.t||!remHit(r,wd))return;const at=at0+toMin(r.t)*60000;if(at>now-60000)out.push({k:"r:"+k+":"+r.id+":"+r.t,at,to:"",t:"⏰ "+r.n,b:"예약 알림 ("+fmt(r.t)+")",g:"e",tag:"r-"+r.id})})}
 return out};

/* 폰 달력용 파일: 등록한 예약 알림 전부 (매일/요일 반복) */
downloadIcs=function(){const act=rems.filter(r=>r.on&&r.t);if(!act.length){alert("켜져 있는 예약 알림이 없어요");return}
 const pad=n=>String(n).padStart(2,"0"),url=location.href.split("#")[0],stamp=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z",BY=["SU","MO","TU","WE","TH","FR","SA"],host=location.host||"local",L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//kongkong//KR","CALSCALE:GREGORIAN"];
 act.forEach(r=>{const days=(r.d&&r.d.length&&r.d.length<7)?r.d:null,d0=new Date();if(days)while(!days.includes(d0.getDay()))d0.setDate(d0.getDate()+1);const [h,m]=r.t.split(":");
  L.push("BEGIN:VEVENT","UID:kk-rem-"+r.id+"@"+host,"DTSTAMP:"+stamp,"DTSTART:"+d0.getFullYear()+pad(d0.getMonth()+1)+pad(d0.getDate())+"T"+h+m+"00","DURATION:PT15M",days?"RRULE:FREQ=WEEKLY;BYDAY="+days.map(x=>BY[x]).join(","):"RRULE:FREQ=DAILY","SUMMARY:⏰ "+r.n,"DESCRIPTION:콩콩 미션을 열어요! "+url,"URL:"+url,"BEGIN:VALARM","TRIGGER:PT0S","ACTION:DISPLAY","DESCRIPTION:"+r.n,"END:VALARM","END:VEVENT")});
 L.push("END:VCALENDAR");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar;charset=utf-8"}));a.download="kongkong-reminders.ics";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
 alert(act.length+"개 예약 알림을 달력 파일로 만들었어요. 열면 폰 달력에 들어가요.\n※ 나중에 알림을 고치거나 지우면 달력에는 자동 반영되지 않아요. 다시 받아 넣어 주세요.")};

const _baseRender=render;render=function(){_baseRender.apply(this,arguments);remUI()};
remUI();
