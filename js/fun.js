/* ===== 재미 업그레이드: 인형 대사·이야기·돌봄 선택 / 오늘의 특별 미션 / 가족 챌린지 / 친구 뽑기 / 행운 상자 ===== */
const hsh=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h};
const josaP=(w,p)=>{const c=String(w).charCodeAt(String(w).length-1),t=c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28!==0;return t?p[0]:p[1]};
const J=(w,p)=>w+josaP(w,p);
const SN2=[["🍪","쿠키"],["🍓","딸기"],["🥕","당근"],["🍎","사과"],["🍰","케이크"],["🍩","도넛"],["🍦","아이스크림"],["🍌","바나나"],["🧀","치즈"],["🍡","경단"]];
const SNL={"🍪":"바삭바삭 냠냠!","🍓":"새콤달콤~ 눈이 번쩍!","🥕":"아삭아삭 힘이 솟아!","🍎":"한 입 먹으니 튼튼해지는 느낌!","🍰":"사르르… 행복해~","🍩":"쫄깃쫄깃 도넛이다!","🍦":"차가워서 머리가 띵~!","🍌":"바나나 쭈우욱~ 달콤해!","🧀":"고소한 치즈, 냠!","🍡":"쫀득쫀득 경단이야!"};
const PL2=[["🙈","숨바꼭질"],["💃","춤추기"],["🎤","노래방"],["🎈","풍선 놀이"],["🫧","비눗방울"],["🧱","블록 쌓기"],["🏃","술래잡기"],["🧘","요가"],["🎨","그림 그리기"]];
const PLL={"숨바꼭질":["{n} 숨었어요… 어디 있게? 짠! 여기 있었지롱~ 🙈","찾았다! 그런데 {n}{은는} 또 숨고 싶대요!"],"춤추기":["{n}{이가} 엉덩이를 씰룩씰룩~ 💃","빙글빙글 한 바퀴! 어지러워도 신나요!"],"노래방":["{n}{이가} 마이크를 잡았어요 🎤 \"랄랄라~ 콩콩콩!\"","앵콜! 앵콜! 박수 짝짝짝!"],"풍선 놀이":["풍선이 둥실둥실~ 떨어뜨리면 안 돼! 🎈","펑! 풍선이 터져서 {n}{이가} 깜짝 놀랐어요!"],"비눗방울":["동글동글 비눗방울이 떠올라요 🫧","{n}{이가} 방울을 잡으려다 데굴데굴~"],"블록 쌓기":["하나, 둘, 셋… 높이높이 쌓아요 🧱","와르르! 무너졌지만 다시 쌓으면 돼요!"],"술래잡기":["{n}{이가} 쌩쌩 도망가요! 🏃","잡았다! 이번엔 네가 술래야!"],"요가":["{n}{이가} 나무 자세! 흔들흔들 🧘","후~ 숨을 크게 쉬면 마음이 편안해져요."],"그림 그리기":["{n}{이가} 크레파스를 들었어요 🎨","완성! 제목은 '콩콩이네 가족'이에요!"]};
const HATN=["없음","리본","모자","왕관","선글라스","꽃","별","헤드폰"],BGS=["","#ffe3ef","#e3f4ff","#e8ffe3","#fff3cf","#efe3ff"],BGN=["기본","분홍","하늘","초록","노랑","보라"];
const FBIO={"몽글이":"구름처럼 몽글몽글한 잠꾸러기예요.","빨강이":"불꽃처럼 용감하고 씩씩한 친구예요.","코코":"따뜻한 코코아를 제일 좋아하는 친구예요.","주황이":"당근 밭을 지키는 부지런한 친구예요.","피카":"번쩍번쩍 장난을 좋아하는 개구쟁이예요.","곰곰이":"뭐든 곰곰이 생각하는 의젓한 친구예요.","토토":"폴짝폴짝 뛰어다니는 점프 선수예요.","우디":"숲속 탐험이 취미인 모험가예요.","핑키":"반짝이는 걸 좋아하는 멋쟁이예요.","콩이":"콩콩 뛰는 마음이 제일 큰 친구예요.","방울이":"비눗방울을 불며 노는 걸 좋아해요.","체리":"새콤달콤한 웃음이 매력인 친구예요.","노랑이":"햇살처럼 환하게 웃는 친구예요.","수줍이":"부끄럼쟁이지만 친해지면 수다쟁이예요.","웜이":"따뜻하게 안아 주는 걸 좋아하는 친구예요.","꽃님이":"꽃밭을 가꾸는 다정한 친구예요.","딸기":"딸기 케이크 만들기가 꿈인 친구예요.","뽀삐":"산책을 좋아하는 강아지 같은 친구예요.","솜솜이":"솜사탕처럼 포근포근한 친구예요.","보라":"비밀 마법을 연습하는 신비한 친구예요.","푸딩":"말랑말랑 흔들흔들 춤추는 친구예요.","하늘이":"구름 위를 여행하는 꿈 많은 친구예요.","프리":"이를 튼튼하게 지켜 주는 건강 지킴이예요.","오늘의 주인공":"오늘 하루의 특별한 주인공이에요."};
const finfo=i=>{const n=friendsData[i].name;return{n:nm(i),bio:FBIO[n]||"마음이 따뜻한 친구예요.",fs:SN2[(i*3)%10],dis:SN2[(i*3+4)%10],fp:PL2[(i*5+2)%9],fh:1+(i*3)%7,fb:1+(i*2)%5,v:i%4}};
const GREET=[["{n}: 안녕! 오늘도 같이 놀자~ 💗","{n}: 와, 왔구나! 기다렸어!","{n}: 오늘은 무슨 재미난 일이 있었어?"],["{n}: (살짝) 안녕… 와 줘서 고마워 💦","{n}: 오늘도 만나서 기뻐…","{n}: 사실 너를 기다렸어. 비밀이야!"],["{n}: 흠, 오늘도 열심히 했구나. 대단해!","{n}: 내가 늘 응원하고 있다는 거 알지?","{n}: 천천히 해도 괜찮아. 끝까지 하면 멋져!"],["{n}: 히히, 나 오늘 뭐 했게? 맞혀 봐!","{n}: 간지럼 태워 줄까? 콕콕! 😆","{n}: 누가 더 웃긴지 내기하자!"]];
const STORY=[(f)=>`${J(f.n,"은는")} ${f.bio} 오늘 너를 처음 만나서 가슴이 콩콩 뛰었어요.`,(f)=>`${J(f.n,"은는")} 몰래 좋아하는 간식이 있어요. 바로 ${f.fs[0]} ${f.fs[1]}! 너한테만 알려 주는 비밀이에요.`,(f)=>`${f.n}의 소원은 너와 함께 ${f.fp[1]}${josaP(f.fp[1],"을를")} 해 보는 거예요. ${f.fp[0]} 오늘 같이 해 볼까요?`,(f)=>`어느 날 밤, ${J(f.n,"은는")} 별똥별을 따라 모험을 떠났어요. 길을 잃고 무서웠지만 네 생각을 하니 용기가 났대요!`,(f)=>`${J(f.n,"은는")} 별에게 약속했어요. "매일 네 곁에서 응원할 거야!" 이제 ${J(f.n,"은는")} 세상에서 제일 친한 친구예요. 💗`];
function say(i,t){fdMsg.textContent=t}
function greetFriend(i){const f=finfo(i);return GREET[f.v][Math.floor(Math.random()*3)].replace("{n}",f.n)}
function talkFriend(){talkAsk()}
function openStory(){const i=openIdx;if(i<0)return;const f=finfo(i),L=lvOf(i);boxOpen(`<h2>📖 ${esc(f.n)}의 이야기</h2><small style="color:#83778b">레벨이 오르면 다음 이야기가 열려요 (지금 Lv.${L})</small>`+STORY.map((s,k)=>k<L?`<div class="wrow" style="display:block"><b style="color:#745cff">${k+1}장</b><div style="margin-top:3px;font-size:15px;line-height:1.5">${esc(s(f))}</div><button class="tkb" style="text-align:center;padding:6px;margin:6px 0 0;font-size:14px" onclick="speakStory(${k})">🔊 들려주기</button></div>`:`<div class="wrow" style="opacity:.55"><b>🔒 ${k+1}장</b><small>Lv.${k+1}에서 열려요</small></div>`).join(""))}
const careCost=k=>k==="snack"?3:k==="play"?1:2;
function doCare(kind){const i=openIdx;if(i<0)return;if(coins<careCost(kind)){fdMsg.textContent="🪙이 모자라요! 미션을 하면 생겨요";return}
 const sh=a=>{const b=a.slice();for(let k=b.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[b[k],b[j]]=[b[j],b[k]]}return b};
 let h;
 if(kind==="snack"){const f=finfo(i),pool=sh(SN2.filter(x=>x[0]!==f.fs[0]&&x[0]!==f.dis[0])).slice(0,2),opt=sh(pool.concat([Math.random()<.6?f.fs:f.dis]));h=`<h2>🍽 뭘 줄까요?</h2><small style="color:#83778b">${esc(f.n)}에게 간식을 골라 주세요 (🪙3)</small><div class="stk">`+opt.map(x=>`<button onclick="careDo('snack','${x[0]}')"><span>${x[0]}</span>${x[1]}</button>`).join("")+"</div>"}
 else if(kind==="play"){const f=finfo(i),pool=sh(PL2.filter(x=>x[1]!==f.fp[1])).slice(0,2),opt=sh(pool.concat([f.fp]));h=`<h2>🎾 뭐하고 놀까요?</h2><small style="color:#83778b">${esc(f.n)}와 놀이를 골라요 (🪙1)</small><div class="stk">`+opt.map(x=>`<button onclick="careDo('play','${x[1]}')"><span>${x[0]}</span>${x[1]}</button>`).join("")+"</div>"}
 else{const c=cr[i]||{};h=`<h2>👑 꾸며 주기</h2><small style="color:#83778b">머리 장식과 배경을 골라요 (바꿀 때 🪙2)</small><div style="font-weight:900;margin-top:6px">머리 장식</div><div class="stk">`+HATS.map((x,k)=>`<button${(c.hat||0)===k?' style="border-color:#745cff"':""} onclick="careDo('hat',${k})"><span>${x||"✖"}</span>${HATN[k]}</button>`).join("")+`</div><div style="font-weight:900">배경</div><div class="stk">`+BGS.map((x,k)=>`<button${(c.bg||0)===k?' style="border-color:#745cff"':""} onclick="careDo('bg',${k})"><span style="background:${x||"#fff"};border-radius:10px;font-size:22px">🎨</span>${BGN[k]}</button>`).join("")+"</div>"}
 boxOpen(h)}
