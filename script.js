(function () {
  'use strict';

  /* ---- 顶部导航阴影 ---- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---- 移动端菜单 ---- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- 入场动画 ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          revealIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 主导航 scrollspy ---- */
  var navLinks = document.querySelectorAll('.main-nav a[data-spy]');
  var spySections = ['about', 'modules', 'fit', 'deliver'].map(function (id) {
    return document.getElementById(id);
  });
  function spy() {
    var pos = window.scrollY + 140;
    var current = null;
    spySections.forEach(function (sec) {
      if (sec && sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-spy') === current);
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* ---- 服务模块侧栏 scrollspy ---- */
  var railLinks = document.querySelectorAll('#railList a');
  var modules = Array.prototype.slice.call(document.querySelectorAll('.module'));
  if (railLinks.length && 'IntersectionObserver' in window) {
    var modIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          railLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('data-mod') === id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    modules.forEach(function (m) { modIO.observe(m); });
  }
})();
