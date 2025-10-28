// ========= MENÚ HAMBURGUESA =========
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', function () {
            navContent.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Cerrar menú al hacer click en un enlace
        navContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navContent.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// ======= SCROLL HEADER EFFECT =======
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

// ======= SCROLL ANIMATION =======
const observerOptions = { threshold: 0.1 };
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

// ======= SMOOTH SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ======= HERO SLIDESHOW =======
document.addEventListener('DOMContentLoaded', function () {
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

    setInterval(nextSlide, 20000);
});
