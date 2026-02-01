/**
 * INTERIORS CAROUSEL - Lógica de control para el slider Quad-View
 */
export function initInteriorsCarousel() {
    // Selección de elementos
    const track = document.getElementById('interiors-track');
    if (!track) return; // Si no existe la sección, salir

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    // Función principal: Cambiar al slide objetivo
    const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
        // Actualizar clases de slide
        currentSlide.classList.remove('active');

        // Pequeño delay para permitir animaciones de salida si se implementaran
        // En este caso es cambio directo por CSS opacity
        targetSlide.classList.add('active');

        // Actualizar estado interno
        currentIndex = targetIndex;
    };

    // Actualizar los puntos indicadores
    const updateDots = (targetIndex) => {
        // Remover active de todos
        dots.forEach(dot => dot.classList.remove('active'));
        // Agregar active al target
        dots[targetIndex].classList.add('active');
    };

    // Event Listener: Botón Siguiente
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const currentSlide = slides[currentIndex];
            let nextIndex = currentIndex + 1;

            // Loop infinito
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }

            const nextSlide = slides[nextIndex];

            moveToSlide(currentSlide, nextSlide, nextIndex);
            updateDots(nextIndex);
        });
    }

    // Event Listener: Botón Anterior
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const currentSlide = slides[currentIndex];
            let prevIndex = currentIndex - 1;

            // Loop infinito hacia atrás
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }

            const prevSlide = slides[prevIndex];

            moveToSlide(currentSlide, prevSlide, prevIndex);
            updateDots(prevIndex);
        });
    }

    // Event Listener: Puntos Indicadores
    if (dotsNav) {
        dotsNav.addEventListener('click', (e) => {
            // Click en un dot?
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const targetIndex = parseInt(targetDot.dataset.slide);
            if (targetIndex === currentIndex) return; // Ya estamos ahí

            const currentSlide = slides[currentIndex];
            const targetSlide = slides[targetIndex];

            moveToSlide(currentSlide, targetSlide, targetIndex);
            updateDots(targetIndex);
        });
    }

    // Opcional: Auto-play suave (cada 8 segundos)
    /*
    setInterval(() => {
        // Simular click en siguiente
        if(nextButton) nextButton.click();
    }, 8000);
    */

    console.log('✅ Interiors Carousel initialized');
}
