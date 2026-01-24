// js/utils/dom.js

/**
 * Crea un elemento HTML con atributos y contenido.
 * @param {string} tag - Etiqueta (div, h1, section)
 * @param {object} attributes - Clases, ids, src, etc.
 * @param {string|HTMLElement} content - Texto o nodo hijo
 * @returns {HTMLElement}
 */
export const createEl = (tag, attributes = {}, content = '') => {
    const el = document.createElement(tag);

    // Asignar atributos (clases, id, etc.)
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            el.className = value; // Soporta string "btn btn-primary"
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dKey, dValue]) => el.dataset[dKey] = dValue);
        } else {
            el.setAttribute(key, value);
        }
    });

    // Insertar contenido
    if (typeof content === 'string') {
        el.textContent = content;
    } else if (content instanceof HTMLElement) {
        el.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(child => el.appendChild(child));
    }

    return el;
};