// ----- FORMULARIO -----
function enviarFormulario(event) {
  event.preventDefault();
  alert("Gracias por contactarte. Te responderemos en breve 🚀");
  event.target.reset();
}

// ----- ANIMACIÓN TÍTULO HERO AL HACER SCROLL -----
const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        heroTitle.classList.add("visible");
        observer.unobserve(heroTitle); // solo una vez
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(heroTitle);
}
