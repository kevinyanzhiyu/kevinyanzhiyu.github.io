// Reveal project surfaces separately from their captions, after the cover handoff.
(() => {
  const work = document.querySelector('#work');
  const cards = [...document.querySelectorAll('.project-card')];
  const reduced = window.PortfolioMotion.media;
  const visible = new Set();
  let observer;

  function revealVisible() {
    if (work?.inert && !reduced.matches) return;
    visible.forEach(card => {
      card.classList.add('is-visible');
      observer?.unobserve(card);
      visible.delete(card);
    });
  }

  if (!('IntersectionObserver' in window) || reduced.matches) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    revealVisible();
  }, { threshold: .1, rootMargin:'0px 0px -6% 0px' });
  cards.filter(card => !card.classList.contains('is-visible')).forEach((card,index) => {
    card.style.setProperty('--entry-delay',`${index%2*110}ms`);
    observer.observe(card);
  });
  work?.addEventListener('portfolio:ready', revealVisible);
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    cards.forEach(card => card.classList.add('is-visible'));
    observer.disconnect();
  });
})();
