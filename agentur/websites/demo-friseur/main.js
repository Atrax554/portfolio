(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let first = null;
      const chk = (id, msg, ok) => {
        const el = document.getElementById(id);
        const er = document.getElementById(id + '-err');
        if (!ok(el)) {
          el.setAttribute('aria-invalid', 'true');
          er.textContent = msg;
          first = first || el;
        } else {
          el.removeAttribute('aria-invalid');
          er.textContent = '';
        }
      };
      chk('name', 'Bitte geben Sie Ihren Namen ein.', (el) => el.value.trim().length > 1);
      chk('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', (el) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())
      );
      chk('msg', 'Bitte schreiben Sie uns kurz Ihr Anliegen.', (el) => el.value.trim().length > 4);
      chk('consent', 'Bitte bestätigen Sie die Einwilligung.', (el) => el.checked);
      const s = document.getElementById('form-status');
      if (first) {
        s.textContent = 'Bitte prüfen Sie die markierten Felder.';
        first.focus();
        return;
      }
      s.textContent = 'Danke! (Demo: Es wurden keine Daten gesendet.)';
      form.reset();
    });
  }

  const header = document.querySelector('.site-header');
  if (header && !reduce) {
    const onScroll = () => header.classList.toggle('is-compact', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (reduce) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const groups = new Map();
  reveals.forEach((el) => {
    if (!el.classList.contains('reveal-child')) return;
    const parent = el.closest('.price-grid, .gallery, .split, section') || el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((kids) => {
    kids.forEach((el, i) => el.style.setProperty('--stagger', i * 90 + 'ms'));
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
})();
