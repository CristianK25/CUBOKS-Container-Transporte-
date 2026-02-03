// ========================================
// SCROLL TRIGGER - Sistema simple de animaciones con scroll
// ========================================

/**
 * Inicializa el sistema de scroll trigger
 * Observa elementos específicos y les agrega la clase 'visible' cuando entran al viewport
 */
export function initScrollTrigger() {
    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // Se activa 100px antes de que sea visible
        threshold: 0.1 // 10% del elemento debe ser visible
    };

    // Callback cuando un elemento entra/sale del viewport
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase 'visible' cuando entra al viewport
                entry.target.classList.add('visible');

                // Opcional: dejar de observar después de animar (animación única)
                // Comenta la siguiente línea si quieres que se anime cada vez que scrolleas
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // ========================================
    // SECCIÓN FILOSOFÍA
    // ========================================
    const philosophyElements = document.querySelectorAll(
        '.philosophy .image-content, .philosophy .text-content'
    );

    philosophyElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`🎬 ScrollTrigger: Observando ${philosophyElements.length} elementos`);

    // ========================================
    // SECCIÓN COMPARATIVA
    // ========================================
    const comparisonElements = document.querySelectorAll('.comparison-section .reveal');

    comparisonElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`🎬 ScrollTrigger: Observando ${comparisonElements.length} elementos de comparativa`);

    // ========================================
    // SECCIÓN LOGÍSTICA
    // ========================================
    const logisticaElements = document.querySelectorAll(
        '.logistica .section-header h2, .logistica .section-header p, ' +
        '.logistica .process-step .step-text, .logistica .process-step.reverse .step-text, ' +
        '.logistica .process-step .step-visual, .logistica .process-step.reverse .step-visual'
    );

    logisticaElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`🎬 ScrollTrigger: Observando ${logisticaElements.length} elementos de logística`);

    // ========================================
    // AGREGAR MÁS SECCIONES AQUÍ
    // ========================================
    // Ejemplo para agregar otra sección:
    // const benefitsElements = document.querySelectorAll('.benefits article');
    // benefitsElements.forEach(el => observer.observe(el));
}
