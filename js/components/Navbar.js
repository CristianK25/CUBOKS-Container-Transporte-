// js/components/Navbar.js

export const initNavbar = () => {
    const navbar = document.querySelector('.navbar');

    const hero = document.querySelector('.hero');

    const observerOptions = {
        root: null,
        threshold: [0, 0.15] // Detectamos cuando cruza 15% y cuando llega a 0%
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el índice de intersección es 0.15 o menos (casi fuera o fuera)
            // activamos la clase .scrolled
            if (entry.intersectionRatio <= 0.15) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }, observerOptions);

    if (hero) {
        observer.observe(hero);
    }

    // ============================================
    // MENÚ MÓVIL - FULL SCREEN OVERLAY
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        // Función para abrir el menú
        const openMenu = () => {
            navLinks.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');

            // Bloquear scroll del body cuando el menú está abierto
            body.style.overflow = 'hidden';
        };

        // Función para cerrar el menú
        const closeMenu = () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');

            // Restaurar scroll del body
            body.style.overflow = '';
        };

        // Abrir menú al hacer clic en hamburguesa
        mobileMenuBtn.addEventListener('click', openMenu);

        // Cerrar menú al hacer clic en el botón de cierre (×)
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }

        // Cerrar menú al hacer clic en cualquier enlace
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar menú con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
};