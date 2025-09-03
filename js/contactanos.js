// Funcionalidad mejorada para la página de contacto de CREACOM
// Optimizado para mobile y experiencia de usuario moderna

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos principales
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    // ====== MOBILE MENU FUNCTIONALITY ======
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ====== FORM VALIDATION AND SUBMISSION ======
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showLoadingState();
                
                // Simular envío (aquí conectarías con tu backend)
                setTimeout(() => {
                    showSuccessMessage();
                    resetForm();
                }, 2000);
            }
        });
    }
    
    // Función para validar el formulario
    function validateForm() {
        const fields = {
            nombre: { value: document.getElementById('nombre').value.trim(), minLength: 2 },
            email: { value: document.getElementById('email').value.trim(), type: 'email' },
            telefono: { value: document.getElementById('telefono').value.trim(), type: 'phone' },
            mensaje: { value: document.getElementById('mensaje').value.trim(), minLength: 10 }
        };
        
        clearErrorMessages();
        let isValid = true;
        
        // Validar cada campo
        for (const [fieldName, config] of Object.entries(fields)) {
            const { value, minLength, type } = config;
            
            if (!value) {
                showError(fieldName, `${getFieldLabel(fieldName)} es requerido`);
                isValid = false;
                continue;
            }
            
            if (minLength && value.length < minLength) {
                showError(fieldName, `${getFieldLabel(fieldName)} debe tener al menos ${minLength} caracteres`);
                isValid = false;
                continue;
            }
            
            if (type === 'email' && !isValidEmail(value)) {
                showError(fieldName, 'Por favor ingresa un email válido');
                isValid = false;
                continue;
            }
            
            if (type === 'phone' && !isValidPhone(value)) {
                showError(fieldName, 'Por favor ingresa un teléfono válido');
                isValid = false;
                continue;
            }
        }
        
        return isValid;
    }
    
    // Helper para obtener etiquetas de campo
    function getFieldLabel(fieldName) {
        const labels = {
            nombre: 'El nombre',
            email: 'El email',
            telefono: 'El teléfono',
            mensaje: 'El mensaje'
        };
        return labels[fieldName] || 'Este campo';
    }
    
    // Validación de email mejorada
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }
    
    // Validación de teléfono para Ecuador
    function isValidPhone(phone) {
        // Remover espacios, guiones y paréntesis
        const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
        
        // Validar formatos ecuatorianos
        const patterns = [
            /^593[0-9]{8,9}$/, // +593xxxxxxxxx (internacional)
            /^0[0-9]{8,9}$/, // 0xxxxxxxxx (nacional)
            /^[0-9]{7,8}$/ // xxxxxxxx (local)
        ];
        
        return patterns.some(pattern => pattern.test(cleanPhone));
    }
    
    // Mostrar errores con mejor UX
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        // Agregar clase de error
        field.classList.add('error');
        field.style.borderColor = '#dc3545';
        
        // Crear mensaje de error
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Hacer focus al primer campo con error
        if (!document.querySelector('.error-message')) {
            field.focus();
        }
    }
    
    // Limpiar mensajes de error
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorFields = document.querySelectorAll('.error');
        
        errorMessages.forEach(error => error.remove());
        errorFields.forEach(field => {
            field.classList.remove('error');
            field.style.borderColor = '';
        });
    }
    
    // Estado de carga del botón
    function showLoadingState() {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.setAttribute('data-original-text', originalText);
    }
    
    // Mensaje de éxito
    function showSuccessMessage() {
        const originalText = submitBtn.getAttribute('data-original-text');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡ENVIADO!';
        submitBtn.style.background = '#28a745';
        
        showNotification('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
        
        // Restaurar botón
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '';
        }, 3000);
    }
    
    // Resetear formulario
    function resetForm() {
        contactForm.reset();
        updateCharacterCounter();
    }
    
    // Sistema de notificaciones mejorado
    function showNotification(message, type = 'info') {
        // Remover notificaciones existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        const colors = {
            success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
            error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
            info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
            warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' }
        };
        
        const color = colors[type] || colors.info;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icons[type] || icons.info}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color.bg};
            border: 1px solid ${color.border};
            color: ${color.text};
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            font-family: inherit;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover
        setTimeout(() => {
            if (notification && notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ====== REAL-TIME VALIDATION ======
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpiar error mientras escribe
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                this.style.borderColor = '';
                const errorMsg = this.closest('.form-group').querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
    
    // Validar campo individual
    function validateSingleField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (!value && field.required) {
            showError(fieldName, `${getFieldLabel(fieldName)} es requerido`);
            return false;
        }
        
        switch(fieldName) {
            case 'nombre':
                if (value && value.length < 2) {
                    showError('nombre', 'El nombre debe tener al menos 2 caracteres');
                    return false;
                }
                break;
                
            case 'email':
                if (value && !isValidEmail(value)) {
                    showError('email', 'Por favor ingresa un email válido');
                    return false;
                }
                break;
                
            case 'telefono':
                if (value && !isValidPhone(value)) {
                    showError('telefono', 'Por favor ingresa un teléfono válido');
                    return false;
                }
                break;
                
            case 'mensaje':
                if (value && value.length < 10) {
                    showError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    // ====== CHARACTER COUNTER ======
    const mensajeTextarea = document.getElementById('mensaje');
    if (mensajeTextarea) {
        const formGroup = mensajeTextarea.closest('.form-group');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #6c757d;
            margin-top: 0.25rem;
            font-weight: 500;
        `;
        formGroup.appendChild(counter);
        
        function updateCharacterCounter() {
            const current = mensajeTextarea.value.length;
            const min = 10;
            counter.textContent = `${current} caracteres (mínimo ${min})`;
            counter.style.color = current >= min ? '#28a745' : '#6c757d';
        }
        
        mensajeTextarea.addEventListener('input', updateCharacterCounter);
        updateCharacterCounter();
    }
    
    // ====== PHONE FORMATTING ======
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            // Formatear números ecuatorianos
            if (value.startsWith('593')) {
                // Internacional
                if (value.length <= 12) {
                    value = value.replace(/^(593)(\d{1})(\d{0,4})(\d{0,4})/, '+$1 $2 $3 $4');
                }
            } else if (value.startsWith('0')) {
                // Nacional
                if (value.length <= 10) {
                    value = value.replace(/^(\d{4})(\d{0,3})(\d{0,3})/, '$1 $2 $3');
                }
            }
            
            this.value = value.trim();
        });
    }
    
    // ====== SMOOTH SCROLLING ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====== INTERSECTION OBSERVER ANIMATIONS ======
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.contact-card, .info-card, .contact-form, .map-container');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ====== RATE LIMITING ======
    let formSubmissionCount = parseInt(localStorage.getItem('formSubmissionCount') || '0');
    const maxSubmissions = 3;
    const resetTime = 15 * 60 * 1000; // 15 minutos
    
    function checkSubmissionLimit() {
        const now = Date.now();
        const lastReset = parseInt(localStorage.getItem('lastFormReset') || '0');
        
        if (now - lastReset > resetTime) {
            formSubmissionCount = 0;
            localStorage.setItem('formSubmissionCount', '0');
            localStorage.setItem('lastFormReset', now.toString());
        }
        
        if (formSubmissionCount >= maxSubmissions) {
            showNotification('Has enviado muchos mensajes recientemente. Por favor espera un poco.', 'warning');
            return false;
        }
        
        return true;
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!checkSubmissionLimit()) {
                e.preventDefault();
                return false;
            }
            formSubmissionCount++;
            localStorage.setItem('formSubmissionCount', formSubmissionCount.toString());
        });
    }
    
    // ====== ANALYTICS TRACKING ======
    function trackEvent(action, category = 'Contact') {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': 'Contact Page'
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', action);
        }
        
        console.log(`Event tracked: ${category} - ${action}`);
    }
    
    // Track contact method clicks
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function() {
            const method = this.querySelector('h3').textContent;
            trackEvent(`click_${method.toLowerCase()}`, 'Contact Method');
        });
    });
    
    // Track form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', 'Contact Form');
        });
    }
    
    // Track social media clicks
    document.querySelectorAll('.social-icons a, .social-links a').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('i').className.match(/fa-(\w+)/)?.[1];
            if (platform) {
                trackEvent(`social_${platform}`, 'Social Media');
            }
        });
    });
    
    // ====== ACCESSIBILITY IMPROVEMENTS ======
    
    // Añadir soporte para navegación por teclado
    document.addEventListener('keydown', function(e) {
        // Cerrar menú mobile con Escape
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Mejorar focus visible
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.setAttribute('data-focus-visible', 'true');
        });
        
        element.addEventListener('blur', function() {
            this.removeAttribute('data-focus-visible');
        });
    });
    
    // ====== PERFORMANCE OPTIMIZATIONS ======
    
    // Lazy load del mapa
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // El iframe ya está cargado, pero aquí podrías implementar lazy loading
                    mapObserver.unobserve(entry.target);
                }
            });
        });
        mapObserver.observe(mapIframe);
    }
    
    // Debounce para eventos de input
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce a la validación en tiempo real
    inputs.forEach(input => {
        const debouncedValidation = debounce(() => validateSingleField(input), 500);
        input.addEventListener('input', debouncedValidation);
    });
    
    // ====== ERROR HANDLING ======
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        showNotification('Ha ocurrido un error. Por favor recarga la página.', 'error');
    });
    
    // ====== INITIALIZATION COMPLETE ======
    console.log('✅ CREACOM Contact Page - JavaScript cargado correctamente');
    console.log('📱 Mobile optimizations enabled');
    console.log('🎯 Analytics tracking enabled');
    console.log('♿ Accessibility features enabled');
});