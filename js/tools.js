/* ---- 일정 붙여넣기 ---- */
const SCH_T=/(오전|오후|AM|PM|am|pm)?\s*(\d{1,2})\s*(?::\s*(\d{2})|시\s*(?:(\d{1,2})\s*분)?)/g;
function parseSched(txt){const L=txt.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),out=[],used=new Set(),now=new Date();let mon=0,day=0;
 const isDate=l=>/^(\d{1,2})월\s*(\d{1,2})일/.test(l)||/^\d{1,2}월$/.test(l)||/^\d{1,2}\/\d{1,2}/.test(l)||(mon&&/^\d{1,2}$/.test(l))||/^[월화수목금토일]요일$/.test(l)||/^\(?[월화수목금토일]\)?$/.test(l);
 const hasT=l=>{SCH_T.lastIndex=0;return SCH_T.test(l)};
 for(let i=0;i<L.length;i++){const l=L[i];let m;
  if((m=l.match(/^(\d{1,2})월\s*(\d{1,2})일/))||(m=l.match(/^(\d{1,2})\/(\d{1,2})/))){mon=+m[1];day=+m[2];used.add(i);continue}
  if(/^\d{1,2}월$/.test(l)){mon=parseInt(l);day=0;used.add(i);continue}
  if(mon&&/^\d{1,2}$/.test(l)&&+l>=1&&+l<=31){day=+l;used.add(i);continue}
  if(isDate(l)){used.add(i);continue}
  if(!hasT(l))continue;
  SCH_T.lastIndex=0;const tm=SCH_T.exec(l);let h=+tm[2],mi=+(tm[3]||tm[4]||0),ap=(tm[1]||"").toLowerCase();
  if(ap==="오후"||ap==="pm"){if(h<12)h+=12}else if(ap==="오전"||ap==="am"){if(h===12)h=0}else if(h<=6)h+=12;
  if(h>23||mi>59)continue;
  let eh=-1,em=0;{const t2=SCH_T.exec(l);if(t2){let h2=+t2[2];const m2=+(t2[3]||t2[4]||0),ap2=(t2[1]||ap||"").toLowerCase();if(ap2==="오후"||ap2==="pm"){if(h2<12)h2+=12}else if(ap2==="오전"||ap2==="am"){if(h2===12)h2=0}else if(h2<=6)h2+=12;if(h2*60+m2<=h*60+mi&&h2<12)h2+=12;if(h2<24&&m2<60&&h2*60+m2>h*60+mi){eh=h2;em=m2}}}
  let title=l.replace(SCH_T,"").replace(/[-~–—]+/g," ").replace(/\s+/g," ").trim();
  if(!title){let j=i-1;while(j>=0&&(used.has(j)||hasT(L[j])||isDate(L[j])))j--;if(j>=0&&i-j<=3){title=L[j];used.add(j)}else{j=i+1;while(j<L.length&&(hasT(L[j])||isDate(L[j])))j++;if(j<L.length){title=L[j];used.add(j)}}}
  if(!title)continue;used.add(i);
  let d=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(mon&&day)d=new Date(now.getFullYear(),mon-1,day);
  out.push({title:title.slice(0,30),h,m:mi,eh,em,date:ds(d),today:ds(d)===ds(now)})}
 return out}