function careDo(kind,key){closeBox();const i=openIdx;if(i<0)return;const f=finfo(i),c=cr[i]=cr[i]||{xp:0,hat:0},before=lvOf(i);let msg="",xp=1;
 if(kind==="snack"){if(coins<3)return;coins-=3;const fav=key===f.fs[0],dis=key===f.dis[0],nmn=(SN2.find(x=>x[0]===key)||[])[1]||"";xp=fav?4:dis?1:2;msg=fav?`${f.n}: 꺄악! 내가 제일 좋아하는 ${nmn}이잖아! 💗 (최애 간식 +보너스)`:dis?`${f.n}: 으엑… ${nmn}${josaP(nmn,"은는")} 별로야 😝 그래도 줘서 고마워!`:`${f.n}: ${SNL[key]||"냠냠!"} 맛있다~`;snackFx(i,key,fav,dis)}
 else if(kind==="play"){if(coins<1)return;coins-=1;const fav=key===f.fp[1],L=PLL[key]||["신난다!","또 하자!"];xp=fav?3:1;msg=L[0].replace(/\{n\}\{은는\}/g,J(f.n,"은는")).replace(/\{n\}\{이가\}/g,J(f.n,"이가")).replace(/\{n\}/g,f.n);playFx(i,key);setTimeout(()=>{fdMsg.textContent=L[1].replace(/\{n\}\{은는\}/g,J(f.n,"은는")).replace(/\{n\}\{이가\}/g,J(f.n,"이가")).replace(/\{n\}/g,f.n)+(fav?" (제일 좋아하는 놀이!)":"");puff(fdWrap,.5,.3,["💗","✨"],5,50)},2200)}
 else if(kind==="hat"){if((c.hat||0)===key)return;if(coins<2)return;coins-=2;c.hat=key;xp=key===f.fh?3:1;msg=key===0?`${f.n}: 맨머리가 편하긴 해!`:key===f.fh?`${f.n}: ${HATS[key]} 이거 완전 내 취향이야! 어울려? 💗`:`${f.n}: ${HATS[key]} 어때, 멋져?`;puff(fdWrap,.5,.1,["✨","💖"],6,40)}
 else{if((c.bg||0)===key)return;if(coins<2)return;coins-=2;c.bg=key;xp=key===f.fb?3:1;msg=key===f.fb?`${f.n}: 와! 이 색깔 내가 제일 좋아하는 색이야!`:`${f.n}: 새 배경이다~ 기분이 달라졌어!`;puff(fdWrap,.5,.5,["🎨","✨"],6,50)}
 c.xp+=xp;fdMsg.textContent=msg;if(lvOf(i)>before){setTimeout(()=>{fdMsg.textContent="🎉 레벨 업! Lv."+lvOf(i)+" — 새 이야기가 열렸어요! 📖";confetti(50);sound(true)},900)}
 save();fdUpdate();renderFriends();render()}
