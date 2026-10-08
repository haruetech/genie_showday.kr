/* ---- 가족 메시지 (채팅) ---- */
const ROLES=["엄마","아빠","아이","고모","이모","삼촌","할머니","할아버지"],QUICK=["사랑해 💗","잘했어요 👍","다녀왔어요 🏠","데리러 갈게 🚗","조금 늦어요 ⏰","알겠어요 ✅"];
let me="",msgs=[],msgFid="",msgRead=0,msgSeen=-1,msgTo="all",msgBusy=false,msgErr="";
try{me=localStorage.getItem("mobileKongMe")||"";const q=JSON.parse(localStorage.getItem("mobileKongMsgs")||"null");if(q&&q.list){msgs=q.list;msgFid=q.fid||""}msgRead=+(localStorage.getItem("mobileKongMsgRead")||0);const sv=localStorage.getItem("mobileKongMsgSeen");if(sv!==null)msgSeen=+sv}catch(e){}
const msgVis=m=>!String(m.x==null?"":m.x).startsWith("__")&&(m.t==="all"||m.t===me||m.f===me);
let reads={},rx={},dl={},replyTo=null,lastRd=0;try{dl=JSON.parse(localStorage.getItem("mobileKongDl")||"{}");reads=JSON.parse(localStorage.getItem("mobileKongRd")||"{}");rx=JSON.parse(localStorage.getItem("mobileKongRx")||"{}");lastRd=+(localStorage.getItem("mobileKongRdSent")||0)}catch(e){}
const svRd=()=>{try{localStorage.setItem("mobileKongRd",JSON.stringify(reads));localStorage.setItem("mobileKongDl",JSON.stringify(dl));localStorage.setItem("mobileKongRx",JSON.stringify(rx))}catch(e){}};
let mem=[];try{mem=JSON.parse(localStorage.getItem("mobileKongMem")||"[]")}catch(e){}
var gone=[];try{gone=JSON.parse(localStorage.getItem("mobileKongGone")||"[]");if(!Array.isArray(gone))gone=[]}catch(e){gone=[]}
function roster(){const s=new Set(mem);msgs.forEach(m=>{if(m.f)s.add(m.f);if(m.t&&m.t!=="all")s.add(m.t)});const a=[...s].filter(x=>x&&x!==me&&!gone.includes(x));return a.sort((x,y)=>{const i=ROLES.indexOf(x),j=ROLES.indexOf(y);return (i<0?99:i)-(j<0?99:j)})}
function addMem(){const r=(prompt("받는 사람 이름(예: 큰이모, 삼촌)")||"").trim().slice(0,6);if(!r||r===me)return;if(!mem.includes(r)){mem.push(r);try{localStorage.setItem("mobileKongMem",JSON.stringify(mem))}catch(e){}}msgTo=r;renderChat()}
var meAsked=false;function askMe(){if(me||meAsked||document.getElementById("intro")||document.querySelector(".modal.show"))return;meAsked=true;const d=document.createElement("div");d.id="meModal";d.className="modal show";d.style.zIndex=99998;d.innerHTML='<div class="sheet"><div class="cwho2"><p>👨‍👩‍👧 가족 확인<br>이 폰을 쓰는 사람은 누구예요?<br><small style="font-weight:700;color:#83778b">처음 한 번만 정하면 돼요. 내가 해당되는 일정과 메시지만 보여요</small></p>'+ROLES.map(r=>`<button onclick="pickMe('${r}')">${r}</button>`).join("")+'<button onclick="pickMe(\'__etc\')">✏️ 직접 입력</button><button onclick="meJoin()" style="background:#fff;border:2px dashed #745cff;color:#745cff">🔗 쓰던 가족 코드가 있어요 (기존 기록 불러오기)</button></div></div>';document.body.appendChild(d)}
function meJoin(){const c=prompt("가족 코드 또는 초대 링크를 붙여넣어 주세요\n(쓰던 폰의 설정 → 가족 공유에서 볼 수 있어요)");if(c&&c.trim())joinCode(c)}
function pickMe(r){setMe(r);if(me){const m=document.getElementById("meModal");if(m)m.remove();try{renderEv();render();renderChat()}catch(e){}ensurePush(true).then(x=>{pushState=x;updPushStat();pushSync(true)}).catch(()=>{})}}
const msgNum=m=>typeof m.id==="number"?m.id:0;
function msgSave(){try{localStorage.setItem("mobileKongMsgs",JSON.stringify({fid:msgFid,list:msgs.slice(-300)}));localStorage.setItem("mobileKongMsgRead",String(msgRead));localStorage.setItem("mobileKongMsgSeen",String(msgSeen))}catch(e){}}
function msgUnread(){return msgs.filter(m=>msgNum(m)>msgRead&&m.f!==me&&msgVis(m)).length}
function updMsgDot(){const n=msgUnread(),d=document.getElementById("msgDot");if(!d)return;d.textContent=n>9?"9+":n;d.style.display=n?"":"none"}
function setMe(r){if(r==="__etc"){r=(prompt("이름(예: 이모, 삼촌)")||"").trim().slice(0,6);if(!r)return}me=r;try{localStorage.setItem("mobileKongMe",me)}catch(e){}if(gone.includes(me)){gone=gone.filter(x=>x!==me);svGone()}if(msgTo===me)msgTo="all";renderChat();announce();fetchMsgs(true);ensurePush(false).then(x=>{pushState=x;updPushStat()}).catch(()=>{})}
async function announce(){try{if(SBOK&&fam&&me)await rpc("kong_msg_send",{p_code:await idOf(fam),p_data:await encObj(fam,{f:me,t:"all",x:"__join"})})}catch(e){}}
function chgMe(){if(pinHash){const v=prompt("🔒 이 폰의 사용자를 바꾸려면 부모님 비밀번호 4자리를 입력하세요");if(v===null)return;if(hp(String(v).trim())!==pinHash){alert("비밀번호가 달라요");return}}else if(!confirm("이 폰을 쓰는 사람을 바꿀까요?\n(설정에서 🔒 비밀번호를 정하면 함부로 바꾸지 못하게 잠글 수 있어요)"))return;me="";meAsked=false;try{localStorage.removeItem("mobileKongMe")}catch(e){}renderChat();try{renderEv()}catch(e){}askMe()}
function setTo(t){msgTo=t;renderChat()}
function msgToast(list){const t=document.getElementById("msgToast"),m=list[list.length-1];t.innerHTML="<small>💬 "+esc(m.f)+(m.t!=="all"?" → 나에게":"")+(list.length>1?" 외 "+(list.length-1)+"개":"")+"</small>"+esc(m.x);t.style.display="block";clearTimeout(t._h);t._h=setTimeout(()=>{t.style.display="none"},12000);
 try{sound(false)}catch(e){}if(navigator.vibrate)navigator.vibrate([100,60,100,60,200]);
 try{if(window.Notification&&Notification.permission==="granted"&&document.visibilityState!=="visible")new Notification("💬 "+m.f,{body:m.x})}catch(e){}}
