/* fx2.js – global bold layer + helpers for sig.js */
(()=>{const d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover: hover) and (pointer: fine)').matches,mobile=innerWidth<768;
const FX=window.FX={rm,fine,mobile,
 loop(cv,draw){const dpr=Math.min(2,devicePixelRatio||1);let w=0,h=0,vis=false,raf=0,t0=performance.now();const ctx=cv.getContext('2d');
  const size=()=>{const r=cv.getBoundingClientRect();w=r.width;h=r.height;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  const run=t=>{raf=0;if(!vis||d.hidden)return;ctx.clearRect(0,0,w,h);draw(ctx,w,h,(t-t0)/1000);raf=requestAnimationFrame(run)};
  const go=()=>{if(!raf&&vis&&!d.hidden)raf=requestAnimationFrame(run)};
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;go()}).observe(cv);d.addEventListener('visibilitychange',go);
  addEventListener('resize',()=>{size()},{passive:true});size()},
 layer(host,tag='canvas'){host.classList.add('fx-host');const el=tag==='canvas'?d.createElement('canvas'):d.createElementNS('http://www.w3.org/2000/svg','svg');
  el.setAttribute('class','fx-layer');el.setAttribute('aria-hidden','true');host.prepend(el);return el},
 seen(el,cb,th=.25){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);cb(e.target)}}),{threshold:th});io.observe(el)},
 scramble(el){const txt=el.textContent,ch='▚▞#*/\\<>_=+';let f=0;const n=txt.length,id=setInterval(()=>{f++;
  el.textContent=txt.split('').map((c,i)=>c===' '||i<f*n/18?c:ch[(Math.random()*ch.length)|0]).join('');if(f>=18){clearInterval(id);el.textContent=txt}},40)}};
if(rm)return;
/* progress bar */
const pb=d.createElement('div');pb.className='fx-prog';pb.setAttribute('aria-hidden','true');d.body.append(pb);
let tk=0;const upd=()=>{tk=0;const m=d.documentElement.scrollHeight-innerHeight;pb.style.transform=`scaleX(${m>0?scrollY/m:0})`};
addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(upd)},{passive:true});upd();
/* scramble h2 on view */
d.querySelectorAll('h2').forEach(h=>{if(h.children.length)return;h.setAttribute('aria-label',h.textContent);FX.seen(h,FX.scramble,.6)});
/* page transition veil */
const v=d.createElement('div');v.className='fx-veil';v.setAttribute('aria-hidden','true');d.body.append(v);
d.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||!/\.html$|\/$/.test(u.pathname)||(u.pathname===location.pathname&&u.hash))return;
 e.preventDefault();v.classList.remove('leave');v.classList.add('cover');setTimeout(()=>location.href=u.href,430)});
addEventListener('pageshow',()=>{v.classList.remove('cover')});
/* custom cursor */
if(!fine)return;const c=d.createElement('div'),r=d.createElement('div');c.className='fx-cur';r.className='fx-ring';c.setAttribute('aria-hidden','true');r.setAttribute('aria-hidden','true');d.body.append(c,r);
let mx=-99,my=-99,rx=-99,ry=-99,run=0;const lp=()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;r.style.transform=`translate3d(${rx}px,${ry}px,0)`;run=Math.abs(mx-rx)+Math.abs(my-ry)>.3?requestAnimationFrame(lp):0};
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;c.style.transform=`translate3d(${mx}px,${my}px,0)`;r.classList.toggle('hot',!!e.target.closest('a,button,input,textarea,select,label'));if(!run)run=requestAnimationFrame(lp)},{passive:true});
})();
