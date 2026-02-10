// Importar imágenes explícitamente para que Vite las incluya en el build
import paso1Main from '../../assets/img/logistica/paso1_main.jpeg';
import paso1_2 from '../../assets/img/logistica/paso1_2.jpeg';
import paso1_3 from '../../assets/img/logistica/paso1_3.jpeg';
import paso1_4 from '../../assets/img/logistica/paso1_4.jpeg';
import paso2Main from '../../assets/img/logistica/paso2_main.jpeg';
import paso2_2 from '../../assets/img/logistica/paso2_2.jpeg';
import paso2_3 from '../../assets/img/logistica/paso2_3.jpeg';
import paso2_4 from '../../assets/img/logistica/paso2_4.jpeg';

const galleries = {
    transporte: [
        paso1Main,
        paso1_2,
        paso1_3,
        paso1_4
    ],
    instalacion: [
        paso2Main,
        paso2_2,
        paso2_3,
        paso2_4
    ],
    // Galerías de Interiores (collages completos)
    'interiores-moderno': [
        'assets/img/interiores/moderno-collage.jpg'
    ],
    'interiores-industrial': [
        'assets/img/interiores/industrial-collage.jpg'
    ],
    'interiores-minimalista': [
        'assets/img/interiores/minimalista-collage.jpg'
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
        // Actualizar contador inmediatamente
        if (currentIndexSpan) currentIndexSpan.textContent = currentIndex + 1;
        if (totalImagesSpan) totalImagesSpan.textContent = currentGallery.length;

        // Cambiar imagen con transición
        modalImg.style.transition = 'opacity 0.2s ease';
        modalImg.style.opacity = '0';

        setTimeout(() => {
            modalImg.src = currentGallery[currentIndex];
            modalImg.style.opacity = '1';
        }, 200);
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
