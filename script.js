'use strict';

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const header = $('.site-header');
const menuToggle = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');
const cursorGlow = $('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});

$$('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

window.addEventListener('pointermove', event => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

$$('.reveal').forEach(element => revealObserver.observe(element));

const tiltCard = $('.tilt-card');

if (tiltCard && window.matchMedia('(pointer:fine)').matches) {
  tiltCard.addEventListener('mousemove', event => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltCard.style.transform =
      `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform =
      'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}

$$('.magnetic').forEach(button => {
  if (!window.matchMedia('(pointer:fine)').matches) return;

  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

$$('.project-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const project = tab.dataset.project;

    $$('.project-tab').forEach(item => {
      item.classList.toggle('active', item === tab);
    });

    $$('[data-project-panel]').forEach(panel => {
      panel.classList.toggle(
        'active',
        panel.dataset.projectPanel === project
      );
    });
  });
});

const processCurrent = $('#processCurrent');

$$('.process-step').forEach(step => {
  $('.step-head', step).addEventListener('click', () => {
    $$('.process-step').forEach(item => {
      item.classList.remove('active');
    });

    step.classList.add('active');
    processCurrent.textContent = step.dataset.step;
  });
});

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = 1300;
    const start = performance.now();

    const animate = time => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    countObserver.unobserve(element);
  });
}, { threshold: 0.5 });

$$('[data-count]').forEach(item => {
  countObserver.observe(item);
});

const quoteForm = $('#quoteForm');
const formSteps = $$('.form-step', quoteForm);
const progress = $('#formProgress');

let currentStep = 0;

function showFormStep(index) {
  currentStep = Math.max(
    0,
    Math.min(index, formSteps.length - 1)
  );

  formSteps.forEach((step, i) => {
    step.classList.toggle('active', i === currentStep);
  });

  progress.style.width =
    `${((currentStep + 1) / formSteps.length) * 100}%`;
}

$$('.form-next', quoteForm).forEach(button => {
  button.addEventListener('click', () => {
    if (
      currentStep === 0 &&
      $$('input[name="services"]:checked', quoteForm).length === 0
    ) {
      alert('Selecciona al menos un servicio para continuar.');
      return;
    }

    if (
      currentStep === 1 &&
      !$('input[name="objective"]:checked', quoteForm)
    ) {
      alert('Selecciona el objetivo principal de tu proyecto.');
      return;
    }

    showFormStep(currentStep + 1);
  });
});

$$('.form-back', quoteForm).forEach(button => {
  button.addEventListener('click', () => {
    showFormStep(currentStep - 1);
  });
});

$$('.plan-select').forEach(button => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan;
    const details = $('textarea[name="details"]', quoteForm);

    details.value =
      `Estoy interesado/a en el plan ${plan}. `;

    showFormStep(2);

    $('#cotizador').scrollIntoView({
      behavior: 'smooth'
    });
  });
});

quoteForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);

  const services =
    data.getAll('services').join(', ') || 'Por definir';

  const objective =
    data.get('objective') || 'Por definir';

  const message = [
    'Hola Modo Click, quiero cotizar un proyecto.',
    '',
    `Nombre: ${data.get('name')}`,
    `Empresa: ${data.get('company') || 'No indicada'}`,
    `Correo: ${data.get('email')}`,
    `WhatsApp: ${data.get('phone')}`,
    `Servicios: ${services}`,
    `Objetivo: ${objective}`,
    `Detalles: ${data.get('details') || 'Sin detalles adicionales'}`
  ].join('\n');

  const whatsappNumber = '56974230898';

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(
    whatsappURL,
    '_blank',
    'noopener'
  );
});

$('#year').textContent = new Date().getFullYear();
