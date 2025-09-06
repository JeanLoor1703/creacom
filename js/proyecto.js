// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // ===== EFECTO DE HEADER AL HACER SCROLL =====
    let lastScrollTop = 0;
    const scrollThreshold = 5;
    
    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        // Ajustar padding y fondo del header
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = '#ffffff';
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scroll hacia abajo - ocultar header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba - mostrar header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll;
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // ===== NAVEGACIÓN SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Si el menú móvil está abierto, cerrarlo
                if (navContent.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navContent.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // ===== MENÚ MÓVIL =====
    if (menuToggle && navContent) {
        // Abrir/cerrar menú al hacer click en el botón
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (navContent.classList.contains('active') && 
                !navContent.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Cerrar menú con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContent.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // ===== ANIMACIONES DE TARJETAS DE PROYECTOS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    // Configurar el observador de intersección
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Configurar animaciones para las tarjetas
    projectCards.forEach((card, index) => {
        // Establecer estado inicial
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        card.classList.add('fade-in');
        
        // Observar para animar cuando sea visible
        observer.observe(card);
    });
    
    // ===== OPTIMIZACIÓN DE IMÁGENES =====
    // Activar lazy loading para imágenes
    document.querySelectorAll('.project-image img').forEach(img => {
        img.loading = 'lazy';
    });
});
// Función para inicializar el menú de hamburguesa
function inicializarMenuHamburguesa() {
    console.log('Inicializando menú hamburguesa...');
    
    // Obtener referencias a los elementos
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // Verificar si los elementos existen
    if (!menuToggle) {
        console.error('Error: El elemento #menuToggle no existe en el DOM');
        return;
    }
    
    if (!navContent) {
        console.error('Error: El elemento #navContent no existe en el DOM');
        return;
    }
    
    console.log('Elementos del menú encontrados correctamente');
    
    // Establecer estado inicial
    menuToggle.setAttribute('aria-expanded', 'false');
    navContent.classList.remove('active');
    
    // Agregar event listener al botón de hamburguesa
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Botón de menú clickeado');
        
        // Toggle de clases
        const isActive = menuToggle.classList.toggle('active');
        navContent.classList.toggle('active');
        
        // Actualizar aria-expanded para accesibilidad
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        
        // Bloquear scroll del body cuando el menú está abierto
        document.body.classList.toggle('no-scroll', isActive);
        
        console.log(`Menú ahora está ${isActive ? 'abierto' : 'cerrado'}`);
    });
    
    // Cerrar el menú al hacer clic en cualquier enlace dentro del menú
    const menuLinks = navContent.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Enlace del menú clickeado - cerrando menú');
            menuToggle.classList.remove('active');
            navContent.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (navContent.classList.contains('active') && 
            !navContent.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            console.log('Clic fuera del menú detectado - cerrando menú');
            menuToggle.classList.remove('active');
            navContent.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Cerrar el menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navContent.classList.contains('active')) {
            console.log('Tecla Escape presionada - cerrando menú');
            menuToggle.classList.remove('active');
            navContent.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    console.log('Menú hamburguesa inicializado correctamente');
}

// Asegurarse de que el DOM esté completamente cargado antes de inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarMenuHamburguesa);
} else {
    // Si el DOM ya está cargado (por ejemplo, si el script se carga al final del body)
    inicializarMenuHamburguesa();
}