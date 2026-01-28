// ========================================
// SISTEMA GLOBAL DE ANIMACIONES DE SCROLL
// ========================================

import { animationConfig } from '../config/animationConfig.js';

class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
    }

    /**
     * Inicializa el sistema de animaciones
     */
    init() {
        // Crear el Intersection Observer
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            animationConfig.observerOptions
        );

        // Buscar todos los elementos con animación
        this.observeElements();

        // Re-observar elementos si se agregan dinámicamente
        this.setupMutationObserver();
    }

    /**
     * Observa todos los elementos que tienen atributos de animación
     */
    observeElements() {
        // Seleccionar elementos con data-animate
        const elements = document.querySelectorAll('[data-animate]');

        elements.forEach(element => {
            // Agregar clase inicial (oculto)
            element.classList.add(animationConfig.classes.hidden);

            // Aplicar delay si existe
            const delay = element.dataset.animateDelay;
            if (delay) {
                element.style.transitionDelay = `${delay}ms`;
            }

            // Aplicar duración personalizada si existe
            const duration = element.dataset.animateDuration;
            if (duration) {
                element.style.transitionDuration = `${duration}ms`;
            }

            // Observar el elemento
            this.observer.observe(element);
        });

        console.log(`🎬 ScrollAnimations: Observando ${elements.length} elementos`);
    }

    /**
     * Maneja la intersección de elementos con el viewport
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            } else {
                // Opcional: re-animar cuando sale del viewport
                const repeat = entry.target.dataset.animateRepeat;
                if (repeat === 'true') {
                    this.hideElement(entry.target);
                }
            }
        });
    }

    /**
     * Anima un elemento cuando entra en el viewport
     */
    animateElement(element) {
        // Evitar animar múltiples veces (a menos que tenga repeat)
        const repeat = element.dataset.animateRepeat;
        if (this.animatedElements.has(element) && repeat !== 'true') {
            return;
        }

        // Obtener tipo de animación
        const animationType = element.dataset.animate || 'fadeUp';

        // Aplicar clases de animación
        element.classList.remove(animationConfig.classes.hidden);
        element.classList.add(animationConfig.classes.visible);
        element.classList.add(`animate-${animationType}`);

        // Marcar como animado
        this.animatedElements.add(element);

        // Manejar animaciones stagger (para elementos hijos)
        if (animationType === 'stagger') {
            this.handleStaggerAnimation(element);
        }

        // Callback personalizado si existe
        const callback = element.dataset.animateCallback;
        if (callback && window[callback]) {
            window[callback](element);
        }

        // Dejar de observar si no se repite
        if (repeat !== 'true') {
            this.observer.unobserve(element);
        }
    }

    /**
     * Oculta un elemento (para animaciones repetibles)
     */
    hideElement(element) {
        element.classList.remove(animationConfig.classes.visible);
        element.classList.add(animationConfig.classes.hidden);
    }

    /**
     * Maneja animaciones stagger (elementos hijos con delay escalonado)
     */
    handleStaggerAnimation(parent) {
        const children = parent.querySelectorAll('[data-stagger-item]');
        const baseDelay = parseInt(parent.dataset.animateDelay) || 0;
        const staggerDelay = parseInt(parent.dataset.staggerDelay) ||
            animationConfig.animations.stagger.childDelay;

        children.forEach((child, index) => {
            const totalDelay = baseDelay + (index * staggerDelay);
            child.style.transitionDelay = `${totalDelay}ms`;

            setTimeout(() => {
                child.classList.add(animationConfig.classes.visible);
            }, totalDelay);
        });
    }

    /**
     * Observa cambios en el DOM para agregar nuevos elementos
     */
    setupMutationObserver() {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.hasAttribute('data-animate')) {
                        node.classList.add(animationConfig.classes.hidden);
                        this.observer.observe(node);
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Destruye el observer (útil para cleanup)
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }
}

// Crear instancia singleton
const scrollAnimations = new ScrollAnimationManager();

/**
 * Función de inicialización para exportar
 */
export function initScrollAnimations() {
    scrollAnimations.init();
}

/**
 * Exportar instancia para uso avanzado
 */
export { scrollAnimations };
