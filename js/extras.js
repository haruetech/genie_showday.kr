/* ===== 장보기·준비물 / 칭찬 스티커 / 소원 상자 / 일정 상단 탭 ===== */
let shopWho=[];function shopWhoTog(x){if(!x)shopWho=[];else{const i=shopWho.indexOf(x);if(i<0)shopWho.push(x);else shopWho.splice(i,1)}renderShop()}
const shopVis=x=>okWho({who:x.w});
let shop=[],wish=[],pstk=[],evMode="cal",shopK="s";
try{shop=JSON.parse(localStorage.getItem("mobileKongShop")||"[]");wish=JSON.parse(localStorage.getItem("mobileKongWish")||"[]");pstk=JSON.parse(localStorage.getItem("mobileKongPstk")||"[]")}catch(e){}
[shop,wish,pstk].forEach((a,i)=>{if(!Array.isArray(a)){if(i===0)shop=[];else if(i===1)wish=[];else pstk=[]}});
const svSh=()=>{try{localStorage.setItem("mobileKongShop",JSON.stringify(shop))}catch(e){}schedulePush()},svWi=()=>{try{localStorage.setItem("mobileKongWish",JSON.stringify(wish))}catch(e){}schedulePush()},svPr=()=>{try{localStorage.setItem("mobileKongPstk",JSON.stringify(pstk.slice(-60)))}catch(e){}schedulePush()};
const nid=()=>Date.now()*1000+Math.floor(Math.random()*1000);
function evSetMode(m){evMode=m;renderEv()}
function renderEv(){renderEvCal()}
let chatMode="chat";
function chatSetMode(m){chatMode=m;renderChatSeg();if(m==="chat"){try{renderChat()}catch(e){}}}
function renderShop(){renderChatSeg()}
function renderChatSeg(){const sg=document.getElementById("cSeg");if(!sg)return;const n=shop.filter(x=>!x.ok&&shopVis(x)).length,isS=chatMode==="shop";
 sg.innerHTML=`<button class="${isS?"":"on"}" onclick="chatSetMode('chat')">💬 대화</button><button class="${isS?"on":""}" onclick="chatSetMode('shop')">🛒 장보기·준비물${n?" "+n:""}</button>`;
 const sp=document.getElementById("shopPane");sp.style.display=isS?"":"none";document.getElementById("chatList").style.display=isS?"none":"";document.getElementById("cNote").style.display=isS?"none":"";if(isS){document.getElementById("cBar").style.display="none";sp.innerHTML=shopHtml()}}
function shopHtml(){const row=x=>`<div class="shrow${x.ok?" shdn":""}"><button class="cb2" onclick="shopTog(${x.id})">${x.ok?"✓":""}</button><b>${esc(x.n)}</b>${x.w?`<small>👤 ${esc(whoTxt(x.w))}</small>`:""}${x.by?`<small>${esc(x.by)}</small>`:""}<button class="x" onclick="shopDel(${x.id})">✕</button></div>`,
 g=k=>shop.filter(x=>x.k===k&&shopVis(x)),part=(k,t)=>{const a=g(k);return a.length?`<div class="hsub">${t} ${a.filter(x=>!x.ok).length}개 남음</div>`+a.sort((x,y)=>(x.ok?1:0)-(y.ok?1:0)||x.id-y.id).map(row).join(""):""};
 return `<div class="evcard"><div class="shk"><button class="${shopK==="s"?"on":""}" onclick="shopK='s';renderShop()">🛒 장보기</button><button class="${shopK==="p"?"on":""}" onclick="shopK='p';renderShop()">🎒 준비물</button></div>
 <div class="add" style="align-items:center;margin:4px 0"><span style="flex:none;font-size:12px;font-weight:900">👤 누구만 볼까요</span><div class="whochips">${[`<button class="${shopWho.length?"":"on"}" onclick="shopWhoTog('')">👨‍👩‍👧 모두</button>`].concat(whoList().map(x=>`<button class="${shopWho.includes(x)?"on":""}" onclick="shopWhoTog(${esc(JSON.stringify(x))})">${esc(x)}</button>`)).join("")}</div></div>
 <div class="shadd"><input id="shIn" placeholder="${shopK==="s"?"예: 우유, 계란":"예: 색종이, 실내화"}" onkeydown="if(event.key==='Enter'&&!event.isComposing)shopAdd()"><button onclick="shopAdd()">추가</button></div>
 ${part("s","🛒 장보기")}${part("p","🎒 준비물")}${shop.some(shopVis)?"":'<div class="evempty" style="padding:14px 6px">가족 누구나 추가하고 체크할 수 있어요<br><small>사 올 것, 학교 준비물을 적어 보세요</small></div>'}
 ${shop.some(x=>x.ok&&shopVis(x))?'<div class="evbtns"><button onclick="shopClear()">✔ 체크한 것 지우기</button></div>':""}</div>`}