function openChat(){renderChat();fetchMsgs(true);setTimeout(()=>{const l=document.getElementById("chatList");l.scrollTop=l.scrollHeight},50)}
function renderChat(){renderChatMain();renderChatSeg()}
function renderChatMain(){const L=document.getElementById("chatList");if(!L)return;
 cNote.innerHTML="";const bar=document.getElementById("cBar");
 if(!SBOK||!fam){bar.style.display="none";L.innerHTML="";cNote.innerHTML='<div class="cnote">👨‍👩‍👧 가족 코드를 연결하면 가족과 메시지를 주고받을 수 있어요.<br>설정 → 가족 공유에서 연결해 주세요.</div>';cWho.innerHTML="";return}
 if(!me){bar.style.display="none";cWho.innerHTML="";L.innerHTML='<div class="cwho2"><p>이 폰은 누구 폰인가요?</p>'+ROLES.map(r=>`<button onclick="setMe('${r}')">${r}</button>`).join("")+'<button onclick="setMe(\'__etc\')">직접 입력</button></div>';return}
 bar.style.display="";cWho.innerHTML='나: <button onclick="chgMe()">'+esc(me)+' ✎</button>';
 if(msgErr)cNote.innerHTML='<div class="cnote">'+msgErr+"</div>";
 const vis=msgs.filter(msgVis);let h="",last="";
 vis.forEach((m,ix)=>{const d=new Date(m.ts),dk=d.toLocaleDateString("sv");if(dk!==last){last=dk;h+=`<div class="cds">${d.getMonth()+1}월 ${d.getDate()}일 ${"일월화수목금토"[d.getDay()]}요일</div>`}
  const mine=m.f===me,tm=d.toLocaleTimeString("ko-KR",{hour:"numeric",minute:"2-digit"}),pv=vis[ix-1],nx=vis[ix+1],sameDay=x=>x&&new Date(x.ts).toLocaleDateString("sv")===dk,
   firstOfRun=!pv||pv.f!==m.f||!sameDay(pv),lastOfMin=!nx||nx.f!==m.f||!sameDay(nx)||new Date(nx.ts).toLocaleTimeString("ko-KR",{hour:"numeric",minute:"2-digit"})!==tm,
   un=dl[m.id]===m.f?0:unreadN(m),meta=`<div class="cmeta">${un?`<b class="cun">${un}</b>`:""}${lastOfMin?`<span>${tm}${m.tmp?" · 보내는 중":""}</span>`:""}</div>`,
   gone=dl[m.id]===m.f,qt=m.q?`<div class="cquo"><b>↩ ${esc(m.q.f)}</b><br>${dl[m.q.id]?"삭제된 메시지입니다":esc(m.q.x)}</div>`:"",
   bub=gone?`<div class="cb ${mine?"me":"ot"} cgone">삭제된 메시지입니다</div>`:`<div class="cb ${mine?"me":"ot"}"${typeof m.id==="number"?` onclick="rxOpen(${m.id})"`:""}>${m.t!=="all"?`<span class="cwhis">${mine?"→ "+esc(m.t)+"에게":"🔒 나에게"}</span>`:""}${qt}${esc(m.x)}</div>`,
   rr=rx[m.id]?Object.entries(rx[m.id]):[],rg={};rr.forEach(([n,e])=>{(rg[e]=rg[e]||[]).push(n)});
  if(!mine&&firstOfRun)h+=`<div class="cn">${esc(m.f)}</div>`;
  h+=`<div class="crow ${mine?"me":""}">${mine?meta+bub:bub+meta}</div>`;
  if(rr.length&&!gone)h+=`<div class="crx ${mine?"me":""}">${Object.entries(rg).map(([e,a])=>`<span class="rxc${a.includes(me)?" my":""}" title="${esc(a.join(", "))}" onclick="rxOpen(${m.id})">${e}${a.length>1?" "+a.length:""}</span>`).join("")}</div>`});
 L.innerHTML=h||'<div class="evempty">💬<br>아직 메시지가 없어요<br><small>아래에서 첫 메시지를 보내 보세요</small></div>';
 const to=["all"].concat(roster());if(!to.includes(msgTo))msgTo="all";cTo.innerHTML=to.map(t=>`<button class="${msgTo===t?"on":""}" onclick="setTo(${esc(JSON.stringify(t))})">${t==="all"?"👨‍👩‍👧 전체":esc(t)+"에게"}</button>`).join("")+'<button onclick="addMem()">＋ 사람 추가</button><button onclick="needPin(peopleOpen)">✏️ 사람 관리</button>';
 cQ.innerHTML=(me!=="아이"?'<button class="prbtn" onclick="openPraise()">🌟 칭찬 스티커</button>':"")+QUICK.map((q,i)=>`<button onclick="sendMsg(QUICK[${i}])">${q}</button>`).join("");
 const atTab=document.querySelector(".app").dataset.tab==="c";if(atTab){const mx=Math.max(0,...msgs.map(msgNum));if(mx>msgRead){msgRead=mx;msgSave()}L.scrollTop=L.scrollHeight;if(document.visibilityState!=="hidden")sendRead()}updMsgDot()}
