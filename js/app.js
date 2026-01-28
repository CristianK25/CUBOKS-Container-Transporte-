import '../css/main.css';
import { initNavbar } from './components/Navbar.js';
import { initScrollTrigger } from './utils/scrollTrigger.js';

// ========================================
// DOM Ready Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollTrigger();

    console.log('✅ App initialized: Navbar & Scroll Trigger ready');
});