function shopAdd(){const i=document.getElementById("shIn"),n=(i.value||"").trim().slice(0,30);if(!n)return;shop.push({id:nid(),n,k:shopK,ok:false,by:me||"",w:shopWho.join(",")});svSh();renderShop();setTimeout(()=>{const e=document.getElementById("shIn");if(e)e.focus()},50)}
function shopTog(id){const x=shop.find(v=>v.id===id);if(!x)return;x.ok=!x.ok;svSh();renderShop()}
function shopDel(id){shop=shop.filter(v=>v.id!==id);svSh();renderShop()}
function shopClear(){shop=shop.filter(v=>!(v.ok&&shopVis(v)));svSh();renderShop()}
function closeBox(){const m=document.getElementById("boxModal");if(m)m.remove()}
function boxOpen(h){closeBox();const d=document.createElement("div");d.id="boxModal";d.className="modal show";d.style.zIndex=99990;d.innerHTML='<div class="sheet pbox">'+h+'<button class="ok" style="margin-top:10px" onclick="closeBox()">닫기</button></div>';d.addEventListener("click",e=>{if(e.target===d)closeBox()});document.body.appendChild(d)}
/* 칭찬 스티커 */
const STK=[["⭐","최고야"],["👏","잘했어"],["💪","끝까지 해냈네"],["🌈","멋져"],["🦄","대단해"],["💗","사랑해"]];
function openPraise(){if(!me||!fam){alert("가족방에서 이 폰의 이름을 정하고, 설정에서 가족 코드를 연결하면 보낼 수 있어요");return}const rs=["숙제 스스로 했어","정리 잘했어","동생·가족을 도와줬어","양치 잘했어","끝까지 해냈어","인사 잘했어"];boxOpen('<h2>🌟 칭찬 스티커 보내기</h2><small style="color:#83778b">① 이유를 고르고(안 골라도 돼요) ② 스티커를 누르면 바로 아이에게 가요. 아이는 🪙 코인 2개를 받아요</small><div class="whochips" style="margin:8px 0">'+rs.map(x=>`<button onclick="prNote.value='${x}'">${x}</button>`).join("")+'</div><input id="prNote" maxlength="30" placeholder="한마디 (직접 써도 돼요)" style="width:100%;border:2px solid #eadcf0;border-radius:12px;padding:9px;font-size:15px"><div class="stk">'+STK.map((v,i)=>`<button onclick="sendPraise(${i})"><span>${v[0]}</span>${v[1]}</button>`).join("")+'</div>')}
async function sendPraise(i){const v=STK[i],note=(document.getElementById("prNote").value||"").trim();pstk.push({id:nid(),f:me,s:v[0]+" "+v[1],n:note,d:dsn()});svPr();closeBox();const keep=msgTo;msgTo="아이";try{await sendMsg("🌟 "+v[0]+" "+v[1]+(note?" · "+note:""))}catch(e){}msgTo=keep;try{renderChat()}catch(e){}}
function praiseGotSet(){try{return new Set(JSON.parse(localStorage.getItem("mobileKongPstkGot")||"[]"))}catch(e){return new Set()}}
function claimPraise(){if(me!=="아이")return;const got=praiseGotSet(),nw=pstk.filter(p=>!got.has(p.id));if(!nw.length)return;nw.forEach(p=>got.add(p.id));try{localStorage.setItem("mobileKongPstkGot",JSON.stringify([...got].slice(-200)))}catch(e){}addCoins(nw.length*2);save();render();try{renderFriends()}catch(e){}
 const t=document.getElementById("msgToast"),p=nw[nw.length-1];if(t){t.innerHTML="<small>🌟 "+esc(p.f)+"님의 칭찬 스티커"+(nw.length>1?" 외 "+(nw.length-1)+"개":"")+"</small>"+esc(p.s)+(p.n?" · "+esc(p.n):"")+" · 🪙 +"+nw.length*2;t.style.display="block";clearTimeout(t._h);t._h=setTimeout(()=>{t.style.display="none"},9000)}try{sound(false)}catch(e){}}
