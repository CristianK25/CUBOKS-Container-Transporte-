import '../css/main.css';
import { initNavbar } from './components/Navbar.js';
import { initScrollTrigger } from './utils/scrollTrigger.js';
import { initLightbox } from './components/Lightbox.js';

// ========================================
// DOM Ready Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollTrigger();
    initLightbox();

    console.log('✅ App initialized: Navbar & Scroll Trigger ready');
});
