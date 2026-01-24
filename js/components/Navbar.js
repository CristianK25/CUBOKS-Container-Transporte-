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

    // ... aquí iría tu lógica del menú hamburguesa ...
};