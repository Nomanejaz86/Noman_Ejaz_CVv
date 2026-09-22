/* =========================================================
   Noman Ejaz — PORTFOLIO SCRIPTS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Light / Dark Mode Toggle Logic ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'bi bi-sun-fill';
      } else {
        themeIcon.className = 'bi bi-moon-fill';
      }
    }
  }

  /* ---------- Navbar background on scroll ---------- */
  const nav = document.getElementById('kfNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll(){
    const scrollY = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', scrollY > 20);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.getElementById('kfBurger');
  const links = document.getElementById('kfLinks');

  function closeMenu(){
    if (burger) burger.classList.remove('open');
    if (links) links.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && links) {
    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting){
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated skill bars ---------- */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const card = entry.target;
        const level = card.getAttribute('data-level') || 0;
        const fill = card.querySelector('.skill-bar-fill');
        if (fill) {
          requestAnimationFrame(() => {
            fill.style.width = level + '%';
          });
        }
        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.4 });

  skillCards.forEach(card => skillObserver.observe(card));

});