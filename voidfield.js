(function(){
  const canvas = document.getElementById('voidfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = Math.min(110, Math.floor((w*h)/14000));
  for(let i=0;i<COUNT;i++){
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.4 + 0.4,
      vx: (Math.random()-0.5)*0.12,
      vy: (Math.random()-0.5)*0.12,
      pulse: Math.random()*Math.PI*2
    });
  }

  const LINK_DIST = 140;

  function step(){
    ctx.clearRect(0,0,w,h);

    for(const s of stars){
      if(!prefersReduced){
        s.x += s.vx;
        s.y += s.vy;
        s.pulse += 0.01;
        if(s.x < 0) s.x = w; if(s.x > w) s.x = 0;
        if(s.y < 0) s.y = h; if(s.y > h) s.y = 0;
      }
    }

    // threads between nearby stars — the "Watchers" connective tissue
    for(let i=0;i<stars.length;i++){
      for(let j=i+1;j<stars.length;j++){
        const a = stars[i], b = stars[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < LINK_DIST){
          const alpha = (1 - dist/LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(169,138,240,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for(const s of stars){
      const glow = prefersReduced ? 0.5 : (Math.sin(s.pulse)*0.3 + 0.7);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(233,231,242,${0.55*glow})`;
      ctx.fill();
    }

    requestAnimationFrame(step);
  }
  step();
})();
