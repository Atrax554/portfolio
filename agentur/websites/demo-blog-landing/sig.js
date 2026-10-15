/* sig.js – VitaCheck: DNA-Helix, Daten-Pulslinie, Diagramm zeichnet sich, Schreibmaschinen-Headline */
(()=>{const F=window.FX;if(!F||F.rm)return;const d=document,css=d.createElement('style');d.head.append(css);
css.textContent=`.fx-tw::after{content:"";display:inline-block;width:0;height:.9em;box-shadow:0 0 0 1.5px currentColor;vertical-align:-.08em;animation:fxBl .8s steps(1) infinite}@keyframes fxBl{50%{opacity:0}}
.fx-tw .fx-w{animation:none;opacity:0;transform:none}.fx-tw .fx-c{opacity:0}.fx-tw .fx-c.on{opacity:1}
.fx-chart{display:block;width:100%;max-width:560px;margin:28px auto 0}.fx-chart .ln{stroke-dasharray:900;stroke-dashoffset:900;transition:stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)}
.fx-chart .bar{transform:scaleY(0);transform-origin:bottom;transform-box:fill-box;transition:transform 1s cubic-bezier(.2,1.3,.4,1)}.fx-chart.in .ln{stroke-dashoffset:0}.fx-chart.in .bar{transform:none}`;
/* typewriter (letters exist, only opacity toggled → no layout shift) */
const h=d.querySelector('h1');if(h){setTimeout(()=>{const t=h.getAttribute('aria-label')||h.textContent;h.textContent='';h.classList.add('fx-tw');
 const cs=[...t].map(ch=>{const s=d.createElement('span');s.className='fx-c';s.setAttribute('aria-hidden','true');s.textContent=ch;h.append(s);return s});let i=0;const id=setInterval(()=>{cs[i++].classList.add('on');if(i>=cs.length)clearInterval(id)},38)},0)}
/* helix + pulse */
const hero=d.querySelector('.hero');if(hero){const cv=F.layer(hero);F.loop(cv,(c,w,hh,t)=>{const n=F.low||F.mobile?20:36,y0=hh*.85;
 for(let i=0;i<n;i++){const x=i/(n-1)*w,ph=i*.45+t*1.4,a=Math.sin(ph)*24,b=-a,z=Math.cos(ph);c.strokeStyle='rgba(42,143,117,.18)';c.beginPath();c.moveTo(x,y0+a);c.lineTo(x,y0+b);c.stroke();
  c.fillStyle=`rgba(80,200,170,${.25+.35*(z>0?z:0)})`;c.beginPath();c.arc(x,y0+a,2.6,0,7);c.fill();c.fillStyle=`rgba(80,200,170,${.25+.35*(z<0?-z:0)})`;c.beginPath();c.arc(x,y0+b,2.6,0,7);c.fill()}
 c.strokeStyle='rgba(120,230,200,.5)';c.lineWidth=1.6;c.beginPath();const off=(t*220)%w;for(let x=0;x<=w;x+=4){const k=(x-off+w)%w;let y=hh*.15;if(k<60)y+=[0,-30,25,-8,0][Math.floor(k/12)]||0;x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.lineWidth=1})}
/* chart */
const tgt=d.querySelector('#so-funktionierts .wrap, #vorteile .wrap');if(tgt){const s=d.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','fx-chart fx-sig');s.setAttribute('viewBox','0 0 560 200');s.setAttribute('aria-hidden','true');
 const v=[40,70,55,95,80,120,140];s.innerHTML=v.map((y,i)=>`<rect class="bar" style="transition-delay:${i*90}ms" x="${20+i*76}" y="${180-y}" width="40" height="${y}" rx="4" fill="rgba(42,143,117,.35)"/>`).join('')+
 `<polyline class="ln" fill="none" stroke="#5fd3b0" stroke-width="3" points="${v.map((y,i)=>`${40+i*76},${170-y}`).join(' ')}"/>`;tgt.append(s);F.seen(s,x=>x.classList.add('in'),.4)}
})();