/* fdUpdate: 배경 반영 */
const _fdU=fdUpdate;fdUpdate=function(){_fdU();try{const c=cr[openIdx]||{};fdWrap.style.background=BGS[c.bg||0]||""}catch(e){}};
/* ===== 오늘의 특별 미션 ===== */
const SPM=[["🍑","엉덩이로 이름 쓰기!"],["😄","웃는 표정 5가지 만들기"],["🎤","아빠에게 노래 한 곡 신청하기"],["🤖","로봇처럼 걸어서 방 한 바퀴"],["😂","엄마·아빠를 웃게 만들기 (웃으면 성공!)"],["😉","거울 보고 윙크 3번 하기"],["🐶","동물 소리 3가지 흉내 내기"],["🦩","눈 감고 한 발로 10초 서 있기"],["🧦","발가락으로 양말 벗기"],["💗","인형에게 칭찬 3개 해 주기"],["🎵","오늘 있었던 일을 노래로 불러 보기"],["✋","가족 모두와 하이파이브"],["📖","목소리를 바꿔서 책 한 쪽 읽기 (아기·할머니·로봇)"],["🌀","빙글빙글 3바퀴 돌고 멋진 포즈!"],["🐌","슬로모션으로 양치하기"],["🐘","코끼리 코 하고 5바퀴 돌기"],["💌","\"사랑해\"를 5가지 방법으로 말하기"],["🤫","인형과 비밀 이야기 나누기"],["🤪","가족과 가장 웃긴 표정 사진 찍기"],["🔍","엄마가 숨긴 인형 3분 안에 찾기"],["🦒","몸으로 동물을 만들어 가족이 맞히게 하기"],["🙏","오늘 가장 고마운 사람에게 \"고마워\" 말하기"],["🍑","엉덩이 춤 10초 추기"],["🔄","내 이름을 거꾸로 말해 보기"],["🏀","양말 공을 바구니에 3번 넣기"],["🔵","방에서 파란색 물건 5개 찾아오기"],["🐸","개구리처럼 뛰어서 현관까지 갔다 오기"],["🤗","가족을 꼭 안아 주기 (5초!)"],["✨","나만의 마법 주문 만들어서 외치기"],["💆","엄마·아빠 어깨 주물러 드리기 1분"],["⭐","나를 칭찬하는 말 3개 말해 보기"],["🎭","가족이 정한 동물·직업 흉내 내기"]];
var spd=null;try{spd=JSON.parse(localStorage.getItem("mobileKongSp")||"null")}catch(e){}
function spGet(){const t=ds(new Date());if(!spd||spd.day!==t)spd={day:t,i:hsh(t)%SPM.length,ok:false,r:0};return spd}
function svSp(){try{localStorage.setItem("mobileKongSp",JSON.stringify(spd))}catch(e){}schedulePush()}
function spReroll(){const s=spGet();if(s.ok||s.r>=2)return;s.r++;s.i=(s.i+1+hsh(s.day+s.r)%(SPM.length-1))%SPM.length;svSp();spRender()}
function spDone(){const s=spGet();if(s.ok)return;s.ok=true;svSp();addCoins.raw=1;addCoins(3);addCoins.raw=0;save();confetti(70);try{sound(true)}catch(e){}spRender();try{render()}catch(e){}}
function spRender(){const e=document.getElementById("spCard");if(!e)return;const s=spGet(),m=SPM[s.i];
 e.innerHTML=`<div class="spc${s.ok?" done":""}"><div class="spt">🎲 오늘의 특별 미션 <small>${s.ok?"🎉 달성! 오늘 코인 2배!":"하면 오늘 코인 2배 + 보너스 3🪙"}</small></div><div class="spb"><span class="spe">${m[0]}</span><b>${esc(m[1])}</b></div><div class="spbtn">${s.ok?'<span class="spok">🌟 대단해요! 행운 상자도 열렸어요 (친구들 탭)</span>':`<button onclick="spDone()">✨ 해냈어요!</button>${s.r<2?'<button class="alt" onclick="spReroll()">🔄 다른 걸로</button>':""}`}</div>${me&&me!=="아이"?'<div class="spbtn"><button class="alt" onclick="openPraise()">🌟 칭찬 스티커 보내기</button></div>':""}</div>`}
