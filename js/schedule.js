/* ---- 오늘 일정(미션 아님) + 이동시간 ---- */
const ROUTE_API="";/* 이동시간 API 주소 — 연결 규격 확인 후 채움 */
function evSave(){try{localStorage.setItem("mobileKongEv",JSON.stringify(ev))}catch(e){}schedulePush()}
let evY=new Date().getFullYear(),evM=new Date().getMonth(),evSel=ds(new Date());
function dayEvents(k){return dayEventsAll(k).filter(okWho)}
function exKey(x){return x.n+"@"+(x.t||"")+"@"+(x.k==="e"?"e":"m")}function isExc(k,x){return((week.ex||{})[k]||[]).includes(exKey(x))}
function skippedFor(k){const a=(week.ex||{})[k]||[];if(!a.length||isOff(k))return[];const wd=new Date(k+"T00:00:00").getDay();return(week.d[wd]||[]).filter(x=>a.includes(exKey(x))).map(x=>({n:x.n,t:x.t||"",te:x.k==="e"?(x.te||""):"",ek:exKey(x),mis:x.k==="e"?0:1}))}
function dayEventsAll(k){const today=ds(new Date()),out=[];
 if(k===today){if(ev.day!==today){try{dailyAuto(true)}catch(e){}}if(ev.day!==today)return out;ev.list.forEach((x,i)=>out.push(Object.assign({i},x)));return out}
 (cal[k]||[]).forEach(x=>{out.push({n:x.n,t:x.t||"",pl:x.pl||"",fl:x.fl||"",ad:x.ad||"",al:x.k==="m"?"":(x.al||""),who:x.k==="m"?"":(x.who||""),te:x.te||"",msg:x.k==="g"?1:0,mis:x.k==="m"?1:0})});
 if(!isOff(k)){const wd=new Date(k+"T00:00:00").getDay();(week.d[wd]||[]).forEach(x=>{if(isExc(k,x))return;out.push({n:x.n,t:x.t||"",pl:x.pl||"",fl:x.fl||"",ad:x.ad||"",al:x.k==="e"?(x.al||""):"",who:x.k==="e"?(x.who||""):"",te:x.k==="e"?(x.te||""):"",msg:0,rep:1,mis:x.k==="e"?0:1})})}
 return out.sort((a,b)=>(a.t||"")<(b.t||"")?-1:1)}
function hidNote(k){try{const A=dayEventsAll(k).filter(x=>!x.mis),h=A.filter(x=>!okWho(x));if(!h.length)return"";const w=[...new Set(h.flatMap(x=>whoArr(x.who)))];return`<div style="font-size:12px;color:#a094aa;margin:6px 2px 0">👤 ${esc(w.join("·"))}님 전용 일정 ${h.length}개는 이 폰(${esc(me)})에서는 숨겨져 있어요</div>`}catch(e){return""}}
function evNav(d){evM+=d;if(evM<0){evM=11;evY--}if(evM>11){evM=0;evY++}renderEv()}
function evPick(k){evSel=k;renderEv()}
function evToday(){const t=new Date();evY=t.getFullYear();evM=t.getMonth();evSel=ds(t);renderEv()}
function editDay(){evGoCal=evSel;openParent()}
let evGoCal="";
function homeCard(){const t=new Date(),k=ds(t),L=ev.day===dsn()?ev.list:[],n=nDone(),g=eff(),hn=HOL[k]?` · 🎌 ${esc(HOL[k])}`:"",left=L.filter(x=>!x.ok&&okWho(x)).length;
 const tm=new Date(t);tm.setDate(tm.getDate()+1);const tk=ds(tm),TE=dayEvents(tk).filter(x=>!x.mis).slice(0,4),un=typeof msgUnread==="function"?msgUnread():0;
 const row=x=>`<div class="hrow${x.ok?" ok":""}${okWho(x)&&x.who?" mine":""}"><span class="evt">${x.msg?"💌":(x.t?rngH(x.t,x.te):"종일")}</span><div><b>${esc(x.n)}</b> ${x.who?`<span class="evtag who">👤 ${esc(whoTxt(x.who))}</span>`:""}</div></div>`;
 if(!TE.length&&!un)return "";
 return `<div class="home">
  ${TE.length?`<div class="hsub">내일 미리보기</div>`+TE.map(row).join(""):""}
 ${un?`<span class="hbtn" onclick="goTab('c')">💬 안 읽은 메시지 ${un}개 보기</span>`:""}</div>`}
