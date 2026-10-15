(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.getElementById('nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o);});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  }
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      let first=null;
      const chk=(id,msg,ok)=>{const el=document.getElementById(id);const er=document.getElementById(id+'-err');if(!ok(el)){el.setAttribute('aria-invalid','true');er.textContent=msg;first=first||el;}else{el.removeAttribute('aria-invalid');er.textContent='';}};
      chk('name','Bitte Namen eingeben.',el=>el.value.trim().length>1);
      chk('email','Bitte gültige E-Mail.',el=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      chk('msg','Bitte kurz Ihr Anliegen.',el=>el.value.trim().length>4);
      chk('consent','Bitte Einwilligung bestätigen.',el=>el.checked);
      const s=document.getElementById('form-status');
      if(first){s.textContent='Bitte markierte Felder prüfen.';first.focus();return;}
      s.textContent='Danke! (Demo: keine Daten gesendet.)';form.reset();
    });
  }
  if(reduce){document.querySelectorAll('.reveal,.hero-anim').forEach(el=>el.classList.add('is-in'));return;}
  const io=new IntersectionObserver(ents=>{ents.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  requestAnimationFrame(()=>document.querySelectorAll('.hero-anim').forEach(el=>el.classList.add('is-in')));
})();