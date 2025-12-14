// HERO TITLE ANIMATION
const heroTitle = document.querySelector(".hero-title");

window.addEventListener("load", () => {
  if (heroTitle) {
    heroTitle.style.opacity = "1";
    heroTitle.style.transform = "translateY(0)";
  }
});

// SCROLL ANIMATION (Apple style)
const animatedItems = document.querySelectorAll(
  ".servicio-card, .plan-card, .contact-form"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

animatedItems.forEach((item) => observer.observe(item));