/* 소원 상자 */
var wmD=7;
function openWish(){try{wmRender()}catch(e){}const adult=me!=="아이",myP=pstk.length,td=dsn(),
 rows=wish.length?wish.slice().sort((a,b)=>(a.st==="done"?1:0)-(b.st==="done"?1:0)||a.id-b.id).map(w=>{let act,sub;const leg=w.m===undefined&&w.c>0;
  if(w.st==="done"){act=adult?`<span>🎉 이뤄졌어요</span><button onclick="wishUndo(${w.id})">↩ 되돌리기</button>`:'<span>🎉 이뤄졌어요</span>';sub=w.m?"🎯 "+esc(w.m):""}
  else if(w.st==="new"){act=adult?`<button onclick="wishMissionOpen(${w.id})">🎯 미션 정하기</button>`:'<span>⏳ 부모님이 미션을 정해 줄 거야</span>';sub="미션 정하는 중"}
  else if(w.st==="req"){act=adult?`<button onclick="wishDone(${w.id})">✅ 허락했어요</button>`:'<span>🎉 미션 성공! 확인 중</span>';sub="🎯 "+esc(w.m||"")+" · 완료!"}
  else if(leg){act=coins>=w.c?`<button onclick="wishAsk(${w.id})">🪙 ${w.c}로 교환</button>`:`<button class="dis">🪙 ${w.c-coins} 더 필요</button>`;sub="🪙 "+w.c}
  else{const p=w.p||0,t=w.t||1;sub="🎯 "+esc(w.m)+" · "+p+"/"+t+"일";act=(w.l===td?'<button class="dis">✅ 오늘 했어요</button>':`<button onclick="wishTick(${w.id})">✅ 오늘 했어요!</button>`)+(adult?`<button onclick="wishNow(${w.id})">🎁 지금 허락</button>`:"")}
  return `<div class="wrow${w.st==="done"?" done":""}"><b>🎁 ${esc(w.n)}<br><small style="color:#a094aa">${sub}</small></b>${act}${(w.st!=="req"&&w.st!=="done")||(adult&&w.st==="done")?`<button class="x" onclick="wishDel(${w.id})">✕</button>`:""}</div>`}).join(""):'<div class="evempty" style="padding:12px">갖고 싶은 것, 하고 싶은 것을 적어 봐요!<br><small>부모님이 정한 미션을 해내면 소원이 이뤄져요</small></div>';
 const sug=["🎬 영화 보기","🍦 아이스크림 먹기","🛝 놀이터 1시간","📚 책 사기","🍕 맛있는 외식","🎮 게임 30분","🧸 인형 사기","🎨 문구점 가기"];
 boxOpen(`<h2>🎁 소원 상자</h2><div style="font-weight:900;color:#745cff">🌟 받은 칭찬 ${myP}개</div><small style="color:#83778b">소원을 적으면 부모님이 미션을 정해 줘요. 미션을 해내면 소원이 이뤄져요!</small>${rows}
 <div style="font-weight:900;margin-top:10px">✏️ 소원 적기</div><div class="whochips" style="margin:6px 0">${sug.map(x=>`<button onclick="wiN.value='${x}'">${x}</button>`).join("")}</div>
 <div class="shadd"><input id="wiN" maxlength="24" placeholder="소원 (예: 영화 보기)"><button onclick="wishAdd()">추가</button></div>`)}
function wishAdd(){const n=(wiN.value||"").trim();if(!n){alert("소원을 적어 주세요");return}const id=nid();wish.push({id,n,m:"",t:0,p:0,st:"new",by:me||""});svWi();if(me==="아이"){openWish();return}wishMissionOpen(id)}
function wishMissionOpen(id){const w=wish.find(v=>v.id===id);if(!w)return;wmD=7;const ms=["📚 책 읽기","🧹 방 정리하기","🪥 스스로 양치하기","📝 숙제 먼저 하기","🙏 가족 도와주기","😴 일찍 자기","🍚 밥 남기지 않기","🏃 운동하기"];
 boxOpen(`<h2>🎯 "${esc(w.n)}" 미션 정하기</h2><small style="color:#83778b">아이가 이 미션을 며칠 해내면 소원이 이뤄져요</small><div style="font-weight:900;margin-top:8px">미션</div><div class="whochips" style="margin:6px 0">${ms.map(x=>`<button onclick="wiMt.value='${x}'">${x}</button>`).join("")}</div><input id="wiMt" maxlength="24" value="${esc(w.m||"")}" placeholder="직접 써도 돼요" style="width:100%;border:2px solid #eadcf0;border-radius:12px;padding:9px;font-size:15px"><div style="font-weight:900;margin-top:10px">며칠 동안? <span id="wmDv" style="color:#745cff">7일</span></div><div class="whochips" style="margin:6px 0">${[1,3,5,7,10,14,21,30].map(d=>`<button onclick="wmD=${d};wmDv.textContent='${d}일'">${d}일</button>`).join("")}</div><button class="ok" onclick="wishSetM(${id})">✅ 미션 정했어요</button>`)}
