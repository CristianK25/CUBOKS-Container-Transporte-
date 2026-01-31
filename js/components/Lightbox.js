// js/components/Lightbox.js

/**
 * Datos de las galerías.
 * IMPORTANTE: Reemplazar estos placeholders con las rutas reales de tus imágenes.
 */
const galleries = {
    transporte: [
        'https://placehold.co/1200x800?text=Transporte+1',
        'https://placehold.co/1200x800?text=Camion+en+Ruta',
        'https://placehold.co/1200x800?text=Llegada+a+Obra'
    ],
    instalacion: [
        'https://placehold.co/1200x800?text=Instalacion+1',
        'https://placehold.co/1200x800?text=Grua+Levantando',
        'https://placehold.co/1200x800?text=Nivelacion+Final'
    ]
};

let currentGallery = [];
let currentIndex = 0;

export const initLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.lightbox-image');
    const closeBtn = modal.querySelector('.close-lightbox');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    const currentIndexSpan = document.getElementById('current-index');
    const totalImagesSpan = document.getElementById('total-images');
    const triggers = document.querySelectorAll('.trigger-gallery');

    // 1. Abrir Modal
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const galleryKey = trigger.dataset.gallery;
            if (galleries[galleryKey]) {
                currentGallery = galleries[galleryKey];
                currentIndex = 0;
                updateImage();
                openModal();
            }
        });
    });

    // 2. Cerrar Modal
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer click fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
        // Navegación con teclado
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });

    // 3. Navegación
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    function updateImage() {
        modalImg.style.opacity = '0'; // Efecto fade out breve
        setTimeout(() => {
            modalImg.src = currentGallery[currentIndex];
            modalImg.style.opacity = '1'; // Fade in
        }, 150);

        if (currentIndexSpan) currentIndexSpan.textContent = currentIndex + 1;
        if (totalImagesSpan) totalImagesSpan.textContent = currentGallery.length;
    }

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateImage();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateImage();
    }
    
    console.log('📸 Lightbox initialized');
};
