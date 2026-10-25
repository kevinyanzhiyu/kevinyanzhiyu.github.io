(() => {
  const root = document.querySelector('#ui-craft');
  const grid = root.querySelector('.gallery-grid');
  const standards = document.createElement('section');
  standards.className = 'gallery-standards';
  standards.setAttribute('aria-label', 'UI 组件与规范');
  grid.before(standards);
  const filters = root.querySelector('.gallery-filters');
  const expand = root.querySelector('.gallery-expand');
  const categories = [
    ['all', '精选'], ['alliance', '联盟'], ['tasks', '任务'],
    ['story', '剧情'], ['store', '商店'], ['components', '组件与规范'],
  ];
  let filter = 'all';
  let expanded = false;
  let currentIndex = 0;
  let currentSet = [];
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let drag = null;
  let opener = null;
  let revision=0, changing=false;
  const reduced=window.PortfolioMotion.media;
  let filterSwitch=null;
  let galleryZoomControls;
  const selected=new Set(['ui-001','ui-017','ui-043','ui-045','ui-047','ui-064','ui-068','ui-070','ui-071','ui-072']);
  const route=window.DialogRoute('screen',id=>{const index=galleryItems.findIndex(i=>i.id===id);if(index<0)return;currentSet=galleryItems;opener=root.querySelector(`[data-gallery-id="${id}"]`);show(index);window.SurfaceMotion.open(viewer,opener?.querySelector('img'),image,{fit:'contain',radius:'12px'});},()=>closeViewer(true));

  const viewer = document.createElement('dialog');
  viewer.className = 'gallery-viewer';
  viewer.setAttribute('aria-label', '界面大图浏览');
  viewer.innerHTML = `
    <div class="gallery-viewer-bar">
      <button type="button" data-action="close" class="interactive">← 返回画廊</button>
      <span id="gallery-position"></span>
      <button type="button" data-action="zoom" class="interactive" aria-pressed="false">放大查看 ＋</button>
    </div>
    <div class="gallery-viewer-stage"><img alt="" id="gallery-large"></div>
    <footer class="gallery-viewer-footer">
      <button type="button" data-action="prev" class="interactive" aria-label="上一张界面">←</button>
      <div><span id="gallery-category"></span><h3 id="gallery-title"></h3></div>
      <button type="button" data-action="next" class="interactive" aria-label="下一张界面">→</button>
    </footer>`;
  document.body.append(viewer);
  const image = viewer.querySelector('#gallery-large');
  const stage = viewer.querySelector('.gallery-viewer-stage');
  const zoomButton = viewer.querySelector('[data-action="zoom"]');

  function subset() {
    return galleryItems.filter(item => filter === 'all' || item.category === filter);
  }
  function visibleItems(){const items=subset();if(filter!=='all')return items;const featured=items.filter(item=>selected.has(item.id));return expanded?[...featured,...items.filter(item=>!selected.has(item.id))]:featured;}
  const entryObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('gallery-pending');entryObserver.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:.08});

  function render() {
    const items = subset();
    const visible = visibleItems();
    if(!filters.querySelector('[data-filter]'))filters.innerHTML = categories.map(([id, label]) => `
      <button type="button" class="interactive${id === filter ? ' is-active' : ''}"
        data-filter="${id}" aria-pressed="${id === filter}">${label}</button>`).join('');
    filters.querySelectorAll('[data-filter]').forEach(button=>{
      const active=button.dataset.filter===filter;
      button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));
    });
    const firstSwitch=!filterSwitch;
    filterSwitch ||= window.PortfolioLiquidSwitch(filters);
    filterSwitch.move(filters.querySelector('.is-active'),!firstSwitch);
    const standardItems = visible.filter(item => item.category === 'components');
    standards.hidden = standardItems.length === 0;
    standards.innerHTML = standardItems.length ? `
      <div class="gallery-standards-heading"><div><p class="eyebrow">UI DESIGN SYSTEM</p><h3>UI 组件与规范</h3></div></div>
      <div class="gallery-standards-grid">${standardItems.map(item => `
        <button type="button" class="gallery-standard-card interactive" data-gallery-id="${item.id}" aria-label="查看${item.title}">
          <div class="gallery-standard-image"><img src="${item.thumb}" alt="${item.title}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></div>
          <div class="gallery-card-caption"><span class="gallery-title-clip"><span>${item.title}</span><span class="gallery-title-echo" aria-hidden="true">${item.title}</span></span><b aria-hidden="true">↗</b></div>
        </button>`).join('')}</div>` : '';
    grid.innerHTML = visible.filter(item => item.category !== 'components').map(item => `
      <button type="button" class="gallery-card interactive" data-gallery-id="${item.id}" aria-label="查看${item.title}">
        <div class="gallery-card-media" style="aspect-ratio:${item.width}/${item.height}">
          <img src="${item.thumb}" alt="${item.title}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async">
        </div>
        <div class="gallery-card-caption"><span class="gallery-title-clip"><span>${item.title}</span><span class="gallery-title-echo" aria-hidden="true">${item.title}</span></span><b aria-hidden="true">↗</b></div>
      </button>`).join('');
    expand.hidden = filter !== 'all';
    expand.setAttribute('aria-expanded', String(expanded));
    expand.textContent = expanded ? '收起至精选 −' : `查看全部 ${galleryItems.length} 张 ＋`;
    const navCount = document.querySelector('.work-nav a[href="#ui-craft"] span');
    if (navCount) navCount.textContent = String(galleryItems.length);
    root.querySelectorAll('.gallery-card,.gallery-standard-card').forEach((card,index)=>{if(reduced.matches)return;card.classList.add('gallery-pending');card.style.setProperty('--gallery-delay',`${index%2*110}ms`);entryObserver.observe(card);});
    window.PortfolioMedia?.observe(root);
  }

  function applyTransform() {
    const maxX=Math.max(0,(image.offsetWidth*zoom-stage.clientWidth)/2),maxY=Math.max(0,(image.offsetHeight*zoom-stage.clientHeight)/2);
    panX=Math.max(-maxX,Math.min(maxX,panX));panY=Math.max(-maxY,Math.min(maxY,panY));
    image.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;
    viewer.classList.toggle('is-zoomed', zoom > 1.01);
    zoomButton.setAttribute('aria-pressed', String(zoom > 1.01));
    galleryZoomControls?.update(zoom);
  }

  function setZoom(nextZoom, originX = 0, originY = 0) {
    const previous = zoom;
    zoom = Math.min(10, Math.max(1, nextZoom));
    if (zoom === 1) {
      panX = 0;
      panY = 0;
    } else {
      const ratio = zoom / previous;
      panX = originX - (originX - panX) * ratio;
      panY = originY - (originY - panY) * ratio;
    }
    applyTransform();
  }

  function resetZoom() {
    zoom = 1;
    panX = 0;
    panY = 0;
    drag = null;
    stage.classList.remove('is-dragging');
    applyTransform();
  }

  function show(index) {
    if(route.closing||window.SurfaceMotion.closing)return;
    const ticket=++revision;
    currentIndex = (index + currentSet.length) % currentSet.length;
    const item = currentSet[currentIndex];
    const metric=window.PortfolioQuality.begin('gallery-image');
    image.src = item.thumb;
    image.width=item.width;image.height=item.height;image.decoding='async';
    stage.classList.remove('media-failed');stage.querySelector('.media-error')?.remove();image.removeAttribute('data-failed');
    image.alt = item.title;
    viewer.querySelector('#gallery-title').textContent = item.title;
    viewer.querySelector('#gallery-category').textContent = categories.find(([id]) => id === item.category)[1];
    viewer.querySelector('#gallery-position').textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentSet.length).padStart(2, '0')}`;
    resetZoom();
    viewer.setAttribute('aria-busy','true');viewer.dataset.quality='loading';route.enter(item.id);
    const full=new Image();full.decoding='async';full.src=item.src;
    let timer;
    Promise.race([full.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('image-timeout')),8000);})]).then(async()=>{
      await window.SurfaceMotion.ready(viewer);
      if(ticket!==revision||!viewer.open)return;stage.classList.remove('media-failed');stage.querySelector('.media-error')?.remove();image.removeAttribute('data-failed');image.src=full.src;viewer.dataset.quality='full';viewer.setAttribute('aria-busy','false');metric({id:item.id});
    }).catch(()=>{if(ticket===revision){viewer.dataset.quality='preview';viewer.setAttribute('aria-busy','false');window.PortfolioQuality.log('gallery-full-failed',{id:item.id});}}).finally(()=>clearTimeout(timer));
    if(viewer.open){window.SurfaceMotion.changed(viewer);if(!reduced.matches)image.animate([{opacity:.5},{opacity:1}],{duration:200});}
  }
  async function closeViewer(fromHistory=false){if(!fromHistory){route.close();return;}++revision;resetZoom();await window.SurfaceMotion.close(viewer,image);}
  async function changeContent(update,{resetTop=false}={}){
    if(changing)return;changing=true;const done=window.PortfolioQuality.begin('gallery-filter');window.PortfolioQuality.frames('gallery-filter',600);
    const oldHeight=root.offsetHeight;root.style.minHeight=`${oldHeight}px`;
    if(!reduced.matches)await grid.animate([{opacity:1},{opacity:.3}],{duration:90,fill:'forwards'}).finished.catch(()=>{});
    entryObserver.disconnect();update();render();grid.getAnimations().forEach(a=>a.cancel());
    // Move before releasing the old height: short categories must not leave the
    // viewport at the old list's depth (or let the browser clamp it into About).
    if(resetTop)root.scrollIntoView({block:'start',behavior:'instant'});
    root.style.removeProperty('min-height');
    filters.querySelector(`[data-filter="${filter}"]`).focus({preventScroll:true});
    if(!reduced.matches)await grid.animate([{opacity:.4},{opacity:1}],{duration:180}).finished.catch(()=>{});
    changing=false;done({filter,expanded});
  }

  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    changeContent(()=>{filter=button.dataset.filter;expanded=false;},{resetTop:true});
  });
  expand.addEventListener('click', () => {
    const top=expanded;changeContent(()=>{expanded=!expanded;},{resetTop:top}).then(()=>{
      if(top){root.querySelector('.gallery-toolbar').scrollIntoView({block:'start',behavior:'instant'});filters.querySelector('[data-filter="all"]').focus({preventScroll:true});}
      else{const firstNew=visibleItems().find(i=>!selected.has(i.id));if(firstNew)root.querySelector(`[data-gallery-id="${firstNew.id}"]`)?.focus({preventScroll:true});}
    });
  });
  root.addEventListener('click', event => {
    const card = event.target.closest('[data-gallery-id]');
    if (!card) return;
    opener = card;
    currentSet = visibleItems();
    show(currentSet.findIndex(item => item.id === card.dataset.galleryId));
    window.SurfaceMotion.open(viewer,card.querySelector('img'),image,{fit:'contain',radius:'12px'});
  });
  viewer.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'close') closeViewer();
    if (action === 'zoom') setZoom(1);
    if (action === 'prev') show(currentIndex - 1);
    if (action === 'next') show(currentIndex + 1);
  });
  viewer.addEventListener('keydown', event => {
    if (zoom > 1.01) {
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();panX+=event.key==='ArrowLeft'?40:event.key==='ArrowRight'?-40:0;panY+=event.key==='ArrowUp'?40:event.key==='ArrowDown'?-40:0;applyTransform();}
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const bounds = stage.getBoundingClientRect();
    const originX = event.clientX - bounds.left - bounds.width / 2;
    const originY = event.clientY - bounds.top - bounds.height / 2;
    setZoom(zoom * Math.exp(-event.deltaY * .0015), originX, originY);
  }, { passive: false });
  stage.addEventListener('dblclick', event => {
    const bounds = stage.getBoundingClientRect();
    setZoom(zoom > 1.01 ? 1 : 2, event.clientX - bounds.left - bounds.width / 2, event.clientY - bounds.top - bounds.height / 2);
  });
  let blankPress = null;
  stage.addEventListener('pointerdown', event => {
    const bounds = image.getBoundingClientRect();
    blankPress = event.button === 0 && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
      ? { x: event.clientX, y: event.clientY } : null;
    if (zoom <= 1.01 || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, panX, panY };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('click', event => {
    if (!blankPress) return;
    const press = blankPress;
    blankPress = null;
    const bounds = image.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside && Math.hypot(event.clientX - press.x, event.clientY - press.y) < 5) closeViewer();
  });
  stage.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    panX = drag.panX + event.clientX - drag.x;
    panY = drag.panY + event.clientY - drag.y;
    applyTransform();
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    drag = null;
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  }
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  window.PortfolioImageGestures.touch({viewer,stage,getState:()=>({zoom,panX,panY}),
    setState:state=>{zoom=state.zoom;panX=state.zoom===1?0:state.panX;panY=state.zoom===1?0:state.panY;blankPress=null;drag=null;applyTransform();}});
  galleryZoomControls=window.PortfolioImageGestures.controls(zoomButton,{getZoom:()=>zoom,setZoom});
  viewer.addEventListener('cancel', event => {
    event.preventDefault();if (zoom > 1.01) resetZoom();else closeViewer();
  });
  viewer.addEventListener('close', () => {
    ++revision;route.clear();
    touches.clear();pinch=null;
    resetZoom();
    document.body.classList.remove('dialog-open');
    opener?.focus({ preventScroll: true });
  });
  render();
  reduced.addEventListener('change',()=>{if(reduced.matches){root.querySelectorAll('.gallery-pending').forEach(c=>c.classList.remove('gallery-pending'));entryObserver.disconnect();}});
})();
