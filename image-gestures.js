window.PortfolioImageGestures = (() => {
  const clamp = value => Math.max(1, Math.min(10, value));
  function touch({ viewer, stage, getState, setState }) {
    const pointers = new Map();
    let gesture = null, suppressClickUntil = 0;
    const point = event => ({ x: event.clientX, y: event.clientY });
    function start() {
      const points = [...pointers.values()];
      const state = getState();
      if (points.length >= 2) {
        const [a, b] = points;
        const rect = stage.getBoundingClientRect();
        gesture = { type: 'pinch', distance: Math.max(1, Math.hypot(a.x-b.x, a.y-b.y)),
          anchorX: ((a.x+b.x)/2-rect.left-rect.width/2-state.panX)/state.zoom,
          anchorY: ((a.y+b.y)/2-rect.top-rect.height/2-state.panY)/state.zoom,
          zoom: state.zoom };
        stage.classList.add('is-dragging');
      } else if (points.length) {
        gesture = { type: 'pan', ...points[0], ...state };
        stage.classList.toggle('is-dragging', state.zoom > 1);
      } else { gesture = null; stage.classList.remove('is-dragging'); }
    }
    function consume(event) { event.preventDefault(); event.stopImmediatePropagation(); }
    function clear() { pointers.clear(); gesture = null; stage.classList.remove('is-dragging'); }
    stage.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      consume(event);
      pointers.set(event.pointerId, point(event));
      stage.setPointerCapture(event.pointerId);
      suppressClickUntil = performance.now()+700;
      start();
    }, { capture: true, passive: false });
    stage.addEventListener('pointermove', event => {
      if (!pointers.has(event.pointerId)) return;
      consume(event); pointers.set(event.pointerId, point(event));
      suppressClickUntil = performance.now()+700;
      if (!gesture) return;
      const [a, b] = [...pointers.values()];
      if (gesture.type === 'pinch' && b) {
        const rect = stage.getBoundingClientRect();
        const zoom = clamp(gesture.zoom*Math.hypot(a.x-b.x, a.y-b.y)/gesture.distance);
        setState({ zoom,
          panX: (a.x+b.x)/2-rect.left-rect.width/2-gesture.anchorX*zoom,
          panY: (a.y+b.y)/2-rect.top-rect.height/2-gesture.anchorY*zoom });
      } else if (gesture.zoom > 1) {
        setState({ zoom: gesture.zoom, panX: gesture.panX+a.x-gesture.x, panY: gesture.panY+a.y-gesture.y });
      }
    }, { capture: true, passive: false });
    function finish(event) {
      if (!pointers.has(event.pointerId)) return;
      consume(event); pointers.delete(event.pointerId);
      suppressClickUntil = performance.now()+700;
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      start();
    }
    for (const name of ['pointerup','pointercancel']) stage.addEventListener(name, finish, { capture: true, passive: false });
    stage.addEventListener('lostpointercapture', event => { if (pointers.delete(event.pointerId)) start(); });
    stage.addEventListener('click', event => { if (performance.now()<suppressClickUntil) consume(event); }, true);
    for (const name of ['gesturestart','gesturechange','gestureend']) stage.addEventListener(name, event => event.preventDefault(), { passive: false });
    viewer.addEventListener('close', clear);
    return { clear };
  }
  function controls(button, { getZoom, setZoom }) {
    const group = document.createElement('div'); group.className = 'image-zoom-controls';
    group.setAttribute('role','group'); group.setAttribute('aria-label','图片缩放');
    const minus = document.createElement('button'), plus = document.createElement('button');
    for (const item of [minus,plus]) { item.type='button'; item.className='interactive image-zoom-step'; }
    minus.textContent='−'; plus.textContent='＋';
    minus.setAttribute('aria-label','缩小图片'); plus.setAttribute('aria-label','放大图片');
    button.before(group); group.append(minus,button,plus);
    const stops=[1,1.5,2,3,4,6,8,10];
    minus.addEventListener('click',()=>setZoom([...stops].reverse().find(n=>n<getZoom()-.01)||1));
    plus.addEventListener('click',()=>setZoom(stops.find(n=>n>getZoom()+.01)||10));
    function update(zoom) {
      button.textContent=`${Math.round(zoom*100)}% · 重置`;
      button.setAttribute('aria-label',`当前缩放 ${Math.round(zoom*100)}%，重置图片缩放`);
      minus.disabled=zoom<=1; plus.disabled=zoom>=10;
    }
    update(getZoom()); return { update };
  }
  return { touch, controls };
})();
