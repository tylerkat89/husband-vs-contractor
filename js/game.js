(()=>{
const ROUNDS=4, MAX_INSPECT=3;
const $=s=>document.querySelector(s), app=$("#app");
const money=n=>(n<0?"-$":"$")+Math.abs(Math.round(n)).toLocaleString();
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S, timerId=null;
let audio=null;
function beep(type){try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);
 const f={good:[523,784],bad:[300,120],tick:[880,880],click:[440,520]}[type]||[440,440];const t=audio.currentTime;
 o.frequency.setValueAtTime(f[0],t);o.frequency.exponentialRampToValueAtTime(f[1],t+.3);g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.001,t+.35);o.start(t);o.stop(t+.36)}catch(e){}}
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
function newGame(w,h){S={wife:w||"Wife",hub:h||"Husband",round:0,deck:shuffle(SCENARIOS),bill:0,spent:0,safety:0,marriage:60,log:[],unsafe:0}}
function hud(){const h=$("#hud");if(!S||S.round===0){h.classList.add("hidden");return}h.classList.remove("hidden");
 $("#hRound").textContent=Math.min(S.round,ROUNDS)+"/"+ROUNDS;$("#hBill").textContent=money(S.bill);$("#hSpent").textContent=money(S.spent);
 $("#hSafety").textContent=S.safety;$("#hMarriage").style.width=Math.max(0,Math.min(100,S.marriage))+"%"}
function view(html){stopTimer();app.innerHTML=html;hud();window.scrollTo(0,0)}
function on(sel,fn){app.querySelectorAll(sel).forEach(el=>el.addEventListener("click",e=>{beep("click");fn(el,e)}))}

function title(){S=null;view(`<div class="card" style="text-align:center">
 <div class="big">👷‍♀️🔧👷</div><h1>Husband <span class="vs">vs</span> Contractor</h1>
 <p class="lead">She finds the projects. The contractor names the price. <b>He gets ONE shot to DIY it cheaper</b>, without wrecking the house or the marriage.</p>
 <p>2 players · one device · 4 rounds · about 10 min</p>
 <label for="wn">Wife's name</label><input id="wn" type="text" maxlength="16" placeholder="Wife">
 <label for="hn">Husband's name</label><input id="hn" type="text" maxlength="16" placeholder="Husband">
 <p></p><button class="btn full" id="start">Start the honey-do list ▶</button>
 <button class="btn ghost full" id="how">How to play</button></div>`);
 on("#start",()=>{newGame($("#wn").value.trim(),$("#hn").value.trim());nextRound()});on("#how",howTo)}
function howTo(){view(`<div class="card"><h2>How to play</h2>
 <p><b>👩 Wife:</b> pick a project, set the budget and the "Call the Pro" timer, then send him a note. You see one secret clue, and you can share it, hint at it, keep quiet, or <i>bluff</i>.</p>
 <p><b>👨 Husband:</b> inspect up to ${MAX_INSPECT} spots before the timer runs out, then call the pro or take your ONE shot: work the job step by step, in the right order. Some jobs end with "call a pro" after you figure out the problem, and good diagnosis cuts the bill. Every job hides a surprise.</p>
 <p><b>🧾 The score:</b> the contractor's bill keeps running. Spend less than it, stay safe, and keep the 💞 Marriage Meter up. Unsafe DIY never counts as a win, even when it "works."</p>
 <button class="btn full" id="back">Got it</button></div>`);on("#back",title)}

function nextRound(){S.round++;if(S.round>ROUNDS)return end();
 S.cur={choices:S.deck.splice(0,3),budget:null,timer:60,msg:"quiet",opened:[]};
 pass("wife",`Round ${S.round}: hand the device to <b>${esc(S.wife)}</b>.`,"No peeking, "+esc(S.hub)+"!",wifePick)}
function pass(role,msg,sub,next){view(`<div class="card pass role-${role}"><div class="big">${role==="wife"?"👩":"👨"}</div>
 <h2>${msg}</h2><p>${sub}</p><button class="btn ${role} full" id="go">I'm ${role==="wife"?esc(S.wife):esc(S.hub)}, show me</button></div>`);on("#go",next)}

function wifePick(){view(`<div class="card role-wife"><h2>👩 ${esc(S.wife)}, which project is bugging you?</h2>
 <div class="grid">${S.cur.choices.map((c,i)=>`<button class="pick" data-i="${i}"><div class="em">${c.em}</div><b>${c.title}</b><br><small>${esc(c.request)}</small><br><span class="tag">Contractor quote: ${money(c.quote)}</span></button>`).join("")}</div></div>`);
 on(".pick",el=>{const c=S.cur.choices[+el.dataset.i];S.cur.sc=c;S.deck.push(...S.cur.choices.filter(x=>x!==c));wifeSetup()})}