function wishSetM(id){const w=wish.find(v=>v.id===id);if(!w)return;const m=(document.getElementById("wiMt").value||"").trim();if(!m){alert("미션을 골라 주세요");return}w.m=m;w.t=wmD;w.p=0;w.l="";w.st="";svWi();openWish()}
async function wishTick(id){const w=wish.find(v=>v.id===id);if(!w||w.st!==""||w.l===dsn())return;w.p=(w.p||0)+1;w.l=dsn();let fin=false;if(w.p>=(w.t||1)){w.st="req";fin=true;confetti(80);try{sound(true)}catch(e){}}svWi();wishRefresh();
 if(fin&&me&&fam){const keep=msgTo;msgTo="all";try{await sendMsg("🎁 소원 미션 성공! "+w.n+" — 「"+w.m+"」 "+w.t+"일 완료! 소원을 허락해 주세요")}catch(e){}msgTo=keep}}
function wishDel(id){if(!confirm("이 소원을 지울까요?"))return;wish=wish.filter(w=>w.id!==id);svWi();openWish()}
async function wishAsk(id){const w=wish.find(v=>v.id===id);if(!w||coins<w.c)return;if(!confirm(`🪙 ${w.c}개로 "${w.n}" 소원을 교환할까요?`))return;addCoins(-w.c);save();render();try{renderFriends()}catch(e){}w.st="req";svWi();openWish();if(me&&fam){const keep=msgTo;msgTo="all";try{await sendMsg("🎁 소원 교환 요청: "+w.n+" (🪙"+w.c+")")}catch(e){}msgTo=keep}}
function wishNow(id){const w=wish.find(v=>v.id===id);if(!w||me==="아이")return;if(!confirm(`"${w.n}" 소원은 아직 ${w.p||0}/${w.t||1}일이에요.\n그래도 지금 허락할까요?`))return;w.st="done";svWi();wishRefresh();try{render()}catch(e){}}
function wishUndo(id){const w=wish.find(v=>v.id===id);if(!w||!confirm("'이뤄졌어요' 표시를 취소하고 다시 '허락했어요' 대기로 돌릴까요?"))return;w.st="req";svWi();openWish()}
function wishDone(id){const w=wish.find(v=>v.id===id);if(!w)return;w.st="done";svWi();openWish()}
setInterval(claimPraise,5000);setTimeout(claimPraise,1500);

/* ===== 일정 수정 ===== */
let calEditing=null,evGoEdit=null;
function updCalBtn(){const b=document.getElementById("calSaveBtn"),c=document.getElementById("calCancelBtn");if(!b)return;b.textContent=calEditing?"💾 수정 저장":"➕ 이 날짜에 추가";b.style.background=calEditing?"#2f9e5b":"#745cff";c.style.display=calEditing?"":"none"}
function calEditStart(src,d,i){const it=src==="c"?(cal[d]||[])[i]:(week.d[d]||[])[i];if(!it)return;
 calEditing={src,d,i};calK=src==="c"?(it.k||"e"):(it.k==="e"?"e":"m");calWhoSel=whoArr(it.who);calRep.checked=src==="w";if(src==="w")calRepSel=[d];else calSel=d;
 calUI();calName.value=it.n||"";calTime.value=it.t||"";calEnd.value=it.te||"";calPlace.value=it.pl||"";calFloor.value=it.fl||"";calAddr.value=it.ad||"";if(calK==="e")calAl.value=String(it.al==null?"":it.al);
 calUI();document.querySelectorAll("#parentModal details").forEach(x=>{x.open=x.querySelector("summary").textContent.includes("달력으로")});setTimeout(()=>{calName.scrollIntoView({block:"center"});calName.focus()},120)}
