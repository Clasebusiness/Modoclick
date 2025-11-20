function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function enviarFormulario(event) {
  event.preventDefault();
  alert("Gracias por contactarte. Pronto te escribiremos.");
  event.target.reset();
}

// --- ELIMINADA función scroll, ya no se usa ---


// --- Enviar formulario ---
function enviarFormulario(event) {
    event.preventDefault();

    alert("Gracias por contactarte. Te responderemos en breve 🚀");

    // Limpia formulario
    event.target.reset();
}
