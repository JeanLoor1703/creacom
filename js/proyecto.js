// Añadir estas correcciones al final de tu archivo proyecto.js

// Mejorar el comportamiento del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    if (menuToggle && navContent) {
        // Asegurar que el menú se cierra al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInside = navContent.contains(event.target) || 
                                  menuToggle.contains(event.target);
            
            if (!isClickInside && navContent.classList.contains('active')) {
                navContent.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Mejorar la carga de imágenes en móvil
    const projectImages = document.querySelectorAll('.project-image img');
    if ('loading' in HTMLImageElement.prototype) {
        projectImages.forEach(img => {
            img.loading = 'lazy';
        });
    }
});