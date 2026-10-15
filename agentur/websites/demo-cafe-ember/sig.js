/* sig.js – Café Ember: Dampf, Glut-Funken, Lichtflackern, Karten werden ausgeteilt */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.hero::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 50% at 70% 40%,rgba(255,150,60,.10),transparent 70%);animation:fxGlow 3.2s ease-in-out infinite alternate}
@keyframes fxGlow{0%{opacity:.5}30%{opacity:.9}55%{opacity:.6}80%{opacity:1}100%{opacity:.7}}
.deal{opacity:0;transform:translate(-120px,-60px) rotate(-14deg) scale(.9);transition:opacity .6s,transform .8s cubic-bezier(.2,1.2,.3,1);transition-delay:var(--dl)}
.deal.in{opacity:1;transform:none}`;
const hero=d.querySelector('.hero');if(hero){const cv=F.layer(hero);const N=F.mobile?16:36,S=[],E=[];
 for(let i=0;i<N;i++)S.push({t:Math.random()});for(let i=0;i<(F.mobile?10:24);i++)E.push({x:Math.random(),y:Math.random(),s:Math.random()});
 F.loop(cv,(c,w,h,t)=>{const cx=w*(w>800?.72:.5),cy=h*.82;
  S.forEach((p,i)=>{if(F.low&&i%2)return;p.t+=.004;if(p.t>1)p.t=0;const y=cy-p.t*h*.75,x=cx+Math.sin(p.t*9+t*1.4+p.t*20)*30*p.t;c.fillStyle=`rgba(240,230,215,${.09*(1-p.t)})`;c.beginPath();c.arc(x,y,6+p.t*30,0,7);c.fill()});
  c.globalCompositeOperation='lighter';E.forEach((e,i)=>{if(F.low&&i%2)return;e.y-=.0016*(.5+e.s);e.x+=Math.sin(t*2+e.s*9)*.0008;if(e.y<0){e.y=1;e.x=Math.random()}const a=.4+.6*Math.abs(Math.sin(t*6+e.s*30));
   c.fillStyle=`rgba(255,${140+e.s*60|0},60,${a})`;c.beginPath();c.arc(e.x*w,e.y*h,1+e.s*1.6,0,7);c.fill()});c.globalCompositeOperation='source-over'})}
d.querySelectorAll('#leistungen article, #leistungen li').forEach((el,i)=>{el.classList.add('deal');el.style.setProperty('--dl',i*120+'ms')});
const L=d.querySelector('#leistungen');if(L)F.seen(L,()=>L.querySelectorAll('.deal').forEach(e=>e.classList.add('in')),.15);
})();
