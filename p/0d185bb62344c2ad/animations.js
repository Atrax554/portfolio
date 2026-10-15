// Grok Empire animations: sticky shrinking header + staggered scroll reveal. No dependencies.
(function(){
  var d=document.documentElement;d.classList.add('js');
  var h=document.querySelector('.site-header');
  function onScroll(){if(h)h.classList.toggle('is-small',window.scrollY>24)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  document.querySelectorAll('[data-stagger]').forEach(function(g){
    g.querySelectorAll('.reveal').forEach(function(el,i){el.style.setProperty('--i',i)})});
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();
