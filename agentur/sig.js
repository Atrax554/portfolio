/* sig.js – Portfolio: Netzwerk-Hero, Intro, Morph-Karten, horizontaler Showcase */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-intro{position:fixed;inset:0;z-index:400;display:grid;place-items:center;background:#0b0b0d;pointer-events:none;clip-path:inset(0 0 0 0);animation:fxCur 0.7s .9s cubic-bezier(.7,0,.2,1) forwards}
.fx-intro svg{width:120px;height:120px}.fx-intro path{fill:none;stroke:#e6dccb;stroke-width:3;stroke-dasharray:400;stroke-dashoffset:400;animation:fxDraw .85s ease forwards}
@keyframes fxDraw{to{stroke-dashoffset:0}}@keyframes fxCur{to{clip-path:inset(0 0 100% 0)}}
.card{transition:border-radius .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s,transform .25s}.card:hover{border-radius:28px 6px 28px 6px;box-shadow:0 30px 60px -20px rgba(0,0,0,.7),0 0 0 1px rgba(230,220,203,.25)}
.card .thumb{transition:clip-path .6s cubic-bezier(.2,.7,.2,1);clip-path:inset(0 0 0 0 round 0)}.card:hover .thumb{clip-path:inset(4% 4% 0 4% round 18px)}
@media (min-width:1024px){.hs-pin{height:var(--hs-h)}.hs-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:center}
.hs-track{display:flex;gap:28px;padding:0 6vw;will-change:transform}.hs-track>.card{flex:0 0 min(440px,38vw)}}`;
/* intro */
if(!sessionStorage.fxIntro){sessionStorage.fxIntro=1;const i=d.createElement('div');i.className='fx-intro fx-sig';i.setAttribute('aria-hidden','true');
 i.innerHTML='<svg viewBox="0 0 100 100"><path d="M20 70 L50 20 L80 70 Z M35 55 H65"/></svg>';d.body.append(i);setTimeout(()=>i.remove(),1800)}
/* network hero */
const hero=d.querySelector('header.wrap');if(hero){const cv=F.layer(hero);const n=F.mobile?40:90,P=[];let mx=-1e3,my=-1e3;
 for(let k=0;k<n;k++)P.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006});
 hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});hero.addEventListener('pointerleave',()=>{mx=my=-1e3});
 F.loop(cv,(c,w,h)=>{const pts=P.map(p=>{p.x=(p.x+p.vx+1)%1;p.y=(p.y+p.vy+1)%1;let x=p.x*w,y=p.y*h;const dx=x-mx,dy=y-my,dd=Math.hypot(dx,dy);if(dd<140){x+=dx/dd*(140-dd)*.35;y+=dy/dd*(140-dd)*.35}return[x,y]});
  for(let a=0;a<n;a++)for(let b=a+1;b<n;b++){const dd=Math.hypot(pts[a][0]-pts[b][0],pts[a][1]-pts[b][1]);if(dd<120){c.strokeStyle=`rgba(230,220,203,${(1-dd/120)*.22})`;c.beginPath();c.moveTo(...pts[a]);c.lineTo(...pts[b]);c.stroke()}}
  pts.forEach(([x,y])=>{const near=Math.hypot(x-mx,y-my)<180;c.fillStyle=near?'rgba(255,200,140,.95)':'rgba(230,220,203,.6)';c.beginPath();c.arc(x,y,near?2.6:1.6,0,7);c.fill()})})}
/* horizontal showcase */
const g=d.querySelector('section.grid');if(g&&innerWidth>=1024){const cards=[...g.querySelectorAll(':scope>.card')];if(cards.length){
 const pin=d.createElement('div'),st=d.createElement('div'),tr=d.createElement('div');pin.className='hs-pin';st.className='hs-stick';tr.className='hs-track';
 cards.forEach(c=>tr.append(c));st.append(tr);pin.append(st);g.append(pin);
 const set=()=>{const ex=Math.max(0,tr.scrollWidth-innerWidth);pin.style.setProperty('--hs-h',(innerHeight+ex)+'px');return ex};let ex=set();addEventListener('resize',()=>ex=set());
 let t=0;addEventListener('scroll',()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;const r=pin.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(pin.offsetHeight-innerHeight||1)));tr.style.transform=`translate3d(${-p*ex}px,0,0)`})},{passive:true})}}
})();
