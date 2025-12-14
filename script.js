// ===============================
// ANIMACIONES ESTILO APPLE
// ===============================

// Elementos animables
const animatedItems = document.querySelectorAll(
  ".hero-title, .servicio-card, .plan-card, .contact-form"
);

// Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Apple-style: anima una vez
      }
    });
  },
  {
    threshold: 0.15,
  }
);

// Observar elementos
animatedItems.forEach((item) => {
  observer.observe(item);

  // Si ya está visible al cargar (hero)
  if (item.getBoundingClientRect().top < window.innerHeight) {
    item.classList.add("visible");
    observer.unobserve(item);
  }
});

// ===============================
// FORMULARIO
// ===============================
function enviarFormulario(event) {
  event.preventDefault();
  alert("Gracias por contactarte. Te responderemos en breve 🚀");
  event.target.reset();
}
