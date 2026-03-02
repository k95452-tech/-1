document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-img');
  const dotsBox = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const stage = slides[0]?.parentElement;            // 放圖片的容器
  const carousel = stage ? stage.parentElement : document; // 整個輪播區，用於 hover/觸控

  let index = 0;
  let autoPlay = null;
  const INTERVAL = 4000;

  // 指示點
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'w-3 h-3 rounded-full bg-white/60 hover:bg-white ring-1 ring-black/10';
    dot.setAttribute('aria-label', `第 ${i+1} 張`);
    dot.addEventListener('click', () => { showSlide(i); resetAuto(); });
    dotsBox.appendChild(dot);
  });
  const dots = dotsBox.querySelectorAll('button');

  function showSlide(i) {
    slides.forEach((img, idx) => { img.style.opacity = idx === i ? '1' : '0'; });
    dots.forEach((d, idx) => {
      d.classList.toggle('bg-white', idx === i);
      d.classList.toggle('bg-white/60', idx !== i);
      d.setAttribute('aria-current', idx === i ? 'true' : 'false');
    });
    index = i;
  }
  const next = () => showSlide((index + 1) % slides.length);
  const prev = () => showSlide((index - 1 + slides.length) % slides.length);

  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  // 自動播放 + 滑鼠移入暫停
  function startAuto(){ if (autoPlay) clearInterval(autoPlay); autoPlay = setInterval(next, INTERVAL); }
  function stopAuto(){ if (autoPlay){ clearInterval(autoPlay); autoPlay = null; } }
  function resetAuto(){ stopAuto(); startAuto(); }
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // 手機滑動（左右換圖）
  let startX = null, startY = null, isSwiping = false;
  const SWIPE_THRESHOLD = 50; // 需要滑動超過 50px 才觸發
  carousel.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    startX = t.clientX; startY = t.clientY; isSwiping = false;
    stopAuto(); // 觸控時先暫停
  }, {passive:true});

  carousel.addEventListener('touchmove', e => {
    if (startX == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    // 判斷是否為水平滑動；若是就阻止頁面左右滑動
    if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping = true;
    }
    if (isSwiping) e.preventDefault(); // 需要非 passive 才能阻止
  }, {passive:false});

  carousel.addEventListener('touchend', e => {
    if (startX == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) prev(); else next();
    }
    startX = startY = null; isSwiping = false;
    startAuto(); // 放開後恢復自動播放
  }, {passive:true});

  // 初始化
  showSlide(0);
  startAuto();
});