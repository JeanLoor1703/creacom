// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality - Fixed for mobile
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // Make sure elements exist before adding event listeners
    if (menuToggle && navContent) {
        // Add click event to menu button
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navContent.classList.toggle('active');
            console.log('Menu toggle clicked'); // Debug
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navContent.contains(event.target) || 
                                  menuToggle.contains(event.target);
            
            if (!isClickInside && navContent.classList.contains('active')) {
                navContent.classList.remove('active');
            }
        });
        
        // Close menu when clicking a menu item
        document.querySelectorAll('.nav-content a').forEach(link => {
            link.addEventListener('click', () => {
                navContent.classList.remove('active');
            });
        });
    }
    
    // Scroll Header Effect
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
    
    // Scroll Animation for project cards
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
    
    // Use lazy loading for images if browser supports it
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Mejorar el comportamiento del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    if (menuToggle && navContent) {
        // SOLUCIÓN: Añadir el evento click al botón hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle de las clases active
            navContent.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
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