// Funcionalidad para la página de contacto de CREACOM
// Optimizado para mobile y experiencia de usuario mejorada

document.addEventListener('DOMContentLoaded', function() {
    
    // --> MEJORA: Seleccionar todos los elementos del DOM una sola vez al inicio para mejor rendimiento y claridad.
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    const header = document.getElementById('header');

    // ====== MOBILE MENU FUNCTIONALITY ======
    // --> MEJORA: Verificar que ambos elementos (menú y contenido) existan antes de agregar eventos.
    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer click en un enlace del menú
        // --> CORRECCIÓN: Usar el selector correcto '#navContent a' en lugar de '.nav-content a'
        const navLinks = navContent.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Cerrar menú al redimensionar la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // ====== SCROLL HEADER EFFECT ======
    // --> MEJORA: Verificar si el header existe y usar clases CSS para los estilos, es una mejor práctica.
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Es mejor agregar una clase y manejar los estilos en CSS.
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    /* En tu archivo CSS, deberías tener algo como:
    #header {
        transition: all 0.3s ease;
        padding: 20px 0;
        background: #ffffff;
    }
    #header.scrolled {
        padding: 15px 0;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    */
    
    // ====== FORM VALIDATION AND SUBMISSION ======
    if (contactForm && submitBtn) {
        const validationConfig = {
            nombre: {
                required: true,
                minLength: 2,
                errorMessage: 'Por favor ingresa un nombre válido (mínimo 2 caracteres)'
            },
            email: {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                errorMessage: 'Ingresa un correo válido (ej: nombre@dominio.com)'
            },
            telefono: {
                required: true,
                pattern: /^(\+593\d{9}|0\d{9})$/,
                errorMessage: 'Ingresa un teléfono válido (ej: 0991234567)'
            },
            mensaje: {
                required: true,
                minLength: 10,
                errorMessage: 'Tu mensaje debe tener al menos 10 caracteres'
            }
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateFormFields()) {
                showLoadingState();
                
                // Simulación de envío
                setTimeout(() => {
                    showSuccessMessage();
                    resetForm();
                }, 2000);
            }
        });
        
        function validateFormFields() {
            clearAllErrorMessages();
            let isFormValid = true;
            
            for (const fieldId in validationConfig) {
                const field = document.getElementById(fieldId);
                const config = validationConfig[fieldId];
                if (field && !validateField(field, config)) {
                    isFormValid = false;
                }
            }
            return isFormValid;
        }
        
        function validateField(field, config) {
            const value = field.value.trim();
            clearFieldError(field.id);

            if (config.required && !value) {
                showFieldError(field.id, 'Este campo es obligatorio.');
                return false;
            }
            if (config.minLength && value.length < config.minLength) {
                showFieldError(field.id, config.errorMessage);
                return false;
            }
            if (config.pattern && !config.pattern.test(value)) {
                showFieldError(field.id, config.errorMessage);
                return false;
            }
            
            field.classList.add('valid');
            return true;
        }

        for (const fieldId in validationConfig) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() {
                    validateField(this, validationConfig[fieldId]);
                });
                
                field.addEventListener('input', function() {
                    clearFieldError(this.id);
                    this.classList.remove('error', 'valid');
                });
            }
        }
        
        // --> MEJORA: Lógica de formato de teléfono simplificada y más robusta.
        const phoneField = document.getElementById('telefono');
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                let value = this.value.replace(/[^\d+]/g, ''); // Permitir solo dígitos y el signo '+'
                
                // Si el usuario empieza con algo que no sea '0' o '+', se asume que es un celular local.
                if (value.length > 0 && !value.startsWith('0') && !value.startsWith('+')) {
                    value = '0' + value;
                }
                
                // Manejar el prefijo internacional
                if (value.startsWith('+') && !value.startsWith('+593')) {
                    value = '+593' + value.substring(1);
                }

                // Limitar longitud
                if (value.startsWith('0')) {
                    this.value = value.substring(0, 10);
                } else if (value.startsWith('+593')) {
                    this.value = value.substring(0, 13); // +593 (4) + 9 dígitos (9) = 13
                } else {
                    this.value = value;
                }
            });
        }
        
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() { // Usar 'blur' para no interrumpir la escritura
                this.value = this.value.trim().toLowerCase();
            });
        }
        
        function showFieldError(fieldId, message) {
            const field = document.getElementById(fieldId);
            if (!field) return;

            const formGroup = field.closest('.form-group');
            field.classList.add('error');
            field.classList.remove('valid');
            
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
        
        function clearFieldError(fieldId) {
            const field = document.getElementById(fieldId);
             if (!field) return;
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            field.classList.remove('error');
        }
        
        function clearAllErrorMessages() {
            document.querySelectorAll('.error-message').forEach(e => e.remove());
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(f => {
                f.classList.remove('error', 'valid');
            });
        }
        
        function showLoadingState() {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.setAttribute('data-original-text', originalText);
        }
        
        function showSuccessMessage() {
            const originalText = submitBtn.getAttribute('data-original-text') || 'ENVIAR MENSAJE';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡ENVIADO!';
            submitBtn.classList.add('success');
            
            showNotification('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
            }, 3000);
        }
        
        function resetForm() {
            contactForm.reset();
            clearAllErrorMessages();
        }
        
        function showNotification(message, type = 'info') {
            document.querySelectorAll('.notification').forEach(n => n.remove());
            
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                info: 'fa-info-circle'
            };
            
            notification.innerHTML = `
                <i class="fas ${icons[type] || icons.info}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            `;
            
            document.body.appendChild(notification);
            
            // Forzar el repintado para que la animación funcione
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });

            const close = () => {
                notification.classList.remove('show');
                notification.addEventListener('transitionend', () => notification.remove());
            };

            notification.querySelector('.notification-close').addEventListener('click', close);
            setTimeout(close, 5000);
        }
    }
    
    console.log('✅ CREACOM Contact Page - JavaScript mejorado cargado correctamente');
});


// --> MEJORA: Es mejor manejar los estilos de las notificaciones en tu archivo CSS.
// Si prefieres mantenerlo aquí, este método también funciona.
// Aquí se inyectan los estilos para las notificaciones y el header.
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Estilos para el Header con scroll */
    #header {
        transition: padding 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }
    #header.scrolled {
        padding: 15px 0;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    /* Estilos para las Notificaciones */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .notification.show {
        transform: translateX(0);
    }
    .notification-success {
        background: #d4edda;
        border-left: 5px solid #28a745;
        color: #155724;
    }
    .notification-error {
        background: #f8d7da;
        border-left: 5px solid #dc3545;
        color: #721c24;
    }
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        margin-left: auto;
        padding: 0 5px;
    }
    .notification-close:hover {
        opacity: 1;
    }
    
    /* Estilos para el botón de enviar */
    .submit-btn.success {
        background: #28a745 !important;
    }
</style>
`);