function calEditCancel(){calEditing=null;calWhoSel=[];calName.value="";calTime.value="";calEnd.value="";calPlace.value="";calFloor.value="";calAddr.value="";calRep.checked=false;calUI()}
function saveCal(){if(!calEditing){addCal();return}
 const n=calName.value.trim(),t=calK==="g"?"":calTime.value;if(!n){alert("이름이나 내용을 넣어 주세요");return}
 if(calK==="e"&&calEnd.value&&(!t||calEnd.value<=t)){alert("끝나는 시간은 시작 시간보다 늦어야 해요");return}
 if(!calRep.checked&&calSel<ds(new Date())){alert("지난 날짜에는 등록할 수 없어요");return}
 const e=calEditing;calEditing=null;if(e.src==="c")calDel(e.d,e.i);else wkDel(e.d,e.i);addCal();updCalBtn();calUI()}
function needPin(fn){if(!pinHash){fn();return}const v=prompt("🔒 부모님 비밀번호 4자리를 입력하세요");if(v===null)return;if(hp(String(v).trim())!==pinHash){alert("비밀번호가 달라요");return}fn()}
function skippedRowsHtml(k){const a=skippedFor(k),ex=(week.ex||{})[k]||[];return a.map(x=>`<div class="evrow skp"><span class="evt">${x.mis?"🎯":(x.t?rngH(x.t,x.te):"종일")}</span><div class="evm"><b>${esc(x.n)}</b><div><span class="evtag rep">😴 이 날은 쉼</span></div></div><button class="evok" onclick="needPin(()=>exBack('${k}',${ex.indexOf(x.ek)}))">↩ 다시 하기</button></div>`).join("")}
function evEditRow(j){const x=(window._evRows||[])[j];if(!x)return;const k=evSel;let src=null,i=(cal[k]||[]).findIndex(c=>c.n===x.n&&(c.t||"")===(x.t||"")&&(x.mis?c.k==="m":c.k!=="m"));
 if(i>=0)src=["c",k,i];else{const wd=new Date(k+"T00:00:00").getDay();i=(week.d[wd]||[]).findIndex(c=>c.n===x.n&&(c.t||"")===(x.t||"")&&(x.mis?c.k!=="e":c.k==="e"));if(i>=0)src=["w",wd,i]}
 if(!src){alert("이 항목은 여기서 수정할 수 없어요");return}
 window._evSrc=src;const w=src[0]==="w";boxOpen(`<h2>${esc(x.n)}</h2><small style="color:#83778b">${w?"🔁 매주 반복 일정이에요":"이 날짜 일정이에요"}</small><div class="evbtns" style="flex-direction:column;margin-top:8px">${w?`<button style="background:#fff3d6;color:#8a5a00" onclick="needPin(()=>exSkip())">😴 ${k===ds(new Date())?"오늘":"이 날"}만 쉬기 (다음 주엔 다시 해요)</button>`:""}<button onclick="evEditGo()">✏️ ${w?"매주 일정 수정하기":"수정하기"}</button><button style="background:#fff0f4;color:#c0506f" onclick="needPin(()=>evDelGo())">🗑 ${w?"매주 일정 아예 삭제":"삭제하기"}</button></div>`)}
function evEditGo(){const g=window._evSrc;closeBox();if(!g)return;evGoEdit=g;evGoCal=evSel;openParent()}
function exSkip(){const g=window._evSrc;closeBox();if(!g||g[0]!=="w")return;const it=(week.d[g[1]]||[])[g[2]];if(!it)return;const k=evSel,a=week.ex[k]=week.ex[k]||[],key=exKey(it);if(!a.includes(key))a.push(key);if(k===ds(new Date()))unmat(it);saveWeek();if(k===ds(new Date()))dailyAuto(true);afterAuto();renderEv();try{pushSync(true)}catch(e){}}
function exBack(k,i){const a=(week.ex||{})[k];if(!a||i<0)return;a.splice(i,1);if(!a.length)delete week.ex[k];saveWeek();if(k===ds(new Date()))dailyAuto(true);afterAuto();renderEv();try{pushSync(true)}catch(e){}}
function evDelGo(){const g=window._evSrc;closeBox();if(!g)return;const w=g[0]==="w";if(!confirm(w?"매주 반복 일정을 아예 삭제할까요?\n(오늘만 쉬려면 '오늘만 쉬기'를 쓰세요)":"이 일정을 삭제할까요?"))return;if(w)wkDel(g[1],g[2]);else calDel(g[1],g[2]);renderEv()}

