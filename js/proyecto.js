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

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Set initial state and observe project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
// Menú móvil mejorado
const menuToggle = document.getElementById('menuToggle');
const navContent = document.getElementById('navContent');
const header = document.getElementById('header');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navContent.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navContent.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navContent.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Optimización del scroll
let lastScrollTop = 0;
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scroll Down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll Up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
});

// Animaciones suaves para los proyectos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('fade-in');
    projectObserver.observe(card);
});

// Lazy loading para imágenes
document.querySelectorAll('.project-image img').forEach(img => {
    img.loading = 'lazy';
});