// Menu móvil
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navContent').classList.toggle('active');
    this.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-content a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navContent').classList.remove('active');
        document.getElementById('menuToggle').classList.remove('active');
    });
});

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

// Scroll Animation
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

// Hero Slideshow - Cambio automático cada 20 segundos
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Cambiar imagen automáticamente cada 20 segundos
    setInterval(nextSlide, 20000);
});