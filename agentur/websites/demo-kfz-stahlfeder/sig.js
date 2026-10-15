/* sig.js – Werkstatt Stahlfeder: Zahnräder + Kolben, Funken, Tacho, Metall-Glanz */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-gear{animation:fxRot 14s linear infinite;transform-box:fill-box;transform-origin:center}.fx-gear.r{animation-direction:reverse;animation-duration:9s}
@keyframes fxRot{to{transform:rotate(360deg)}}.fx-pis{animation:fxPis 1.1s ease-in-out infinite alternate}@keyframes fxPis{to{transform:translateY(40px)}}
h1,h2{background:linear-gradient(110deg,currentColor 40%,#fff 50%,currentColor 60%) 0 0/250% 100% no-repeat;-webkit-background-clip:text;background-clip:text}
h1.sheen,h2.sheen{color:transparent;-webkit-text-fill-color:transparent;animation:fxSheen 3.5s ease-in-out infinite;background-image:linear-gradient(110deg,#d9d4cc 40%,#fff 50%,#d9d4cc 60%)}
@keyframes fxSheen{0%{background-position:150% 0}60%,100%{background-position:-60% 0}}
.fx-tacho{position:absolute;right:3%;bottom:4%;width:150px;opacity:.85}`;
d.querySelectorAll('h1,h2').forEach(h=>h.classList.add('sheen'));
const hero=d.querySelector('.hero');if(!hero)return;const sv=F.layer(hero,'svg');sv.setAttribute('viewBox','0 0 1000 600');sv.setAttribute('preserveAspectRatio','xMaxYMid slice');
const gear=(cx,cy,r,t,cls)=>{let p='';for(let i=0;i<t*2;i++){const a=i*Math.PI/t,rr=i%2?r:r*1.14;p+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(1)+' '+(cy+Math.sin(a)*rr).toFixed(1)}
 return `<g class="fx-gear ${cls}"><path d="${p}Z" fill="none" stroke="rgba(201,148,58,.28)" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.35}" fill="none" stroke="rgba(201,148,58,.28)" stroke-width="3"/></g>`};
sv.innerHTML=gear(880,120,90,12,'')+gear(735,210,55,9,'r')+gear(60,520,70,10,'r')+`<g class="fx-pis"><rect x="940" y="300" width="40" height="70" rx="4" fill="none" stroke="rgba(220,220,220,.2)" stroke-width="3"/><line x1="960" y1="370" x2="960" y2="440" stroke="rgba(220,220,220,.2)" stroke-width="5"/></g>`;
/* tacho */
const t=d.createElement('div');t.className='fx-tacho fx-sig';t.setAttribute('aria-hidden','true');
t.innerHTML='<svg viewBox="0 0 120 80"><path d="M10 70 A50 50 0 0 1 110 70" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="8"/><path id="tA" d="M10 70 A50 50 0 0 1 110 70" fill="none" stroke="#c9943a" stroke-width="8" stroke-dasharray="157" stroke-dashoffset="157"/><line id="tN" x1="60" y1="70" x2="18" y2="70" stroke="#fff" stroke-width="2.5" style="transform-origin:60px 70px"/><text id="tT" x="60" y="62" fill="#fff" font-size="15" text-anchor="middle" font-family="sans-serif">0</text><text x="60" y="78" fill="#aaa" font-size="7" text-anchor="middle" font-family="sans-serif">% CHECK</text></svg>';
hero.append(t);F.seen(t,()=>{const t0=performance.now(),A=t.querySelector('#tA'),N=t.querySelector('#tN'),T=t.querySelector('#tT');
 const s=n=>{const p=Math.min(1,(n-t0)/1800),e=1-Math.pow(1-p,3)+(p<1?Math.sin(p*20)*.02:0),v=Math.min(1,e);A.style.strokeDashoffset=157*(1-v);N.style.transform=`rotate(${v*180}deg)`;T.textContent=Math.round(v*100);if(p<1)requestAnimationFrame(s)};requestAnimationFrame(s)},.5);
/* sparks on hover */
if(!F.fine)return;const cv=d.createElement('canvas');cv.className='fx-sig';cv.setAttribute('aria-hidden','true');cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:240';d.body.append(cv);
const c=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio);const sz=()=>{cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;c.setTransform(dpr,0,0,dpr,0,0)};sz();addEventListener('resize',sz);
let P=[],raf=0;const run=()=>{c.clearRect(0,0,innerWidth,innerHeight);P=P.filter(p=>(p.l-=.03)>0);P.forEach(p=>{p.vy+=.25;p.x+=p.vx;p.y+=p.vy;c.strokeStyle=`rgba(255,${180+Math.random()*60|0},80,${p.l})`;c.lineWidth=1.5;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x-p.vx*2,p.y-p.vy*2);c.stroke()});raf=P.length?requestAnimationFrame(run):0};
d.querySelectorAll('.btn, article, h2').forEach(el=>el.addEventListener('pointerenter',e=>{for(let i=0;i<22;i++)P.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*9,vy:-Math.random()*7,l:1});if(!raf)raf=requestAnimationFrame(run)}));
})();