/* ===== 가족 합동 챌린지 (주간) ===== */
const FCP=[["🎤","아빠 노래자랑! 아빠가 한 곡 부르고 모두 박수 짝짝짝"],["🕺","온 가족 30초 막춤 대회"],["🤫","말 없이 몸짓으로만 1분 대화하기"],["🥰","칭찬 릴레이: 가족 한 명당 칭찬 2개씩"],["📸","웃긴 표정으로 가족 단체 사진 찍기"],["🎭","동물·직업 흉내 대결 (가족이 맞히기)"],["🤗","10초 단체 포옹"],["🥪","온 가족 함께 간식 만들기"],["🌙","자기 전에 오늘 가장 좋았던 일 한 가지씩 말하기"],["🎶","가족 합창: 좋아하는 동요 같이 부르기"],["🧦","양말 공 던지기 가족 대결"],["🐢","슬로모션 대결: 가장 느리게 걷는 사람이 이겨요"]];
var fcd=null;try{fcd=JSON.parse(localStorage.getItem("mobileKongFc")||"null")}catch(e){}
function wkKey(){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));return ds(d)}
function fcGet(){const k=wkKey();if(!fcd||fcd.wk!==k)fcd={wk:k,i:hsh(k)%FCP.length,done:{},extra:[],rest:{}};if(!fcd.extra)fcd.extra=[];if(!fcd.rest)fcd.rest={};return fcd}
function svFc(){try{localStorage.setItem("mobileKongFc",JSON.stringify(fcd))}catch(e){}schedulePush()}
function fcMembers(){const s=new Set(roster().concat(me?[me]:[]));["엄마","아빠","아이"].forEach(x=>{if(s.size<3)s.add(x)});fcGet().extra.forEach(x=>s.add(x));return[...s].filter(x=>x&&x!=="__join"&&!gone.includes(x))}
function fcMark(n){const f=fcGet();if(f.rest[n]){delete f.rest[n]}else if(f.done[n]){delete f.done[n];f.rest[n]=1}else f.done[n]=1;svFc();fcCheck();fcRender()}
function fcAddOpen(){const M=fcMembers(),rest=ROLES.filter(r=>!M.includes(r));boxOpen('<h2>➕ 함께한 사람 추가</h2><small style="color:#83778b">누르면 목록에 넣고 "했어요"로 표시해요</small><div class="stk">'+rest.map(r=>`<button onclick="fcAdd('${r}')"><span>🙂</span>${r}</button>`).join("")+'</div><button class="alt" style="width:100%;padding:9px;border-radius:12px;border:2px solid #d9d0f5;background:#fff;color:#745cff;font-weight:900" onclick="fcAdd(\'\')">✏️ 이름 직접 입력</button>')}
function fcAdd(r){closeBox();if(!r){r=(prompt("이름(예: 큰이모)")||"").trim().slice(0,6);if(!r)return}const f=fcGet();if(!f.extra.includes(r))f.extra.push(r);f.done[r]=1;svFc();fcCheck();fcRender()}
function fcRemove(n){const f=fcGet();if(["엄마","아빠","아이"].includes(n)){return}f.extra=f.extra.filter(x=>x!==n);delete f.done[n];svFc();fcRender()}
function fcTog(){if(!me){alert("먼저 이 폰을 쓰는 사람을 정해 주세요");return}const f=fcGet();delete f.rest[me];if(f.done[me])delete f.done[me];else f.done[me]=1;svFc();fcCheck();fcRender()}
function fcFull(){const f=fcGet(),M=fcMembers().filter(x=>!f.rest[x]);return M.length>=2&&M.every(x=>f.done[x])}
function fcCheck(){const f=fcGet();if(!fcFull())return;let got="";try{got=localStorage.getItem("mobileKongFcGot")||""}catch(e){}if(me==="아이"&&got!==f.wk){try{localStorage.setItem("mobileKongFcGot",f.wk)}catch(e){}addCoins(10);save();confetti(90);try{sound(true)}catch(e){}{const t=document.getElementById("msgToast");if(t){t.innerHTML="<small>👨‍👩‍👧 가족 챌린지 성공!</small>🎉 코인 10개를 받았어요!";t.style.display="block";clearTimeout(t._h);t._h=setTimeout(()=>{t.style.display="none"},9000)}}}}
function fcRender(){const e=document.getElementById("fcCard");if(!e)return;try{fcCheck()}catch(_){}const f=fcGet(),m=FCP[f.i],M=fcMembers(),A=M.filter(x=>!f.rest[x]),R=M.length-A.length,n=A.filter(x=>f.done[x]).length,full=fcFull();
 e.innerHTML=`<div class="fcc${full?" done":""}"><div class="spt">👨‍👩‍👧 이번 주 가족 챌린지 <small>${full?"🎉 성공! 아이가 코인 10개!":n+"/"+A.length+"명 완료"+(R?" · 😴쉬는 사람 "+R+"명":"")}</small></div><div class="spb"><span class="spe">${m[0]}</span><b>${esc(m[1])}</b></div><div class="fcm">${M.map(x=>`<button class="${f.done[x]&&!f.rest[x]?"on":""}" style="${f.rest[x]?"opacity:.6;background:#eee;text-decoration:line-through":""}" onclick="fcMark(${esc(JSON.stringify(x))})">${f.rest[x]?"😴":f.done[x]?"✅":"⬜"} ${esc(x)}</button>`).join("")}<button class="add2" onclick="fcAddOpen()">➕ 사람 추가</button><button class="add2" onclick="needPin(peopleOpen)">✏️ 사람 관리</button></div><div class="fcnote">이름을 한 번 누르면 ✅, 한 번 더 누르면 😴 이번엔 쉬기(참여 못 하는 사람), 또 누르면 처음으로 돌아가요.</div><div class="spbtn"><button onclick="fcPhoto.click()">📷 사진 찍기</button></div><input type="file" id="fcPhoto" accept="image/*" capture="environment" style="display:none" onchange="fcShot(this)"></div>`}
/* ===== 친구들 탭: 오늘의 친구 뽑기 · 행운 상자 ===== */
var fund=null;try{fund=JSON.parse(localStorage.getItem("mobileKongFun")||"null")}catch(e){}
function funGet(){const t=ds(new Date());if(!fund||fund.day!==t)fund={day:t,r:0,b:0,f:-1,p:0};return fund}
function svFun(){try{localStorage.setItem("mobileKongFun",JSON.stringify(fund))}catch(e){}schedulePush()}
const allDone=()=>eff()>0&&nDone()>=eff();
function funBarRender(){const e=document.getElementById("funBar");if(!e)return;const u=funGet(),sp=spGet(),a=allDone(),L=k=>a?(gLeft(k)>0?"오늘 "+gLeft(k)+"번 남음":(fset[k]?"오늘은 끝!":"쉬는 중")):"미션 후 🔒";
 e.innerHTML=`<div class="funb"><button class="${a&&gLeft("r")>0?"go":""}" onclick="rouletteOpen()">🎰<b>친구 뽑기</b><small>${a?(gLeft("r")>0?"누가 나올까? ("+gLeft("r")+"번)":"오늘은 끝! 내일 또!"):"미션을 다 하면 열려요 🔒"}</small></button><button class="${sp.ok&&!u.b?"go":""}" onclick="boxGameOpen()">📦<b>행운 상자</b><small>${u.b?"오늘은 끝!":sp.ok?"눌러서 열어요!":"특별 미션을 하면 열려요 🔒"}</small></button></div><div class="funb" style="grid-template-columns:1fr 1fr 1fr"><button onclick="cupOpen()">🥤<b>컵 찾기</b><small>${L("c")}</small></button><button onclick="memOpen()">🃏<b>짝 맞추기</b><small>${L("m")}</small></button><button onclick="shaOpen()">🕵️<b>누구일까요</b><small>${L("s")}</small></button></div>${me&&me!=="아이"?'<div style="text-align:right;margin:-2px 0 8px"><button onclick="needPin(fsetOpen)" style="border:2px solid #e5defa;background:#fff;border-radius:12px;padding:5px 10px;font-size:12px;font-weight:800;color:#5b4b8a">⚙️ 하루 놀이 횟수 정하기</button></div>':""}`}
function tickBeep(f){try{const A=new(window.AudioContext||window.webkitAudioContext)(),o=A.createOscillator(),g=A.createGain();o.frequency.value=f||660;g.gain.value=.05;o.connect(g);g.connect(A.destination);o.start();o.stop(A.currentTime+.05);setTimeout(()=>A.close(),200)}catch(e){}}
var rouBusy=false;
var fset={r:1,c:3,m:3,s:3};try{Object.assign(fset,JSON.parse(localStorage.getItem("mobileKongFset")||"{}"))}catch(e){}
function svFset(){try{localStorage.setItem("mobileKongFset",JSON.stringify(fset))}catch(e){}schedulePush()}
const GNAME={r:"🎰 친구 뽑기",c:"🥤 컵 속 인형 찾기",m:"🃏 짝 맞추기",s:"🕵️ 누구일까요"};
const gLeft=k=>Math.max(0,(fset[k]||0)-(funGet()[k+"n"]||0));
function gGate(k){if(!allDone()){alert("오늘 미션을 다 하면 놀 수 있어요! ("+Math.min(nDone(),eff())+"/"+eff()+")");return false}if(gLeft(k)<=0){alert(fset[k]?"오늘은 여기까지! 내일 또 놀아요 🌙":"지금은 쉬는 중이에요");return false}return true}
function gCount(k){const u=funGet();u[k+"n"]=(u[k+"n"]||0)+1;svFun();try{funBarRender()}catch(e){}}
function fsetOpen(){boxOpen('<h2>⚙️ 하루 놀이 횟수</h2><small style="color:#83778b">하루에 몇 번까지 놀 수 있는지 정해요 (0이면 쉬기)</small>'+Object.keys(GNAME).map(k=>`<div class="wrow"><b>${GNAME[k]}</b><span><button onclick="fsetBump('${k}',-1)" style="width:34px;height:34px;border-radius:10px;border:2px solid #e5defa;background:#fff;font-size:18px;font-weight:900">−</button> <b id="fs_${k}" style="display:inline-block;min-width:26px;text-align:center;font-size:18px">${fset[k]}</b> <button onclick="fsetBump('${k}',1)" style="width:34px;height:34px;border-radius:10px;border:2px solid #e5defa;background:#fff;font-size:18px;font-weight:900">＋</button></span></div>`).join(""))}
function fsetBump(k,d){fset[k]=Math.max(0,Math.min(9,(fset[k]||0)+d));svFset();const e=document.getElementById("fs_"+k);if(e)e.textContent=fset[k];try{funBarRender()}catch(x){}}
var rouBusy=false;
function rouletteOpen(){if(owned.length<1){alert("아직 친구가 없어요");return}if(!gGate("r"))return;
 boxOpen(`<h2>🎰 친구 뽑기</h2><div style="text-align:center"><small style="color:#83778b">누가 나올까요? 두근두근!</small><div id="rouImg" class="rouimg"><img id="rouPic" src="${friendsData[owned[0]].src}" alt=""></div><div id="rouNm" style="font-size:22px;font-weight:900;margin:6px 0;min-height:30px">누가 나올까?</div><button id="rouBtn" class="ok" onclick="rouSpin()">🎰 돌려라!</button><small style="display:block;color:#83778b;margin-top:8px">오늘 ${gLeft("r")}번 남았어요</small></div>`)}
function rouSpin(){if(rouBusy||!gGate("r"))return;rouBusy=true;const btn=document.getElementById("rouBtn");btn.disabled=true;btn.textContent="두근두근…";
 const pool=owned.slice(),win=pool[Math.floor(Math.random()*pool.length)],steps=22+Math.floor(Math.random()*6);let k=0,idx=Math.floor(Math.random()*pool.length);
 const run=()=>{const pic=document.getElementById("rouPic"),nmE=document.getElementById("rouNm");if(!pic){rouBusy=false;return}
  const last=k>=steps;const cur=last?win:pool[idx%pool.length];pic.src=friendsData[cur].src;nmE.textContent=nm(cur);tickBeep(500+k*18);
  if(last){gCount("r");const u=funGet();u.f=win;svFun();confetti(70);sound(true);const f=finfo(win);
   nmE.innerHTML=`🎉 <span style="color:#e0457b">${esc(nm(win))}</span> 등장!`;btn.style.display="none";document.getElementById("rouImg").classList.add("win");
   const d=document.createElement("div");d.style.cssText="font-size:15px;line-height:1.5;margin:6px 0";const g=greetFriend(win).replace(/^[^:]*: /,"");d.innerHTML=`${esc(g)}<br><b style="color:#745cff">오늘 ${esc(f.n)}${josaP(f.n,"은는")} ${f.fp[0]} ${esc(f.fp[1])}${josaP(f.fp[1],"이가")} 하고 싶대요!</b>${gLeft("r")>0?`<br><button class="tkb" style="text-align:center;margin-top:8px" onclick="closeBox();rouletteOpen()">🔁 한 번 더 (${gLeft("r")}번 남음)</button>`:""}`;nmE.after(d);try{speak(g,win)}catch(e){}rouBusy=false;return}
  idx++;k++;const delay=50+Math.pow(k/steps,3)*420;setTimeout(run,delay)};run()}
/* ---- 컵 속 인형 찾기 ---- */
var cupS=null;
function cupOpen(){if(!gGate("c"))return;boxOpen(`<h2>🥤 컵 속 인형 찾기</h2><small style="color:#83778b">인형이 숨은 컵을 잘 보세요! (오늘 ${gLeft("c")}번 남음)</small><div id="cupArea" style="position:relative;height:120px;margin:16px 0"></div><div id="cupMsg" style="font-weight:900;text-align:center;min-height:26px;font-size:17px"></div><div id="cupAgain"></div>`);cupStart()}
const cupImg=()=>{const f=owned.length?friendsData[owned[Math.floor(Math.random()*owned.length)]].src:"";return f?`<img src="${f}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:3px solid #ffe16c">`:"🧸"};
function cupPlace(){if(!cupS)return;for(let k=0;k<3;k++){const e=document.getElementById("cup"+k);if(e)e.style.left=(cupS.pos[k]*33.3+2)+"%"}}
function cupStart(){const A=document.getElementById("cupArea");if(!A)return;cupS={pos:[0,1,2],doll:Math.floor(Math.random()*3),can:false,img:cupImg()};
 A.innerHTML=[0,1,2].map(k=>`<button class="cup" id="cup${k}" onclick="cupPick(${k})">🥤</button>`).join("");cupPlace();
 document.getElementById("cupMsg").textContent="인형을 보세요 👀";const d=cupS.doll;document.getElementById("cup"+d).innerHTML=cupS.img;
 setTimeout(()=>{if(!cupS||!document.getElementById("cup"+d))return;document.getElementById("cup"+d).textContent="🥤";document.getElementById("cupMsg").textContent="섞어요~ 🌀";let n=0;
  const sw=()=>{if(!document.getElementById("cupArea"))return;if(n++>=8){cupS.can=true;document.getElementById("cupMsg").textContent="어느 컵일까요? 눌러 보세요!";return}const a=Math.floor(Math.random()*3),b=(a+1+Math.floor(Math.random()*2))%3,t=cupS.pos[a];cupS.pos[a]=cupS.pos[b];cupS.pos[b]=t;cupPlace();tickBeep(400+n*40);setTimeout(sw,540-n*25)};sw()},1600)}
function cupPick(k){if(!cupS||!cupS.can)return;cupS.can=false;gCount("c");const win=k===cupS.doll;document.getElementById("cup"+cupS.doll).innerHTML=cupS.img;
 document.getElementById("cupMsg").textContent=win?"🎉 맞았어요! 대단해요!":"😝 아쉬워요! 인형은 여기 있었어요";if(win){confetti(60);sound(true);speak("우와, 맞았어요! 대단해요!",-1)}else speak("아쉬워요! 다시 해 봐요!",-1);
 document.getElementById("cupAgain").innerHTML=gLeft("c")>0?`<button class="tkb" style="text-align:center" onclick="closeBox();cupOpen()">🔁 한 번 더 (${gLeft("c")}번 남음)</button>`:'<small style="display:block;text-align:center;color:#83778b">오늘은 여기까지! 내일 또 놀아요 🌙</small>'}
/* ---- 짝 맞추기 ---- */
var mgS=null;
function memOpen(){if(!gGate("m"))return;gCount("m");const E=["🐶","🐱","🐰","🐻","🐼","🦊"].sort(()=>Math.random()-.5),pool=owned.slice().sort(()=>Math.random()-.5).slice(0,6),items=[0,1,2,3,4,5].map(k=>pool[k]!=null?`<img src="${friendsData[pool[k]].src}" style="width:100%;height:100%;object-fit:cover;border-radius:10px">`:`<span style="font-size:30px">${E[k]}</span>`);
 mgS={items,c:[0,1,2,3,4,5,0,1,2,3,4,5].sort(()=>Math.random()-.5),open:[],done:[],lock:false,mv:0};boxOpen(`<h2>🃏 짝 맞추기</h2><small style="color:#83778b">같은 그림 두 장을 찾아요! (오늘 ${gLeft("m")}번 남음)</small><div id="mgArea" style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:12px 0"></div><div id="mgMsg" style="font-weight:900;text-align:center;min-height:24px"></div>`);mgRender()}
function mgRender(){const A=document.getElementById("mgArea");if(!A||!mgS)return;A.innerHTML=mgS.c.map((id,i)=>{const up=mgS.open.includes(i)||mgS.done.includes(i);return `<button onclick="mgFlip(${i})" style="height:78px;border-radius:12px;border:3px solid ${mgS.done.includes(i)?"#7bd88f":"#e5defa"};background:${up?"#fff":"#c9bdf5"};font-size:28px;padding:3px;overflow:hidden">${up?mgS.items[id]:"❓"}</button>`}).join("")}
function mgFlip(i){const m=mgS;if(!m||m.lock||m.open.includes(i)||m.done.includes(i))return;m.open.push(i);tickBeep(600);mgRender();
 if(m.open.length===2){m.mv++;const[a,b]=m.open;if(m.c[a]===m.c[b]){m.done.push(a,b);m.open=[];tickBeep(900);mgRender();if(m.done.length===12){document.getElementById("mgMsg").textContent="🎉 다 맞혔어요! ("+m.mv+"번 만에)";confetti(60);sound(true);speak("짝을 다 맞혔어요! 최고예요!",-1)}}else{m.lock=true;setTimeout(()=>{m.open=[];m.lock=false;mgRender()},900)}}}
/* ---- 누구일까요 (그림자 퀴즈) ---- */
var shaS=null;
const SHZ=[7,4.5,2.8];
function shaOpen(){if(!gGate("s"))return;gCount("s");shaS={q:0,sc:0};shaQ()}
function shaView(){const e=document.getElementById("shaImg");if(!e||!shaS)return;const z=SHZ[Math.min(shaS.st,2)];if(shaS.full){e.style.width="100%";e.style.height="100%";e.style.left="0";e.style.top="0";return}e.style.width=z*100+"%";e.style.height=z*100+"%";const cx=Math.max(.5/z,Math.min(1-.5/z,shaS.fx)),cy=Math.max(.5/z,Math.min(1-.5/z,shaS.fy));e.style.left=(50-cx*z*100)+"%";e.style.top=(50-cy*z*100)+"%"}
function shaQ(){const pool=friendsData.map((_,k)=>k).filter(k=>!friendsData[k].special).sort(()=>Math.random()-.5),w=pool[0],opts=pool.slice(0,3).sort(()=>Math.random()-.5),tr=TR[w]||{ey:[.4,.4,.6,.4]},nz={x:(tr.ey[0]+tr.ey[2])/2,y:(tr.ey[1]+tr.ey[3])/2};
 shaS.w=w;shaS.st=0;shaS.wrong=0;shaS.full=false;shaS.lock=false;shaS.fx=nz.x+(Math.random()*.04-.02);shaS.fy=nz.y+(Math.random()*.04-.02);closeBox();
 boxOpen(`<h2>🕵️ 누구일까요? (${shaS.q+1}/3)</h2><small style="color:#83778b">눈만 보여요! 누구의 눈일까요?</small><div style="position:relative;width:200px;height:200px;margin:8px auto;border-radius:20px;overflow:hidden;background:#fff;border:4px solid #ffe16c"><img id="shaImg" src="${friendsData[w].src}" style="position:absolute;max-width:none;object-fit:cover;transition:all .7s ease"></div><div style="text-align:center"><button id="shaHint" class="tkb" style="display:inline-block;width:auto;padding:8px 16px;margin:0 0 8px;font-size:14px" onclick="shaMore()">🔍 조금 더 보기</button></div><div id="shaOpts">${opts.map(o=>`<button class="tkb" id="sho${o}" onclick="shaPick(${o})">${esc(nm(o))}</button>`).join("")}</div><div id="shaMsg" style="text-align:center;font-weight:900;min-height:24px"></div>`);shaView()}
function shaMore(){if(!shaS||shaS.lock)return;if(shaS.st<2){shaS.st++;shaView();tickBeep(500)}if(shaS.st>=2){const h=document.getElementById("shaHint");if(h)h.style.display="none"}}
function shaPick(o){if(!shaS||shaS.lock)return;const ok=o===shaS.w;
 if(!ok){shaS.wrong++;const b=document.getElementById("sho"+o);if(b){b.disabled=true;b.style.opacity=.4;b.style.textDecoration="line-through"}document.getElementById("shaMsg").textContent="❌ 아니에요! 다시 골라 봐요";shaMore();return}
 shaS.lock=true;if(!shaS.wrong)shaS.sc++;shaS.full=true;shaView();document.getElementById("shaMsg").textContent=shaS.wrong?"⭕ 맞았어요! ("+nm(o)+")":"⭕ 한 번에 맞혔어요! 👏";tickBeep(900);const hb=document.getElementById("shaHint");if(hb)hb.style.display="none";
 setTimeout(()=>{shaS.q++;if(shaS.q<3)shaQ();else{closeBox();const n=shaS.sc;boxOpen(`<h2>🕵️ 결과</h2><div style="text-align:center;font-size:20px;font-weight:900;margin:10px 0">3문제 중 ${n}개를 한 번에 맞혔어요! ${n===3?"🏆":n>=2?"👏":"💪"}</div>${gLeft("s")>0?`<button class="tkb" style="text-align:center" onclick="closeBox();shaOpen()">🔁 한 번 더 (${gLeft("s")}번 남음)</button>`:'<small style="display:block;text-align:center;color:#83778b">오늘은 여기까지! 내일 또 놀아요 🌙</small>'}`);if(n>=2){confetti(60);sound(true)}speak(n===3?"전부 맞혔어요! 천재예요!":"잘했어요!",-1)}},1500)}
function boxGameOpen(){const u=funGet();if(u.b){alert("행운 상자는 오늘 이미 열었어요! 내일 또 만나요");return}if(!spGet().ok){alert("오늘의 특별 미션을 하면 열려요! (미션 화면에서 해냈어요!)");return}
 const pr=[5,3,1].sort(()=>Math.random()-.5);window._boxPr=pr;boxOpen(`<h2>📦 행운 상자</h2><div style="text-align:center;color:#83778b;font-size:14px">상자 3개 중 하나를 골라요! 안에 🪙 코인이 들어 있어요</div><div class="stk">`+[0,1,2].map(i=>`<button id="bx${i}" onclick="boxPick(${i})"><span style="font-size:44px">🎁</span>고르기</button>`).join("")+"</div>")}
function boxPick(i){const u=funGet();if(u.b)return;u.b=1;svFun();const pr=window._boxPr||[1,1,1],v=pr[i];[0,1,2].forEach(k=>{const b=document.getElementById("bx"+k);if(b){b.disabled=true;b.innerHTML=`<span style="font-size:34px">${k===i?"🎉":"💨"}</span>🪙 ${pr[k]}${k===i?" ← 내 상자!":""}`;if(k===i)b.style.borderColor="#e0457b"}});addCoins(v);save();confetti(v>=5?90:40);sound(v>=5);try{funBarRender();render()}catch(e){}}

/* ===== 가족 구성원 관리 (없는 사람 지우기) ===== */
function svGone(){try{localStorage.setItem("mobileKongGone",JSON.stringify(gone))}catch(e){}schedulePush()}
function peopleOpen(){const names=whoList().filter(x=>x!==me);const row=(n,hid)=>`<div class="wrow"><b>${hid?"🙈":"👤"} ${esc(n)}</b>${hid?`<button onclick="peopleBack(${esc(JSON.stringify(n))})">↩ 되살리기</button>`:`<button style="background:#fff0f4;color:#c0506f" onclick="peopleDel(${esc(JSON.stringify(n))})">🗑 지우기</button>`}</div>`;
 boxOpen('<h2>✏️ 가족 사람 관리</h2><small style="color:#83778b">우리 가족이 아닌 이름을 지우면 목록, 받는 사람, 일정의 누구에게, 가족 챌린지에서 사라져요</small>'+(names.length?names.map(n=>row(n,0)).join(""):'<div class="evempty" style="padding:10px">지울 이름이 없어요</div>')+(gone.length?'<div style="font-weight:900;margin-top:10px">지운 이름</div>'+gone.map(n=>row(n,1)).join(""):""))}
function peopleDel(n){if(!confirm("\""+n+"\" 을(를) 목록에서 지울까요?\n(이미 보낸 메시지는 남아 있어요)"))return;if(!gone.includes(n))gone.push(n);mem=mem.filter(x=>x!==n);try{localStorage.setItem("mobileKongMem",JSON.stringify(mem))}catch(e){}const f=fcGet();f.extra=f.extra.filter(x=>x!==n);delete f.done[n];svFc();if(msgTo===n)msgTo="all";calWhoSel=calWhoSel.filter(x=>x!==n);shopWho=shopWho.filter(x=>x!==n);svGone();peopleOpen();try{renderChat();fcRender();calUI()}catch(e){}}
function peopleBack(n){gone=gone.filter(x=>x!==n);svGone();peopleOpen();try{renderChat();fcRender();calUI()}catch(e){}}


/* ===== 돌보기 연출 / 머리 장식 위치 / 말 걸기 ===== */
function hatPos(i,card){const t=TR[i]||{ey:[.4,.3,.6,.3]},c=cr[i]||{},sun=(c.hat||0)===4;let x=(t.ey[0]+t.ey[2])/2,y=sun?t.ey[1]:Math.max(.07,Math.min(t.ey[1],t.ey[3])-.16);if(card)y=y*.82;return `left:${(x*100).toFixed(1)}%;top:${(y*100).toFixed(1)}%${sun?";font-size:"+(card?14:38)+"px":""}`}
var _fdU2=fdUpdate;fdUpdate=function(){_fdU2();try{fdHat.style.cssText=hatPos(openIdx,0)}catch(e){}};
function fxMsg(t){fdMsg.textContent=t;fdMsg.classList.remove("msgpop");void fdMsg.offsetWidth;fdMsg.classList.add("msgpop")}
function fxEmit(list,n,mode,o){o=o||{};const el=fdWrap;for(let k=0;k<n;k++){const p=document.createElement("span");p.className="fx"+(mode==="dn"?" dn":"");p.textContent=list[k%list.length];p.style.setProperty("--l",(o.x!=null?o.x*100+(Math.random()*16-8):10+Math.random()*80)+"%");p.style.setProperty("--t",(o.y!=null?o.y*100:mode==="dn"?(o.ty||.28)*100:85-Math.random()*15)+"%");p.style.setProperty("--dx",(Math.random()*80-40)+"px");p.style.setProperty("--s",((o.s||26)+Math.random()*10)+"px");p.style.setProperty("--w",(k*(o.gap||.18))+"s");p.style.setProperty("--d",(o.d||2.2)+"s");el.appendChild(p);setTimeout(()=>p.remove(),((o.d||2.2)+k*(o.gap||.18))*1000+300)}}
function snackFx(i,key,fav,dis){const el=fdWrap,m=(TR[i]||{m:[.5,.55]}).m,f=document.createElement("span");f.className="fly";f.textContent=key;f.style.left="50%";f.style.top="115%";el.appendChild(f);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.left=m[0]*100+"%";f.style.top=m[1]*100+"%";f.style.transform="translate(-50%,-50%) scale(.5) rotate(300deg)"}));
 setTimeout(()=>{f.remove();fdImg.classList.add("chew");const mo=document.createElement("span");mo.className="mouth";mo.style.left=m[0]*100+"%";mo.style.top=m[1]*100+"%";el.appendChild(mo);setTimeout(()=>mo.remove(),1100);
  puff(el,m[0],m[1],[key],5,38,13);
  if(dis){el.classList.add("sick");fxEmit(["🤢","💦","😝"],5,"up",{x:.5,y:.3});setTimeout(()=>el.classList.remove("sick"),1600)}
  else if(fav){fxEmit(["💗","💖","✨","🥰"],9,"up",{x:.5,y:.35,gap:.1});el.classList.add("rx-jump");setTimeout(()=>el.classList.remove("rx-jump"),1300)}
  else fxEmit(["😋","✨"],4,"up",{x:.5,y:.35});
  setTimeout(()=>fdImg.classList.remove("chew"),1700)},800);if(navigator.vibrate)navigator.vibrate([20,40,20])}
