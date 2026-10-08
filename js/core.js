const friendsData=[{"name": "몽글이", "src": "images/buddy01.jpg", "nose": {"x": 0.5, "y": 0.36}}, {"name": "빨강이", "src": "images/buddy02.jpg", "nose": {"x": 0.51, "y": 0.25}}, {"name": "코코", "src": "images/buddy03.jpg", "nose": {"x": 0.52, "y": 0.6}}, {"name": "주황이", "src": "images/buddy04.jpg", "nose": {"x": 0.48, "y": 0.5}}, {"name": "피카", "src": "images/buddy05.jpg", "nose": {"x": 0.44, "y": 0.44}}, {"name": "곰곰이", "src": "images/buddy06.jpg", "nose": {"x": 0.52, "y": 0.39}}, {"name": "토토", "src": "images/buddy07.jpg", "nose": {"x": 0.51, "y": 0.53}}, {"name": "우디", "src": "images/buddy08.jpg", "nose": {"x": 0.47, "y": 0.28}}, {"name": "핑키", "src": "images/buddy09.jpg", "nose": {"x": 0.49, "y": 0.35}}, {"name": "콩이", "src": "images/buddy10.jpg", "nose": {"x": 0.53, "y": 0.48}}, {"name": "방울이", "src": "images/buddy11.jpg", "nose": {"x": 0.53, "y": 0.35}}, {"name": "체리", "src": "images/buddy13.jpg", "nose": {"x": 0.46, "y": 0.36}}, {"name": "노랑이", "src": "images/buddy14.jpg"}, {"name": "수줍이", "src": "images/buddy15.jpg", "nose": {"x": 0.5, "y": 0.55}}, {"name": "웜이", "src": "images/buddy16.jpg", "nose": {"x": 0.5, "y": 0.65}}, {"name": "꽃님이", "src": "images/buddy17.jpg"}, {"name": "딸기", "src": "images/buddy18.jpg", "nose": {"x": 0.39, "y": 0.36}}, {"name": "뽀삐", "src": "images/buddy19.jpg", "nose": {"x": 0.56, "y": 0.44}}, {"name": "솜솜이", "src": "images/buddy20.jpg", "nose": {"x": 0.46, "y": 0.13}}, {"name": "보라", "src": "images/buddy21.jpg", "nose": {"x": 0.43, "y": 0.27}}, {"name": "푸딩", "src": "images/buddy22.jpg", "nose": {"x": 0.55, "y": 0.32}}, {"name": "하늘이", "src": "images/buddy23.jpg", "nose": {"x": 0.47, "y": 0.37}}, {"name": "프리", "src": "images/preortho.jpg", "nose": {"x": 0.54, "y": 0.27}}, {"name": "오늘의 주인공", "src": "images/buddy12.jpg", "special": true}];
let missions=JSON.parse(localStorage.getItem("mobileKongTasks")||"[]");
let mt=[];try{mt=JSON.parse(localStorage.getItem("mobileKongMT")||"[]")}catch(e){}let ct={day:"",n:0};try{ct=JSON.parse(localStorage.getItem("mobileKongCT")||"null")||ct}catch(e){}
let qz={on:true,mul:true,add:true,eng:true,gen:true,tb:[2,3,4],ls:true,lt:true},qs={day:"",r:0,t:0};
try{qz=Object.assign(qz,JSON.parse(localStorage.getItem("mobileKongQuiz")||"{}"));qs=JSON.parse(localStorage.getItem("mobileKongQStat")||"null")||qs}catch(e){}
let partner={day:"",f:-1};try{partner=JSON.parse(localStorage.getItem("mobileKongPartner")||"null")||partner}catch(e){}
let mp=[];try{mp=JSON.parse(localStorage.getItem("mobileKongMP")||"[]")}catch(e){}
mt=missions.map((_,i)=>mt[i]||"");mp=missions.map((_,i)=>mp[i]||"");
let done=JSON.parse(localStorage.getItem("mobileKongDone")||"[]");
let reward=localStorage.getItem("mobileKongReward")||"";
let total=+(localStorage.getItem("mobileKongTotal")||0);
let streak=+(localStorage.getItem("mobileKongStreak")||0);
let lastPop=-1,newFriend=-1;
let coins=0,cr={};try{coins=+(localStorage.getItem("mobileKongCoins")||0);cr=JSON.parse(localStorage.getItem("mobileKongCare")||"{}")}catch(e){}
let photo="";try{photo=localStorage.getItem("mobileKongPhoto")||""}catch(e){}
let owned=[],pending=-1,earned=null,names={},openIdx=-1;
try{owned=JSON.parse(localStorage.getItem("mobileKongOwned")||"[]");pending=+(localStorage.getItem("mobileKongPending")||-1);earned=JSON.parse(localStorage.getItem("mobileKongEarned")||"null");names=JSON.parse(localStorage.getItem("mobileKongNames")||"{}")}catch(e){}
const nm=i=>names[i]||friendsData[i].name;
const cheers=["고마워! 우리 친구 하자! 💗","오늘도 같이 힘내자!","너 정말 멋져!","내일 또 만나자!","최고야, 최고!"];
function ensurePending(){if(pending>=0&&pending<friendsData.length&&!owned.includes(pending))return;const all=friendsData.map((_,i)=>i);let pool=all.filter(i=>!owned.includes(i)&&!friendsData[i].special);if(!pool.length)pool=all.filter(i=>!owned.includes(i));if(!pool.length)pool=all;pending=pool[Math.floor(Math.random()*pool.length)]}
const TR={0:{a:"wiggle",e:"eyes,mouth",ey:[.4,.3,.58,.31],m:[.5,.45]},1:{a:"jump",e:"nose,mouth",ey:[.44,.2,.58,.2],m:[.5,.33]},2:{a:"wiggle",e:"eyes,heart",ey:[.4,.33,.6,.33],m:[.5,.45]},3:{a:"jump",e:"eyes,breath",ey:[.31,.28,.69,.28],m:[.5,.56]},4:{a:"jump",e:"zap,mouth",ey:[.35,.44,.54,.44],m:[.45,.52]},5:{a:"nod",e:"nose,heart",ey:[.43,.38,.58,.38],m:[.52,.46]},6:{a:"nod",e:"eyes,nose",ey:[.42,.42,.6,.42],m:[.51,.6]},7:{a:"wiggle",e:"eyes,mouth",ey:[.43,.27,.54,.27],m:[.48,.35]},8:{a:"jump",e:"nose,mouth",ey:[.4,.33,.57,.33],m:[.5,.44]},9:{a:"jump",e:"nose,mouth",ey:[.47,.38,.62,.37],m:[.52,.54]},10:{a:"spin",e:"nose,eyes",ey:[.44,.3,.63,.3],m:[.53,.45]},11:{a:"jump",e:"nose,eyes",ey:[.43,.27,.62,.27],m:[.53,.44]},12:{a:"wiggle",e:"eyes,heart",ey:[.4,.28,.63,.28],m:[.5,.4]},13:{a:"wiggle",e:"heart,nose",ey:[.4,.5,.6,.5],m:[.5,.62]},14:{a:"nod",e:"nose,eyes",ey:[.4,.58,.6,.58],m:[.5,.72]},15:{a:"spin",e:"eyes,heart,mouth",ey:[.43,.43,.57,.43],m:[.5,.51]},16:{a:"wiggle",e:"nose,eyes",ey:[.4,.3,.52,.3],m:[.42,.42]},17:{a:"jump",e:"nose,mouth",ey:[.46,.37,.66,.37],m:[.56,.52]},18:{a:"nod",e:"eyes,nose",ey:[.38,.12,.55,.12],m:[.46,.22]},19:{a:"wiggle",e:"nose,heart",ey:[.35,.2,.55,.2],m:[.45,.34]},20:{a:"jump",e:"nose,eyes,mouth",ey:[.47,.27,.66,.27],m:[.55,.4]},21:{a:"nod",e:"nose,heart",ey:[.38,.3,.56,.3],m:[.47,.44]},22:{a:"jump",e:"nose,mouth,eyes",ey:[.43,.22,.67,.22],m:[.55,.36]},23:{a:"wiggle",e:"heart",ey:[.4,.4,.6,.4],m:[.5,.7]}};
function puff(el,x,y,list,n,sp,fs){for(let k=0;k<n;k++){const p=document.createElement("span");p.className="flame";p.textContent=list[k%list.length];p.style.left=x*100+"%";p.style.top=y*100+"%";const a=Math.random()*Math.PI*2,r=(sp||30)*(.5+Math.random());p.style.setProperty("--dx",Math.cos(a)*r+"px");p.style.setProperty("--dy",(Math.sin(a)*r-18)+"px");p.style.animationDelay=k*70+"ms";p.style.fontSize=(((fs||16)+Math.random()*10)*(el.id==="heroWrap"?1.6:1))+"px";el.appendChild(p);setTimeout(()=>p.remove(),2000)}}
function react(el,i,snack,kind){if(!el||i<0||!friendsData[i])return;const t=TR[i]||{a:"jump",e:"heart",ey:[.4,.4,.6,.4],m:[.5,.6]},nz=friendsData[i].nose;
 ["jump","wiggle","spin","nod","dance"].forEach(c=>el.classList.remove("rx-"+c));void el.offsetWidth;const A=kind==="dance"?"dance":t.a;el.classList.add("rx-"+A);setTimeout(()=>el.classList.remove("rx-"+A),1200);
 (kind?[kind]:t.e.split(",")).forEach((k,j)=>setTimeout(()=>{
  if(k==="eyes"){puff(el,t.ey[0],t.ey[1],["✨","⭐","✨"],3,22);puff(el,t.ey[2],t.ey[3],["✨","⭐","✨"],3,22)}
  else if(k==="zap"){puff(el,t.ey[0]-.08,t.ey[1]+.1,["⚡","✨"],3,26);puff(el,t.ey[2]+.1,t.ey[3]+.1,["⚡","✨"],3,26)}
  else if(k==="nose"&&nz)fire(el,i);
  else if(k==="dance")puff(el,.5,.2,["🎵","🎶","💃","🎵"],6,58,20);
  else if(k==="rainbow")puff(el,.5,.25,["🌈","✨","⭐"],6,62,24);
  else if(k==="heart")puff(el,.5,.25,["💗","💕","💖"],5,52,18);
  else if(k==="breath")puff(el,t.m[0],t.m[1],["🔥","🔥","✨"],6,46,18);
  else if(k==="mouth"){const m=document.createElement("span");m.className="mouth";m.style.left=t.m[0]*100+"%";m.style.top=t.m[1]*100+"%";el.appendChild(m);setTimeout(()=>m.remove(),1100);puff(el,t.m[0],t.m[1]-.1,[snack||"냠냠"],snack?3:2,34,15)}
 },j*320));if(navigator.vibrate)navigator.vibrate(25)}