let schedEv=[];
function readSched(){schedEv=parseSched(schedText.value);if(!schedEv.length){schedPrev.innerHTML='<div style="font-size:13px;color:#e0457b;padding:6px 0">시간이 들어 있는 일정을 찾지 못했어요. 예) 오후 3:00 피아노</div>';schedGo.style.display="none";return}
 const anyToday=schedEv.some(e=>e.today),off=+schedOff.value;
 schedPrev.innerHTML=schedEv.map((e,i)=>{const st=e.h*60+e.m,op=Math.max(0,st-off),f=x=>fmt(String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0"));return `<label class="sr"><input type="checkbox" data-i="${i}" ${(e.today||!anyToday)?"checked":""}><span style="flex:1">${esc(e.title)}<small>${f(st)}${e.eh>=0?" ~ "+f(e.eh*60+e.em):" 시작"} · ${f(op)}에 열려요${e.today?"":" · "+e.date}</small></span></label><div class="add" style="margin:0 0 8px 28px"><select data-k="${i}" style="flex:none;border:2px solid #eadcf0;border-radius:10px;padding:5px;font-size:13px;background:#fff"><option value="m">🎯 미션</option><option value="e">📅 일정만</option></select><input data-ad="${i}" maxlength="80" placeholder="주소(선택)" style="font-size:13px;padding:5px 8px"></div>`}).join("");schedGo.style.display=""}
function applySched(){const off=+schedOff.value,boxes=[...schedPrev.querySelectorAll("input[type=checkbox]")].filter(b=>b.checked);if(!boxes.length){alert("넣을 일정을 골라 주세요");return}
 if(schedClear.checked){missions=[];done=[];mt=[];mp=[]}
 let n=0;if(ev.day!==dsn())ev={day:dsn(),list:[]};boxes.forEach(b=>{const e=schedEv[+b.dataset.i],st=e.h*60+e.m,op=Math.max(0,st-off),t=String(Math.floor(op/60)).padStart(2,"0")+":"+String(op%60).padStart(2,"0"),kind=schedPrev.querySelector('select[data-k="'+b.dataset.i+'"]').value,ad=schedPrev.querySelector('input[data-ad="'+b.dataset.i+'"]').value.trim();
  if(kind==="e"){const t0=String(e.h).padStart(2,"0")+":"+String(e.m).padStart(2,"0");if(!ev.list.some(x=>x.n===e.title&&x.t===t0)){ev.list.push({n:e.title,t:t0,te:e.eh>=0?String(e.eh).padStart(2,"0")+":"+String(e.em).padStart(2,"0"):"",pl:"",fl:"",ad,ok:false});ev.list.sort((a,b)=>a.t<b.t?-1:1);n++}return}
  if(missions.some((x,k)=>x===e.title&&mt[k]===t))return;missions.push(e.title);done.push(false);mt.push(t);mp.push("");if(!auto.keys.includes(e.title))auto.keys.push(e.title);n++});try{localStorage.setItem("mobileKongAuto",JSON.stringify(auto));localStorage.setItem("mobileKongEv",JSON.stringify(ev))}catch(e){}
 let r={day:dsn(),ids:[]};try{const q=JSON.parse(localStorage.getItem("mobileKongRem2")||"null");if(q&&q.day===dsn())r=q}catch(e){}
 missions.forEach((_,k)=>{if(mt[k]&&toMin(mt[k])<=nowMin()&&!r.ids.includes(String(k)))r.ids.push(String(k))});try{localStorage.setItem("mobileKongRem2",JSON.stringify(r))}catch(e){}
 save();lastSig=null;tick();schedText.value="";schedPrev.innerHTML="";schedGo.style.display="none";alert(n+"개의 일정을 넣었어요!")}
function downloadIcsAll(){const pad=x=>String(x).padStart(2,"0"),d=new Date(),day=d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate()),stamp=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z",url=location.href.split("#")[0],ev=[];
 missions.forEach((m,i)=>{if(mt[i])ev.push([m,mt[i]])});if(pre.on)ev.push(["프리올쏘 하기",pre.time]);
 if(!ev.length){alert("시간을 정한 미션이 없어요");return}
 const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//kongkong//KR","CALSCALE:GREGORIAN"];
 ev.forEach(([t,tm],i)=>{const[h,m]=tm.split(":");L.push("BEGIN:VEVENT","UID:kk-"+day+"-"+i+"@"+(location.host||"local"),"DTSTAMP:"+stamp,"DTSTART:"+day+"T"+h+m+"00","DURATION:PT20M","SUMMARY:⏰ "+t,"DESCRIPTION:콩콩 미션을 열고 스탬프를 받아요! "+url,"URL:"+url,"BEGIN:VALARM","TRIGGER:PT0S","ACTION:DISPLAY","DESCRIPTION:"+t,"END:VALARM","END:VEVENT")});L.push("END:VCALENDAR");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar;charset=utf-8"}));a.download="kongkong-today.ics";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function openQuiz(force){if(!force&&!qz.on)return false;let q=null;for(let i=0;i<12;i++){q=genQ();if(!q)return false;if(!recentQ.includes(q.q))break}recentQ.push(q.q);if(recentQ.length>10)recentQ.shift();
 curQ=q;qTry=0;qTag.textContent=q.tag;qQ.textContent=q.q;qQ.style.fontSize=q.small?(q.q.length>14?"30px":"34px"):(q.q.length>8?"36px":"52px");qSub.textContent=q.sub;qSpkBtn.style.display=q.speak&&window.speechSynthesis?"":"none";qMsg.textContent="";qNext.style.display="none";qSkip.style.display="";
 const td=ds(new Date());if(qs.day!==td)qs={day:td,r:0,t:0};qStat.textContent="오늘 맞힌 문제 "+qs.r+"개";
 qOpts.innerHTML=q.opts.map((o,i)=>`<button onclick="answerQ(${i})">${o.t}</button>`).join("");quizModal.classList.add("show");if(q.speak)setTimeout(qSpeak,350);return true}
function qSpeak(){if(!curQ||!curQ.speak)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(curQ.speak);u.lang="en-US";u.rate=.8;speechSynthesis.speak(u)}catch(e){}}
function buzz(){try{const A=new(window.AudioContext||window.webkitAudioContext)(),o=A.createOscillator(),g=A.createGain();o.type="sine";o.frequency.value=220;o.connect(g);g.connect(A.destination);g.gain.setValueAtTime(.12,A.currentTime);g.gain.exponentialRampToValueAtTime(.001,A.currentTime+.25);o.start();o.stop(A.currentTime+.26)}catch(e){}}
function answerQ(i){if(!curQ||qNext.style.display!=="none")return;const o=curQ.opts[i],btns=qOpts.querySelectorAll("button");
 if(o.ok){btns[i].classList.add("good");btns.forEach(b=>b.disabled=true);const c=qTry===0?2:1;addCoins(c);const td=ds(new Date());if(qs.day!==td)qs={day:td,r:0,t:0};qs.r++;qs.t++;save();render();
  qMsg.style.color="#2f9e5b";qMsg.textContent=(qTry===0?"🎉 정답! 최고야! ":"👏 맞혔어! ")+"🪙 +"+c;qStat.textContent="오늘 맞힌 문제 "+qs.r+"개";qNext.style.display="";qSkip.style.display="none";confetti(30);sound(true)}
 else{qTry++;btns[i].classList.add("bad");btns[i].disabled=true;qMsg.style.color="#e0457b";qMsg.textContent=qTry>=2?"괜찮아! 하나만 더 남았어 💪":"아깝다! 다시 해봐요 💪";buzz();if(navigator.vibrate)navigator.vibrate(60)}}
function closeQuiz(){quizModal.classList.remove("show");try{speechSynthesis.cancel()}catch(e){}curQ=null;render()}
function afterCelebrate(){document.getElementById("modal").classList.remove("show");openQuiz()}
function previewQuiz(){document.getElementById("parentModal").classList.remove("show");if(!openQuiz(true))alert("퀴즈 종류를 하나 이상 켜 주세요")}
function saveQuiz(){qz.on=qOn.checked;qz.mul=qMul.checked;qz.add=qAdd.checked;qz.eng=qEng.checked;qz.gen=qGen.checked;qz.ls=qLs.checked;qz.lt=qLt.checked;qz.tb=[2,3,4,5,6,7,8,9].filter(n=>document.getElementById("qT"+n).checked);save()}
function syncQuiz(){qOn.checked=qz.on;qMul.checked=qz.mul;qAdd.checked=qz.add;qEng.checked=qz.eng;qGen.checked=qz.gen;qLs.checked=qz.ls;qLt.checked=qz.lt;if(!qTb.firstChild)qTb.innerHTML=[2,3,4,5,6,7,8,9].map(n=>`<label class="qlb s"><input type="checkbox" id="qT${n}" onchange="saveQuiz()">${n}단</label>`).join("");[2,3,4,5,6,7,8,9].forEach(n=>document.getElementById("qT"+n).checked=qz.tb.includes(n))}
function revealFriend(f,had,pz,g,n){
 const sh=document.querySelector("#modal .sheet");resultBox.style.display="";modalOk.disabled=false;heroWrap.classList.remove("glowbox");heroImg.style.filter="";
 const fr=friendsData[f],name=nm(f),m=(had?"오늘의 친구 ":"새 친구 ")+name+josa(name)+" 왔어요!";
 if(photo){heroImg.src=photo;msg.textContent="🎉 오늘 미션 완료! 최고야!";newFriendBox.style.display="";nfImg.src=fr.src;nfText.textContent=m}
 else{heroImg.src=fr.src;heroWrap.classList.add("glowbox");msg.textContent=m;newFriendBox.style.display="none"}
 modalText.innerHTML=`🏆 <b>스탬프 ${g}개 모으기 성공!</b><br><b style="color:#745cff">🐾 ${name} Lv.${n} 달성!</b><br>🪙 코인 +4 (모두 ${coins}개)<br>${pz?"💌 "+esc(pz)+"<br>":""}🔥 ${streak}일 연속!<br>📖 친구 ${owned.length}/${friendsData.length}${owned.length===friendsData.length?" 모두 모았어요!":""}<br><br>🎁 받을 상<br><b style="font-size:20px">${reward||"오늘의 특별한 상"}</b>`;
 const big=bigStamp;big.className="bigstamp all";big.innerHTML="완료<br>쾅!";sh.classList.remove("shake");void big.offsetWidth;big.classList.add("slam");sh.classList.add("shake");
 confetti(80);sound(true);render();renderFriends();setTimeout(()=>fire(photo?nfWrap:heroWrap,f),700);setTimeout(()=>fire(photo?nfWrap:heroWrap,f),1900);
 const tg=photo?nfWrap:heroWrap;tg.querySelectorAll(".giftHand").forEach(x=>x.remove());const gh=document.createElement("span");gh.className="giftHand";gh.textContent="🎁";gh.onclick=e=>{e.stopPropagation();openGift(gh,f)};tg.appendChild(gh);
 giftState={f,n};modalOk.disabled=true;luckyLine.textContent="🎁 "+name+josa(name)+" 선물을 들고 왔어요!";luckyLine.className="lucky giftbtn";luckyLine.innerHTML="🎁 "+name+josa(name)+" 선물을 들고 왔어요!<br><span>👆 여기를 콕 눌러서 열어봐요!</span>";luckyLine.style.display="";luckyLine.onclick=()=>{if(giftState)openGift(gh,f)};resultBox.onclick=()=>{if(giftState)openGift(gh,f)};
 setTimeout(()=>{if(giftState&&giftState.f===f)openGift(gh,f)},9000)}
let giftState=null;
function openGift(el,f){if(!giftState)return;giftState=null;luckyLine.onclick=null;resultBox.onclick=null;luckyLine.className="lucky";const r=Math.random(),name=nm(f),tg=el.parentNode;let t="";
 if(r<.4){const c=5+Math.floor(Math.random()*6);addCoins(c);t="🪙 코인 "+c+"개가 들어 있었어요!"}
 else if(r<.75){const c=cr[f]=cr[f]||{xp:0,hat:0};let h=1+Math.floor(Math.random()*(HATS.length-1));if(h===c.hat)h=h%(HATS.length-1)+1;c.hat=h;t=HATS[h]+" 예쁜 소품! "+name+josa(name)+" 바로 썼어요!"}
 else{const c=cr[f]=cr[f]||{xp:0,hat:0};c.xp+=5;addCoins(3);t="💖 "+name+" 레벨 UP! 코인 3개도 덤!"}
 el.textContent="🎊";el.style.animation="none";el.onclick=null;luckyLine.textContent="🎁 "+t;modalOk.disabled=false;save();render();renderFriends();confetti(60);sound(true);puff(tg,.5,.3,["🎁","✨","⭐","💖"],10,70,22);react(tg,f)}

let afterPick=null;
const partnerF=()=>partner.day===ds(new Date())&&partner.f>=0?partner.f:-1;
function openPick(cb){afterPick=cb;const pool=friendsData.map((_,k)=>k).filter(k=>!friendsData[k].special),fresh=pool.filter(k=>!owned.includes(k)),old=pool.filter(k=>owned.includes(k)),shuf=a=>a.sort(()=>Math.random()-.5);
 const c=shuf(fresh).slice(0,3);if(c.length<3)c.push(...shuf(old).slice(0,3-c.length));
 act.style.display="none";drawBox.style.display="none";resultBox.style.display="none";luckyLine.style.display="none";modalOk.disabled=true;
 picks.innerHTML=c.map(k=>`<button class="pick" onclick="pickPartner(${k})"><img src="${friendsData[k].src}" alt=""><span>${nm(k)}</span></button>`).join("");
 pickBox.style.display="";document.getElementById("modal").classList.add("show");sound(false);confetti(30)}
let justPicked=false;
function pickPartner(k){justPicked=true;partner={day:ds(new Date()),f:k};save();pickBox.style.display="none";const cb=afterPick;afterPick=null;if(cb)cb()}
function stampIt(i){
 if(i==="pre"){if(preDone===dsn())return;preDone=dsn();lastPop=missions.length}else{if(done[i])return;done[i]=true;lastPop=i}
 save();if(partnerF()<0&&!(earned&&earned.day===ds(new Date()))){partner={day:ds(new Date()),f:pending};save()}stampShow(i)}
function stampShow(i){
 const n=nDone(),g=eff(),today=ds(new Date()),pz=praiseFor(i);luckyLine.style.display="none";
 const sh=document.querySelector("#modal .sheet");
 const slam=(t,big)=>{bigStamp.className="bigstamp"+(big?" all":"");bigStamp.innerHTML=t;sh.classList.remove("shake");void bigStamp.offsetWidth;bigStamp.classList.add("slam");if(big)sh.classList.add("shake")};
 act.style.display="none";popF=-1;drawBox.style.display="none";pickBox.style.display="none";resultBox.style.display="";newFriendBox.style.display="none";modalOk.disabled=false;heroWrap.classList.remove("glowbox");heroImg.style.filter="";
 const gotToday=earned&&earned.day===today;
 if(n>=g&&!gotToday){
  streak++;addCoins(4);
  const f=partnerF()>=0?partnerF():pending,had=owned.includes(f);
  if(!had)owned.push(f);
  earned={day:today,f:f,had:had};(cr[f]=cr[f]||{xp:0,hat:0}).xp+=n;pending=-1;ensurePending();save();
  if(navigator.vibrate)navigator.vibrate([40,40,40,40,40]);
  document.getElementById("modal").classList.add("show");
  resultBox.style.display="none";pickBox.style.display="none";drawBox.style.display="";modalOk.disabled=true;sound(true);
  setTimeout(()=>{drawBox.style.display="none";revealFriend(f,had,pz,g,n)},1700);
  return;
 }
const lucky=Math.random()<.25;addCoins(1+(lucky?2:0));save();
 if(lucky){luckyLine.textContent="🍀 럭키 스탬프! 코인 보너스!";luckyLine.style.display="";setTimeout(()=>puff(sh,.5,.15,["🪙","✨","🍀"],8,90,22),500)}
 const coinTxt=`🪙 코인 +${lucky?3:1} (모두 ${coins}개)`,pzTxt=pz?`<br>💌 ${esc(pz)}`:"";
 const p=praise[Math.floor(Math.random()*praise.length)];
 if(gotToday){const nmx=nm(earned.f);heroImg.src=friendsData[earned.f].src;heroWrap.classList.add("glowbox");msg.textContent=p;const kd=actFor(earned.f,n-1);popF=earned.f;popK=n-1;act.textContent=ACTL[kd];act.style.display="";modalText.innerHTML=`<b style="font-size:22px;color:#745cff">🐾 ${nmx} Lv.${n}</b><br>${coinTxt}${pzTxt}`;setTimeout(()=>react(heroWrap,earned.f,null,kd),250);setTimeout(()=>react(heroWrap,earned.f,null,kd),1500)}
 else{const pf=partnerF()>=0?partnerF():pending;heroImg.src=friendsData[pf].src;heroImg.style.filter=mys(n/g);msg.textContent=p;const kd=actFor(pf,n-1);popF=pf;popK=n-1;act.textContent=ACTL[kd];act.style.display="";modalText.innerHTML=`<b style="font-size:22px;color:#745cff">🎭 누구일까? Lv.${n}/${g}</b><br>🎯 ${Math.max(1,g-n)}개 더 하면 정체가 나타나요!<br>${coinTxt}${pzTxt}<div style="font-size:12px;color:#8b7d90">사진을 콕 누르면 또 보여줘요!</div>`;setTimeout(()=>react(heroWrap,pf,null,kd),250);setTimeout(()=>react(heroWrap,pf,null,kd),1500)}
 slam("콩!",false);confetti(12);sound(false);render();document.getElementById("modal").classList.add("show");
}
document.getElementById("newTask").addEventListener("keydown",e=>{if(e.key==="Enter")addTask()});let mus=null,musOn=true;try{musOn=localStorage.getItem("mobileKongMusic")!=="0"}catch(e){}
const MEL=[[523,1],[659,1],[784,1],[659,1],[880,2],[784,2],[698,1],[659,1],[587,1],[523,1],[659,2],[587,2],[784,1],[880,1],[1047,1],[880,1],[784,2],[659,2],[698,1],[659,1],[587,1],[659,1],[523,4]];
function mnote(A,dst,f,t,d,v,type){const o=A.createOscillator(),g=A.createGain();o.type=type||"triangle";o.frequency.value=f;o.connect(g);g.connect(dst);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.05)}
function cheerNow(){const c=document.getElementById("cheer"),w=document.getElementById("iw");if(!c||!mus)return;c.classList.remove("show");void c.offsetWidth;c.classList.add("show");
 if(w){w.classList.remove("rx-jump");void w.offsetWidth;w.classList.add("rx-jump");puff(w,.5,.25,["💪","⭐","✨","💖"],7,90,24)}
 let spoke=false;try{if(window.speechSynthesis&&window.SpeechSynthesisUtterance){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("지니 지니 화이팅!");u.lang="ko-KR";u.pitch=1.8;u.rate=1.05;u.volume=1;const v=speechSynthesis.getVoices().find(x=>/^ko/i.test(x.lang));if(v)u.voice=v;speechSynthesis.speak(u);spoke=true}}catch(e){}
 if(!spoke&&mus){const t=mus.A.currentTime+.05;[523,523,659,659,784,784,1047].forEach((f,k)=>mnote(mus.A,mus.m,f,t+k*.17,.2,.2))}}
function startMusic(){if(mus||!musOn)return;try{const A=new(window.AudioContext||window.webkitAudioContext)(),m=A.createGain();m.gain.value=.55;m.connect(A.destination);mus={A,m,t:A.currentTime+.15,i:0,timer:null};
 const beat=.26,sched=()=>{if(!mus)return;while(mus.t<mus.A.currentTime+1.5){const[f,d]=MEL[mus.i%MEL.length];mnote(A,m,f,mus.t,d*beat*.9,.17);mnote(A,m,f*2,mus.t,d*beat*.5,.05,"sine");if(mus.i%4===0)mnote(A,m,f/4,mus.t,beat*3,.2,"sine");mus.t+=d*beat;mus.i++;if(mus.i%MEL.length===0){const w=Math.max(0,(mus.t-mus.A.currentTime)*1000);setTimeout(cheerNow,w)}}};
 sched();mus.timer=setInterval(sched,400)}catch(e){mus=null}}
function stopMusic(){if(!mus)return;const c=mus;mus=null;clearInterval(c.timer);try{c.m.gain.setTargetAtTime(0,c.A.currentTime,.15);setTimeout(()=>c.A.close(),700)}catch(e){}}
function toggleMusic(){musOn=!musOn;try{localStorage.setItem("mobileKongMusic",musOn?"1":"0")}catch(e){}imus.classList.toggle("off",!musOn);if(musOn){startMusic();if(mus)mus.A.resume()}else stopMusic()}
function introGesture(){ihint.style.display="none";if(!musOn)return;if(mus)mus.A.resume();else startMusic()}
const WD=["일","월","화","수","목","금","토"];
function dateLabels(){const d=new Date();todayLbl.textContent="📅 "+(d.getMonth()+1)+"월 "+d.getDate()+"일 ("+WD[d.getDay()]+")";const il=document.getElementById("idate");if(il)il.textContent="📅 "+d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+d.getDate()+"일 "+WD[d.getDay()]+"요일"}
function introInit(){dateLabels();imus.classList.toggle("off",!musOn);if(!musOn)ihint.style.display="none";else{startMusic();document.getElementById("intro").addEventListener("pointerdown",introGesture,{once:true})}const t=tCount(),n=nDone(),g=eff();introSub.textContent=!t?"부모님이 오늘의 미션을 정해주세요":n>=g?"오늘 미션을 다 했어! 최고야 🏆":"오늘 미션 "+t+"개 · 🔥 "+streak+"일째 도전 중!"}
function closeIntro(){const e=document.getElementById("intro");if(!e||e.classList.contains("out"))return;try{stopMusic()}catch(_){}try{sound(false)}catch(_){}e.classList.add("out");setTimeout(()=>{try{e.remove()}catch(_){}},500);try{if(me&&me!=="아이")goTab("e")}catch(_){}}