function wifeSetup(){const c=S.cur.sc;S.cur.budget=Math.round(c.quote*.5/10)*10;
 view(`<div class="card role-wife"><h2>${c.em} ${c.title}</h2><p class="note">"${esc(c.request)}"</p>
 <div class="secret">🤫 <b>Secret clue only you know:</b> ${esc(c.secret)}</div>
 <label>💵 Budget for his DIY attempt: <span id="bv">${money(S.cur.budget)}</span></label>
 <input id="budget" type="range" min="${Math.round(c.quote*.1/10)*10}" max="${c.quote}" step="10" value="${S.cur.budget}">
 <label>⏱️ "Call the Pro" timer: <span id="tv">60</span>s</label>
 <input id="timer" type="range" min="30" max="90" step="5" value="60">
 <label>📝 Your note to him</label>
 <div class="opts">
  <button class="btn" data-m="share">💬 Share it: "${esc(c.secret)}"</button>
  <button class="btn" data-m="hint">🤔 Hint: "${esc(c.hint)}"</button>
  <button class="btn" data-m="bluff">😈 Bluff: "${esc(c.spots.find(s=>s.t==="herring").c)}"</button>
  <button class="btn sel" data-m="quiet">🤐 Say nothing. Let him learn.</button>
 </div><p></p><button class="btn wife full" id="done">Lock it in & pass the device</button></div>`);
 $("#budget").oninput=e=>{S.cur.budget=+e.target.value;$("#bv").textContent=money(S.cur.budget)};
 $("#timer").oninput=e=>{S.cur.timer=+e.target.value;$("#tv").textContent=S.cur.timer};
 on(".opts button",el=>{app.querySelectorAll(".opts button").forEach(b=>b.classList.remove("sel"));el.classList.add("sel");S.cur.msg=el.dataset.m});
 on("#done",()=>pass("hub",`Hand the device to <b>${esc(S.hub)}</b>.`,"The clock starts when you tap.",hubInspect))}
function noteText(){const c=S.cur.sc,m=S.cur.msg;return m==="share"?c.secret:m==="hint"?c.hint:m==="bluff"?c.spots.find(s=>s.t==="herring").c:"(She just smiles and sips her coffee.)"}
function hubInspect(){const c=S.cur;c.left=c.timer;c.timedOut=false;
 view(`<div class="card role-hub"><div class="timer" id="clock">⏱️ ${c.left}s</div>
 <h2>${c.sc.em} ${c.sc.title}</h2><p class="note">"${esc(c.sc.request)}"</p>
 <p>💌 Her note: <b>${esc(noteText())}</b></p>
 <p><span class="tag">Budget ${money(c.budget)}</span><span class="tag">Contractor quote ${money(c.sc.quote)}</span><span class="tag" id="ins">Inspections left: ${MAX_INSPECT}</span></p>
 <div class="hot">${c.sc.spots.map((s,i)=>`<button class="spot" data-i="${i}">🔍 <b>${s.l}</b></button>`).join("")}</div>
 <p></p><button class="btn hub full" id="decide">I've seen enough, time to decide</button></div>`);
 on(".spot",el=>{const i=+el.dataset.i;if(c.opened.includes(i)||c.opened.length>=MAX_INSPECT)return;c.opened.push(i);el.classList.add("open");
  el.innerHTML=`🔍 <b>${c.sc.spots[i].l}</b><small>${esc(c.sc.spots[i].c)}</small>`;
  $("#ins").textContent="Inspections left: "+(MAX_INSPECT-c.opened.length);
  if(c.opened.length>=MAX_INSPECT)app.querySelectorAll(".spot:not(.open)").forEach(b=>b.disabled=true)});
 on("#decide",hubDecide);startClock()}
function startClock(){stopTimer();const c=S.cur;timerId=setInterval(()=>{c.left--;const el=$("#clock");if(el){el.textContent="⏱️ "+c.left+"s";el.classList.toggle("low",c.left<=10)}
 if(c.left<=10&&c.left>0)beep("tick");if(c.left<=0){stopTimer();c.timedOut=true;resolve("pro")}},1000)}
function hubDecide(){const c=S.cur;const keep=c.left;
 view(`<div class="card role-hub"><div class="timer" id="clock">⏱️ ${keep}s</div><h2>${c.sc.em} Your ONE shot. Ready?</h2>
 <p>DIY means you work the job step by step. Wrong moves cost money, time, and marriage points, and a dangerous one ends the job.</p>
 <div class="opts">
  <button class="btn" data-a="diy">🔧 Take a shot at it myself</button>
  <button class="btn" data-a="pro">📞 Call the pro now (${money(c.sc.quote)})</button>
 </div></div>`);c.left=keep;startClock();
 on("[data-a=diy]",()=>{stopTimer();c.step=0;c.acc=0;c.mar=0;c.saf=0;c.mistakes=0;c.picks=c.sc.steps.map(()=>[]);c.removed=c.sc.steps.map(()=>[]);c.fb=null;chain()});
 on("[data-a=pro]",()=>resolve("pro"))}