const ORDER=["eyes","nose","heart","mouth","dance","breath","zap","rainbow"];
const ACTL={eyes:"👀 눈이 반짝반짝!",nose:"🔥 코에서 불이 뿅!",mouth:"😋 냠냠 입을 벌려요!",heart:"💗 하트가 퐁퐁!",dance:"🎵 신나게 춤을 춰요!",breath:"🐉 후~ 불을 뿜어요!",zap:"⚡ 찌릿찌릿 번개!",rainbow:"🌈 무지개가 떴어요!"};
function actFor(i,k){const t=TR[i]||{e:"heart"},nz=friendsData[i]&&friendsData[i].nose;const l=[...new Set([...t.e.split(","),...ORDER])].filter(x=>x!=="nose"||nz);return l[((k%l.length)+l.length)%l.length]}
let tapK=0;
const revealPop=p=>{p=Math.sqrt(Math.max(0,Math.min(1,p)));return `brightness(${(.55+.45*p).toFixed(2)}) grayscale(${(1-p).toFixed(2)})`};
let popF=-1,popK=0;
function replay(){if(popF<0)return;popK++;const kd=actFor(popF,popK);act.textContent=ACTL[kd];react(heroWrap,popF,null,kd)}
const mys=p=>{p=Math.max(0,Math.min(1,p));return `brightness(${(.25+.6*p).toFixed(2)}) grayscale(${(1-.5*p).toFixed(2)}) blur(${(9-6*p).toFixed(1)}px)`};
const reveal=p=>{p=Math.sqrt(Math.max(0,Math.min(1,p)));return `brightness(${(.2+.8*p).toFixed(2)}) grayscale(${(1-p).toFixed(2)}) blur(${(2.5*(1-p)).toFixed(1)}px)`};
function addCoins(n){const t=ds(new Date());if(n>0&&typeof spd!=="undefined"&&spd&&spd.day===t&&spd.ok&&!addCoins.raw)n=n*2;coins=Math.max(0,coins+n);if(ct.day!==t)ct={day:t,n:0};ct.n+=n}
const PRAISE_KEY=[[/양치|이빨|치아/,["반짝반짝 하얀 이! 양치 최고야!","치카치카 잘했네! 튼튼한 이가 될 거야!"]],[/숙제|공부|학습|문제|수학|영어|한글/,["집중력 대단해! 쑥쑥 똑똑해지는 중!","끝까지 해냈구나! 정말 멋진 학생이야!"]],[/책|독서|읽/,["책 읽는 모습이 정말 멋져!","오늘도 마음이 쑥쑥 자랐어!"]],[/정리|청소|치우|방/,["깔끔 대장 등장! 정리 최고야!","척척 정리했네! 너무 대단해!"]],[/운동|줄넘기|태권|달리기|걷|체조|수영/,["튼튼 쑥쑥! 몸이 힘세졌어!","땀 뻘뻘 열심히 했구나! 최고야!"]],[/샤워|씻|목욕|세수|손/,["뽀득뽀득 깨끗해졌네!","씻고 나니 향기가 솔솔~ 잘했어!"]],[/피아노|악기|연습|그림|색칠|만들/,["연습한 만큼 멋져져! 짝짝짝!","꾸준히 하는 네가 너무 자랑스러워!"]],[/일기|글|쓰기/,["오늘 하루를 멋지게 기록했네!","생각을 쓰는 모습이 정말 멋져!"]],[/물|물마|물 마/,["꿀꺽꿀꺽! 건강한 습관이야!"]],[/밥|식사|먹|야채|채소/,["냠냠 잘 먹었네! 쑥쑥 크겠다!","골고루 먹는 모습 최고야!"]],[/잠|자기|이불|일찍/,["푹 자면 키가 쑥쑥! 잘했어!"]],[/프리올쏘|프리/,["프리올쏘 하느라 수고했어! 정말 멋져!","꾸준히 하는 모습이 너무 대견해!"]]];
const PRAISE_GEN=["해냈구나! 정말 멋져!","약속을 지켰네! 너무 대견해!","역시 우리 딸! 최고야!","끝까지 해내는 모습이 반짝반짝 빛나!","오늘도 한 걸음 쑥! 자랑스러워!"];
function praiseFor(i){const name=i==="pre"?"프리올쏘 하기":(missions[+i]||"");if(i!=="pre"&&mp[+i])return mp[+i];const hit=PRAISE_KEY.find(k=>k[0].test(name));const pool=hit?hit[1]:PRAISE_GEN;const t=pool[Math.floor(Math.random()*pool.length)];return hit?t:"'"+name+"' "+t}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const HATS=["","🎀","🎩","👑","🕶️","🌸","⭐","🎧"],SNACKS=["🍪","🍓","🥕","🍎","🍰","🍩"];
const lvOf=i=>Math.min(5,1+Math.floor(((cr[i]||{}).xp||0)/5));
function fdUpdate(){const i=openIdx,c=cr[i]||{xp:0,hat:0},L=lvOf(i);fdHat.textContent=HATS[c.hat||0];fdLv.textContent="Lv."+L+" "+"❤️".repeat(L)+"🤍".repeat(5-L)+(L<5?"  ("+(5-(c.xp%5))+"번 더 놀면 레벨업)":"  최고 레벨!");fdCoin.textContent="🪙 "+coins;coinBadge.textContent="🪙 "+coins}
function doCare(kind){const i=openIdx;if(i<0)return;const cost=kind==="snack"?3:kind==="play"?1:2;if(coins<cost){fdMsg.textContent="🪙이 모자라요! 미션을 하면 생겨요";return}
 const c=cr[i]=cr[i]||{xp:0,hat:0},before=lvOf(i);coins-=cost;
 if(kind==="snack"){c.xp+=2;react(fdWrap,i,SNACKS[Math.floor(Math.random()*SNACKS.length)]);fdMsg.textContent=nm(i)+": 냠냠 맛있어! 💗"}
 else if(kind==="play"){c.xp+=1;react(fdWrap,i);setTimeout(()=>react(fdWrap,i),1000);fdMsg.textContent=nm(i)+": 와~ 신난다! 🎾"}
 else{c.hat=((c.hat||0)+1)%HATS.length;c.xp+=1;puff(fdWrap,.5,.1,["✨","💖"],5,40);fdMsg.textContent=c.hat?nm(i)+": 예쁘지? 💗":nm(i)+": 편해졌어!"}
 if(lvOf(i)>before){fdMsg.textContent="🎉 레벨 업! Lv."+lvOf(i)+"!";confetti(50);sound(true)}
 save();fdUpdate();renderFriends();render()}
