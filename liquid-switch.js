// One restrained sliding surface, shared by category navigation and UI filters.
window.PortfolioLiquidSwitch = container => {
  const lens=document.createElement('span');
  lens.className='work-switch-lens';lens.setAttribute('aria-hidden','true');
  lens.innerHTML='<i></i>';container.prepend(lens);container.classList.add('has-liquid-lens');
  const reduced=window.PortfolioMotion.media;
  let current=null,flight=null,shine=null,geometry=null;
  function move(button,animate=true){
    if(!button)return;
    const before=lens.getBoundingClientRect(),bounds=container.getBoundingClientRect();
    const x=button.offsetLeft,y=button.offsetTop,w=button.offsetWidth,h=button.offsetHeight;
    const unchanged=geometry&&x===geometry.x&&y===geometry.y&&w===geometry.w&&h===geometry.h;
    if(button===current&&unchanged&&!reduced.matches)return;
    const previous=current;current=button;
    geometry={x,y,w,h};
    flight?.cancel();shine?.cancel();
    lens.style.width=`${w}px`;lens.style.height=`${h}px`;lens.style.top=`${y}px`;
    lens.style.transform=`translateX(${x}px)`;
    if(!animate||!previous||reduced.matches||!lens.animate)return;
    const from=before.left-bounds.left-container.clientLeft+container.scrollLeft;
    const direction=Math.sign(x-from)||1,delta=Math.abs(x-from);
    if(delta<.5&&Math.abs(before.width-w)<1)return;
    // Interpolate the visual centre AND width. Using the current left edge as
    // a centre-based transform caused jumps on unequal-width / reversed tabs.
    const startCentre=from+before.width/2,endCentre=x+w/2;
    const damping=.82,frequency=11.6,damped=frequency*Math.sqrt(1-damping*damping);
    const spring=t=>1-Math.exp(-damping*frequency*t)*(Math.cos(damped*t)+damping/Math.sqrt(1-damping*damping)*Math.sin(damped*t));
    const frames=[];
    for(let i=0;i<=60;i++){
      const t=i/60,p=i===60?1:spring(t)/spring(1);
      const pulse=Math.sin(Math.PI*t)**1.4;
      const width=before.width+(w-before.width)*p+Math.min(12,delta*.09)*pulse;
      const centre=startCentre+(endCentre-startCentre)*p;
      frames.push({offset:t,transform:`translateX(${centre-width/2}px) scale(${width/w},${1-.055*pulse})`});
    }
    flight=lens.animate(frames,{duration:540,easing:'linear',fill:'none'});
    shine=lens.querySelector('i').animate([
      {transform:`translateX(${-direction*55}%)`,opacity:0},
      {opacity:.45,offset:.35},
      {transform:`translateX(${direction*55}%)`,opacity:0}
    ],{duration:540,easing:'ease-out'});
  }
  const sync=()=>{if(current)move(current,false);};
  const resize=new ResizeObserver(sync);resize.observe(container);
  reduced.addEventListener('change',()=>move(current,false));
  document.fonts.ready.then(sync);
  return {move};
};
