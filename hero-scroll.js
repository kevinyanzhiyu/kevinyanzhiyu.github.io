// Keep the camera fixed while native scroll advances through the portal.
(() => {
  const stage = document.querySelector('.hero-stage');
  const hero = stage?.querySelector('.hero');
  const work = document.querySelector('#work');
  if (!hero || !work) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let start = 0;
  let distance = 1;
  let frame = 0;
  let inView = true;
  let sceneWidth = 1;
  let sceneHeight = 1;
  let playbackFrame = 0;
  const scene = document.createElement('div');
  scene.className = 'hero-scene';
  scene.setAttribute('aria-hidden', 'true');
  scene.inert = true;
  hero.append(scene);
  const arrangements = [
    { x: .34, y: .48, depth: .72, angle: -6, turn: -12 },
    { x: .67, y: .55, depth: .72, angle: 6, turn: 12 },
    { x: .1, y: .23, depth: .48, angle: -10, turn: 18 },
    { x: .88, y: .25, depth: .43, angle: 9, turn: -20 },
    { x: .13, y: .82, depth: .52, angle: 8, turn: 15 },
    { x: .87, y: .85, depth: .5, angle: -9, turn: -15 },
  ];
  const cards = [...work.querySelectorAll('.project-media')].slice(0, 6).map((source, index) => {
    const element = document.createElement('div');
    element.className = `scene-card${index < 2 ? ' scene-card--primary' : ''}`;
    const artwork = source.querySelector('.cover-art');
    if (artwork) element.append(artwork.cloneNode(true));
    else {
      const img = document.createElement('img');
      img.src = source.querySelector('img').src;
      img.alt = '';
      img.decoding = 'async';
      element.append(img);
    }
    scene.append(element);
    return { element, source, ...arrangements[index], width: 1, height: 1, targetX: 0, targetY: 0 };
  });
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smooth = (from, to, value) => {
    const t = clamp((value - from) / (to - from));
    return t * t * (3 - 2 * t);
  };
  const mix = (from, to, amount) => from + (to - from) * amount;

  function render() {
    frame = 0;
    if (motion.matches) {
      work.inert = false;
      work.classList.remove('portal-complete');
      return;
    }
    const progress = clamp((window.scrollY - start) / distance);
    const push = smooth(0, 1, progress);
    const travel = smooth(.12, .65, progress);
    const landing = smooth(.6, .95, progress);
    hero.style.setProperty('--scroll-scale', (1 + smooth(0, .55, progress) * 3.8).toFixed(4));
    hero.style.setProperty('--scroll-opacity', (1 - smooth(.06, .4, progress)).toFixed(4));
    hero.style.setProperty('--support-opacity', (1 - smooth(.02, .28, progress)).toFixed(4));
    hero.style.setProperty('--halo-scale', (1 + smooth(.12, .92, progress) * 5.5).toFixed(4));
    hero.style.setProperty('--halo-rotation', `${(-24 + push * 6).toFixed(2)}deg`);
    hero.style.setProperty('--halo-opacity', (1 - smooth(.55, .9, progress)).toFixed(4));
    hero.style.setProperty('--atmosphere-opacity', (1 - smooth(.55, .97, progress)).toFixed(4));
    const arrival = smooth(.88, .99, progress);
    cards.forEach((card, index) => {
      const primary = index < 2;
      const spreadX = card.x * sceneWidth;
      const spreadY = card.y * sceneHeight;
      let x = mix(sceneWidth * (.5 + (card.x - .5) * .22), spreadX, travel);
      let y = mix(sceneHeight * (.49 + (card.y - .5) * .18), spreadY, travel);
      let scale = mix(.12, card.depth, travel);
      if (primary) {
        x = mix(x, card.targetX, landing);
        y = mix(y, card.targetY, landing);
        scale = mix(scale, 1, landing);
      } else {
        x += (card.x < .5 ? -1 : 1) * sceneWidth * .35 * landing;
        y += (card.y < .5 ? -1 : 1) * sceneHeight * .22 * landing;
        scale += landing * .22;
      }
      const rotation = primary ? 1 - landing : 1;
      card.element.style.transform = `translate3d(${(x - card.width / 2).toFixed(2)}px,${(y - card.height / 2).toFixed(2)}px,0) perspective(1200px) rotateY(${card.turn * rotation}deg) rotateZ(${card.angle * rotation}deg) scale(${scale.toFixed(4)})`;
      card.element.style.opacity = (smooth(.13 + index * .012, .35 + index * .012, progress) * (primary ? 1 - smooth(.99, 1, progress) : 1 - smooth(.57, .83, progress))).toFixed(4);
    });
    // Visual-only scene cards land exactly over the real first-row image surfaces.
    // The real section then takes over without replacing any project interactions.
    work.style.setProperty('--work-offset', `${Math.min(0, window.scrollY - start - distance).toFixed(2)}px`);
    work.style.setProperty('--work-opacity', arrival.toFixed(4));
    const wasComplete = work.classList.contains('portal-complete');
    work.classList.toggle('portal-complete', progress >= 1);
    work.inert = progress < .99;
    if (!wasComplete && progress >= 1) work.dispatchEvent(new Event('portfolio:ready'));
  }

  function schedule() {
    if (!frame && inView && !motion.matches) frame = requestAnimationFrame(render);
  }

  function measure() {
    stopPlayback();
    document.documentElement.classList.toggle('hero-scroll-enabled', !motion.matches);
    start = stage.getBoundingClientRect().top + window.scrollY -
      (parseFloat(getComputedStyle(hero).top) || 0);
    distance = Math.max(1, stage.offsetHeight - hero.offsetHeight);
    sceneWidth = hero.clientWidth;
    sceneHeight = hero.clientHeight;
    // Read layout without the entrance translation; no scroll-frame layout reads.
    work.style.transform = 'none';
    const workBounds = work.getBoundingClientRect();
    const heroBounds = hero.getBoundingClientRect();
    cards.forEach((card) => {
      const bounds = card.source.getBoundingClientRect();
      card.width = bounds.width;
      card.height = bounds.height;
      card.targetX = bounds.left - heroBounds.left + bounds.width / 2;
      card.targetY = bounds.top - workBounds.top + bounds.height / 2;
      card.element.style.width = `${card.width}px`;
      card.element.style.height = `${card.height}px`;
    });
    work.style.removeProperty('transform');
    render();
  }

  function stopPlayback() {
    cancelAnimationFrame(playbackFrame);
    playbackFrame = 0;
  }

  hero.querySelector('a[href="#work"]')?.addEventListener('click', (event) => {
    // Preserve modified clicks and the instant navigation for reduced motion.
    if (motion.matches || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (playbackFrame) return;
    const from = window.scrollY;
    const to = Math.ceil(start + distance);
    const started = performance.now();
    const duration = 3000 * Math.max(.35, 1 - clamp((from - start) / distance));

    function advance(now) {
      const progress = clamp((now - started) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      window.scrollTo({ top: from + (to - from) * eased, behavior: 'instant' });
      render();
      if (progress < 1) {
        playbackFrame = requestAnimationFrame(advance);
      } else {
        playbackFrame = 0;
        if (location.hash !== '#work') history.pushState(null, '', '#work');
        const heading = work.querySelector('h2');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
      }
    }
    playbackFrame = requestAnimationFrame(advance);
  });

  // Direct input returns control to the visitor at the current camera position.
  window.addEventListener('wheel', stopPlayback, { passive: true });
  window.addEventListener('touchstart', stopPlayback, { passive: true });
  window.addEventListener('pointerdown', stopPlayback, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape'].includes(event.key)) stopPlayback();
  });

  // The portal is the entrance animation for this first group; do not fade it twice.
  work.querySelectorAll(':scope > .section-heading, #system-work > .group-head, #system-work .project-card:nth-child(-n+2)')
    .forEach((item) => item.classList.add('is-visible'));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('pageshow', measure);
  motion.addEventListener('change', measure);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) schedule();
    }, { rootMargin: '120px' }).observe(stage);
  }
  measure();
  document.fonts.ready.then(measure);
})();
