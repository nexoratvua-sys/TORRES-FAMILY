(() => {
  const photos = ['hero.jpg', 'flag.jpg', 'garage.jpg', 'leadership.jpg', 'rules.jpg', 'hierarchy.jpg', 'invite.jpg'];
  const missing = [];
  photos.forEach(file => {
    const image = new Image();
    image.onerror = () => missing.push(file);
    image.src = `assets/images/${file}`;
  });
  window.addEventListener('load', () => window.setTimeout(() => {
    if (missing.length) console.warn('Закинь свої фото hero.jpg, flag.jpg, garage.jpg, leadership.jpg, rules.jpg, hierarchy.jpg, invite.jpg в Desktop/TORRES-FAMILY/assets/images/');
  }, 300));

  const loader = document.querySelector('.page-loader');
  const startedAt = performance.now();
  const dismissLoader = () => window.setTimeout(() => loader.classList.add('is-hidden'), Math.max(0, 700 - (performance.now() - startedAt)));
  if (document.readyState === 'complete') dismissLoader();
  else window.addEventListener('load', dismissLoader, { once: true });

  const animatedItems = document.querySelectorAll('.hero-content, .about-content, .leadership-content, .achievement-content, .join-content, .hierarchy-content, .rank-card, .rule-card, .leader, .stat');
  animatedItems.forEach(item => item.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.16 });
    animatedItems.forEach(item => observer.observe(item));
  } else animatedItems.forEach(item => item.classList.add('is-visible'));

  const progress = document.querySelector('.reading-progress');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