/* ===== 카톡식: 안 읽은 사람 수(1) · 공감 ===== */
function unreadN(m){if(m.f!==me||typeof m.id!=="number")return 0;const to=m.t==="all"?roster():[m.t];return to.filter(r=>r&&r!==me&&!((reads[r]||0)>=m.id)).length}
async function sendRead(){if(!SBOK||!fam||!me)return;let u=0;msgs.forEach(m=>{if(m.f!==me&&msgVis(m)&&typeof m.id==="number"&&m.id>u)u=m.id});if(u<=lastRd)return;const old=lastRd;lastRd=u;try{localStorage.setItem("mobileKongRdSent",String(u))}catch(e){}
 try{await rpc("kong_msg_send",{p_code:await idOf(fam),p_data:await encObj(fam,{f:me,t:"all",x:"__read",u})})}catch(e){lastRd=old;try{localStorage.setItem("mobileKongRdSent",String(old))}catch(_){}}}
const RXE=["❤️","👍","😂","😢","🙏","🎉"];
function rxOpen(id){if(typeof id!=="number"||!me)return;const m=msgs.find(v=>v.id===id);if(!m||dl[id]===m.f)return;const cur=(rx[id]||{})[me];
 boxOpen('<h2>메시지</h2><div class="stk">'+RXE.map(e=>'<button'+(cur===e?' style="border-color:#745cff;background:#efeaff"':"")+' onclick="rxSend('+id+',\''+e+'\')"><span>'+e+'</span></button>').join("")+'</div><div class="evbtns" style="flex-direction:column"><button onclick="setReply('+id+')">↩ 답장하기</button>'+(m.f===me?'<button style="background:#fff0f4;color:#c0506f" onclick="delMsg('+id+')">🗑 삭제하기</button>':"")+'</div>')}
function setReply(id){const m=msgs.find(v=>v.id===id);closeBox();if(!m)return;replyTo={id:m.id,f:m.f,x:m.x};updReply();const i=document.getElementById("cInput");if(i)i.focus()}
function clearReply(){replyTo=null;updReply()}
function updReply(){const e=document.getElementById("cReply");if(!e)return;if(!replyTo){e.style.display="none";e.innerHTML="";return}e.style.display="flex";e.innerHTML='<span>↩ <b>'+esc(replyTo.f)+'</b> '+esc(String(replyTo.x).slice(0,30))+'</span><button onclick="clearReply()">✕</button>'}
async function delMsg(id){closeBox();if(!confirm("이 메시지를 삭제할까요?\n모두에게 '삭제된 메시지입니다'로 보여요"))return;dl[id]=me;svRd();if(replyTo&&replyTo.id===id)clearReply();renderChat();
 try{await rpc("kong_msg_send",{p_code:await idOf(fam),p_data:await encObj(fam,{f:me,t:"all",x:"__del",r:id})})}catch(e){delete dl[id];svRd();renderChat();alert("삭제하지 못했어요. 인터넷을 확인해 주세요")}}
async function rxSend(id,e){closeBox();const q=rx[id]=rx[id]||{},was=q[me];const ne=was===e?"":e;if(ne)q[me]=ne;else delete q[me];svRd();renderChat();
 try{await rpc("kong_msg_send",{p_code:await idOf(fam),p_data:await encObj(fam,{f:me,t:"all",x:"__rx",r:id,e:ne})})}catch(er){}}

function unskipDate(k){skip.days=skip.days.filter(d=>d!==k);const nr=[];skip.ranges.forEach(r=>{if(k<r[0]||k>r[1]){nr.push(r);return}const prev=new Date(k+"T00:00:00");prev.setDate(prev.getDate()-1);const next=new Date(k+"T00:00:00");next.setDate(next.getDate()+1);if(r[0]<=ds(prev))nr.push([r[0],ds(prev)]);if(ds(next)<=r[1])nr.push([ds(next),r[1]])});skip.ranges=nr;saveWeek();if(k===ds(new Date())&&!isOff(k))dailyAuto(true);afterAuto();try{wkUI()}catch(e){}try{calUI()}catch(e){}renderEv()}
function skDayDel(i){const k=skip.days[i];if(k)unskipDate(k)}
function setAutoOk(){week.autoOk=document.getElementById("wkAutoOk").checked;if(week.autoOk===false){ev.list.forEach(x=>{if(x.auto){x.ok=false;delete x.auto}});evSave()}saveWeek();try{renderEv()}catch(e){}}
