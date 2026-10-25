(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.PortfolioMotion.media;
  let activeCard = null;
  let activeMedia = null;
  let frame = 0;

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    activeMedia?.classList.remove('card-tilt-active');
    activeCard = null;
    activeMedia = null;
  }

  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return;
    if (document.documentElement.classList.contains('portal-in-progress')) { reset(); return; }
    const card = event.target.closest('.project-button, .gallery-card, .gallery-standard-card');
    if (!card || card.closest('dialog')) { reset(); return; }
    if (card !== activeCard) {
      reset();
      activeCard = card;
      activeMedia = card.querySelector('.project-media, .gallery-card-media, .gallery-standard-image');
    }
    if (!activeMedia) return;
    // Measure the stable button, not the transformed image surface.
    const bounds = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const isProject = card.classList.contains('project-button');
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / (isProject ? activeMedia.offsetHeight : bounds.height)));
    const angle = isProject ? 3.2 : 2;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!activeMedia?.isConnected) return;
      activeMedia.style.setProperty('--card-rx', `${((.5 - y) * angle * 2).toFixed(2)}deg`);
      activeMedia.style.setProperty('--card-ry', `${((x - .5) * angle * 2).toFixed(2)}deg`);
      activeMedia.style.setProperty('--card-light-x', `${(x * 100).toFixed(1)}%`);
      activeMedia.style.setProperty('--card-light-y', `${(y * 100).toFixed(1)}%`);
      activeMedia.style.setProperty('--card-image-x', `${((.5 - x) * 14).toFixed(2)}px`);
      activeMedia.style.setProperty('--card-image-y', `${((.5 - y) * 10).toFixed(2)}px`);
      activeMedia.style.setProperty('--card-layer-x', `${((x - .5) * 6).toFixed(2)}px`);
      activeMedia.style.setProperty('--card-layer-y', `${((y - .5) * 6).toFixed(2)}px`);
      activeMedia.classList.add('card-tilt-active');
    });
  }, { passive: true });

  document.addEventListener('pointerout', event => {
    if (activeCard && !activeCard.contains(event.relatedTarget)) reset();
  });
  document.addEventListener('click', reset, true);
  document.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', reset, { passive: true, capture: true });
  finePointer.addEventListener('change', reset);
  reducedMotion.addEventListener('change', reset);
})();
