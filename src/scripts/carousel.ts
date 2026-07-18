export function initCarousel(): void {
  const track = document.getElementById('carouselTrack');
  const slides = track?.children;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !slides || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentIndex = 0;
  let autoSlideInterval: ReturnType<typeof setInterval>;

  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dot.className = 'w-3 h-3 rounded-full border-none bg-primary-100 cursor-pointer transition-all duration-300';
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children) as HTMLButtonElement[];

  function goToSlide(index: number): void {
    currentIndex = index;
    track!.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d) => d.classList.remove('!bg-primary-500', '!scale-130'));
    dots[currentIndex]?.classList.add('!bg-primary-500', '!scale-130');
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
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  function resetAutoSlide(): void {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  goToSlide(0);
  startAutoSlide();
}
