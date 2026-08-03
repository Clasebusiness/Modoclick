"use strict";

const $ = (selector, context = document) => {
    return context.querySelector(selector);
};

const $$ = (selector, context = document) => {
    return Array.from(context.querySelectorAll(selector));
};

const siteHeader = $(".site-header");
const menuToggle = $(".menu-toggle");
const mobileMenu = $(".mobile-menu");
const cursorGlow = $(".cursor-glow");
const quoteForm = $("#quoteForm");
const formProgress = $("#formProgress");
const processCurrent = $("#processCurrent");
const yearElement = $("#year");

/*
==================================================
REGRESO DIRECTO AL INICIO DESDE EL LOGOTIPO
==================================================
*/

function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

function returnToHome(event) {
    event.preventDefault();

    closeMobileMenu();

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });

    /*
    Elimina cualquier #servicios, #planes, #contacto, etc.
    sin crear un nuevo movimiento en el historial.
    */

    const cleanUrl =
        window.location.pathname +
        window.location.search;

    window.history.replaceState(
        null,
        document.title,
        cleanUrl
    );
}

$$(".home-logo").forEach((logo) => {
    logo.addEventListener("click", returnToHome);
});

/*
==================================================
ENCABEZADO
==================================================
*/

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );
}

window.addEventListener("scroll", updateHeader);
updateHeader();

/*
==================================================
MENÚ MÓVIL
==================================================
*/

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.classList.toggle("active");

        mobileMenu.classList.toggle(
            "open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

        document.body.style.overflow =
            isOpen ? "hidden" : "";
    });

    $$(".mobile-menu a").forEach((link) => {
        if (link.classList.contains("home-logo")) {
            return;
        }

        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });
}

/*
==================================================
LUZ QUE SIGUE EL CURSOR
==================================================
*/

if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {
    window.addEventListener(
        "pointermove",
        (event) => {
            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;
        }
    );
}

/*
==================================================
ANIMACIONES AL HACER SCROLL
==================================================
*/

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

/*
==================================================
EFECTO 3D DEL HERO
==================================================
*/

const tiltCard = $(".tilt-card");

if (
    tiltCard &&
    window.matchMedia("(pointer: fine)").matches
) {
    tiltCard.addEventListener(
        "mousemove",
        (event) => {
            const bounds =
                tiltCard.getBoundingClientRect();

            const horizontal =
                (event.clientX - bounds.left) /
                bounds.width -
                0.5;

            const vertical =
                (event.clientY - bounds.top) /
                bounds.height -
                0.5;

            const rotateY =
                horizontal * 8;

            const rotateX =
                vertical * -8;

            tiltCard.style.transform =
                `perspective(1000px) ` +
                `rotateY(${rotateY}deg) ` +
                `rotateX(${rotateX}deg)`;
        }
    );

    tiltCard.addEventListener(
        "mouseleave",
        () => {
            tiltCard.style.transform =
                "perspective(1000px) " +
                "rotateY(0deg) " +
                "rotateX(0deg)";
        }
    );
}

/*
==================================================
EFECTO MAGNÉTICO DE BOTONES
==================================================
*/

if (
    window.matchMedia("(pointer: fine)").matches
) {
    $$(".magnetic").forEach((button) => {
        button.addEventListener(
            "mousemove",
            (event) => {
                const bounds =
                    button.getBoundingClientRect();

                const moveX =
                    event.clientX -
                    bounds.left -
                    bounds.width / 2;

                const moveY =
                    event.clientY -
                    bounds.top -
                    bounds.height / 2;

                button.style.transform =
                    `translate(` +
                    `${moveX * 0.08}px, ` +
                    `${moveY * 0.08}px` +
                    `)`;
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform = "";
            }
        );
    });
}

/*
==================================================
PESTAÑAS DE PROYECTOS
==================================================
*/

const projectTabs = $$(".project-tab");
const projectPanels = $$("[data-project-panel]");

projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedProject =
            tab.dataset.project;

        projectTabs.forEach((currentTab) => {
            currentTab.classList.toggle(
                "active",
                currentTab === tab
            );
        });

        projectPanels.forEach((panel) => {
            const isSelected =
                panel.dataset.projectPanel ===
                selectedProject;

            panel.classList.toggle(
                "active",
                isSelected
            );
        });
    });
});

/*
==================================================
ACORDEÓN DEL MÉTODO
==================================================
*/

const processSteps = $$(".process-step");

processSteps.forEach((step) => {
    const stepButton =
        $(".step-head", step);

    if (!stepButton) {
        return;
    }

    stepButton.addEventListener("click", () => {
        processSteps.forEach(
            (currentStep) => {
                currentStep.classList.remove(
                    "active"
                );
            }
        );

        step.classList.add("active");

        if (processCurrent) {
            processCurrent.textContent =
                step.dataset.step || "01";
        }
    });
});

/*
==================================================
CONTADORES
==================================================
*/

const counterElements = $$("[data-count]");

function animateCounter(element) {
    const targetValue =
        Number(element.dataset.count || 0);

    const duration = 1300;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(
                targetValue * easedProgress
            );

        element.textContent =
            String(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(
                updateCounter
            );
        } else {
            element.textContent =
                String(targetValue);
        }
    }

    window.requestAnimationFrame(
        updateCounter
    );
}

