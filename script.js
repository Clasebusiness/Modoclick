const slider = document.getElementById("planesSlider");
const slides = slider.querySelectorAll(".slider-item");

let index = 0;
let interval;

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

function start() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4500);
}

function stop() {
  clearInterval(interval);
}

slider.addEventListener("mouseenter", stop);
slider.addEventListener("mouseleave", start);
slider.addEventListener("touchstart", stop);

showSlide(0);
start();