function playFx(i,key){const el=fdWrap,t=TR[i]||{};
 if(key==="숨바꼭질"){el.style.transition="opacity .25s";el.style.opacity=0;fxEmit(["🙈","❓"],2,"up",{x:.5,y:.5,gap:.6});setTimeout(()=>{el.style.opacity=1;react(el,i,null,"heart");fxEmit(["짠!"],1,"up",{x:.5,y:.4,s:34})},1700);setTimeout(()=>el.style.transition="",2100)}
 else if(key==="춤추기"){react(el,i,null,"dance");setTimeout(()=>react(el,i,null,"dance"),1300);fxEmit(["🎵","🎶","💃","✨"],10,"up",{gap:.2})}
 else if(key==="노래방"){fxEmit(["🎤"],1,"up",{x:.15,y:.55,s:46,d:2.6});fxEmit(["🎵","🎶","🎵"],9,"up",{gap:.22,y:.4});react(el,i,null,"heart");setTimeout(()=>react(el,i,null,"dance"),900)}
 else if(key==="풍선 놀이"){fxEmit(["🎈","🎈","🎈","🎊"],9,"up",{gap:.18,s:34,d:2.6});setTimeout(()=>{fxEmit(["💥","🎊"],3,"up",{x:.5,y:.3,s:44});el.classList.add("rx-jump");setTimeout(()=>el.classList.remove("rx-jump"),1300)},1900)}
 else if(key==="비눗방울"){fxEmit(["🫧","🫧","🫧","✨"],12,"up",{gap:.14,s:30,d:3})}
 else if(key==="블록 쌓기"){fxEmit(["🧱","🟥","🟦","🟨","🧱"],5,"dn",{gap:.35,x:.5,ty:.14,s:34,d:1.8});setTimeout(()=>{el.classList.add("rx-wiggle");fxEmit(["💥","😵"],2,"up",{x:.5,y:.25});setTimeout(()=>el.classList.remove("rx-wiggle"),1300)},2000)}
 else if(key==="술래잡기"){el.classList.add("runlr");fxEmit(["💨","💨","🏃"],6,"up",{gap:.3,y:.7});setTimeout(()=>{el.classList.remove("runlr");fxEmit(["잡았다!"],1,"up",{x:.5,y:.3,s:30})},2000)}
 else if(key==="요가"){el.classList.add("yoga");fxEmit(["🧘","✨","🌿","☁️"],8,"up",{gap:.3});setTimeout(()=>el.classList.remove("yoga"),2700)}
 else if(key==="그림 그리기"){fxEmit(["🖍️","🎨","🌈","⭐","🖌️"],10,"up",{gap:.2});react(el,i,null,"heart")}
 else react(el,i,null,"heart");if(navigator.vibrate)navigator.vibrate(30)}