function stepOptions(i){const c=S.cur,st=c.sc.steps[i];if(!c.opts)c.opts={};
 if(!c.opts[i]){const o=[{t:st.ok[0],k:"ok"}].concat(st.bad.map((b,j)=>({t:b[0],k:"bad",j})));if(!st.noBail&&!st.proEnd)o.push({t:"📞 Call a pro now",k:"bail"});c.opts[i]=shuffle(o)}
 return c.opts[i].filter((o,n)=>!c.removed[i].includes(n)).map(o=>({...o,n:c.opts[i].indexOf(o)}))}
function chain(){const c=S.cur,sc=c.sc,st=sc.steps[c.step];
 const dots=sc.steps.map((_,i)=>i<c.step?"🟢":i===c.step?"🔵":"⚪").join(" ");
 view(`<div class="card role-hub"><p style="text-align:center">${dots}<br><small>Step ${c.step+1} of ${sc.steps.length} · spent so far ${money(c.acc)}</small></p>
 <h2>${sc.em} ${esc(st.q)}</h2>
 ${c.fb?`<p class="note ${c.fb.ok?"":"shake"}">${c.fb.ok?"✅":"❌"} ${esc(c.fb.t)}</p>`:""}
 <div class="opts">${stepOptions(c.step).map(o=>`<button class="btn" data-n="${o.n}">${esc(o.t)}</button>`).join("")}</div></div>`);
 on("[data-n]",el=>pickStep(+el.dataset.n))}
function pickStep(n){const c=S.cur,sc=c.sc,st=sc.steps[c.step],o=c.opts[c.step][n];
 c.picks[c.step].push({t:o.t,k:o.k});
 if(o.k==="bail")return resolve("bail");
 if(o.k==="ok"){c.acc+=st.ok[1]||0;c.saf+=2;
  if(st.proEnd)return resolve("proEnd");
  c.step++;c.fb={ok:true,t:st.ok[2]==="pro part"?`Good call. Pro handles that part (${money(st.ok[1])}).`:"Nice. On to the next step."};
  if(c.step>=sc.steps.length)return resolve("done");beep("good");return chain()}
 const b=st.bad[o.j];c.acc+=b[1];c.mar+=b[2];c.saf+=b[3];c.mistakes++;beep("bad");
 if(b[5]){c.fatalFb=b[4];return resolve("fatal")}
 c.removed[c.step].push(n);c.fb={ok:false,t:b[4]+(b[1]?` (−${money(b[1])})`:"")};chain()}

