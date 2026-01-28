// ========================================
// CONFIGURACIÓN DE ANIMACIONES DE SCROLL
// ========================================

export const animationConfig = {
    // Configuración del Intersection Observer
    observerOptions: {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // Activa 100px antes de que el elemento sea visible
        threshold: 0.15 // 15% del elemento debe ser visible
    },

    // Delays predefinidos (en ms)
    delays: {
        none: 0,
        short: 100,
        medium: 200,
        long: 300,
        extraLong: 400
    },

    // Duraciones de animación (en ms)
    durations: {
        fast: 400,
        normal: 600,
        slow: 800,
        verySlow: 1000
    },

    // Configuración por tipo de animación
    animations: {
        fadeUp: {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        fadeIn: {
            duration: 500,
            easing: 'ease-out'
        },
        slideLeft: {
            duration: 700,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        slideRight: {
            duration: 700,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        scaleUp: {
            duration: 500,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // bounce effect
        },
        stagger: {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            childDelay: 100 // delay entre cada hijo
        }
    },

    // Clases CSS que se aplicarán
    classes: {
        hidden: 'scroll-hidden',
        visible: 'scroll-visible',
        animated: 'scroll-animated'
    }
};
