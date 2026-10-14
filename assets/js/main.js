(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Color mode toggle ---------- */
  var modeBtn = document.getElementById('mode-toggle');
  function isDark() {
    var mode = root.getAttribute('data-mode');
    if (mode === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches;
    return mode === 'dark';
  }
  if (modeBtn) {
    modeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-mode', next);
      try { localStorage.setItem('cv-mode', next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menu-toggle');
  function closeMenu() {
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- Scroll progress ---------- */
  var progress = document.getElementById('progress');
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll spy ---------- */
  if (nav && 'IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = links[entry.target.id];
        if (!link) return;
        nav.querySelectorAll('a.is-active').forEach(function (a) { a.classList.remove('is-active'); });
        link.classList.add('is-active');
        // Keep the active link visible in an overflowing nav without touching page scroll.
        if (nav.scrollWidth > nav.clientWidth && window.innerWidth > 900) {
          var l = link.offsetLeft, r = l + link.offsetWidth;
          if (l < nav.scrollLeft) nav.scrollLeft = l;
          else if (r > nav.scrollLeft + nav.clientWidth) nav.scrollLeft = r - nav.clientWidth;
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .sidebar');
  if (document.body.classList.contains('has-anim') && !reduceMotion && 'IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(function (el) { revealer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }
  // Make sure everything is visible before printing.
  window.addEventListener('beforeprint', function () {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  });

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        var icon = btn.querySelector('i');
        btn.classList.add('is-done');
        icon.className = 'fa-solid fa-check';
        setTimeout(function () {
          btn.classList.remove('is-done');
          icon.className = 'fa-regular fa-copy';
        }, 1500);
      });
    });
  });

  /* ---------- Local time for timezone ---------- */
  document.querySelectorAll('.local-time[data-tz]').forEach(function (el) {
    var tz = el.getAttribute('data-tz');
    function render() {
      try {
        var time = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date());
        el.textContent = time + ' · ' + tz.split('/').pop().replace(/_/g, ' ');
      } catch (e) { /* invalid timezone: keep raw text */ }
    }
    render();
    setInterval(render, 30000);
  });

  /* ---------- Publication filters ---------- */
  document.querySelectorAll('.filters').forEach(function (group) {
    var list = group.parentElement.querySelector('.pub-list');
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      group.querySelectorAll('.filter').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      var f = btn.getAttribute('data-filter');
      list.querySelectorAll('.pub').forEach(function (p) {
        p.hidden = f !== 'all' && p.getAttribute('data-type') !== f;
      });
    });
  });
})();
