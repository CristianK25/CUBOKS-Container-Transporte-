// js/components/Navbar.js

export const initNavbar = () => {
    const navbar = document.querySelector('.navbar');

    // Escuchamos el evento de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Si bajamos más de 50px, agregamos la clase .scrolled
            navbar.classList.add('scrolled');
        } else {
            // Si volvemos arriba, quitamos la clase (vuelve a transparente)
            navbar.classList.remove('scrolled');
        }
    });

    // ... aquí iría tu lógica del menú hamburguesa ...
};