/* sig.js – Tischlerei Holzwerk: Holzmaserung zeichnet sich, Sägespäne, Bretter fügen sich zusammen */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-grain path{fill:none;stroke:rgba(214,170,110,.22);stroke-width:1.4;stroke-dasharray:var(--l);stroke-dashoffset:var(--l);animation:fxGr 3.2s cubic-bezier(.4,0,.2,1) forwards;animation-delay:var(--dl)}
@keyframes fxGr{to{stroke-dashoffset:0}}
.plank{opacity:0;transition:opacity .6s,transform 1.1s cubic-bezier(.2,.9,.25,1)}.plank.l{transform:translateX(-90px) rotate(-1.5deg)}.plank.r{transform:translateX(90px) rotate(1.5deg)}.plank.in{opacity:1;transform:none}`;
const hero=d.querySelector('.hero');if(!hero)return;const sv=F.layer(hero,'svg');sv.classList.add('fx-grain');sv.setAttribute('viewBox','0 0 1000 600');sv.setAttribute('preserveAspectRatio','none');
let h='';for(let i=0;i<(F.mobile?10:20);i++){const y=20+i*30;let p=`M-10 ${y}`;for(let x=0;x<=1010;x+=50){const knot=Math.exp(-((x-620)**2+(y-300)**2)/9000)*40;p+=` Q ${x-25} ${y+Math.sin(x/80+i)*6-knot} ${x} ${y+Math.sin(x/120+i*.7)*8-knot*.6}`}
 h+=`<path d="${p}" style="--l:1400;--dl:${i*90}ms"/>`}sv.innerHTML=h;
/* sawdust */
const cv=d.createElement('canvas');cv.className='fx-layer';cv.setAttribute('aria-hidden','true');hero.prepend(cv);const N=F.mobile?40:110,P=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),s:Math.random()}));
F.loop(cv,(c,w,hh,t)=>{P.forEach(p=>{p.y+=.0008+p.s*.0012;p.x+=Math.sin(t+p.s*20)*.0006;if(p.y>1){p.y=0;p.x=Math.random()}c.fillStyle=`rgba(230,190,130,${.25+p.s*.45})`;c.fillRect(p.x*w,p.y*hh,1+p.s*2.2,1+p.s*1.4)})});
/* planks */
d.querySelectorAll('main article, .fact, .split__media, .split > *').forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add('plank',i%2?'r':'l');F.seen(el,e=>e.classList.add('in'),.15)});
})();
