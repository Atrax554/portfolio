/* sig.js – Portfolio: Netzwerk-Hero, Intro, Morph-Karten, horizontaler Showcase */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-intro{position:fixed;inset:0;z-index:400;display:grid;place-items:center;background:#0b0b0d;pointer-events:none;clip-path:inset(0 0 0 0);animation:fxCur 0.7s .9s cubic-bezier(.7,0,.2,1) forwards}
.fx-intro svg{width:120px;height:120px}.fx-intro path{fill:none;stroke:#e6dccb;stroke-width:3;stroke-dasharray:400;stroke-dashoffset:400;animation:fxDraw .85s ease forwards}
@keyframes fxDraw{to{stroke-dashoffset:0}}@keyframes fxCur{to{clip-path:inset(0 0 100% 0)}}
.card{transition:border-radius .5s cubic-bezier(.2,.7,.2,1),transform .25s}.card:hover{border-radius:28px 6px 28px 6px;box-shadow:0 30px 60px -20px rgba(0,0,0,.7),0 0 0 1px rgba(230,220,203,.25)}
.card .thumb{transition:clip-path .6s cubic-bezier(.2,.7,.2,1);clip-path:inset(0 0 0 0 round 0)}.card:hover .thumb{clip-path:inset(4% 4% 0 4% round 18px)}
@media (min-width:1024px){.hs-pin{height:var(--hs-h)}.hs-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:center}
.hs-track{display:flex;gap:28px;padding:0 6vw;will-change:transform}.hs-track>.card{flex:0 0 min(440px,38vw)}}`;
/* intro */
if(!sessionStorage.fxIntro){sessionStorage.fxIntro=1;const i=d.createElement('div');i.className='fx-intro fx-sig';i.setAttribute('aria-hidden','true');
 i.innerHTML='<svg viewBox="0 0 100 100"><path d="M20 70 L50 20 L80 70 Z M35 55 H65"/></svg>';d.body.append(i);setTimeout(()=>i.remove(),1800)}
/* network hero: max 70 nodes, spatial grid → no O(n²) */
const hero=d.querySelector('header.wrap');if(hero){const cv=F.layer(hero);const N=F.mobile?30:70,P=[],R=110,R2=R*R;let mx=-1e3,my=-1e3,hr=null;
 for(let k=0;k<N;k++)P.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006,sx:0,sy:0});
 hero.addEventListener('pointerenter',()=>hr=cv.getBoundingClientRect(),{passive:true});
 hero.addEventListener('pointermove',e=>{if(!hr)hr=cv.getBoundingClientRect();mx=e.clientX-hr.left;my=e.clientY-hr.top},{passive:true});
 hero.addEventListener('pointerleave',()=>{mx=my=-1e3;hr=null},{passive:true});addEventListener('scroll',()=>hr=null,{passive:true});
 F.loop(cv,(c,w,h)=>{const n=F.low?N>>1:N,cols=Math.ceil(w/R)+1,G=new Map();
  for(let a=0;a<n;a++){const p=P[a];p.x=(p.x+p.vx+1)%1;p.y=(p.y+p.vy+1)%1;let x=p.x*w,y=p.y*h;const dx=x-mx,dy=y-my,q=dx*dx+dy*dy;
   if(q<19600){const dd=Math.sqrt(q)||1;x+=dx/dd*(140-dd)*.35;y+=dy/dd*(140-dd)*.35}p.sx=x;p.sy=y;const key=((x/R)|0)+((y/R)|0)*cols;(G.get(key)||G.set(key,[]).get(key)).push(a)}
  c.lineWidth=1;c.strokeStyle='rgba(230,220,203,.16)';c.beginPath();
  for(let a=0;a<n;a++){const p=P[a],gx=(p.sx/R)|0,gy=(p.sy/R)|0;let links=0;
   for(let ox=0;ox<=1&&links<4;ox++)for(let oy=-1;oy<=1&&links<4;oy++){if(ox===0&&oy<0)continue;const cell=G.get(gx+ox+(gy+oy)*cols);if(!cell)continue;
    for(const b of cell){if(b<=a&&ox===0&&oy===0)continue;const q=P[b];const dx=p.sx-q.sx,dy=p.sy-q.sy;if(dx*dx+dy*dy<R2){c.moveTo(p.sx,p.sy);c.lineTo(q.sx,q.sy);if(++links>=4)break}}}}
  c.stroke();c.fillStyle='rgba(230,220,203,.6)';c.beginPath();for(let a=0;a<n;a++){const p=P[a];c.moveTo(p.sx+1.6,p.sy);c.arc(p.sx,p.sy,1.6,0,6.3)}c.fill();
  if(mx>-1e3){c.fillStyle='rgba(255,200,140,.95)';c.beginPath();for(let a=0;a<n;a++){const p=P[a],dx=p.sx-mx,dy=p.sy-my;if(dx*dx+dy*dy<32400){c.moveTo(p.sx+2.6,p.sy);c.arc(p.sx,p.sy,2.6,0,6.3)}}c.fill()}})}
/* horizontal showcase */
const g=d.querySelector('section.grid');if(g&&innerWidth>=1024){const cards=[...g.querySelectorAll(':scope>.card')];if(cards.length){
 const pin=d.createElement('div'),st=d.createElement('div'),tr=d.createElement('div');pin.className='hs-pin';st.className='hs-stick';tr.className='hs-track';
 cards.forEach(c=>tr.append(c));st.append(tr);pin.append(st);g.append(pin);
 let H=0;const set=()=>{const ex=Math.max(0,tr.scrollWidth-innerWidth);H=innerHeight+ex;pin.style.setProperty('--hs-h',H+'px');return ex};let ex=set();addEventListener('resize',()=>ex=set());
 let top=0;const mt=()=>{top=pin.getBoundingClientRect().top+scrollY};mt();addEventListener('resize',mt,{passive:true});addEventListener('load',mt);
 F.scroll(y=>{const span=H-innerHeight||1,p=Math.min(1,Math.max(0,(y-top)/span));tr.style.transform=`translate3d(${(-p*ex).toFixed(1)}px,0,0)`})}}
})();