function fire(el,idx){if(idx<0||!el)return;const nz=friendsData[idx].nose;if(!nz)return;const em=["🔥","🔥","✨","🔥"];for(let k=0;k<12;k++){const p=document.createElement("span");p.className="flame";p.textContent=em[k%em.length];p.style.left=nz.x*100+"%";p.style.top=nz.y*100+"%";const a=Math.random()*Math.PI*2,r=26+Math.random()*44;p.style.setProperty("--dx",Math.cos(a)*r+"px");p.style.setProperty("--dy",(Math.sin(a)*r-14)+"px");p.style.animationDelay=k*55+"ms";p.style.fontSize=(16+Math.random()*14)+"px";el.appendChild(p);setTimeout(()=>p.remove(),1900)}if(navigator.vibrate)navigator.vibrate(30)}
const rngH=(t,e)=>{const a=fmt(t);if(!(e&&e>t))return esc(a);let z=fmt(e);if(z.slice(0,2)===a.slice(0,2))z=z.slice(3);return esc(a)+"<br><small>~ "+esc(z)+"</small>"};
const rng=(t,e)=>{const a=fmt(t);if(!(e&&e>t))return a;let z=fmt(e);if(z.slice(0,2)===a.slice(0,2))z=z.slice(3);return a+" ~ "+z};
const fmt=t=>{const[h,m]=t.split(":").map(Number);return(h<12?"오전 ":"오후 ")+(h%12||12)+(m?":"+String(m).padStart(2,"0"):"시")};
const toMin=t=>{const[h,m]=t.split(":").map(Number);return h*60+m};
const nowMin=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()};
const m_=i=>missions[i];const app_=()=>document.querySelector(".app");
function items(){const a=missions.map((m,i)=>({id:i,name:m,time:mt[i]||"",done:!!done[i]}));if(pre.on)a.push({id:"pre",pre:true,name:"프리올쏘 하기",time:pre.time,done:preDone===dsn()});a.forEach(x=>{x.locked=!!x.time&&!x.done&&nowMin()<toMin(x.time)});return a}
function taskRow(x){const pop=lastPop!==-1&&(x.pre?lastPop===missions.length:lastPop===x.id);return `<div class="task${x.pre?" pre":""}${x.done?" done":""}${x.locked?" lock":""}${(!x.done&&!x.locked&&x.time)?" ring":""}${pop?" pop":""}"><span class="ico">${x.pre?'<img src="images/preortho.jpg" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover;display:block">':(x.done?"⭐":x.locked?"🔒":"🌟")}</span><b>${x.name}${x.time?` <small>${fmt(x.time)}</small>`:""}</b><button class="stamp" ${(x.done||x.locked)?"disabled":""} onclick="stampIt(${x.pre?"'pre'":x.id})">${x.done?"완료 ✓":x.locked?"🔒 "+fmt(x.time):"스탬프 콩!"}</button></div>`}
function savePre(){pre.on=preOn.checked;pre.time=preTime.value||"20:00";save();lastSig=null;tick()}
function remind(l){const p=l.find(x=>x.pre),only=p&&l.length===1;remEmo.textContent="⏰";remWrap.style.display=p?"":"none";remEmo.style.display=p?"none":"";remTitle.textContent=only?"🔔 프리올쏘 시간이에요!":"🔔 미션 시간이에요!";remText.innerHTML=l.map(x=>`<b>${x.name}</b> (${fmt(x.time)})`).join("<br>")+"<br>하고 스탬프 받자!";remindModal.classList.add("show");sound(false);if(navigator.vibrate)navigator.vibrate([80,60,80,60,160]);try{if(window.Notification&&Notification.permission==="granted")new Notification(only?"프리올쏘 하기 🐶":"미션 시간이에요 ⏰",{body:l.map(x=>x.name).join(", ")+" — 콩콩 미션을 열어볼까요?",icon:"images/preortho.jpg"})}catch(e){}}
function closeRemind(){remindModal.classList.remove("show")}
let lastSig=null;const bootDay=new Date().toLocaleDateString("sv");
function tick(){if(new Date().toLocaleDateString("sv")!==bootDay){location.reload();return}const a=items(),sig=a.map(x=>x.locked?1:0).join("");if(sig===lastSig)return;lastSig=sig;render();let r=null;try{r=JSON.parse(localStorage.getItem("mobileKongRem2")||"null")}catch(e){}if(!r||r.day!==dsn())r={day:dsn(),ids:[]};const fresh=a.filter(x=>x.time&&!x.locked&&!x.done&&!r.ids.includes(String(x.id)));if(fresh.length){fresh.forEach(x=>r.ids.push(String(x.id)));try{localStorage.setItem("mobileKongRem2",JSON.stringify(r))}catch(e){}remind(fresh)}}
const VAPID_PUB="BAtXNmKCCxZ5727Z7EzMjZPBzwa7mEU0ljM3f4DGHBjFW-wkQNe7fdrzs2QeeAqQZn92sukCdw7c30DZCfdK31g";
const urlB64=t=>{t=t.replace(/-/g,"+").replace(/_/g,"/");return Uint8Array.from(atob(t+"=".repeat((4-t.length%4)%4)),c=>c.charCodeAt(0))};
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent),isStandalone=()=>(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
const pushOK=()=>"serviceWorker" in navigator&&"PushManager" in window&&"Notification" in window;
let pushState="";
function idbSet(k,v){return new Promise((res,rej)=>{const q=indexedDB.open("kongkong-sw",1);q.onupgradeneeded=()=>q.result.createObjectStore("kv");q.onsuccess=()=>{const t=q.result.transaction("kv","readwrite");t.objectStore("kv").put(v,k);t.oncomplete=()=>res();t.onerror=()=>rej()};q.onerror=()=>rej()})}
async function ensurePush(ask){
 if(!SBOK||!fam)return "fam";if(!pushOK())return "unsupported";if(isIOS&&!isStandalone())return "ios";
 if(Notification.permission==="denied")return "denied";
 if(Notification.permission!=="granted"){if(!ask)return "off";const p=await Notification.requestPermission();if(p!=="granted")return "denied"}
 const reg=await navigator.serviceWorker.register("/sw.js");await navigator.serviceWorker.ready;
 let sub=await reg.pushManager.getSubscription();
 if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlB64(VAPID_PUB)});
 await idbSet("fam",fam);await rpc("kong_push_sub",{p_code:await idOf(fam),p_sub:sub.toJSON(),p_who:me||""});
 pushState="on";return "on"}
