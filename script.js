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

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeader);
updateHeader();

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("active");

        mobileMenu.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));

        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    $$(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");

            document.body.style.overflow = "";
        });
    });
}

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
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

const tiltCard = $(".tilt-card");

if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
    tiltCard.addEventListener("mousemove", (event) => {
        const cardBounds = tiltCard.getBoundingClientRect();

        const horizontalPosition =
            (event.clientX - cardBounds.left) / cardBounds.width - 0.5;

        const verticalPosition =
            (event.clientY - cardBounds.top) / cardBounds.height - 0.5;

        const rotateY = horizontalPosition * 8;
        const rotateX = verticalPosition * -8;

        tiltCard.style.transform =
            `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
        tiltCard.style.transform =
            "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    });
}

if (window.matchMedia("(pointer: fine)").matches) {
    $$(".magnetic").forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const buttonBounds = button.getBoundingClientRect();

            const horizontalMovement =
                event.clientX -
                buttonBounds.left -
                buttonBounds.width / 2;

            const verticalMovement =
                event.clientY -
                buttonBounds.top -
                buttonBounds.height / 2;

            button.style.transform =
                `translate(${horizontalMovement * 0.08}px, ` +
                `${verticalMovement * 0.08}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });
}

const projectTabs = $$(".project-tab");
const projectPanels = $$("[data-project-panel]");

projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedProject = tab.dataset.project;

        projectTabs.forEach((currentTab) => {
            currentTab.classList.toggle(
                "active",
                currentTab === tab
            );
        });

        projectPanels.forEach((panel) => {
            const isSelected =
                panel.dataset.projectPanel === selectedProject;

            panel.classList.toggle("active", isSelected);
        });
    });
});

const processSteps = $$(".process-step");

processSteps.forEach((step) => {
    const stepButton = $(".step-head", step);

    if (!stepButton) {
        return;
    }

    stepButton.addEventListener("click", () => {
        processSteps.forEach((currentStep) => {
            currentStep.classList.remove("active");
        });

        step.classList.add("active");

        if (processCurrent) {
            processCurrent.textContent = step.dataset.step || "01";
        }
    });
});

const counterElements = $$("[data-count]");

function animateCounter(element) {
    const targetValue = Number(element.dataset.count || 0);
    const animationDuration = 1300;
    const animationStart = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - animationStart;
        const progress = Math.min(
            elapsedTime / animationDuration,
            1
        );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            targetValue * easedProgress
        );

        element.textContent = String(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
        } else {
            element.textContent = String(targetValue);
        }
    }

    window.requestAnimationFrame(updateCounter);
}

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
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

if (quoteForm) {
    const formSteps = $$(".form-step", quoteForm);
    const nextButtons = $$(".form-next", quoteForm);
    const backButtons = $$(".form-back", quoteForm);
    const planButtons = $$(".plan-select");

    let currentFormStep = 0;

    function showFormStep(stepIndex) {
        const maximumStep = formSteps.length - 1;

        currentFormStep = Math.max(
            0,
            Math.min(stepIndex, maximumStep)
        );

        formSteps.forEach((step, index) => {
            step.classList.toggle(
                "active",
                index === currentFormStep
            );
        });

        if (formProgress) {
            const progressPercentage =
                ((currentFormStep + 1) / formSteps.length) * 100;

            formProgress.style.width =
                `${progressPercentage}%`;
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
        button.addEventListener("click", () => {
            if (!validateCurrentStep()) {
                return;
            }

            showFormStep(currentFormStep + 1);
        });
    });

    backButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showFormStep(currentFormStep - 1);
        });
    });

    planButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedPlan =
                button.dataset.plan || "Personalizado";

            const detailsField = $(
                'textarea[name="details"]',
                quoteForm
            );

            if (detailsField) {
                detailsField.value =
                    `Estoy interesado/a en el plan ${selectedPlan}. `;
            }

            showFormStep(2);

            const quoteSection = $("#cotizador");

            if (quoteSection) {
                quoteSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    quoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!quoteForm.reportValidity()) {
            return;
        }

        const formData = new FormData(quoteForm);

        const selectedServices =
            formData.getAll("services");

        const servicesText =
            selectedServices.length > 0
                ? selectedServices.join(", ")
                : "Por definir";

        const objectiveText =
            formData.get("objective") || "Por definir";

        const clientName =
            formData.get("name") || "No indicado";

        const companyName =
            formData.get("company") || "No indicada";

        const clientEmail =
            formData.get("email") || "No indicado";

        const clientPhone =
            formData.get("phone") || "No indicado";

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

        const whatsappNumber = "56974230898";

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}` +
            `?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    });

    showFormStep(0);
}

$$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const destinationId = link.getAttribute("href");

        if (!destinationId || destinationId === "#") {
            return;
        }

        const destinationElement =
            document.querySelector(destinationId);

        if (!destinationElement) {
            return;
        }

        event.preventDefault();

        const headerOffset =
            siteHeader ? siteHeader.offsetHeight : 0;

        const destinationPosition =
            destinationElement.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

        window.scrollTo({
            top: destinationPosition,
            behavior: "smooth"
        });
    });
});

if (yearElement) {
    yearElement.textContent =
        String(new Date().getFullYear());
}
