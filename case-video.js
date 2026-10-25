// Keep one continuous native video timeline while fetching original-quality segments.
window.CaseVideo = (() => {
  let library;
  const players = new WeakMap();
  function loadLibrary() {
    if (window.Hls) return Promise.resolve(window.Hls);
    if (!library) library = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'assets/vendor/hls-1.7.3.min.js';
      script.onload = () => resolve(window.Hls);
      script.onerror = () => { library = null; script.remove(); reject(new Error('HLS library unavailable')); };
      document.head.append(script);
    });
    return library;
  }
  function clear(video) {
    const state = players.get(video);
    if (state) { state.cancelled = true; state.hls?.destroy(); players.delete(video); }
    video.pause();
    video.removeAttribute('src');
    delete video.dataset.streamQuality;
    video.load();
  }
  async function attach(video, project) {
    clear(video);
    const state = { cancelled: false, hls: null };
    players.set(video, state);
    video.preload = 'metadata';
    if (!project.videoStream) { video.src = project.video; return; }
    const fallback = () => {
      if (state.cancelled) return;
      const time = video.currentTime || 0, resume = !video.paused;
      state.hls?.destroy(); state.hls = null;
      video.dataset.streamQuality = 'fallback';
      video.src = project.video;
      video.addEventListener('loadedmetadata', () => {
        if (state.cancelled) return;
        video.currentTime = Math.min(time, video.duration || time);
        if (resume) video.play().catch(() => {});
      }, { once: true });
    };
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = project.videoStream;
      video.dataset.streamQuality = '1080p';
      return;
    }
    try {
      const Hls = await loadLibrary();
      if (state.cancelled) return;
      if (!Hls.isSupported()) { fallback(); return; }
      const hls = state.hls = new Hls({ maxBufferLength: 18, maxMaxBufferLength: 30, backBufferLength: 18 });
      hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) fallback(); });
      hls.loadSource(project.videoStream);
      hls.attachMedia(video);
      video.dataset.streamQuality = '1080p';
    } catch { fallback(); }
  }
  return { attach, clear };
})();
