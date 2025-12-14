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
        observer.unobserve(heroTitle);
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(heroTitle);

  // 👇 SOLUCIÓN CLAVE: activar si ya está visible al cargar
  if (heroTitle.getBoundingClientRect().top < window.innerHeight) {
    heroTitle.classList.add("visible");
  }
}

