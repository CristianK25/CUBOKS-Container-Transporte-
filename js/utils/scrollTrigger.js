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
    // SECCIÓN BENEFITS
    // ========================================
    const benefitsElements = document.querySelectorAll('.benefits article');

    benefitsElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`🎬 ScrollTrigger: Observando ${benefitsElements.length} elementos de benefits`);

    // ========================================
    // SECCIÓN VENTA (Observador específico con threshold más alto)
    // ========================================
    const ventaObserverOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px', // Se activa cuando está más centrado en viewport
        threshold: 0.3 // 30% del elemento debe ser visible (vs 10% del observer general)
    };

    const ventaObserver = new IntersectionObserver(observerCallback, ventaObserverOptions);

    // Observar header (h2 y p) y cards
    const ventaElements = document.querySelectorAll(
        '.venta .section-header h2, .venta .section-header p, .venta-card'
    );

    ventaElements.forEach(element => {
        ventaObserver.observe(element);
    });

    console.log(`🎬 ScrollTrigger: Observando ${ventaElements.length} elementos de venta (threshold: 30%)`);

    // ========================================
    // SECCIÓN CTA
    // ========================================
    const ctaElement = document.querySelector('.cta-section');

    if (ctaElement) {
        observer.observe(ctaElement);
        console.log(`🎬 ScrollTrigger: Observando sección CTA`);
    }
}
