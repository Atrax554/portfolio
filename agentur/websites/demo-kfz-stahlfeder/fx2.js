/* fx2.js – global layer + shared engine: ONE rAF loop, adaptive quality, no custom cursor */
(()=>{const d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover: hover) and (pointer: fine)').matches,mobile=innerWidth<768;
const jobs=new Set();let raf=0,last=0,slow=0;
const frame=t=>{raf=0;if(d.hidden)return;const dt=last?t-last:16;last=t;
 /* adaptive quality: <45fps for 1s → FX.low */
 if(!FX.low&&jobs.size){if(dt>22.2){slow+=dt;if(slow>1000){FX.low=true;d.documentElement.classList.add('fx-low');FX.onLow.forEach(f=>f())}}else slow=Math.max(0,slow-dt)}
 let any=false;jobs.forEach(j=>{if(j.on){any=true;j.fn(t)}});if(any)raf=requestAnimationFrame(frame);else last=0};
const kick=()=>{if(!raf&&!d.hidden)raf=requestAnimationFrame(frame)};d.addEventListener('visibilitychange',()=>{last=0;kick()});
const FX=window.FX={rm,fine,mobile,low:false,onLow:[],
 /* register a per-frame job that only runs while el is on screen */
 job(el,fn){const j={fn,on:false};jobs.add(j);new IntersectionObserver(e=>{j.on=e[0].isIntersecting;kick()}).observe(el);return j},
 loop(cv,draw){const dpr=Math.min(mobile?1.5:2,devicePixelRatio||1);let w=0,h=0;const ctx=cv.getContext('2d'),t0=performance.now();
  const size=()=>{w=cv.clientWidth;h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  let rs=0;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(size,150)},{passive:true});size();
  FX.job(cv,t=>{ctx.clearRect(0,0,w,h);draw(ctx,w,h,(t-t0)/1000)})},
 layer(host,tag='canvas'){host.classList.add('fx-host');const el=tag==='canvas'?d.createElement('canvas'):d.createElementNS('http://www.w3.org/2000/svg','svg');
  el.setAttribute('class','fx-layer');el.setAttribute('aria-hidden','true');host.prepend(el);return el},
 /* fail-safe: shared FXR registry (IO threshold 0 + rect poll), threshold arg ignored on purpose */
 seen(el,cb){if(window.FXR)FXR.add(el,cb);else cb(el)},
 /* scroll: one passive listener, callbacks run once per frame */
 scroll(cb){FX._sc.push(cb);cb(scrollY)},_sc:[],
 scramble(el){if(el.dataset.fxs)return;el.dataset.fxs=1;const txt=el.textContent,ch='▚▞#*/\\<>_=+',n=txt.length,t0=performance.now();
  const st=t=>{const f=Math.min(18,(t-t0)/40);el.textContent=txt.split('').map((c,i)=>c===' '||i<f*n/18?c:ch[(i*7+(f|0))%ch.length]).join('');if(f<18)requestAnimationFrame(st);else el.textContent=txt};requestAnimationFrame(st)}};
let st=0;addEventListener('scroll',()=>{if(st)return;st=requestAnimationFrame(()=>{st=0;const y=scrollY;FX._sc.forEach(f=>f(y))})},{passive:true});
if(rm)return;
const pb=d.createElement('div');pb.className='fx-prog';pb.setAttribute('aria-hidden','true');d.body.append(pb);
let maxS=1;const mz=()=>maxS=Math.max(1,d.documentElement.scrollHeight-innerHeight);mz();addEventListener('resize',mz,{passive:true});addEventListener('load',mz);
FX.scroll(y=>pb.style.transform=`scaleX(${Math.min(1,y/maxS)})`);
d.querySelectorAll('h2').forEach(h=>{if(h.children.length)return;h.setAttribute('aria-label',h.textContent);FX.seen(h,FX.scramble,.6)});
const v=d.createElement('div');v.className='fx-veil';v.setAttribute('aria-hidden','true');d.body.append(v);
d.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||!/\.html$|\/$/.test(u.pathname)||(u.pathname===location.pathname&&u.hash))return;
 e.preventDefault();v.classList.add('cover');setTimeout(()=>location.href=u.href,430)});
addEventListener('pageshow',()=>v.classList.remove('cover'));
})();