function renderEvCal(){const b=document.getElementById("evBox");if(!b)return;const today=ds(new Date()),L=ev.day===dsn()?ev.list:[],left=L.filter(x=>!x.ok&&okWho(x)).length,dot=document.getElementById("evDot");if(dot){dot.textContent=left;dot.style.display=left?"":"none"}
 const first=new Date(evY,evM,1).getDay(),days=new Date(evY,evM+1,0).getDate();
 let g=WDN.map((w,i)=>`<i style="${i===0?"color:#e0457b":""}">${w}</i>`).join("");for(let i=0;i<first;i++)g+="<span></span>";
 for(let d=1;d<=days;d++){const k=evY+"-"+p2(evM+1)+"-"+p2(d),wd=new Date(evY,evM,d).getDay(),E=dayEvents(k),hn=HOL[k]||"",nt=E.filter(x=>!x.msg).length,ng=E.filter(x=>x.msg).length;
  g+=`<button class="${k===today?"td ":""}${k===evSel?"sel ":""}${wd===0?"sun ":""}${hn?"hol ":""}${k<today?"off":""}" onclick="evPick('${k}')">${hn?`<span class="hn">${esc(hn.replace(" 연휴","").replace("대체공휴일","대체"))}</span>`:""}${d}<span class="dd">${nt>3?"<b>"+nt+"</b>":"<i></i>".repeat(nt)}${ng?'<i class="g"></i>':""}</span></button>`}
 const sd=new Date(evSel+"T00:00:00"),E=dayEvents(evSel),isT=evSel===today,nx=isT?L.findIndex(x=>!x.ok&&x.ad&&!x.msg&&okWho(x)):-1;
 const seen={};const E2=(window._evRows=E.filter(x=>{const key=(x.n||"").trim()+"|"+(x.t||"")+"|"+(x.who||"")+"|"+(x.mis?1:0)+"|"+(x.msg?1:0);if(seen[key]){if(x.ok)seen[key].ok=true;return false}seen[key]=x;return true}).sort((a,b)=>(a.mis?1:0)-(b.mis?1:0)||(a.t||"").localeCompare(b.t||""))),rows=E2.length?E2.map((x,j)=>{const ok=isT&&x.ok;return `<div class="evrow ${ok?"ok":""}${(x.pl||x.fl||x.ad)?" hasd":""}" onclick="if(!event.target.closest('button,a'))this.classList.toggle('open')"><span class="evt">${x.mis?"🎯":x.msg?"💌":(x.t?rngH(x.t,x.te):"종일")}</span><div class="evm"><b>${esc(x.n)}${(x.pl||x.fl||x.ad)?" <span class=\"pin\">📍</span>":""}</b><div>${x.who?`<span class="evtag who">👤 ${esc(whoTxt(x.who))}</span>`:""}${x.rep?'<span class="evtag rep">🔁 매주</span>':""}${(x.al!==""&&x.al!=null&&!x.msg&&x.al in ALN)?`<span class="evtag al">🔔 ${ALN[x.al]}</span>`:""}</div>${(x.pl||x.fl||x.ad)?`<div class="evdet"><small>📍 ${esc(x.pl)} ${esc(x.fl)}</small>${x.ad?`<small>${esc(x.ad)}</small>`:""}<div class="evr"${(isT&&x.i===nx)?' id="evR"':""}><a class="evmap" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(x.ad||x.pl)}">🗺️ 지도 보기</a>${(isT&&x.i===nx)?`<button onclick="routeGo(${x.i})">🧭 이동시간</button>`:""}</div></div>`:""}</div>${isT?`<button class="evok" onclick="evOk(${x.i})">${x.msg?(ok?"읽음 ✓":"읽었어요"):(ok?"확인함 ✓":"확인했어요")}</button>`:""}<button class="evedit" title="수정" onclick="evEditRow(${j})">✏️</button></div>`}).join(""):'<div class="evempty" style="padding:14px 6px">이 날은 등록된 일정이 없어요</div>';
 b.innerHTML=(isT?"":pinToday())+`<div class="evday"><h3>${sd.getMonth()+1}월 ${sd.getDate()}일 (${WDN[sd.getDay()]})${isT?" · 오늘":""} ${HOL[evSel]?`<span class="hol">🎌 ${esc(HOL[evSel])}</span>`:""}${inSkip(evSel)?` <span class="hol">😴 쉬는 날</span> <button class="evok" style="padding:3px 9px;font-size:12px" onclick="needPin(()=>unskipDate('${evSel}'))">쉬는 날 풀기</button>`:""}</h3>${rows}${hidNote(evSel)}${skippedRowsHtml(evSel)}<div class="evbtns"><button onclick="evToday()">📅 오늘로</button><button onclick="editDay()">✏️ 이 날 일정 넣기</button></div></div>${homeCard()}<div class="evcard evcal"><div class="calnav"><button onclick="evNav(-1)">◀</button><b>${evY}년 ${evM+1}월</b><button onclick="evNav(1)">▶</button></div><div class="calg">${g}</div></div>
 <details class="evcard" style="margin-top:8px"><summary style="font-weight:900;font-size:14px;color:#745cff">🔁 매주 일정 한눈에</summary><div style="margin-top:4px">${wkBoardHtml()}</div></details><div style="text-align:center;font-size:11px;color:#b9aec0;margin:8px 0">🕒 마지막 업데이트 ${APP_BUILD}<br>오늘 ${today}<br><button onclick="updCheck()" style="margin-top:6px;background:#f3edf5;color:#745cff;border-radius:12px;padding:8px 14px;font-weight:900;font-size:13px">🔄 업데이트 확인하기</button></div>`}
function evOk(i){const x=ev.list[i];if(!x)return;x.ok=!x.ok;if(x.ok)delete x.man;else x.man=1;evSave();renderEv()}
function evAutoOk(){if(week.autoOk===false||ev.day!==dsn())return;const now=new Date(),nm=now.getHours()*60+now.getMinutes();let ch=0;ev.list.forEach(x=>{if(x.ok||x.man||x.msg||!x.t)return;const tm=h=>{const a=h.split(":");return +a[0]*60+ +a[1]},end=x.te&&x.te>x.t?tm(x.te):tm(x.t)+60;if(nm>=end){x.ok=true;x.auto=1;ch++}});if(ch){evSave();try{renderEv()}catch(e){}}}
function routeFetch(lat,lng,x){/* 규격 확인 후 이 함수만 맞추면 돼요. 결과: {car:분, bus:분, walk:분} */
 return fetch(ROUTE_API+"?from="+lat+","+lng+"&to="+encodeURIComponent(x.ad)).then(r=>{if(!r.ok)throw new Error("route");return r.json()}).then(j=>({car:j.car,bus:j.transit||j.bus,walk:j.walk}))}
async function routeGo(i){const x=ev.list[i],box=document.getElementById("evR");if(!x||!box)return;
 if(!ROUTE_API){box.innerHTML='<small>이동시간 서비스가 아직 연결되지 않았어요</small>';return}
 box.innerHTML="<small>현재 위치를 확인하는 중…</small>";let pos;
 try{pos=await new Promise((ok,no)=>navigator.geolocation.getCurrentPosition(ok,no,{timeout:10000,maximumAge:60000}))}catch(e){box.innerHTML='<small>위치 허용이 필요해요. 브라우저의 위치 권한을 허용해 주세요</small>';return}
 try{const r=await routeFetch(pos.coords.latitude,pos.coords.longitude,x),f=v=>v==null?"-":v+"분";box.innerHTML=`<span class="evch">🚗 ${f(r.car)}</span><span class="evch">🚌 ${f(r.bus)}</span><span class="evch">🚶 ${f(r.walk)}</span><div><button onclick="routeGo(${i})">🔄 다시 보기</button></div>`}catch(e){box.innerHTML='<small>이동시간을 가져오지 못했어요</small><div><button onclick="routeGo('+i+')">다시 해보기</button></div>'}}
/* ---- 달력 (날짜별 일정) ---- */
let calY=new Date().getFullYear(),calM=new Date().getMonth(),calSel=ds(new Date()),calK="e",calRepSel=[new Date().getDay()];
const CKN={m:"🎯 미션",e:"📅 일정",g:"💌 메시지"},CPH={m:"예: 피아노 연습하기",e:"예: 치과 예약",g:"예: 오늘은 할머니 댁에 가요"},CPRE={e:["학원","피아노","영어","태권도","수영","미술","방과후","병원"],m:["숙제하기","독서","양치하기","책가방 챙기기","운동하기"],g:[]};
const p2=n=>String(n).padStart(2,"0");
let calWhoSel=[];function calWhoTog(x){if(!x)calWhoSel=[];else{const i=calWhoSel.indexOf(x);if(i<0)calWhoSel.push(x);else calWhoSel.splice(i,1)}calUI()}
function whoList(){const s=new Set(ROLES);mem.forEach(x=>s.add(x));msgs.forEach(m=>{if(m.f)s.add(m.f);if(m.t&&m.t!=="all")s.add(m.t)});if(me)s.add(me);return[...s].filter(x=>x&&x!=="__join"&&!gone.includes(x))}
function calSave(){try{localStorage.setItem("mobileKongCal",JSON.stringify(cal))}catch(e){}schedulePush()}
function calNav(d){calM+=d;if(calM<0){calM=11;calY--}if(calM>11){calM=0;calY++}calUI()}
function calPick(d){calSel=d;calRepSel=[new Date(d+"T00:00:00").getDay()];calUI()}
function calRepTog(d){const i=calRepSel.indexOf(d);if(i<0)calRepSel.push(d);else calRepSel.splice(i,1);calUI()}
function setCalK(k){calK=k;calUI()}
function calUI(){if(!document.getElementById("calGrid"))return;updCalBtn();const today=ds(new Date()),first=new Date(calY,calM,1).getDay(),days=new Date(calY,calM+1,0).getDate();
 calTitle.textContent=calY+"년 "+(calM+1)+"월";let h=WDN.map((w,i)=>`<i style="${i===0?"color:#e0457b":""}">${w}</i>`).join("");for(let i=0;i<first;i++)h+="<span></span>";
 for(let d=1;d<=days;d++){const k=calY+"-"+p2(calM+1)+"-"+p2(d),wd=new Date(calY,calM,d).getDay(),has=(cal[k]||[]).length,wk=(week.d[wd]||[]).length,sk=isOff(k)&&!HOL[k],hn=HOL[k]||"";
  h+=`<button class="${k===today?"td ":""}${k===calSel?"sel ":""}${wd===0?"sun ":""}${hn?"hol ":""}${k<today?"off":""}" onclick="calPick('${k}')">${hn?`<span class="hn">${esc(hn.replace(" 연휴","").replace("대체공휴일","대체"))}</span>`:""}${d}<span class="p">${sk?"😴":has?"●":wk?"·":""}</span></button>`}
 calGrid.innerHTML=h;
 const sd=new Date(calSel+"T00:00:00"),wd=sd.getDay(),L=cal[calSel]||[],W=(week.d[wd]||[]);
 calDay.innerHTML=`<b style="color:#745cff">${sd.getMonth()+1}월 ${sd.getDate()}일 (${WDN[wd]})${HOL[calSel]?` <span style="color:#e0457b">🎌 ${esc(HOL[calSel])}</span>`:""}${inSkip(calSel)?" 😴 쉬는 날":""}</b>`+(W.length?`<div style="font-size:12px;color:#83778b;margin-top:3px">매주 반복: ${W.map(x=>(x.k==="e"?"📅":"🎯")+" "+esc(x.t||"")+" "+esc(x.n)).join(" · ")}</div>`:"")+
  (L.length?L.map((x,i)=>`<div class="wkrow"><span style="flex:none">${x.k==="g"?"💌":x.k==="m"?"🎯":"📅"}</span><span style="flex:1;font-size:14px;overflow-wrap:anywhere">${esc(x.t?rng(x.t,x.te):"")} ${esc(x.n)}${x.who?" · 👤"+esc(whoTxt(x.who)):""}${(x.pl||x.fl)?" · "+esc(x.pl)+" "+esc(x.fl):""}</span><button onclick="calEditStart('c','${calSel}',${i})" style="background:#efeaff;color:#745cff;border-radius:9px;padding:6px 8px;margin-right:4px">수정</button><button onclick="calDel('${calSel}',${i})" style="background:#fff0f4;color:#a9677e;border-radius:9px;padding:6px 8px">삭제</button></div>`).join(""):'<div style="font-size:13px;color:#a094aa;margin-top:4px">이 날 등록한 일정이 없어요.</div>');
 calKind.innerHTML=["e","m","g"].map(k=>`<button class="${calK===k?"on":""}" onclick="setCalK('${k}')">${CKN[k]}</button>`).join("");calName.placeholder=CPH[calK];{const L=whoList();calWho.innerHTML=`<button class="${calWhoSel.length?"":"on"}" onclick="calWhoTog('')">👨‍👩‍👧 가족 모두</button>`+L.map(x=>`<button class="${calWhoSel.includes(x)?"on":""}" onclick="calWhoTog(${esc(JSON.stringify(x))})">${esc(x)}</button>`).join("");calWhoBox.style.display=calK==="m"?"none":"";calEndBox.style.display=calK==="e"?"":"none"}calPre.innerHTML=(CPRE[calK]||[]).map(x=>`<button onclick="calName.value='${x}'">${x}</button>`).join("");calPlaceBox.style.display=calK==="e"?"":"none";calTime.style.opacity=calK==="g"?".4":"1";if(!calAl.options.length)calAl.innerHTML=alOpts("10");calRepBox.style.display=calK==="g"?"none":"";const rp=calRep.checked&&calK!=="g";calRepDays.style.display=rp?"":"none";calRepDays.innerHTML=WORD.map(d=>`<button class="${calRepSel.includes(d)?"on":""}" onclick="calRepTog(${d})">${WDN[d]}</button>`).join("")}
function addCal(){const n=calName.value.trim(),t=calK==="g"?"":calTime.value,today=ds(new Date()),rep=calRep.checked&&calK!=="g";if(!n){alert("이름이나 내용을 넣어 주세요");return}
 const base={n,t,pl:calK==="e"?calPlace.value.trim():"",fl:calK==="e"?calFloor.value.trim():"",ad:calK==="e"?calAddr.value.trim():"",al:calK==="e"?calAl.value:"",who:calK==="m"?"":(calWhoSel.length&&me&&!calWhoSel.includes(me)?calWhoSel.concat([me]):calWhoSel).join(","),te:calK==="e"?calEnd.value:""};if(base.te&&(!t||base.te<=t)){alert("끝나는 시간은 시작 시간보다 늦어야 해요");return}
 calWhoSel=[];
 if(rep){const days=calRepSel.length?calRepSel:[new Date(calSel+"T00:00:00").getDay()];days.forEach(d=>{if(!week.d[d].some(x=>x.n===n&&x.t===t)){const o={n,t};if(calK==="e"){o.k="e";o.al=base.al;o.pl=base.pl;o.fl=base.fl;o.ad=base.ad;o.who=base.who;o.te=base.te}week.d[d].push(o)}});saveWeek();wkUI();
  calName.value="";calTime.value="";calEnd.value="";calPlace.value="";calFloor.value="";calAddr.value="";calRep.checked=false;if(days.includes(new Date().getDay())){dailyAuto(true);afterAuto()}calUI();alert("매주 "+days.map(d=>WDN[d]).join("·")+"요일에 반복해서 등록했어요");return}
 if(calSel<today){alert("지난 날짜에는 등록할 수 없어요");return}
 (cal[calSel]=cal[calSel]||[]).push(Object.assign({k:calK},base));
 calName.value="";calTime.value="";calEnd.value="";calPlace.value="";calFloor.value="";calAddr.value="";calSave();if(calSel===today){dailyAuto(true);afterAuto()}calUI();if(base.k==="m"||calK==="m")alert("🎯 미션으로 등록했어요.\n미션 탭에 나오고, 일정 화면에는 나오지 않아요.");else if(base.who&&me&&!whoArr(base.who).includes(me))alert("👤 "+whoTxt(base.who)+"님 전용 일정으로 등록했어요.\n지금 이 폰("+me+")에서는 보이지 않고, "+whoTxt(base.who)+"님 폰에서 보여요.")}
function calDel(d,i){const a=cal[d]||[],it=a[i];if(!it)return;a.splice(i,1);if(!a.length)delete cal[d];calSave();
 if(d===ds(new Date())){unmat(it.k==="m"?{n:it.n}:{k:"e",n:it.n,t:it.t||""});dailyAuto(true);evSave();afterAuto()}calUI()}
function skipDate(){const t=ds(new Date());if(calSel<t){alert("지난 날짜예요");return}if(!confirm(calSel+" 을(를) 쉬는 날로 할까요?\n그날 요일별 일정이 빠져요 (나중에 되돌릴 수 있어요)"))return;skip.ranges.push([calSel,calSel]);if(calSel===t)removeAutoToday();saveWeek();afterAuto();wkUI();calUI();alert("이 날은 쉬는 날로 했어요")}
/* ---- 알림 · 내일 일정 · 한눈에 보기 ---- */
const ALN={"":"알림 없음","0":"시작 시간에","10":"10분 전","30":"30분 전","60":"1시간 전","day":"전날 저녁 8시"};
const alOpts=sel=>Object.keys(ALN).map(k=>`<option value="${k}"${k===String(sel==null?"":sel)?" selected":""}>${ALN[k]}</option>`).join("");
function tomorrowItems(){const d=new Date();d.setDate(d.getDate()+1);const k=ds(d),out=[];
 (cal[k]||[]).forEach(x=>out.push({n:x.n,t:x.t||"",pl:x.pl||"",fl:x.fl||"",al:x.al||"",who:x.who||"",k:x.k,msg:x.k==="g"?1:0}));
 if(!isOff(k))(week.d[d.getDay()]||[]).filter(x=>!isExc(k,x)).forEach(x=>out.push({n:x.n,t:x.t||"",pl:x.pl||"",fl:x.fl||"",al:x.k==="e"?(x.al||""):"",who:x.k==="e"?(x.who||""):"",k:x.k||"m",msg:0}));
 return out.sort((a,b)=>(a.t||"")<(b.t||"")?-1:1)}
function wkBoardHtml(){const t=new Date().getDay();return WORD.map(d=>{const a=(week.d[d]||[]).slice().filter(x=>x.k!=="e"||okWho(x)).sort((x,y)=>(x.t||"")<(y.t||"")?-1:1);return `<div class="wbrow${d===t?" tdy":""}"><b>${WDN[d]}</b><div>`+(a.length?a.map(x=>`<span class="wbchip ${x.k==="e"?"e":"m"}">${x.t?fmt(x.t)+" ":""}${esc(x.n)}${x.k==="e"&&x.al?" 🔔":""}</span>`).join(""):'<span class="wbempty">—</span>')+"</div></div>"}).join("")}
function evRemFired(){let r={day:dsn(),keys:[]};try{const q=JSON.parse(localStorage.getItem("mobileKongEvRem")||"null");if(q&&q.day===dsn())r=q}catch(e){}return r}
const whoArr=w=>String(w||"").split(",").map(v=>v.trim()).filter(Boolean),whoTxt=w=>whoArr(w).join("·"),okWho=x=>{const a=whoArr(x&&x.who);return !a.length||!me||a.includes(me)};
function evAlarmTick(){try{evAutoOk()}catch(e){}
 const now=new Date(),nm=now.getHours()*60+now.getMinutes(),r=evRemFired(),due=[];
 if(ev.day===dsn())ev.list.forEach(x=>{if(x.ok||!okWho(x)||!x.t||!/^\d+$/.test(String(x.al==null?"":x.al)))return;const[h,m]=x.t.split(":"),tm=+h*60+ +m,k=x.n+"@"+x.t;if(nm>=tm-(+x.al)&&nm<tm+30&&!r.keys.includes(k)){r.keys.push(k);due.push(x)}});
 if(nm>=1200){const tk="tmr-"+dsn();if(!r.keys.includes(tk)){r.keys.push(tk);tomorrowItems().filter(x=>x.al==="day"&&okWho(x)).forEach(x=>due.push(Object.assign({tmr:1},x)))}}
 if(!due.length)return;try{localStorage.setItem("mobileKongEvRem",JSON.stringify(r))}catch(e){}
 remWrap.style.display="none";remEmo.style.display="";remEmo.textContent="📅";const tm=due.some(x=>x.tmr);remTitle.textContent=tm?"🔔 내일 일정이 있어요!":"🔔 곧 일정이에요!";
 remText.innerHTML=due.map(x=>`<b>${esc(x.n)}</b>${x.t?" ("+fmt(x.t)+")":""}${(x.pl||x.fl)?"<br>📍 "+esc(x.pl)+" "+esc(x.fl):""}`).join("<br><br>");
 remindModal.classList.add("show");sound(false);if(navigator.vibrate)navigator.vibrate([80,60,80]);
 try{if(window.Notification&&Notification.permission==="granted")new Notification(tm?"내일 일정이 있어요":"곧 일정이에요",{body:due.map(x=>x.n).join(", ")})}catch(e){}}
function downloadIcsPlan(){const pad=x=>String(x).padStart(2,"0"),stamp=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z",host=location.host||"local",L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//kongkong//KR","CALSCALE:GREGORIAN"],today=ds(new Date());let cnt=0;
 const trig=(al,tm)=>{if(al==="")return null;if(al==="day")return "-PT"+(tm+240)+"M";return al==="0"?"PT0S":"-PT"+al+"M"};
 const ymd=k=>k.replace(/-/g,"");const dt=(k,t)=>ymd(k)+"T"+t.replace(":","")+"00";
 const vev=(uid,start,end,sum,desc,alm,rr)=>{L.push("BEGIN:VEVENT","UID:"+uid+"@"+host,"DTSTAMP:"+stamp,start,end,"SUMMARY:"+sum,"DESCRIPTION:"+desc);if(rr)L.push(rr);if(alm){L.push("BEGIN:VALARM","TRIGGER:"+alm,"ACTION:DISPLAY","DESCRIPTION:"+sum,"END:VALARM")}L.push("END:VEVENT");cnt++};
 const endT=t=>{const[h,m]=t.split(":"),e=+h*60+ +m+30;return pad(Math.floor(e/60)%24)+":"+pad(e%60)};
 Object.keys(cal).sort().forEach(k=>{if(k<today)return;(cal[k]||[]).forEach((x,i)=>{if(x.k==="m")return;const loc=[x.pl,x.fl,x.ad].filter(Boolean).join(" ");
  if(x.t){const tm=+x.t.slice(0,2)*60+ +x.t.slice(3);vev("kk-c-"+k+"-"+i,"DTSTART:"+dt(k,x.t),"DTEND:"+dt(k,(x.te&&x.te>x.t)?x.te:endT(x.t)),(x.k==="g"?"💌 ":"📅 ")+x.n,loc||"콩콩 미션",x.k==="e"?trig(x.al||"",tm):null)}
  else{const d2=new Date(k+"T00:00:00");d2.setDate(d2.getDate()+1);vev("kk-c-"+k+"-"+i,"DTSTART;VALUE=DATE:"+ymd(k),"DTEND;VALUE=DATE:"+ymd(ds(d2)),(x.k==="g"?"💌 ":"📅 ")+x.n,loc||"콩콩 미션",null)}})});
 const BY=["SU","MO","TU","WE","TH","FR","SA"];
 for(let wd=0;wd<7;wd++)(week.d[wd]||[]).forEach((x,i)=>{if(x.k!=="e"||!x.t)return;const d0=new Date();while(d0.getDay()!==wd)d0.setDate(d0.getDate()+1);const k=ds(d0),tm=+x.t.slice(0,2)*60+ +x.t.slice(3),loc=[x.pl,x.fl,x.ad].filter(Boolean).join(" ");
  vev("kk-w-"+wd+"-"+i,"DTSTART:"+dt(k,x.t),"DTEND:"+dt(k,(x.te&&x.te>x.t)?x.te:endT(x.t)),"📅 "+x.n,loc||"콩콩 미션",trig(x.al||"",tm),"RRULE:FREQ=WEEKLY;BYDAY="+BY[wd])});
 if(!cnt){alert("달력에 넣을 일정이 없어요. (미션은 제외, 일정·메시지만 들어가요)");return}
 L.push("END:VCALENDAR");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar;charset=utf-8"}));a.download="kongkong-plan.ics";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
 alert(cnt+"개 일정을 파일로 만들었어요. 열면 폰 달력에 들어가고, 정한 시간에 폰이 알려줘요.\n※ 매주 반복 일정은 공휴일에도 알림이 와요.")}
