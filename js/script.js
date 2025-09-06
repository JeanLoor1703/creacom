// Función para manejar el menú móvil
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // Comprobar si los elementos existen
    if (!menuToggle || !navContent) {
        console.error('Elementos del menú no encontrados');
        return;
    }
    
    // Evento para abrir/cerrar el menú
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navContent.classList.toggle('active');
        menuToggle.classList.toggle('active');
        console.log('Menú toggled');
    });
    
    // Cerrar el menú al hacer clic en enlaces
    const navLinks = navContent.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInside = navContent.contains(event.target) || 
                              menuToggle.contains(event.target);
        
        if (!isClickInside && navContent.classList.contains('active')) {
            navContent.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Scroll Header Effect
function setupScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = '#ffffff';
        }
    });
}

// Inicializar todo cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado');
    setupMobileMenu();
    setupScrollEffect();
    
    // Mejorar la carga de imágenes
    const projectImages = document.querySelectorAll('.project-image img');
    if ('loading' in HTMLImageElement.prototype) {
        projectImages.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
        });
    }
    
    // Animaciones de aparición
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in').forEach((element) => {
        observer.observe(element);
    });
});