const TALKQ=[["오늘 제일 재밌었던 건 뭐야?","친구랑 논 거!","맛있는 거 먹은 거!","와, 나도 그런 날 좋아해! 다음엔 같이 하자!","냠냠! 나도 먹고 싶다~ 다음엔 나 몫도 남겨 줘!"],["내가 소원을 하나 들어준다면?","하늘을 날고 싶어!","동물 친구들이랑 말하고 싶어!","우와~ 구름 위에서 같이 놀자! ☁️","멍멍! 꿀꿀! 나도 같이 통역해 줄게!"],["오늘 기분은 어때?","최고로 좋아!","조금 졸려…","나도 신나! 같이 춤출까? 💃","푹 자면 내일 더 힘이 날 거야. 토닥토닥~"],["나랑 뭐 하고 놀고 싶어?","숨바꼭질!","노래 부르기!","좋아! 내가 먼저 숨을게… 꼭꼭 찾아봐!","내가 반주할게! 랄랄라~ 🎵"],["내가 제일 좋아하는 색이 뭘까?","분홍색?","파란색?","땡! 근데 분홍색도 예쁘다~ 힌트: 네 마음 색깔!","딩동댕~ 은 비밀! 너도 파란색 좋아하는구나?"],["내일 하고 싶은 일 하나만 알려 줘!","친구 만나기","새로운 것 배우기","멋지다! 내일도 응원할게! 📣","대단해! 너는 매일 자라는 중이야 🌱"],["무서운 꿈 꾼 적 있어?","응, 있어…","아니, 없어!","괜찮아, 내가 꿈속에서도 지켜 줄게! 🛡️","씩씩하다! 앞으로도 좋은 꿈만 꾸자 🌙"],["나한테 해 주고 싶은 말은?","고마워!","사랑해!","헤헤, 나도 고마워! 얼굴이 빨개졌어 😳","나도 사랑해~! 세상에서 제일 많이! 💗"]];
function talkAsk(){const i=openIdx;if(i<0)return;const f=finfo(i),k=Math.floor(Math.random()*TALKQ.length),q=TALKQ[k];
 react(fdWrap,i,"💬","mouth");fxMsg(f.n+": "+q[0]);
 boxOpen(`<h2>💬 ${esc(f.n)}의 질문</h2><div style="font-size:17px;font-weight:800;margin:8px 0 12px">${esc(q[0])}</div><button class="tkb" onclick="talkAns(${k},0)">1️⃣ ${esc(q[1])}</button><button class="tkb" onclick="talkAns(${k},1)">2️⃣ ${esc(q[2])}</button>`)}
