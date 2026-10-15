/* sig.js – Praxis BewegLicht: fließende Körperlinie, Atem-Puls, elastische Federn */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-wave path{fill:none;stroke-linecap:round}.breath{animation:fxBreath 4.8s ease-in-out infinite}
@keyframes fxBreath{0%,100%{transform:scale(1)}45%{transform:scale(1.035)}}
.spring{opacity:0;transform:translateY(60px) scale(.9)}.spring.in{opacity:1;transform:none;transition:opacity .5s,transform 1s cubic-bezier(.34,1.8,.5,1);transition-delay:var(--dl)}
.facts li{position:relative}.facts li::before{content:"";position:absolute;left:-14px;top:.55em;width:7px;height:7px;border-radius:50%;background:var(--accent);animation:fxPulse 2.4s ease-out infinite}
@keyframes fxPulse{0%{transform:scale(1);opacity:1}70%{transform:scale(2.6);opacity:0}100%{opacity:0}}`;
const hero=d.querySelector('.hero');if(hero){const sv=F.layer(hero,'svg');sv.classList.add('fx-wave');sv.setAttribute('viewBox','0 0 1000 600');sv.setAttribute('preserveAspectRatio','none');
 sv.innerHTML=[0,1,2].map(i=>`<path stroke="rgba(94,184,176,${.35-i*.09})" stroke-width="${3-i*.7}"/>`).join('');const ps=[...sv.children];let s=0;
 const draw=t=>{ps.forEach((p,i)=>{let dd='M0 '+(420+i*30);for(let x=0;x<=1000;x+=50){const y=420+i*30+Math.sin(x/140+t*.0012+i+s/180)*(50+s/12)+Math.cos(x/90-t*.0008)*20;dd+=` L${x} ${y.toFixed(1)}`}p.setAttribute('d',dd)})};
 let vis=true,raf;new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(l)}).observe(hero);
 const l=t=>{raf=0;if(!vis||d.hidden)return;draw(t);raf=requestAnimationFrame(l)};d.addEventListener('visibilitychange',()=>{if(!d.hidden&&!raf)raf=requestAnimationFrame(l)});raf=requestAnimationFrame(l);
 addEventListener('scroll',()=>s=Math.min(scrollY,600),{passive:true});
 const img=hero.querySelector('img');img&&img.parentElement.classList.add('breath')}
d.querySelectorAll('.btn').forEach(b=>b.classList.add('breath'));
d.querySelectorAll('main article, .hours>div').forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)return;el.classList.add('spring');el.style.setProperty('--dl',(i%3)*110+'ms');F.seen(el,e=>e.classList.add('in'),.2)});
})();
