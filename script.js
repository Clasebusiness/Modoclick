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
