// Shared-element handoff. Native dialogs retain their focus trap and Escape behavior.
window.ProjectTransitions = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let origin = null, flight = null, animation = null, revision = 0, closing = false;
  function clear(dialog) {
    animation?.cancel(); animation = null;
    flight?.remove(); flight = null;
    dialog.classList.remove('case-entering', 'case-leaving');
  }
  function clone(dialog, source, rect) {
    const element = document.createElement('div');
    element.className = 'case-flight'; element.setAttribute('aria-hidden', 'true');
    element.inert = true;
    const media = source.querySelector('.project-media').cloneNode(true);
    media.classList.remove('card-tilt-active');
    element.append(media);
    Object.assign(element.style, {left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`,borderRadius:'18px'});
    dialog.append(element); return element;
  }
  const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
  async function open(dialog, source) {
    const ticket = ++revision; closing = false; clear(dialog);
    if (source) origin = source;
    if (reduced.matches || !source || !source.querySelector('.cover-art')) return;
    const from = source.querySelector('.project-media').getBoundingClientRect();
    const to = dialog.querySelector('.case-banner').getBoundingClientRect();
    if (!from.width || !to.width) return;
    dialog.classList.add('case-entering');
    flight = clone(dialog, source, to);
    animation = flight.animate([
      {transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`,borderRadius:'18px',opacity:1},
      {transform:'translate(0,0) scale(1)',borderRadius:'0px',opacity:1,offset:.78},
      {transform:'translate(0,0) scale(1)',borderRadius:'0px',opacity:0}
    ],{duration:780,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    await animation.finished.catch(()=>{});
    if (ticket !== revision) return;
    clear(dialog);
  }
  async function close(dialog) {
    if (closing) return;
    closing = true; ++revision; clear(dialog);
    if (!reduced.matches && origin?.isConnected) {
      const to = origin.querySelector('.project-media').getBoundingClientRect();
      const from = dialog.querySelector('.case-banner').getBoundingClientRect();
      // A scrolled-out banner should not fly across the whole document.
      if (to.width && to.bottom>0 && to.top<innerHeight) {
        const start = from.bottom>0 ? from : {left:0,top:0,width:innerWidth,height:Math.min(innerHeight*.65,600)};
        flight = clone(dialog, origin, to);
        dialog.classList.add('case-leaving');
        animation = flight.animate([
          {transform:`translate(${start.left-to.left}px,${start.top-to.top}px) scale(${start.width/to.width},${start.height/to.height})`,opacity:0,borderRadius:'0px'},
          {opacity:1,offset:.2},
          {transform:'translate(0,0) scale(1)',opacity:1,borderRadius:'18px'}
        ],{duration:520,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
        await animation.finished.catch(()=>{});
      }
    }
    clear(dialog); dialog.close(); closing = false;
    await frame(); origin?.focus({preventScroll:true});
  }
  addEventListener('resize',()=>{const d=document.querySelector('#case-dialog');if(d){++revision;clear(d);}});
  reduced.addEventListener('change',()=>{const d=document.querySelector('#case-dialog');if(d){++revision;clear(d);}});
  return {open,close};
})();