function talkAns(k,a){closeBox();const i=openIdx;if(i<0)return;const f=finfo(i),q=TALKQ[k],c=cr[i]=cr[i]||{xp:0,hat:0},d=ds(new Date()),before=lvOf(i);
 if(!c.tk||c.tk.d!==d)c.tk={d:d,n:0};let extra="";if(c.tk.n<3){c.tk.n++;c.xp+=1;extra=" (+정 ♥ "+c.tk.n+"/3)"}
 fxMsg(f.n+": "+q[3+a]+extra);react(fdWrap,i,"💬","mouth");fxEmit(["💗","💬","✨"],6,"up",{x:.5,y:.3,gap:.12});
 if(lvOf(i)>before)setTimeout(()=>{fxMsg("🎉 레벨 업! Lv."+lvOf(i)+" — 새 이야기가 열렸어요! 📖");confetti(50);sound(true)},1400);
 save();fdUpdate();renderFriends()}

var fcUrl=null,fcFile=null;
function fcShot(inp){const fl=inp.files&&inp.files[0];inp.value="";if(!fl)return;fcFile=fl;if(fcUrl)URL.revokeObjectURL(fcUrl);fcUrl=URL.createObjectURL(fl);
 boxOpen(`<h2>📷 찍은 사진</h2><img src="${fcUrl}" style="width:100%;border-radius:14px;max-height:55vh;object-fit:contain;background:#000"><small style="color:#83778b;display:block;margin:6px 0">사진은 앱에 올라가지 않고 내 폰에만 저장돼요.</small><button class="tkb" style="text-align:center;background:#745cff;color:#fff;border-color:#745cff" onclick="fcSave()">📥 내 폰에 저장하기</button><button class="tkb" style="text-align:center" onclick="closeBox()">닫기</button>`)}