const PUSHMSG={fam:"먼저 설정에서 가족 코드를 연결해 주세요.",unsupported:"이 브라우저는 꺼져 있을 때 알림을 지원하지 않아요. 달력 알림(📅 매일 알림 일정 받기)을 이용해 주세요.",ios:"아이폰은 공유 버튼 → '홈 화면에 추가'로 설치한 앱에서 이 버튼을 눌러야 해요.",denied:"알림이 차단돼 있어요. 폰 설정에서 이 앱(또는 브라우저)의 알림을 허용해 주세요.",off:"알림이 아직 꺼져 있어요.",on:"✅ 알림이 켜졌어요! 앱을 닫아도 일정·메시지 알림이 울려요."};
async function requestNotif(){try{const r=await ensurePush(true);pushState=r;updPushStat();alert(PUSHMSG[r]||"알림을 켤 수 없어요");if(r==="on")pushSync(true)}catch(e){alert("알림을 켤 수 없어요. 잠시 뒤 다시 눌러 주세요.")}}
async function pushTest(){try{const r=await ensurePush(true);pushState=r;updPushStat();if(r!=="on"){alert(PUSHMSG[r]||"알림을 켤 수 없어요");return}
 const reg=await navigator.serviceWorker.ready,sub=await reg.pushManager.getSubscription();
 const info="권한:"+Notification.permission+" / 구독:"+(sub?"있음":"없음")+" / 이름:"+(me||"(미설정)");
 await rpc("kong_push_send",{p_code:await idOf(fam),p_from:"",p_to:me||"",p_blob:await encObj(fam,{t:"🔔 알림 시험",b:"이 알림이 보이면 성공이에요!",g:"m",tag:"test"})});
 const f=await fetch(SB_URL+"/functions/v1/kong-push",{method:"POST",headers:{apikey:SB_KEY,"Content-Type":"application/json"},body:"{}"});const j=await f.json().catch(()=>({}));
 alert("시험 알림을 보냈어요. 앱을 닫고 몇 초 기다려 보세요.\n\n"+info+"\n서버 응답: "+f.status+" "+JSON.stringify(j))}catch(e){alert("시험 실패: "+(e&&e.message||e))}}
function updPushStat(){const e=document.getElementById("pushStat");if(e)e.textContent=pushState==="on"?"✅ 이 폰은 앱이 꺼져도 알림이 와요":(pushState==="ios"?"📱 홈 화면에 설치한 앱에서 켜 주세요":(pushState==="denied"?"🚫 알림이 차단됨(폰 설정에서 허용)":"🔕 아직 꺼짐 — 위 🔔 버튼을 눌러 주세요"))}
let pushSig="";
function pushPlan(){const out=[],now=Date.now(),mk=(k,at,to,t,b,g,tag)=>({k,at,to,t,b,g,tag});
 for(let n=0;n<=7;n++){const d=new Date();d.setDate(d.getDate()+n);const k=ds(d),at0=new Date(k+"T00:00:00").getTime();
  dayEventsAll(k).forEach(x=>{if(!x.t||x.ok||x.al===""||x.al==null)return;const[h,m]=x.t.split(":"),tm=+h*60+ +m;let at,t,b;
   const where=((x.pl||"")+" "+(x.fl||"")).trim();
   if(x.al==="day"){at=at0-86400000+20*3600000;t=(x.msg?"💌 ":"📅 ")+"내일 일정이 있어요";b=x.n+" ("+rng(x.t,x.te)+")"+(where?"\n📍 "+where:"")}
   else if(/^\d+$/.test(String(x.al))){at=at0+(tm-(+x.al))*60000;t="🔔 "+(x.al==="0"?"지금 일정이에요":"곧 일정이에요 ("+ALN[x.al]+")");b=x.n+" ("+rng(x.t,x.te)+")"+(where?"\n📍 "+where:"")}
   else return;
   {const ws=whoArr(x.who);(ws.length?ws:[""]).forEach(w=>{if(at>now-60000)out.push(mk("e:"+k+":"+x.n+":"+x.t+":"+x.al+":"+w,at,w,t,b,"e","e-"+x.n+w))})}});
  const ms={},add=(tm,nm)=>{(ms[tm]=ms[tm]||[]).push(nm)};if(n===0){items().forEach(x=>{if(x.time&&!x.done)add(x.time,x.name)})}else{const ak=auto.keys||[];items().forEach(x=>{if(x.time&&(x.pre||!ak.includes(x.name)))add(x.time,x.name)});dayEventsAll(k).forEach(x=>{if(x.mis&&x.t){const[h,m]=x.t.split(":"),o=Math.max(0,+h*60+ +m-(+week.off||0));add(p2(Math.floor(o/60))+":"+p2(o%60),x.n)}})}
  Object.keys(ms).forEach(tm=>{const[h,m]=tm.split(":"),at=at0+(+h*60+ +m)*60000;if(at>now-60000)out.push(mk("m:"+k+":"+tm,at,"아이","🔔 미션 시간이에요!",ms[tm].join(", "),"m","m-"+tm))})}
 return out}