if ("IntersectionObserver" in window) {
    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.5
            }
        );

    counterElements.forEach((element) => {
        counterObserver.observe(element);
    });
} else {
    counterElements.forEach((element) => {
        animateCounter(element);
    });
}

/*
==================================================
COTIZADOR
==================================================
*/

if (quoteForm) {
    const formSteps =
        $$(".form-step", quoteForm);

    const nextButtons =
        $$(".form-next", quoteForm);

    const backButtons =
        $$(".form-back", quoteForm);

    const planButtons =
        $$(".plan-select");

    let currentFormStep = 0;

    function showFormStep(stepIndex) {
        const maximumStep =
            formSteps.length - 1;

        currentFormStep = Math.max(
            0,
            Math.min(
                stepIndex,
                maximumStep
            )
        );

        formSteps.forEach(
            (step, index) => {
                step.classList.toggle(
                    "active",
                    index === currentFormStep
                );
            }
        );

        if (formProgress) {
            const percentage =
                (
                    (currentFormStep + 1) /
                    formSteps.length
                ) * 100;

            formProgress.style.width =
                `${percentage}%`;
        }
    }

    function validateCurrentStep() {
        if (currentFormStep === 0) {
            const selectedServices = $$(
                'input[name="services"]:checked',
                quoteForm
            );

            if (selectedServices.length === 0) {
                window.alert(
                    "Selecciona al menos un servicio para continuar."
                );

                return false;
            }
        }

        if (currentFormStep === 1) {
            const selectedObjective = $(
                'input[name="objective"]:checked',
                quoteForm
            );

            if (!selectedObjective) {
                window.alert(
                    "Selecciona el objetivo principal de tu proyecto."
                );

                return false;
            }
        }

        return true;
    }

    nextButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                if (!validateCurrentStep()) {
                    return;
                }

                showFormStep(
                    currentFormStep + 1
                );
            }
        );
    });

    backButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                showFormStep(
                    currentFormStep - 1
                );
            }
        );
    });

    planButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const selectedPlan =
                    button.dataset.plan ||
                    "Personalizado";

                const detailsField = $(
                    'textarea[name="details"]',
                    quoteForm
                );

                if (detailsField) {
                    detailsField.value =
                        `Estoy interesado/a en el plan ` +
                        `${selectedPlan}. `;
                }

                showFormStep(2);

                const quoteSection =
                    $("#cotizador");

                if (quoteSection) {
                    quoteSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    });

    quoteForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            if (!quoteForm.reportValidity()) {
                return;
            }

            const formData =
                new FormData(quoteForm);

            const selectedServices =
                formData.getAll("services");

            const servicesText =
                selectedServices.length > 0
                    ? selectedServices.join(", ")
                    : "Por definir";

            const objectiveText =
                formData.get("objective") ||
                "Por definir";

            const clientName =
                formData.get("name") ||
                "No indicado";

            const companyName =
                formData.get("company") ||
                "No indicada";

            const clientEmail =
                formData.get("email") ||
                "No indicado";

            const clientPhone =
                formData.get("phone") ||
                "No indicado";

            const projectDetails =
                formData.get("details") ||
                "Sin detalles adicionales";

            const messageLines = [
                "Hola Modo Click, quiero cotizar un proyecto.",
                "",
                `Nombre: ${clientName}`,
                `Empresa o marca: ${companyName}`,
                `Correo: ${clientEmail}`,
                `WhatsApp: ${clientPhone}`,
                `Servicios: ${servicesText}`,
                `Objetivo principal: ${objectiveText}`,
                `Detalles: ${projectDetails}`
            ];

            const whatsappMessage =
                messageLines.join("\n");

            const whatsappNumber =
                "56974230898";

            const whatsappUrl =
                `https://wa.me/${whatsappNumber}` +
                `?text=${encodeURIComponent(
                    whatsappMessage
                )}`;

            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );

    showFormStep(0);
}

/*
==================================================
DESPLAZAMIENTO DE ENLACES INTERNOS
==================================================
*/

$$('a[href^="#"]').forEach((link) => {
    /*
    Los logotipos se gestionan con returnToHome().
    No se deben procesar nuevamente aquí.
    */

    if (link.classList.contains("home-logo")) {
        return;
    }

    link.addEventListener(
        "click",
        (event) => {
            const destinationId =
                link.getAttribute("href");

            if (
                !destinationId ||
                destinationId === "#"
            ) {
                return;
            }

            const destination =
                document.querySelector(
                    destinationId
                );

            if (!destination) {
                return;
            }

            event.preventDefault();

            const headerOffset =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;

            const destinationPosition =
                destination
                    .getBoundingClientRect()
                    .top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top: destinationPosition,
                behavior: "smooth"
            });

            /*
            Actualiza la dirección sin agregar múltiples
            movimientos al historial del navegador.
            */

            window.history.replaceState(
                null,
                document.title,
                destinationId
            );
        }
    );
});

/*
==================================================
AÑO DEL FOOTER
==================================================
*/

if (yearElement) {
    yearElement.textContent =
        String(new Date().getFullYear());
}
