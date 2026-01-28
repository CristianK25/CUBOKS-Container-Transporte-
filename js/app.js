import '../css/main.css';
import { initNavbar } from './components/Navbar.js';

// ========================================
// DOM Ready Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();

    console.log('✅ App initialized: Navbar & Scroll Animations ready');
});