async function fcSave(){if(!fcFile)return;const nmf="콩콩가족사진_"+ds(new Date())+".jpg";try{const F=new File([fcFile],nmf,{type:fcFile.type||"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[F]})){await navigator.share({files:[F],title:"가족 사진"});return}}catch(e){if(e&&e.name==="AbortError")return}
 const a=document.createElement("a");a.href=fcUrl;a.download=nmf;document.body.appendChild(a);a.click();a.remove();alert("사진을 저장했어요! (다운로드 폴더/갤러리를 확인해 보세요)")}

/* ===== 인형 목소리 (폰 내장 음성) ===== */
var voiceOn=true;try{voiceOn=localStorage.getItem("mobileKongVoice")!=="0"}catch(e){}
var _vs=null;
function koVoice(){try{const v=speechSynthesis.getVoices().filter(x=>/^ko/i.test(x.lang));return v[0]||null}catch(e){return null}}
function speak(t,i,force){if(!voiceOn&&!force)return;if(!("speechSynthesis" in window))return;try{
 t=String(t||"").replace(/^[^:：]{1,8}[:：]\s*/,"").replace(/\([^)]*\)/g,"").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}⭐️‍]/gu,"").replace(/\s+/g," ").trim();if(!t)return;
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="ko-KR";const v=koVoice();if(v)u.voice=v;const k=(i==null||i<0)?3:i;u.pitch=Math.min(1.9,.9+((k*7)%10)/10);u.rate=.88+((k*3)%4)*.05;u.volume=1;speechSynthesis.speak(u)}catch(e){}}
function speakStory(k){const i=openIdx;if(i<0)return;speak(STORY[k](finfo(i)),i,true)}
function voiceBtn(){const b=document.getElementById("vcBtn");if(b)b.textContent=voiceOn?"🔊 목소리 켜짐":"🔇 목소리 꺼짐"}
function voiceTog(){voiceOn=!voiceOn;try{localStorage.setItem("mobileKongVoice",voiceOn?"1":"0")}catch(e){}if(!voiceOn){try{speechSynthesis.cancel()}catch(e){}}else speak("안녕! 이제 내 목소리가 들려요!",openIdx,true);voiceBtn()}
(function(){try{const b=document.createElement("button");b.id="vcBtn";b.type="button";b.style.cssText="border:2px solid #e5defa;background:#fff;border-radius:12px;padding:5px 12px;font-size:13px;font-weight:800;color:#5b4b8a;margin:4px 0";b.onclick=voiceTog;fdLv.after(b);voiceBtn();
 new MutationObserver(()=>{if(friendModal.classList.contains("show"))speak(fdMsg.textContent,openIdx)}).observe(fdMsg,{childList:true,characterData:true,subtree:true});
 const _cf=closeFriend;closeFriend=function(){try{speechSynthesis.cancel()}catch(e){}_cf()};
 if("speechSynthesis" in window)speechSynthesis.getVoices()}catch(e){}})();
