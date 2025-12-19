/* =========================
   SLIDER PLANES AUTO (DESKTOP + MOBILE)
========================= */

const slider = document.getElementById("planesSlider");
let currentIndex = 0;
let sliderInterval;
let isPaused = false;

function moveSlider() {
  if (!slider || isPaused) return;

  const cards = slider.children;
  const cardWidth = cards[0].offsetWidth + 30;

  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function startSlider() {
  sliderInterval = setInterval(moveSlider, 2000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

if (slider) {
  startSlider();

  // Desktop hover
  slider.addEventListener("mouseenter", () => {
    isPaused = true;
    stopSlider();
  });

  slider.addEventListener("mouseleave", () => {
    isPaused = false;
    startSlider();
  });

  // Mobile touch
  slider.addEventListener("touchstart", () => {
    isPaused = true;
    stopSlider();
  });

  slider.addEventListener("touchend", () => {
    isPaused = false;
    startSlider();
  });

  window.addEventListener("resize", () => {
    slider.style.transform = "translateX(0)";
    currentIndex = 0;
  });
}