async function fetchMsgs(force){if(!SBOK||!fam||!me||msgBusy)return;if(document.visibilityState==="hidden"&&!force)return;msgBusy=true;
 try{const fid=await idOf(fam);if(msgFid!==fid){msgFid=fid;msgs=[];msgRead=0;msgSeen=-1;reads={};rx={};dl={};lastRd=0;svRd()}
  const after=Math.max(0,...msgs.map(msgNum)),rows=await rpc("kong_msg_list",{p_code:fid,p_after:after})||[],nw=[];
  for(const r of rows){try{const o=await decObj(fam,r.data);const m={id:r.id,f:o.f,t:o.t||"all",x:o.x,ts:r.ts};if(o.q)m.q=o.q;if(!msgs.some(x=>x.id===m.id)){if(o.x==="__del")dl[o.r]=o.f;else if(o.x==="__read")reads[o.f]=Math.max(reads[o.f]||0,+o.u||0);else if(o.x==="__rx"){const q=rx[o.r]=rx[o.r]||{};if(o.e)q[o.f]=o.e;else delete q[o.f]}const k=msgs.findIndex(x=>x.tmp&&x.f===m.f&&x.x===m.x);if(k>=0)msgs.splice(k,1);msgs.push(m);nw.push(m)}}catch(e){}}
  msgErr="";if(nw.length){msgs.sort((a,b)=>msgNum(a)-msgNum(b)||a.ts-b.ts);const mx=Math.max(...msgs.map(msgNum));const mine=nw.filter(m=>m.f!==me&&msgVis(m));
   if(msgSeen>=0&&mine.length){const fresh=mine.filter(m=>m.id>msgSeen);if(fresh.length&&document.querySelector(".app").dataset.tab!=="c")msgToast(fresh);else if(fresh.length){try{sound(false)}catch(e){}}}
   msgSeen=Math.max(msgSeen,mx)}else if(msgSeen<0){msgSeen=Math.max(0,...msgs.map(msgNum))}
  svRd();msgSave();renderChat()}catch(e){msgErr=/^4/.test(String(e.message))?"💬 메시지 서버 설정이 필요해요. (supabase_chat.sql 실행)":"⚠️ 메시지 서버에 연결하지 못했어요";if(document.querySelector(".app").dataset.tab==="c")renderChat()}
 msgBusy=false}
