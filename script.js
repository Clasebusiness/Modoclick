const animatedItems = document.querySelectorAll(
  ".hero-title, .servicio-card, .plan-card"
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedItems.forEach((item) => {
  observer.observe(item);

  if (item.getBoundingClientRect().top < window.innerHeight) {
    item.classList.add("visible");
    observer.unobserve(item);
  }
});
// ========================
// SLIDER PLANES AUTOMÁTICO
// ========================

const slides = document.querySelectorAll('.slider-item');
let currentSlide = 0;
let sliderInterval;
const sliderTime = 4000; // 4 segundos (ideal)

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startSlider() {
  sliderInterval = setInterval(nextSlide, sliderTime);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

const slider = document.getElementById('planesSlider');

slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);
slider.addEventListener('touchstart', stopSlider);

startSlider();
