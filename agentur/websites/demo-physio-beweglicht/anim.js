/* anim.js – shared motion layer, no libraries */
(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;const d=document;
const bg=d.createElement('div');bg.className='fx-bg';bg.setAttribute('aria-hidden','true');
const nz=d.createElement('div');nz.className='fx-noise';nz.setAttribute('aria-hidden','true');d.body.prepend(bg,nz);
/* ticker of services before footer */
const ft=d.querySelector('footer');const items=[...new Set([...d.querySelectorAll('main h3, section h3')].map(h=>h.textContent.trim()).filter(t=>t&&t.length<40))].slice(0,10);
if(ft&&items.length>=3){const tk=d.createElement('div');tk.className='fx-ticker';tk.setAttribute('aria-hidden','true');
 const tr=d.createElement('div');tr.className='fx-track';[...items,...items].forEach(t=>{const s=d.createElement('span');s.textContent=t;tr.append(s)});tk.append(tr);ft.before(tk)}
if(rm)return;
/* hero word reveal */
const h1=d.querySelector('h1');if(h1&&!h1.querySelector('*')){const t=h1.textContent.trim();h1.setAttribute('aria-label',t);h1.textContent='';
 t.split(/\s+/).forEach((w,i)=>{const s=d.createElement('span');s.className='fx-w';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=w;h1.append(s,' ')})}
/* scroll reveals */
const kinds=['up','left','scale','right','wipe'];let k=0;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
d.querySelectorAll('main section, section').forEach((sec,si)=>{if(si===0&&sec.querySelector('h1'))return;
 const kids=[...sec.querySelectorAll(':scope h2, :scope article, :scope li, :scope figure, :scope blockquote, :scope .card, :scope p')].filter(el=>!el.closest('[data-fx]')&&!el.closest('nav')&&!el.closest('form')).slice(0,24);
 const kind=kinds[k++%kinds.length];kids.forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)return;
  el.dataset.fx=el.tagName==='H2'?'wipe':(kind==='wipe'?'up':kind);el.style.setProperty('--fxd',(i%6)*70+'ms');io.observe(el)})});
/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,m=el.dataset.fxn.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
 const end=parseFloat(m[2].replace(',','.')),dec=(m[2].split(/[.,]/)[1]||'').length,sep=m[2].includes(',')?',':'.';const t0=performance.now();
 const step=n=>{const p=Math.min(1,(n-t0)/1400),v=end*(1-Math.pow(1-p,3));el.textContent=m[1]+v.toFixed(dec).replace('.',sep)+m[3];if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});
d.querySelectorAll('main *, section *').forEach(el=>{if(el.children.length)return;const t=el.textContent.trim();
 if(/^\D{0,2}\d{1,4}(?:[.,]\d)?\s?(\+|%|★|\/\d+|h|min)?$/.test(t)&&!el.closest('a,button,label,time,nav,form,footer')&&!/^(19|20)\d\d$/.test(t)){
  const r=el.getBoundingClientRect();if(r.top<innerHeight||!r.width)return;el.classList.add('fx-num');el.style.display='inline-block';el.style.minWidth=r.width+'px';el.dataset.fxn=t;cio.observe(el)}});
/* image hover zoom + parallax */
d.querySelectorAll('img').forEach(img=>{const p=img.parentElement;if(p&&!img.closest('header,nav'))p.classList.add('fx-zoom')});
const hero=d.querySelector('section img, header img:not([width="32"])');const par=[];if(hero){hero.classList.add('fx-par');par.push(hero)}
let tick=false;addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{const y=scrollY;par.forEach(el=>{if(y<innerHeight*1.2)el.style.transform=`translate3d(0,${y*.18}px,0) scale(1.08)`});tick=false})},{passive:true});
if(!fine)return;
/* cursor glow */
const g=d.createElement('div');g.className='fx-glow';g.setAttribute('aria-hidden','true');d.body.append(g);
addEventListener('pointermove',e=>{g.classList.add('on');g.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`},{passive:true});
d.addEventListener('pointerleave',()=>g.classList.remove('on'));
/* magnetic buttons */
d.querySelectorAll('.btn, button, a[class*="btn"], .cta').forEach(b=>{b.classList.add('fx-mag');
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
 b.addEventListener('pointerleave',()=>b.style.transform='')});
/* 3D tilt cards */
d.querySelectorAll('article, .card, [class*="card"]:not(.fx-mag)').forEach(c=>{if(c.closest('[class*="card"]')!==c&&c.matches('[class*="card"] *'))return;c.classList.add('fx-tilt');
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*8}deg) translateZ(0)`});
 c.addEventListener('pointerleave',()=>c.style.transform='')});
})();
