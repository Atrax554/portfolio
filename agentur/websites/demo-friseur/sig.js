/* sig.js – Salon Lindgrün: fließende Haarsträhnen, Scheren-Schnitt-Reveal */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-hair path{fill:none;stroke-linecap:round}
.cut{position:relative}.cut::before,.cut::after{content:"";position:absolute;left:0;right:0;z-index:5;pointer-events:none;background:var(--bg,#1a1c1b);transition:transform 1s cubic-bezier(.75,0,.2,1)}
.cut::before{top:0;height:51%;transform-origin:top}.cut::after{bottom:0;height:51%;transform-origin:bottom}.cut.open::before{transform:translateY(-101%)}.cut.open::after{transform:translateY(101%)}
.fx-sc{position:absolute;left:-60px;top:50%;z-index:6;width:46px;height:46px;margin-top:-23px;pointer-events:none;opacity:0}
.cut.open .fx-sc{animation:fxSc 1s cubic-bezier(.6,0,.3,1) forwards}@keyframes fxSc{0%{opacity:1;transform:translateX(0)}90%{opacity:1}100%{opacity:0;transform:translateX(calc(100vw + 60px))}}
.fx-sc .b{transform-origin:23px 23px;animation:fxSnip .18s linear infinite alternate}@keyframes fxSnip{to{transform:rotate(18deg)}}`;
const hero=d.querySelector('.hero');if(hero){const sv=F.layer(hero,'svg');sv.classList.add('fx-hair');sv.setAttribute('viewBox','0 0 1000 600');sv.setAttribute('preserveAspectRatio','none');
 const n=F.mobile?5:10;sv.innerHTML=Array.from({length:n},(_,i)=>`<path stroke="rgba(${180+i*4},${200-i*3},170,${.06+i%4*.03})" stroke-width="${1+i%3}"/>`).join('');const ps=[...sv.children];
 let fr=0;F.job(hero,t=>{if(F.low&&(fr++&1))return;ps.forEach((p,i)=>{const o=i*38-40,a=Math.sin(t*.0007+i*.5)*60,b=Math.cos(t*.0005+i*.7)*80;
  p.setAttribute('d',`M${-50+o} -20 C ${250+a+o} ${180+b}, ${450-a+o} ${380-b}, ${1050+o*.3} ${620+a*.4}`)})})}
const sc='<svg class="fx-sc" viewBox="0 0 46 46" aria-hidden="true"><g stroke="#d6e3cf" stroke-width="2.5" fill="none"><circle cx="8" cy="15" r="6"/><circle cx="8" cy="31" r="6"/><path d="M13 18 L44 30"/><path class="b" d="M13 28 L44 16"/></g></svg>';
d.querySelectorAll('main section:not(.hero)').forEach(s=>{if(s.getBoundingClientRect().top<innerHeight)return;s.classList.add('cut');s.insertAdjacentHTML('afterbegin',sc);F.seen(s,x=>x.classList.add('open'),.12)});
})();
