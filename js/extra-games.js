(function(){
const menu=document.getElementById('learnMenuGames'),area=document.getElementById('learnGameGames');if(!menu||!area)return;
const modes=[['subitize','👀','한눈에 개수 알기'],['action','🧸','인형 행동 말하기'],['add','➕','인형과 더하기'],['pattern','🌈','규칙 찾기'],['sort','🧩','순서대로 놓기']];
let mode='',round=0,answer=0,locked=false;
const rand=n=>Math.floor(Math.random()*n), buddy=()=>`images/buddy${String(1+rand(23)).padStart(2,'0')}.jpg`;
const dot=n=>Array.from({length:n},()=>'<span style="width:21px;height:21px;border-radius:50%;background:#ab83ef;display:inline-block;margin:5px"></span>').join('');
menu.innerHTML=modes.map(m=>`<button data-extra="${m[0]}" style="min-height:85px"><span>${m[1]}</span>${m[2]}</button>`).join('');
menu.addEventListener('click',e=>{const b=e.target.closest('[data-extra]');if(b)start(b.dataset.extra)});
function start(m){mode=m;round=0;area.hidden=false;menu.hidden=true;next()}
function choices(correct,arr){return arr.sort(()=>Math.random()-.5).map((x,i)=>`<button data-choice="${x}" style="min-height:55px;font-size:20px">${x}</button>`).join('')}
function options(n){const a=new Set([n]);while(a.size<3)a.add(Math.max(1,Math.min(20,n+rand(9)-4)));return [...a]}
const actions=[['🧸 🪥','양치해요','책을 읽어요','잠을 자요'],['🧸 📖','책을 읽어요','손을 씻어요','춤을 춰요'],['🧸 🧹','청소해요','밥을 먹어요','그림을 그려요'],['🧸 🍚','밥을 먹어요','달려요','잠을 자요'],['🧸 💤','잠을 자요','책을 읽어요','운동해요'],['🧸 🧼','손을 씻어요','노래해요','달려요']];
function next(){locked=false;if(round>=5){area.innerHTML=`<div class="learn-done">🎉 다섯 문제 성공!<img class="learn-friend" src="${buddy()}" alt="인형 친구"><p>정말 잘했어! 💛</p><small>이 게임은 미션과 용돈에 자동 연결되지 않아요.</small></div><button class="learn-reset" id="extraAgain">다시 하기</button><button class="learn-reset" id="extraBack">게임 고르기</button>`;document.getElementById('extraAgain').onclick=()=>start(mode);document.getElementById('extraBack').onclick=back;return}
let question='',visual='',arr=[];
if(mode==='subitize'){answer=1+rand(5);question='동그라미가 몇 개일까?';visual=`<div style="text-align:center;padding:20px">${dot(answer)}</div>`;arr=options(answer)}
if(mode==='action'){let a=actions[rand(actions.length)];answer=a[1];question='인형 친구가 무엇을 하고 있을까?';visual=`<div style="text-align:center;font-size:54px;margin:12px">${a[0]}</div><p style="text-align:center;font-size:13px">그림을 보고 말로 설명한 뒤 눌러 봐요</p>`;arr=a.slice(1)}
if(mode==='add'){let a=1+rand(5),b=1+rand(5);answer=a+b;question='인형 친구가 모은 동그라미는 모두 몇 개?';visual=`<div style="text-align:center">${dot(a)}<b> + </b>${dot(b)}</div>`;arr=options(answer)}
if(mode==='pattern'){let a=1+rand(4);answer=a+2;question='숫자의 규칙을 찾아봐!';visual=`<div class="learn-question">${a} → ${a+1} → ❓</div>`;arr=options(answer)}
if(mode==='sort'){let a=1+rand(8);answer=a+1;question='가운데에 들어갈 숫자는?';visual=`<div class="learn-question">${a}　❓　${a+2}</div>`;arr=options(answer)}
area.innerHTML=`<div class="learn-head"><b>${modes.find(x=>x[0]===mode)[2]} · ${round+1}/5</b><button id="extraBack">← 게임 선택</button></div><img src="${buddy()}" alt="응원 인형" style="width:74px;height:74px;object-fit:cover;border-radius:50%;display:block;margin:10px auto"><div class="learn-question">${question}</div>${visual}<div class="learn-choices">${choices(answer,arr)}</div><div id="extraHint" class="learn-hint" aria-live="polite">천천히 생각해 봐요 💛</div>`;
document.getElementById('extraBack').onclick=back;
area.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{if(locked)return;if(String(b.dataset.choice)!==String(answer)){document.getElementById('extraHint').textContent='괜찮아! 다시 살펴보자 💛';return}locked=true;document.getElementById('extraHint').textContent='정답! 참 잘했어! ⭐';round++;setTimeout(next,550)})
}
function back(){area.hidden=true;menu.hidden=false}
})();
