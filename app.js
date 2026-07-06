/* ----------------------------------------------------
   InAmigos Foundation - Modern NGO Awareness JS
   Author: Antigravity AI Product Designer
------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // --- Initialize UI Elements ---
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initProjectFilter();
    initProjectDetails();
    initLightbox();
    initFormValidation();
    initNewsletterValidation();
});

// ====================================================
// 1. Theme Manager (Light / Dark Mode)
// ====================================================
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Set initial theme
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme");
        const newTheme = theme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// ====================================================
// 2. Mobile Navigation Menu
// ====================================================
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const overlay = document.getElementById("mobile-nav-overlay");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        const isActive = hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        overlay.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", isActive);
        
        // Prevent body scroll when menu is active
        document.body.style.overflow = isActive ? "hidden" : "";
    }

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

// ====================================================
// 3. Scroll Effects & Counters
// ====================================================
function initScrollEffects() {
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");
    const progressPath = document.querySelector(".progress-path");
    const animElements = document.querySelectorAll(".animate-on-scroll");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    // Path length of circular progress bar: 2 * PI * r (r = 49) = 307.9
    const pathLength = 307.919;
    if (progressPath) {
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
    }

    // Scroll calculations
    function handleScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // 1. Top progress bar
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // 2. Back to top button visibility & circular progress
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

            if (progressPath) {
                const draw = pathLength * (scrollPercent / 100);
                progressPath.style.strokeDashoffset = pathLength - draw;
            }
        }

        // 3. Active Link Highlighting on Scroll
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    }

    // Scroll to Top action
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially

    // --- Intersection Observers for Animations and Counters ---
    
    // 1. Reveal animations on scroll
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                animObserver.unobserve(entry.target); // Trigger animation once
            }
        });
    }, {
        threshold: 0.15
    });

    animElements.forEach(el => animObserver.observe(el));

    // 2. Animated Stats Counter
    const statsSection = document.getElementById("impact");
    const countElements = document.querySelectorAll(".impact-number");
    let hasCounted = false;

    function startCounting() {
        countElements.forEach(el => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Ease-out quad function for smooth deceleration
                const easeProgress = progress * (2 - progress);
                const currentValue = Math.floor(easeProgress * target);
                
                // Format numbers with comma grouping if value is large
                el.textContent = currentValue >= 1000 ? currentValue.toLocaleString() : currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target >= 1000 ? target.toLocaleString() : target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    if (statsSection && countElements.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    startCounting();
                    hasCounted = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        statsObserver.observe(statsSection);
    }
}

// ====================================================
// 4. Project Filters
// ====================================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (filterValue === "all" || cardCategory === filterValue) {
                    card.style.display = "flex";
                    // Trigger tiny delay for CSS animations to kick in
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    // Wait for fadeout animation before hiding
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

// ====================================================
// 5. Expandable Project Detail Drawers
// ====================================================
function initProjectDetails() {
    const detailButtons = document.querySelectorAll(".project-details-btn");

    detailButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".project-card");
            const isExpanded = card.classList.toggle("expanded");
            
            // Toggle label text
            btn.innerHTML = isExpanded ? 
                `Hide Details <i data-lucide="chevron-up"></i>` : 
                `Learn Details <i data-lucide="chevron-down"></i>`;
            
            // Re-render Lucide icons dynamically added
            lucide.createIcons();
        });
    });
}

// ====================================================
// 6. Image Lightbox System
// ====================================================
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    let currentIndex = -1;
    const imagesList = [];

    // Construct image registry list
    galleryItems.forEach((item, index) => {
        const img = item.querySelector(".gallery-img");
        const caption = item.querySelector(".gallery-caption").textContent;
        imagesList.push({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            caption: caption
        });

        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // disable background scroll
        document.addEventListener("keydown", handleKeyboardNav);
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyboardNav);
    }

    function navigateLightbox(direction) {
        currentIndex += direction;
        if (currentIndex >= imagesList.length) {
            currentIndex = 0; // Wrap around to start
        } else if (currentIndex < 0) {
            currentIndex = imagesList.length - 1; // Wrap around to end
        }
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = imagesList[currentIndex];
        lightboxImg.setAttribute("src", item.src);
        lightboxImg.setAttribute("alt", item.alt);
        lightboxCaption.textContent = item.caption;
    }

    function handleKeyboardNav(e) {
        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowRight") {
            navigateLightbox(1);
        } else if (e.key === "ArrowLeft") {
            navigateLightbox(-1);
        }
    }

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => navigateLightbox(-1));
    nextBtn.addEventListener("click", () => navigateLightbox(1));
    
    // Close on clicking outside lightbox image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ====================================================
// 7. Interactive Form Client-Side Validation
// ====================================================
function initFormValidation() {
    // 1. Volunteer Form
    const vForm = document.getElementById("volunteer-form");
    const vSuccess = document.getElementById("volunteer-success");
    const resetVBtn = document.getElementById("reset-v-form");

    if (vForm) {
        setupRealtimeValidation(vForm);
        vForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const isValid = validateFormElements(vForm);
            if (isValid) {
                // Simulate server submission success
                vSuccess.classList.add("active");
            }
        });
    }

    if (resetVBtn) {
        resetVBtn.addEventListener("click", () => {
            vSuccess.classList.remove("active");
            vForm.reset();
            clearValidationStates(vForm);
        });
    }

    // 2. Contact Form
    const cForm = document.getElementById("contact-form");
    const cSuccess = document.getElementById("contact-success");
    const resetCBtn = document.getElementById("reset-c-form");

    if (cForm) {
        setupRealtimeValidation(cForm);
        cForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const isValid = validateFormElements(cForm);
            if (isValid) {
                cSuccess.classList.add("active");
                cForm.style.display = "none";
            }
        });
    }

    if (resetCBtn) {
        resetCBtn.addEventListener("click", () => {
            cSuccess.classList.remove("active");
            cForm.style.display = "flex";
            cForm.reset();
            clearValidationStates(cForm);
        });
    }
}

// Helpers for validation
function setupRealtimeValidation(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        // Run check when user leaves the field or types
        input.addEventListener("blur", () => checkField(input));
        input.addEventListener("input", () => {
            if (input.parentElement.classList.contains("invalid")) {
                checkField(input);
            }
        });
    });
}

function checkField(input) {
    const parent = input.parentElement;
    let isValid = true;

    if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
    } else if (input.type === "email" && input.value) {
        // Basic email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(input.value.trim());
    } else if (input.type === "tel" && input.value) {
        // 10 digit phone check
        const phoneRegex = /^[0-9]{10}$/;
        isValid = phoneRegex.test(input.value.replace(/[\s-]/g, ""));
    }

    if (isValid) {
        parent.classList.remove("invalid");
    } else {
        parent.classList.add("invalid");
    }

    return isValid;
}

function validateFormElements(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    let isFormValid = true;

    inputs.forEach(input => {
        const isFieldValid = checkField(input);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function clearValidationStates(form) {
    const groups = form.querySelectorAll(".form-group");
    groups.forEach(group => group.classList.remove("invalid"));
}

// ====================================================
// 8. Newsletter Signup Form Validation
// ====================================================
function initNewsletterValidation() {
    const nlForm = document.getElementById("newsletter-form");
    const nlEmail = document.getElementById("nl-email");
    const nlSuccess = document.getElementById("newsletter-success");

    if (nlForm) {
        nlForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailVal = nlEmail.value.trim();

            if (emailVal && emailRegex.test(emailVal)) {
                nlForm.classList.remove("invalid");
                nlSuccess.classList.add("active");
                // Hide input group
                nlForm.querySelector(".newsletter-input-group").style.display = "none";
            } else {
                nlForm.classList.add("invalid");
                nlSuccess.classList.remove("active");
            }
        });
    }
}
