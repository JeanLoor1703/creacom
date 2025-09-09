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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menú de hamburguesa y animación de cards
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('#menuToggle');
    const navContent = document.querySelector('#navContent');
    
    if (menuToggle && navContent) {
        // Toggle del menú hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = navContent.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Cerrar menú al hacer click fuera del header
        document.addEventListener('click', (e) => {
            const header = document.getElementById('header');
            if (!header.contains(e.target) && navContent.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Cerrar menú al redimensionar la ventana (cuando se pasa de móvil a desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // Animación de cards en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Configurar y observar las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});