let pushBusy=false;
let pushFail=0;async function pushSync(force){if(!SBOK||!fam||pushBusy||(!force&&Date.now()<pushFail))return;pushBusy=true;try{const plan=pushPlan(),sig=JSON.stringify(plan);if(!force&&sig===pushSig){pushBusy=false;return}
 const items=[];for(const p of plan)items.push({k:p.k,at:p.at,to:p.to,b:await encObj(fam,{t:p.t,b:p.b,g:p.g,tag:p.tag})});
 await rpc("kong_push_replace",{p_code:await idOf(fam),p_items:items});pushSig=sig}catch(e){pushFail=Date.now()+300000}pushBusy=false}
async function pushChat(x,to){try{const fid=await idOf(fam),all=to==="all";await rpc("kong_push_send",{p_code:fid,p_from:me,p_to:all?"":to,p_blob:await encObj(fam,{t:"💬 "+me+(all?"":" → 나에게"),b:x,g:"c",tag:"chat"})});
 fetch(SB_URL+"/functions/v1/kong-push",{method:"POST",headers:{apikey:SB_KEY,"Content-Type":"application/json"},body:"{}"}).catch(()=>{})}catch(e){}}
function downloadIcs(){const pad=n=>String(n).padStart(2,"0"),d=new Date(),[h,m]=pre.time.split(":"),url=location.href.split("#")[0];
 const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//kongkong//KR","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:kongkong-preortho@"+(location.host||"local"),"DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z","DTSTART:"+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+h+m+"00","DURATION:PT15M","RRULE:FREQ=DAILY","SUMMARY:🐶 프리올쏘 하기","DESCRIPTION:콩콩 미션을 열고 스탬프를 받아요! "+url,"URL:"+url,"BEGIN:VALARM","TRIGGER:PT0S","ACTION:DISPLAY","DESCRIPTION:프리올쏘 하기","END:VALARM","END:VEVENT","END:VCALENDAR"];
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar;charset=utf-8"}));a.download="preortho-alarm.ics";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function renderFriends(){bookTitle.textContent="📖 친구 도감 "+owned.length+"/"+friendsData.length;fhint.textContent="🪙 "+coins+" · 눌러서 놀아줘요";friendGrid.innerHTML=friendsData.map((f,i)=>owned.includes(i)?`<div class="bk${f.special?" sp":""}" onclick="openFriend(${i})"${(cr[i]||{}).bg?` style="background:${BGS[cr[i].bg]};border-radius:18px"`:""}><img src="${f.src}" alt=""><b class="lv">Lv${lvOf(i)}</b><span class="hat" style="${hatPos(i,1)}">${HATS[(cr[i]||{}).hat||0]}</span><span>${nm(i)}</span></div>`:`<div class="bk lk" onclick="peek(${i})"><img src="${f.src}" alt=""><span>${f.special?"???":"아직 못 만났어"}</span></div>`).join("");try{funBarRender()}catch(e){}}
function peek(i){fhint.textContent="🔒 미션을 완료하면 만날 수 있어요!"}
function goTab(t){const app=document.querySelector(".app");app.dataset.tab=t;tabM.classList.toggle("on",t==="m");tabF.classList.toggle("on",t==="f");tabE.classList.toggle("on",t==="e");tabC.classList.toggle("on",t==="c");if(t==="f")renderFriends();if(t==="e")evToday();if(t==="c")openChat()}
function openFriend(i){openIdx=i;fdImg.src=friendsData[i].src;fdName.textContent=nm(i);renameInput.value=names[i]||"";fdMsg.textContent=greetFriend(i);fdUpdate();friendModal.classList.add("show");setTimeout(()=>react(fdWrap,i),350)}
function closeFriend(){friendModal.classList.remove("show");render()}
function saveName(){const v=renameInput.value.trim().slice(0,8);if(v)names[openIdx]=v;else delete names[openIdx];save();fdName.textContent=nm(openIdx);render();renderFriends()}
let goal=+(localStorage.getItem("mobileKongGoal")||4);
let pre={on:true,time:"20:00"},preDone="";
try{const p=JSON.parse(localStorage.getItem("mobileKongPre")||"null");if(p)pre=p;preDone=localStorage.getItem("mobileKongPreDone")||""}catch(e){}
const dsn=()=>new Date().toLocaleDateString("sv");
const nDone=()=>done.filter(Boolean).length+(pre.on&&preDone===dsn()?1:0);
const tCount=()=>missions.length+(pre.on?1:0);
const eff=()=>Math.max(1,tCount());
const ds=d=>d.toLocaleDateString("sv");
(function(){const today=ds(new Date()),last=localStorage.getItem("mobileKongDay");
 if(last&&last!==today){const y=new Date();y.setDate(y.getDate()-1);
  const wasAll=(done.filter(Boolean).length+(pre.on&&preDone===last?1:0))>=eff();
  if(!(wasAll&&last===ds(y)))streak=0;
  done=missions.map(()=>false);}
 localStorage.setItem("mobileKongDay",today);localStorage.setItem("mobileKongStreak",streak);
 localStorage.setItem("mobileKongDone",JSON.stringify(done));})();
let week={off:10,d:[[],[],[],[],[],[],[]]},skip={days:[],ranges:[]},auto={day:"",keys:[]};
try{const w=JSON.parse(localStorage.getItem("mobileKongWeek")||"null");if(w&&Array.isArray(w.d)){week=w;while(week.d.length<7)week.d.push([])}}catch(e){}
week.ex=week.ex&&typeof week.ex==="object"?week.ex:{};{const t0=ds(new Date());Object.keys(week.ex).forEach(k=>{if(k<t0)delete week.ex[k]})}
try{const k=JSON.parse(localStorage.getItem("mobileKongSkip")||"null");if(k)skip=Object.assign(skip,k)}catch(e){}
try{const a=JSON.parse(localStorage.getItem("mobileKongAuto")||"null");if(a&&a.keys)auto=a}catch(e){}
let cal={};try{const c=JSON.parse(localStorage.getItem("mobileKongCal")||"null");if(c&&typeof c==="object")cal=c;const t0=ds(new Date());Object.keys(cal).forEach(k=>{if(k<t0)delete cal[k]})}catch(e){}
let ev={day:"",list:[]};try{const e=JSON.parse(localStorage.getItem("mobileKongEv")||"null");if(e&&e.list)ev=e}catch(e){}
const inSkip=d=>skip.days.includes(d)||skip.ranges.some(r=>d>=r[0]&&d<=r[1]);
const HOL={"2026-01-01":"신정","2026-02-16":"설날 연휴","2026-02-17":"설날","2026-02-18":"설날 연휴","2026-03-01":"삼일절","2026-03-02":"대체공휴일","2026-05-01":"노동절","2026-05-05":"어린이날","2026-05-24":"부처님오신날","2026-05-25":"대체공휴일","2026-06-03":"지방선거일","2026-06-06":"현충일","2026-07-17":"제헌절","2026-08-15":"광복절","2026-08-17":"대체공휴일","2026-09-24":"추석 연휴","2026-09-25":"추석","2026-09-26":"추석 연휴","2026-10-03":"개천절","2026-10-05":"대체공휴일","2026-10-09":"한글날","2026-12-25":"성탄절","2027-01-01":"신정","2027-02-06":"설날 연휴","2027-02-07":"설날","2027-02-08":"설날 연휴","2027-02-09":"대체공휴일","2027-03-01":"삼일절","2027-05-01":"노동절","2027-05-03":"대체공휴일","2027-05-05":"어린이날","2027-05-13":"부처님오신날","2027-06-06":"현충일","2027-07-17":"제헌절","2027-07-19":"대체공휴일","2027-08-15":"광복절","2027-08-16":"대체공휴일","2027-09-14":"추석 연휴","2027-09-15":"추석","2027-09-16":"추석 연휴","2027-10-03":"개천절","2027-10-04":"대체공휴일","2027-10-09":"한글날","2027-10-11":"대체공휴일","2027-12-25":"성탄절","2027-12-27":"대체공휴일"};
const isOff=d=>inSkip(d)||(week.hol!==false&&!!HOL[d]);

function dailyAuto(force){const today=ds(new Date()),first=auto.day!==today;if(!first&&!force)return 0;
 if(first){const old=auto.keys||[];for(let i=missions.length-1;i>=0;i--){if(old.includes(missions[i])){missions.splice(i,1);done.splice(i,1);mt.splice(i,1);mp.splice(i,1)}}auto={day:today,keys:[]};ev={day:today,list:[]}}
 if(ev.day!==today)ev={day:today,list:[]};
 let n=0;if(!isOff(today)){const nm=new Date().getHours()*60+new Date().getMinutes();let r={day:today,ids:[]};try{const q=JSON.parse(localStorage.getItem("mobileKongRem2")||"null");if(q&&q.day===today)r=q}catch(e){}
  (week.d[new Date().getDay()]||[]).slice().sort((a,b)=>(a.t||"")<(b.t||"")?-1:1).forEach(it=>{if(!it.n||isExc(today,it))return;if(it.k==="e"){if(!ev.list.some(x=>x.n===it.n&&x.t===(it.t||""))){ev.list.push({n:it.n,t:it.t||"",pl:it.pl||"",fl:it.fl||"",ad:it.ad||"",al:it.al||"",who:it.who||"",te:it.te||"",ok:false});ev.list.sort((a,b)=>a.t<b.t?-1:1);n++}return}if(missions.includes(it.n))return;let t="";if(it.t){const[h,m]=it.t.split(":"),op=Math.max(0,+h*60+ +m-(+week.off||0));t=String(Math.floor(op/60)).padStart(2,"0")+":"+String(op%60).padStart(2,"0")}
   missions.push(it.n);done.push(false);mt.push(t);mp.push("");auto.keys.push(it.n);n++;if(t){const[h,m]=t.split(":");if(+h*60+ +m<=nm)r.ids.push(String(missions.length-1))}});
  try{localStorage.setItem("mobileKongRem2",JSON.stringify(r))}catch(e){}}
 {const its=cal[today]||[];if(its.length){const nm=new Date().getHours()*60+new Date().getMinutes();let r2={day:today,ids:[]};try{const q=JSON.parse(localStorage.getItem("mobileKongRem2")||"null");if(q&&q.day===today)r2=q}catch(e){}
  its.forEach(it=>{if(!it.n)return;if(it.k==="m"){if(missions.includes(it.n))return;let t="";if(it.t){const[h,m]=it.t.split(":"),op=Math.max(0,+h*60+ +m-(+week.off||0));t=String(Math.floor(op/60)).padStart(2,"0")+":"+String(op%60).padStart(2,"0")}
    missions.push(it.n);done.push(false);mt.push(t);mp.push("");auto.keys.push(it.n);n++;if(t){const[h,m]=t.split(":");if(+h*60+ +m<=nm)r2.ids.push(String(missions.length-1))}}
   else if(!ev.list.some(x=>x.n===it.n&&x.t===(it.t||""))){ev.list.push({n:it.n,t:it.t||"",pl:it.pl||"",fl:it.fl||"",ad:it.ad||"",al:it.al||"",who:it.who||"",te:it.te||"",ok:false,msg:it.k==="g"?1:0});n++}});
  ev.list.sort((a,b)=>(a.t||"")<(b.t||"")?-1:1);try{localStorage.setItem("mobileKongRem2",JSON.stringify(r2))}catch(e){}}}
 localStorage.setItem("mobileKongTasks",JSON.stringify(missions));localStorage.setItem("mobileKongDone",JSON.stringify(done));localStorage.setItem("mobileKongMT",JSON.stringify(mt));localStorage.setItem("mobileKongMP",JSON.stringify(mp));localStorage.setItem("mobileKongAuto",JSON.stringify(auto));localStorage.setItem("mobileKongEv",JSON.stringify(ev));return n}
dailyAuto(false);
function save(){localStorage.setItem("mobileKongTasks",JSON.stringify(missions));localStorage.setItem("mobileKongDone",JSON.stringify(done));localStorage.setItem("mobileKongTotal",total);localStorage.setItem("mobileKongOwned",JSON.stringify(owned));localStorage.setItem("mobileKongPre",JSON.stringify(pre));localStorage.setItem("mobileKongPreDone",preDone);localStorage.setItem("mobileKongPending",pending);localStorage.setItem("mobileKongEarned",JSON.stringify(earned));localStorage.setItem("mobileKongNames",JSON.stringify(names));localStorage.setItem("mobileKongStreak",streak);localStorage.setItem("mobileKongMT",JSON.stringify(mt));localStorage.setItem("mobileKongMP",JSON.stringify(mp));localStorage.setItem("mobileKongCoins",coins);localStorage.setItem("mobileKongQuiz",JSON.stringify(qz));localStorage.setItem("mobileKongQStat",JSON.stringify(qs));localStorage.setItem("mobileKongPartner",JSON.stringify(partner));localStorage.setItem("mobileKongCT",JSON.stringify(ct));localStorage.setItem("mobileKongCare",JSON.stringify(cr));schedulePush()}
const praise=["우와 대단해!","최고야!","멋지다 멋져!","쑥쑥 크는 중!","야호! 해냈다!","역시 우리 친구!","짝짝짝! 박수!"];
const josa=n=>{const c=n.charCodeAt(n.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?"이":"가"};
function confetti(n){const e=["⭐","✨","💗","🎉","🌈","🎈"];for(let i=0;i<n;i++){const s=document.createElement("span");s.className="cf";s.textContent=e[i%e.length];s.style.left=Math.random()*100+"vw";s.style.fontSize=(16+Math.random()*18)+"px";s.style.setProperty("--r",(Math.random()*720-360)+"deg");s.style.animationDuration=(1.6+Math.random()*1.6)+"s";s.style.animationDelay=Math.random()*.4+"s";document.body.appendChild(s);setTimeout(()=>s.remove(),4000)}}
function sound(big){try{const A=new(window.AudioContext||window.webkitAudioContext)();if(big){const o=A.createOscillator(),k=A.createGain();o.frequency.setValueAtTime(140,A.currentTime);o.frequency.exponentialRampToValueAtTime(40,A.currentTime+.25);k.gain.setValueAtTime(.5,A.currentTime);k.gain.exponentialRampToValueAtTime(.001,A.currentTime+.3);o.connect(k);k.connect(A.destination);o.start();o.stop(A.currentTime+.3)}const notes=big?[523,659,784,1047,1319]:[659,880];notes.forEach((f,i)=>{const o=A.createOscillator(),g=A.createGain();o.type="triangle";o.frequency.value=f;o.connect(g);g.connect(A.destination);const t=A.currentTime+i*.12;g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.start(t);o.stop(t+.3)})}catch(e){}if(navigator.vibrate)navigator.vibrate(big?[60,40,60,40,120]:40)}
function render(){try{spRender();fcRender();wmRender();funBarRender()}catch(e){}renderEv();
 const n=nDone(),t=tCount(),g=eff();stat.textContent=Math.min(n,g)+"/"+g;fill.style.width=Math.min(100,n/g*100)+"%";goalLine.textContent=(t>1?"오늘 미션 "+g+"개를 모두 하면":"오늘 미션을 하면")+" 🎁 "+(reward||"오늘의 상");
 const cols=g<=4?2:Math.min(5,Math.ceil(Math.sqrt(g)));stars.style.gridTemplateColumns="repeat("+cols+",auto)";stars.innerHTML=Array.from({length:g},(_,k)=>`<i class="${k<n?"on":""}">⭐</i>`).join("");
 const it=items(),openL=it.filter(x=>!x.done&&!x.locked),lockL=it.filter(x=>x.locked).sort((a,b)=>toMin(a.time)-toMin(b.time)),doneL=it.filter(x=>x.done);
 const grp=(l,h)=>l.length?(openL.length+lockL.length+doneL.length>l.length?`<div class="grp">${h}</div>`:"")+l.map(taskRow).join(""):"";
 tasks.innerHTML=t?openL.map(taskRow).join("")+grp(lockL,"⏰ 예약 · 시간이 되면 열려요")+grp(doneL,"✅ 완료"):`<div class="empty">오늘 할 일을 먼저 넣어주세요 💗</div>`;
  streakBadge.textContent="🔥 "+streak+"일";coinBadge.textContent="🪙 "+coins;dateLabels();lastPop=-1;
  const td=ds(new Date()),ea=earned&&earned.day===td;buddyLv.textContent="Lv."+n+(ea?"":"/"+g);
  if(ea){buddyImg.src=friendsData[earned.f].src;buddyImg.style.filter="";buddyFace.classList.add("glowbox");buddyQ.style.display="none";bubble.textContent=nm(earned.f)+": "+cheers[earned.f%cheers.length]}
  else{const nxo=it.find(x=>!x.done&&!x.locked)||it.find(x=>!x.done),nx=nxo?nxo.name:"";const pf=partnerF()>=0?partnerF():pending;buddyImg.src=friendsData[pf].src;buddyImg.style.filter=mys(n/g);buddyFace.classList.remove("glowbox");buddyQ.style.display="";buddyQ.style.opacity=(1-.6*Math.min(1,n/g)).toFixed(2);bubble.textContent=!t?"오늘 할 일을 먼저 정해줘!":n===0?"❓ 오늘의 친구가 숨어 있어! 스탬프를 찍어봐!":"❓ 누굴까? 벌써 Lv."+n+"! "+Math.max(1,g-n)+"개만 더 하면 정체가 나타나!"}
  bookBtn.textContent="🐾 친구 도감 "+owned.length+"/"+friendsData.length;if(app_().dataset.tab==="f")renderFriends();
 syncQuiz();famUI();wkUI();calUI();rewardInput.value=reward;goalInput.value=goal;preOn.checked=pre.on;preTime.value=pre.time;pinState.textContent=pinHash?"현재: 설정됨 🔒":"아직 없음 — 정하면 아이가 설정 화면을 열 수 없어요";photoPrev.style.display=photo?"block":"none";if(photo)photoPrev.src=photo;
 undoList.innerHTML=(it.filter(x=>x.done).map(x=>`<div style="display:flex;align-items:center;gap:6px;padding:6px 2px;border-bottom:1px solid #eee"><span style="flex:1;font-size:14px">⭐ ${esc(x.name)}</span><button onclick="undoOne('${x.id}')" style="background:#efeaff;color:#745cff;border-radius:9px;padding:6px 10px;font-weight:900">↩ 되돌리기</button></div>`).join(""))||`<div style="font-size:12px;color:#8b7d90;padding:6px 0">오늘 완료한 미션이 없어요.</div>`;
 parentTaskList.classList.toggle("mlist",missions.length>0);mCnt.textContent=missions.length?"("+missions.length+"개)":"";
 parentTaskList.innerHTML=missions.length?missions.map((m,i)=>`<div class="mrow"><span class="no">${i+1}</span><span class="nm">${esc(m)}${(auto.keys||[]).includes(m)?' <small style="color:#e0457b;font-weight:900">오늘만</small>':""}</span><input type="time" value="${mt[i]||""}" onchange="setMt(${i},this.value)"><button class="ib ${mp[i]||mpOpen.includes(i)?"on":""}" title="칭찬 한마디" onclick="togMp(${i})">💌</button><button class="ib x" onclick="removeTask(${i})">✕</button></div>${(mp[i]||mpOpen.includes(i))?`<div class="mpr"><input value="${esc(mp[i]||"")}" maxlength="40" placeholder="칭찬 한마디 (비우면 자동)" onchange="setMp(${i},this.value)"></div>`:""}`).join(""):`<div style="font-size:12px;color:#8b7d90;padding:8px 0">등록된 할 일이 없습니다.</div>`;
}
const hp=p=>{let h=5381;for(const c of "kk"+p)h=((h<<5)+h+c.charCodeAt(0))|0;return String(h)};
let pinHash="";try{pinHash=localStorage.getItem("mobileKongPin")||""}catch(e){}
function showParent(){document.getElementById("parentModal").classList.add("show");render();if(evGoCal){const k=evGoCal;evGoCal="";calSel=k;const d0=new Date(k+"T00:00:00");calY=d0.getFullYear();calM=d0.getMonth();calRepSel=[d0.getDay()];document.querySelectorAll("#parentModal details").forEach(d=>{d.open=d.querySelector("summary").textContent.includes("달력으로")});calUI();if(evGoEdit){const g=evGoEdit;evGoEdit=null;calEditStart(g[0],g[1],g[2])}else setTimeout(()=>{const d=[...document.querySelectorAll("#parentModal details")].find(x=>x.querySelector("summary").textContent.includes("달력으로"));if(d)d.scrollIntoView()},80)}}
function openParent(){if(!pinHash){showParent();return}pinInput.value="";pinErr.textContent="";pinModal.classList.add("show");setTimeout(()=>pinInput.focus(),60)}
function closePin(){pinModal.classList.remove("show")}
function checkPin(){if(hp(pinInput.value)===pinHash){closePin();showParent()}else{pinErr.textContent="비밀번호가 달라요";pinInput.value=""}}
function savePin(){const v=newPin.value.trim();if(!/^\d{4}$/.test(v)){alert("숫자 4자리를 입력해주세요");return}pinHash=hp(v);try{localStorage.setItem("mobileKongPin",pinHash)}catch(e){}newPin.value="";schedulePush();render();alert("비밀번호를 저장했어요")}
function removePin(){pinHash="";try{localStorage.removeItem("mobileKongPin")}catch(e){}schedulePush();render()}
pinInput.addEventListener("keydown",e=>{if(e.key==="Enter")checkPin()});
const WDN=["일","월","화","수","목","금","토"],WORD=[1,2,3,4,5,6,0];let wkSel=[new Date().getDay()],wkK="m";
function saveWeek(){try{localStorage.setItem("mobileKongWeek",JSON.stringify(week));localStorage.setItem("mobileKongSkip",JSON.stringify(skip));localStorage.setItem("mobileKongAuto",JSON.stringify(auto))}catch(e){}schedulePush()}
function wkUI(){if(!document.getElementById("wkList"))return;wkOff.value=String(week.off);wkHol.checked=week.hol!==false;{const e=document.getElementById("wkAutoOk");if(e)e.checked=week.autoOk!==false}wkBoard.innerHTML=wkBoardHtml();
 wkList.innerHTML=WORD.map(d=>{const a=week.d[d]||[];if(!a.length)return"";return `<div style="margin-top:6px"><b style="color:#745cff">${WDN[d]}요일</b>`+a.map((it,i)=>`<div class="wkrow"><span style="flex:none">${it.k==="e"?"📅":"🎯"}</span><input value="${esc(it.n)}" maxlength="35" onchange="wkEdit(${d},${i},'n',this.value)" style="flex:1;min-width:0"><input type="time" value="${it.t||""}" onchange="wkEdit(${d},${i},'t',this.value)" style="flex:none;width:122px"><button onclick="calEditStart('w',${d},${i})" style="background:#efeaff;color:#745cff;border-radius:9px;padding:6px 8px;margin-right:4px">수정</button><button onclick="wkDel(${d},${i})" style="background:#fff0f4;color:#a9677e;border-radius:9px;padding:6px 8px">삭제</button></div>${it.k==="e"?`<div class="wkrow" style="padding-left:22px"><input value="${esc(it.pl||"")}" placeholder="학원 이름" maxlength="30" onchange="wkEdit(${d},${i},'pl',this.value)" style="flex:1;min-width:0"><input value="${esc(it.fl||"")}" placeholder="층" maxlength="8" onchange="wkEdit(${d},${i},'fl',this.value)" style="flex:none;width:56px"></div><div class="wkrow" style="padding-left:22px"><input value="${esc(it.ad||"")}" placeholder="주소" maxlength="80" onchange="wkEdit(${d},${i},'ad',this.value)" style="flex:1;min-width:0"></div><div class="wkrow" style="padding-left:22px"><span style="flex:1;font-size:12px;color:#83778b">👤 ${esc(whoTxt(it.who)||"가족 모두")} (바꾸려면 위 수정)</span></div><div class="wkrow" style="padding-left:22px"><span style="flex:none;font-size:12px">⏱ 끝</span><input type="time" value="${it.te||""}" onchange="wkEdit(${d},${i},'te',this.value)" style="flex:none;width:122px"></div><div class="wkrow" style="padding-left:22px"><span style="flex:none;font-size:12px">🔔</span><select onchange="wkEdit(${d},${i},'al',this.value)" style="flex:1;border:2px solid #eadcf0;border-radius:10px;padding:5px;font-size:13px;background:#fff">${alOpts(it.al)}</select></div>`:""}`).join("")+`</div>`}).join("")||'<div style="font-size:13px;color:#a094aa">아직 등록한 요일별 일정이 없어요.</div>';
 skList.innerHTML=skip.days.map((d,i)=>`<div class="wkrow"><span style="flex:1;font-size:14px">${d}${d===ds(new Date())?" (오늘)":""}</span><button onclick="skDayDel(${i})" style="background:#fff0f4;color:#a9677e;border-radius:9px;padding:6px 8px">되돌리기</button></div>`).join("")+skip.ranges.map((r,i)=>`<div class="wkrow"><span style="flex:1;font-size:14px">${r[0]===r[1]?r[0]:r[0]+" ~ "+r[1]}</span><button onclick="skDel(${i})" style="background:#fff0f4;color:#a9677e;border-radius:9px;padding:6px 8px">삭제</button></div>`).join("")}
function setWkHol(){week.hol=wkHol.checked;saveWeek();wkUI();calUI();try{renderEv()}catch(e){}}
function setWkOff(){week.off=+wkOff.value;saveWeek()}
function afterAuto(){save();lastSig=null;tick();render()}
function unmat(it){if(it.k==="e"||it.k==="g"){ev.list=ev.list.filter(x=>!(x.n===it.n&&x.t===(it.t||"")));evSave()}else{const ak=auto.keys||[],j=missions.indexOf(it.n);if(j>=0&&ak.includes(it.n)){missions.splice(j,1);done.splice(j,1);mt.splice(j,1);mp.splice(j,1);auto.keys=ak.filter(x=>x!==it.n)}}}
function wkEdit(d,i,k,v){const it=week.d[d][i];if(!it)return;const td=d===new Date().getDay();if(td)unmat(it);it[k]=(k==="n"?v.trim():v);saveWeek();if(td){dailyAuto(true);afterAuto()}wkUI()}
function wkDel(d,i){const it=week.d[d][i],td=d===new Date().getDay();if(it&&td)unmat(it);week.d[d].splice(i,1);saveWeek();if(td){dailyAuto(true);afterAuto()}wkUI()}
function applyWeekToday(){const n=dailyAuto(true);afterAuto();alert(isOff(ds(new Date()))?"오늘은 쉬는 날(공휴일 포함)로 되어 있어서 요일별 일정은 넣지 않았어요":n+"개의 일정을 오늘 미션에 넣었어요")}
function removeAutoToday(){ev.list=[];const old=auto.keys||[];for(let i=missions.length-1;i>=0;i--){if(old.includes(missions[i])){missions.splice(i,1);done.splice(i,1);mt.splice(i,1);mp.splice(i,1)}}auto.keys=[];dailyAuto(true);evSave()}
function skipToday(){if(!confirm("오늘을 쉬는 날로 할까요?\n오늘 요일별 일정이 목록에서 빠져요 (나중에 되돌릴 수 있어요)"))return;const t=ds(new Date());if(!skip.days.includes(t))skip.days.push(t);removeAutoToday();saveWeek();afterAuto();wkUI();alert("오늘은 쉬는 날로 했어요. 요일별 일정이 오늘 목록에서 빠졌어요")}
function addSkip(){let a=skA.value,b=skB.value||a;if(!a){alert("시작 날짜를 골라 주세요");return}if(b<a){const x=a;a=b;b=x}skip.ranges.push([a,b]);skA.value="";skB.value="";const t=ds(new Date());if(t>=a&&t<=b)removeAutoToday();saveWeek();afterAuto();wkUI()}
function skDel(i){skip.ranges.splice(i,1);saveWeek();if(!isOff(ds(new Date()))){dailyAuto(true)}afterAuto();wkUI()}