function resolve(choice){stopTimer();const c=S.cur,sc=c.sc;let spent,safety,mar,kind,text;
 const done=c.step||0,acc=c.acc||0;mar=c.mar||0;safety=c.saf||0;
 if(choice==="pro"){spent=sc.quote;safety+=5;mar-=5;kind="meh";
  text=c.timedOut?"⏰ Time's up! She called the pro herself. They fix it right, but you pay full price and never learn what was wrong.":"You call the pro right away. Safe, but you pay full price, including their diagnostic fee.";
  if(c.timedOut)mar-=5}
 else if(choice==="bail"){const cr=Math.round((sc.credit||0)*done/sc.steps.length);spent=acc+sc.quote-cr;safety+=5;mar-=3;kind="meh";
  text=`You stopped partway and called a pro. Safe, but you paid for your attempt AND the full job${cr?` (minus ${money(cr)} for the diagnosis you'd already done)`:""}.`}
 else if(choice==="proEnd"){const cr=sc.credit||0;spent=acc+sc.quote-cr;safety+=15;mar+=10;kind=c.mistakes?"meh":"good";
  text=sc.good+(cr?` Your diagnosis knocked ${money(cr)} off the bill.`:"")}
 else if(choice==="done"){spent=acc;safety+=10;mar+=10;kind=c.mistakes>1?"meh":"good";text=sc.good+(c.mistakes?` (${c.mistakes} wrong move${c.mistakes>1?"s":""} along the way cost you.)`:"")}
 else{spent=acc+Math.round(sc.quote*1.3);kind="bad";S.unsafe++;mar-=10;
  text=c.fatalFb+" Job over. The contractor comes out anyway, and charges extra to fix the fix."}
 const over=spent>c.budget&&choice!=="pro"&&choice!=="proEnd";if(over)mar-=8;
 const realSeen=c.opened.some(i=>sc.spots[i].t==="real");if(realSeen)safety+=5;
 const bluffWin=c.msg==="bluff"&&(kind==="bad"||c.mistakes>=2);if(c.msg==="share"&&kind==="good")mar+=5;
 S.bill+=sc.quote;S.spent+=spent;S.safety+=safety;S.marriage=Math.max(0,Math.min(100,S.marriage+mar));
 S.log.push({t:sc.title,em:sc.em,quote:sc.quote,spent,kind});
 beep(kind==="bad"?"bad":"good");
 const seq=sc.steps.map((st,i)=>{const p=(c.picks||[])[i]||[];const wrong=p.filter(x=>x.k!=="ok");const got=p.some(x=>x.k==="ok");
  return `<li><b>${got?"✅":p.length?"❌":"⏭️"} ${esc(st.ok[0])}</b>${wrong.map(w=>`<br><small style="color:var(--bad)">You picked: ${esc(w.t)}</small>`).join("")}</li>`}).join("");
 view(`<div class="card result-${kind} ${kind==="bad"?"shake":""}">
 <div class="cut">${sc.em} ${kind==="good"?"✨🏆":kind==="bad"?"💥😱":"🧾😐"}</div>
 <h2>${kind==="good"?"Nailed it!":kind==="bad"?"Oh no.":"Got there... the expensive way."}</h2>
 <p><b>The hidden issue:</b> ${esc(sc.hidden)}</p><p>${esc(text)}</p>
 ${bluffWin?`<p class="note">😈 ${esc(S.wife)}'s bluff worked. She'll never let you forget this.</p>`:""}
 <div class="row"><span>🧾 Contractor quote</span><b>${money(sc.quote)}</b></div>
 <div class="row"><span>🔧 You actually spent</span><b>${money(spent)}</b></div>
 <div class="row"><span>💰 Saved vs contractor</span><b style="color:${sc.quote-spent>=0?"var(--good)":"var(--bad)"}">${money(sc.quote-spent)}</b></div>
 <div class="row"><span>🦺 Safety</span><b>${safety>=0?"+":""}${safety}</b></div>
 <div class="row"><span>💞 Marriage</span><b>${mar>=0?"+":""}${mar}${over?" (over budget!)":""}</b></div>
 <div class="lesson">🛠️ <b>The right order:</b><ol style="margin:6px 0 0;padding-left:20px">${seq}</ol></div>
 <div class="lesson">🎓 <b>Real-world takeaway:</b> ${esc(sc.lesson)}</div>
 <p></p><button class="btn full" id="next">${S.round>=ROUNDS?"See final results 🏁":"Next project ▶"}</button></div>`);
 on("#next",nextRound)}

function end(){S.round=ROUNDS;const saved=S.bill-S.spent;let t,d;
 if(S.unsafe>0&&saved<0){t="Banned from Home Depot";d="Bold. Dangerous. Expensive. Please hire someone."}
 else if(S.marriage<30){t="Sleeping on the Couch";d="The house survived. The marriage is under review."}
 else if(S.safety>=50&&saved>0){t="Certified Handy 🏅";d="You saved money AND knew when to call a pro. Rare breed."}
 else if(S.safety>=40){t="Permit Respecter";d="Safe choices all around. Your wallet cried a little, but your house didn't."}
 else if(saved>0){t="Lucky Weekend Warrior";d="You saved cash, but a few calls were sketchy. Look before you leap."}
 else{t="The Contractor's Favorite Customer";d="He's naming his boat after you."}
 const win=saved>0&&S.unsafe===0;
 view(`<div class="card" style="text-align:center"><div class="big">${win?"🏆":"🧾"}</div>
 <h1>${win?esc(S.hub)+" beat the contractor!":"The contractor wins."}</h1><h2>"${t}"</h2><p>${d}</p>
 <div style="text-align:left">${S.log.map(l=>`<div class="row"><span>${l.em} ${l.t}</span><b>${money(l.spent)} vs ${money(l.quote)} ${l.kind==="good"?"✅":l.kind==="bad"?"💥":"😐"}</b></div>`).join("")}
 <div class="row"><span>🧾 Total contractor bill</span><b>${money(S.bill)}</b></div>
 <div class="row"><span>🔧 Total husband spent</span><b>${money(S.spent)}</b></div>
 <div class="row"><span>💰 Saved</span><b>${money(saved)}</b></div>
 <div class="row"><span>🦺 Safety score</span><b>${S.safety}</b></div>
 <div class="row"><span>💞 Marriage meter</span><b>${S.marriage}/100</b></div></div>
 <p class="lesson" style="text-align:left">🎓 <b>Rule of thumb:</b> DIY the small stuff, but look first. Gas, structural, and permitted work always go to a licensed pro.</p>
 <button class="btn full" id="again">Play again (same couple)</button><button class="btn ghost full" id="home">Main menu</button></div>`);
 on("#again",()=>{const w=S.wife,h=S.hub;newGame(w,h);nextRound()});on("#home",title)}

window.__game={get state(){return S}};
title();
})();
