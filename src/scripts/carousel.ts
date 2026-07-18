export function initCarousel(): void {
  const track = document.getElementById('carouselTrack');
  const slides = track?.children;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const container = document.getElementById('carouselContainer');

  if (!track || !slides || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentIndex = 0;
  let autoSlideInterval: ReturnType<typeof setInterval>;
  let touchStartX = 0;
  let touchEndX = 0;

  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${i === 0 ? 'bg-white scale-125 shadow-md' : 'bg-white/50 hover:bg-white/70'}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children) as HTMLButtonElement[];

  function goToSlide(index: number): void {
    currentIndex = index;
    track!.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => {
      if (i === currentIndex) {
        d.classList.add('!bg-white', '!scale-125', 'shadow-md');
        d.classList.remove('!bg-white/50');
      } else {
        d.classList.remove('!bg-white', '!scale-125', 'shadow-md');
        d.classList.add('!bg-white/50');
      }
    });
  }

  function nextSlide(): void {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function prevSlide(): void {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  }

  function startAutoSlide(): void {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide(): void {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', startAutoSlide);
  }

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = (e as TouchEvent).changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = (e as TouchEvent).changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoSlide();
    }, { passive: true });
  }

  goToSlide(0);
  startAutoSlide();
}
