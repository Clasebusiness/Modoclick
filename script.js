function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function enviarFormulario(event) {
  event.preventDefault();
  alert("Gracias por contactarte. Pronto te escribiremos.");
  event.target.reset();
}