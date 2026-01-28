import { initNavbar } from './components/Navbar.js';

// ========================================
// Preloader Management
// ========================================
// Wait for ALL resources to load (images, CSS, fonts)
// before removing the preloader
window.addEventListener('load', () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300); // 300ms delay for smoother experience
});

// ========================================
// DOM Ready Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});
