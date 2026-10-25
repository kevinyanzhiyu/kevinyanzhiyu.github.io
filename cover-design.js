// Responsive previews preserve the original picture; no per-project crop or hover zoom.
window.PortfolioCovers = (() => {
  const directions = {
    'shelter-check': { size: [1179, 1311], title: '避难所经营玩法' },
    kingdom: { size: [1920, 1440] },
    alliance: { size: [1920, 1080] },
    layout: { size: [1920, 1080] },
    racing: { size: [1920, 1080] },
    festival: { size: [1920, 1080] },
    'seven-day': { size: [986, 557] },
    mecha: { size: [1600, 900] },
    'christmas-match': { size: [1920, 1080] },
    'privilege-card': { size: [1920, 1080] },
  };
  function render(project) {
    const d = directions[project.id];
    if (!d) return '';
    const [width, height] = d.size;
    const base=`assets/project-thumbs/${project.id}`;
    return `<div class="cover-art cover-art--${project.id}" aria-hidden="true"><div class="cover-visual"><img src="${base}-960.webp" srcset="${base}-480.webp 480w, ${base}-960.webp 960w" sizes="(max-width:760px) calc(100vw - 48px), (max-width:1280px) calc((100vw - 136px)/2), 600px" alt="" width="${width}" height="${height}" loading="lazy" decoding="async" draggable="false"></div></div>`;
  }
  return { render, title: project => directions[project.id]?.title || project.title };
})();
