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
    // MENÚ MÓVIL HAMBURGUESA
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Toggle menú al hacer clic en hamburguesa
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            
            // Actualizar aria-expanded para accesibilidad
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
            
            // Cambiar icono entre hamburguesa y X
            mobileMenuBtn.textContent = isActive ? '✕' : '☰';
        });

        // Cerrar menú al hacer clic en cualquier enlace
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
};