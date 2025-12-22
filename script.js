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
   SLIDER PLANES AUTO
========================= */
const slider = document.getElementById("planesSlider");
const slides = slider.querySelectorAll(".slider-item");

let currentIndex = 0;
let sliderInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function startSlider() {
  sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4500);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

slider.addEventListener("mouseenter", stopSlider);
slider.addEventListener("mouseleave", startSlider);
slider.addEventListener("touchstart", stopSlider);
slider.addEventListener("touchend", startSlider);

showSlide(currentIndex);
startSlider();
/* =========================
   SLIDER PLANES AUTO
========================= */
const slider = document.getElementById("planesSlider");
const slides = slider.querySelectorAll(".slider-item");

let currentIndex = 0;
let sliderInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function startSlider() {
  sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4500);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

slider.addEventListener("mouseenter", stopSlider);
slider.addEventListener("mouseleave", startSlider);
slider.addEventListener("touchstart", stopSlider);
slider.addEventListener("touchend", startSlider);

showSlide(currentIndex);
startSlider();
