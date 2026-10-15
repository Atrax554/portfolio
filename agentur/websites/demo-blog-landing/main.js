(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toggle=document.querySelector('.nav-toggle'), nav=document.getElementById('nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o)});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
  }
  const header=document.querySelector('.site-header');
  if(header&&!reduce){
    const on=()=>header.classList.toggle('is-compact',scrollY>20);
    on(); addEventListener('scroll',on,{passive:true});
  }
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed','false'));
      chip.setAttribute('aria-pressed','true');
      const f=chip.dataset.filter;
      document.querySelectorAll('#post-grid .post-card').forEach(card=>{
        const show=f==='all'||card.dataset.cat===f;
        card.classList.toggle('is-hidden',!show);
      });
    });
  });
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault(); let first=null;
      const chk=(id,msg,ok)=>{
        const el=document.getElementById(id), er=document.getElementById(id+'-err');
        if(!ok(el)){el.setAttribute('aria-invalid','true');if(er)er.textContent=msg;first=first||el;}
        else{el.removeAttribute('aria-invalid');if(er)er.textContent='';}
      };
      chk('name','Bitte Namen angeben.',el=>el.value.trim().length>1);
      chk('email','Bitte gültige E-Mail angeben.',el=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      chk('msg','Bitte Nachricht eingeben.',el=>el.value.trim().length>4);
      chk('consent','Bitte Einwilligung bestätigen.',el=>el.checked);
      const s=document.getElementById('form-status');
      if(first){s.textContent='Bitte markierte Felder prüfen.';first.focus();return;}
      s.textContent='Danke! (Demo: keine Daten gesendet.)'; form.reset();
    });
  }
  if(reduce){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-in'));return;}
  const reveals=document.querySelectorAll('.reveal');
  if(!reveals.length||!('IntersectionObserver' in window)){reveals.forEach(el=>el.classList.add('is-in'));return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});
  },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  reveals.forEach(el=>io.observe(el));
})();
