/* =========================
   ANIMACIONES AL SCROLL
========================= */

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

/* =========================
   SLIDER PLANES (SOLO MÓVIL)
========================= */

const slider = document.getElementById("planesSlider");

if (slider) {
  const slides = slider.querySelectorAll(".slider-item");
  let currentSlide = 0;
  let sliderInterval = null;
  const SLIDER_TIME = 4000; // 4 segundos (elegante)

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    if (!isMobile()) return;
    stopSlider();
    sliderInterval = setInterval(nextSlide, SLIDER_TIME);
  }

  function stopSlider() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  function initSlider() {
    if (isMobile()) {
      showSlide(currentSlide);
      startSlider();
    } else {
      // Desktop: mostrar todas las tarjetas
      slides.forEach(slide => slide.classList.add("active"));
      stopSlider();
    }
  }

  // UX: pausar al interactuar
  slider.addEventListener("mouseenter", stopSlider);
  slider.addEventListener("mouseleave", startSlider);
  slider.addEventListener("touchstart", stopSlider, { passive: true });
  slider.addEventListener("touchend", startSlider);

  window.addEventListener("resize", initSlider);

  initSlider();
}