async function sendMsg(q){const inp=document.getElementById("cInput"),x=(q||inp.value).trim();if(!x||!me||!fam)return;const rq=(!q&&replyTo)?{id:replyTo.id,f:replyTo.f,x:String(replyTo.x).slice(0,40)}:null,tmp={id:"t"+Date.now(),f:me,t:msgTo,x,ts:Date.now(),tmp:1};if(rq)tmp.q=rq;msgs.push(tmp);if(!q){inp.value="";if(rq)clearReply()}renderChat();
 try{const _to=msgTo;await rpc("kong_msg_send",{p_code:await idOf(fam),p_data:await encObj(fam,rq?{f:me,t:msgTo,x,q:rq}:{f:me,t:msgTo,x})});pushChat(x,_to);msgErr="";msgBusy=false;await fetchMsgs(true)}catch(e){msgs=msgs.filter(m=>m!==tmp);msgErr=/^4/.test(String(e.message))?"💬 메시지 서버 설정이 필요해요. (supabase_chat.sql 실행)":"⚠️ 보내지 못했어요. 인터넷을 확인해 주세요";if(!q)inp.value=x;renderChat()}}
function addTask(){let v=newTask.value.trim();if(!v)return;missions.push(v);done.push(false);mt.push(newTime.value||"");mp.push(newPraise.value.trim());newTask.value="";newTime.value="";newPraise.value="";save();lastSig=null;tick()}
function removeTask(i){missions.splice(i,1);done.splice(i,1);mt.splice(i,1);mp.splice(i,1);save();lastSig=null;tick()}
function revokeEarned(){const t=ds(new Date());if(!(earned&&earned.day===t))return;const f=earned.f;if(!earned.had)owned=owned.filter(x=>x!==f);streak=Math.max(0,streak-1);addCoins(-4);earned=null;pending=f;ensurePending()}
function undoOne(id){if(id==="pre"){if(preDone!==dsn())return;preDone="";addCoins(-1)}else{const i=+id;if(!done[i])return;done[i]=false;addCoins(-1)}if(nDone()<eff())revokeEarned();if(nDone()===0)partner={day:"",f:-1};lastPop=-1;save();lastSig=null;tick();renderFriends()}
function undoAll(){if(!confirm("오늘 완료한 스탬프를 모두 되돌릴까요?\n오늘 받은 코인과 새 친구도 취소돼요."))return;const t=ds(new Date());done=missions.map(()=>false);preDone="";if(earned&&earned.day===t)revokeEarned();partner={day:"",f:-1};if(ct.day===t){coins=Math.max(0,coins-ct.n);ct={day:t,n:0}}lastPop=-1;save();lastSig=null;tick();renderFriends()}
let mpOpen=[];function togMp(i){const k=mpOpen.indexOf(i);if(k<0)mpOpen.push(i);else mpOpen.splice(k,1);render()}
function setMp(i,v){mp[i]=v.trim();save()}
function setMt(i,v){mt[i]=v||"";save();lastSig=null;tick()}
function clearPhoto(){photo="";try{localStorage.removeItem("mobileKongPhoto")}catch(e){}photoInput.value="";render()}
photoInput.addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const S=480,c=document.createElement("canvas");c.width=c.height=S;const m=Math.min(im.width,im.height),sx=(im.width-m)/2,sy=(im.height-m)/2;c.getContext("2d").drawImage(im,sx,sy,m,m,0,0,S,S);photo=c.toDataURL("image/jpeg",.82);try{localStorage.setItem("mobileKongPhoto",photo)}catch(err){alert("사진을 저장하지 못했어요. 더 작은 사진으로 해보세요.")}render()};im.src=r.result};r.readAsDataURL(f)});
function saveGoal(){goal=Math.max(1,Math.min(20,parseInt(goalInput.value)||4));localStorage.setItem("mobileKongGoal",goal);schedulePush();render()}
function saveReward(){reward=rewardInput.value.trim();localStorage.setItem("mobileKongReward",reward);schedulePush();render()}
