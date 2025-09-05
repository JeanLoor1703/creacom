document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Menu móvil
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');

    menuToggle?.addEventListener('click', function() {
        navContent.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-content a').forEach(link => {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll Header Effect
    let lastScroll = 0;
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            if (currentScroll > 50) {
                header.style.padding = '15px 0';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.padding = '20px 0';
                header.style.background = '#ffffff';
            }
        }
        lastScroll = currentScroll;
    });

    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Lazy Loading para imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Botón "Cargar más"
    const loadMoreBtn = document.getElementById('loadMore');
    const projectsPerPage = 6;
    let currentPage = 1;

    function updateProjectsVisibility() {
        const startIndex = 0;
        const endIndex = currentPage * projectsPerPage;
        
        projectCards.forEach((card, index) => {
            if (index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        if (endIndex >= projectCards.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn?.addEventListener('click', () => {
        currentPage++;
        updateProjectsVisibility();
    });

    // Inicializar la visibilidad de los proyectos
    updateProjectsVisibility();
});