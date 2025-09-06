document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del menú
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // Verificar que existen los elementos antes de agregar eventos
    if (menuToggle && navContent) {
        // Evento de clic para el botón de hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Alternar las clases active
            navContent.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            console.log('Menú toggle clic detectado'); // Para depuración
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInside = navContent.contains(event.target) || 
                                  menuToggle.contains(event.target);
            
            if (!isClickInside && navContent.classList.contains('active')) {
                navContent.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace del menú
        document.querySelectorAll('.nav-content a').forEach(link => {
            link.addEventListener('click', () => {
                navContent.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.loading = 'lazy';
        });
    }
});