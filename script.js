
console.log("JavaScript chargé !");

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU HAMBURGER — COMMUN À TOUTES LES PAGES
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const siteMenu = document.getElementById("siteMenu");

    if (menuToggle && siteMenu) {

        function openMenu() {
            siteMenu.classList.add("is-open");
            menuToggle.setAttribute("aria-expanded", "true");
            siteMenu.setAttribute("aria-hidden", "false");
            menuToggle.setAttribute("aria-label", "Fermer le menu de navigation");
        }

        function closeMenu() {
            siteMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            siteMenu.setAttribute("aria-hidden", "true");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
        }

        function toggleMenu() {
            const isOpen = siteMenu.classList.contains("is-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Ouvrir ou fermer le menu avec le bouton.
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleMenu();
        });

        // Ne pas fermer le menu lors d'un clic à l'intérieur.
        siteMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Fermer le menu après avoir choisi une destination.
        siteMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Fermer le menu lorsqu'on clique ailleurs sur la page.
        document.addEventListener("click", () => {
            closeMenu();
        });

        // Fermer le menu avec la touche Échap.
        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                siteMenu.classList.contains("is-open")
            ) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // État initial du menu.
        closeMenu();
    }


    /* =====================================================
       OPTIONS DYNAMIQUES DE RÉSERVATION
       ===================================================== */

    const experience = document.getElementById("experience");

    const experienceOptions = {
        hotel: document.getElementById("hotel-options"),
        restaurant: document.getElementById("restaurant-options"),
        concierge: document.getElementById("concierge-options")
    };

    function updateExperienceOptions() {
        if (!experience) return;

        Object.entries(experienceOptions).forEach(([type, block]) => {
            if (!block) return;

            const active = experience.value === type;

            block.hidden = !active;

            block.querySelectorAll("input, select, textarea").forEach((field) => {
                field.disabled = !active;
            });
        });
    }

    if (experience) {
        experience.value = "";
        updateExperienceOptions();

        experience.addEventListener("change", updateExperienceOptions);
    }


    /* =====================================================
       TÉLÉPHONE INTERNATIONAL
       ===================================================== */

    const phoneInput = document.getElementById("phone-number");
    const fullPhone = document.getElementById("phone");
    const form = document.getElementById("reservation-form");

    let phoneInstance = null;

    if (phoneInput && fullPhone && form) {

        if (typeof window.intlTelInput === "function") {
            phoneInstance = window.intlTelInput(phoneInput, {
                initialCountry: "fr",
                separateDialCode: true,
                nationalMode: true,
                formatOnDisplay: true,
                preferredCountries: ["fr", "be", "ch", "lu", "gb", "us", "ca"],
                useFullscreenPopup: false
            });
        } else {
            console.error(
                "Le sélecteur de pays ne s'est pas chargé. Vérifie la connexion Internet."
            );
        }

        function updateFullPhone() {
            if (!phoneInput.value.trim()) {
                fullPhone.value = "";
                return;
            }

            fullPhone.value = phoneInstance
                ? phoneInstance.getNumber()
                : phoneInput.value.trim();
        }

        phoneInput.addEventListener("input", () => {
            phoneInput.setCustomValidity("");
            updateFullPhone();
        });

        if (phoneInstance) {
            phoneInput.addEventListener("countrychange", updateFullPhone);
        }

        form.addEventListener("submit", (event) => {
            updateFullPhone();

            if (
                phoneInstance &&
                phoneInput.value.trim() &&
                !phoneInstance.isValidNumber()
            ) {
                event.preventDefault();

                phoneInput.setCustomValidity(
                    "Vérifie le numéro et le pays sélectionné."
                );

                phoneInput.reportValidity();
            }
        });
    }


    /* =====================================================
       DATE MINIMALE — RÉSERVATION
       ===================================================== */

    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

});


    /* =====================================================
       MODALE DU CV
       ===================================================== */

    const openCvButton = document.getElementById("openCvModal");
    const cvModal = document.getElementById("cvModal");
    const closeCvButton = document.getElementById("closeCvModal");

    if (openCvButton && cvModal && closeCvButton) {
        let previousFocus = null;

        function openCvModal() {
            previousFocus = document.activeElement;

            cvModal.classList.add("is-open");
            cvModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("cv-modal-open");

            closeCvButton.focus();
        }

        function closeCvModal() {
            cvModal.classList.remove("is-open");
            cvModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("cv-modal-open");

            if (previousFocus) {
                previousFocus.focus();
            }
        }

        openCvButton.addEventListener("click", openCvModal);
        closeCvButton.addEventListener("click", closeCvModal);

        cvModal.addEventListener("click", (event) => {
            if (event.target === cvModal) {
                closeCvModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                cvModal.classList.contains("is-open")
            ) {
                closeCvModal();
            }
        });
    }
