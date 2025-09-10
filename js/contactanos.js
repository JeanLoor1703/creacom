// Funcionalidad para la página de contacto de CREACOM
// Optimizado para mobile y experiencia de usuario mejorada

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos principales
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    
    // ====== MOBILE MENU FUNCTIONALITY ======
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer click en un enlace del menú
        const navLinks = document.querySelectorAll('.nav-content a');
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
    
    // ====== FORM VALIDATION AND SUBMISSION ======
    if (contactForm) {
        // Configuración de validación para cada campo
        const validationConfig = {
            nombre: {
                required: true,
                minLength: 2,
                errorMessage: 'Por favor ingresa un nombre válido (mínimo 2 caracteres)'
            },
            email: {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                errorMessage: 'Por favor ingresa un correo electrónico válido (ejemplo@dominio.com)'
            },
            telefono: {
                required: true,
                // Patrón para números ecuatorianos: +593xxxxxxxxx o 0xxxxxxxxx
                pattern: /^(\+593\d{9}|0\d{9})$/,
                errorMessage: 'Por favor ingresa un número de teléfono válido de Ecuador (0993024415 o +593993024415)'
            },
            mensaje: {
                required: true,
                minLength: 10,
                errorMessage: 'Por favor ingresa un mensaje con al menos 10 caracteres'
            }
        };
        
        // Agregar event listener para envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateFormFields()) {
                showLoadingState();
                
                // Simulación de envío (aquí conectarías con tu backend real)
                setTimeout(() => {
                    showSuccessMessage();
                    resetForm();
                }, 2000);
            }
        });
        
        // Validar todos los campos antes de enviar
        function validateFormFields() {
            clearAllErrorMessages();
            let isFormValid = true;
            
            for (const fieldId in validationConfig) {
                const field = document.getElementById(fieldId);
                const config = validationConfig[fieldId];
                
                // Si la validación de un campo falla, el formulario no es válido
                if (!validateField(field, config)) {
                    isFormValid = false;
                }
            }
            
            return isFormValid;
        }
        
        // Validación de un solo campo
        function validateField(field, config) {
            const value = field.value.trim();
            const fieldId = field.id;
            
            // Validar campo requerido
            if (config.required && !value) {
                showFieldError(fieldId, `Este campo es obligatorio`);
                return false;
            }
            
            // Validar longitud mínima
            if (config.minLength && value.length < config.minLength) {
                showFieldError(fieldId, config.errorMessage);
                return false;
            }
            
            // Validar patrón (expresión regular)
            if (config.pattern && !config.pattern.test(value)) {
                showFieldError(fieldId, config.errorMessage);
                return false;
            }
            
            // Si pasa todas las validaciones, marcar como válido
            field.classList.remove('error');
            field.classList.add('valid');
            return true;
        }
        
        // Agregar validación en tiempo real para cada campo
        for (const fieldId in validationConfig) {
            const field = document.getElementById(fieldId);
            
            // Validar cuando el usuario sale del campo
            field.addEventListener('blur', function() {
                validateField(this, validationConfig[fieldId]);
            });
            
            // Limpiar errores cuando el usuario comienza a editar
            field.addEventListener('input', function() {
                // Remover mensajes de error y clases de error/válido
                clearFieldError(this.id);
                this.classList.remove('error', 'valid');
            });
            
            // Validación específica para el teléfono que formatea el número
            if (fieldId === 'telefono') {
                field.addEventListener('input', function(e) {
                    const value = this.value.replace(/\s+/g, '');
                    
                    // Si el usuario comienza con +, asegurarse de que sea +593
                    if (value.startsWith('+') && value.length <= 4) {
                        this.value = value.replace(/^\+.*/, '+593');
                    }
                    
                    // Si comienza con 0, mantener ese formato
                    if (value.startsWith('0')) {
                        // Limitar a 10 dígitos para formato nacional
                        this.value = value.replace(/[^\d]/g, '').substring(0, 10);
                    }
                    
                    // Si comienza con +593, formatear correctamente
                    if (value.startsWith('+593')) {
                        const digits = value.replace(/[^\d]/g, '');
                        this.value = '+' + digits.substring(0, 12);
                    }
                });
            }
            
            // Validación específica para email con formato más legible
            if (fieldId === 'email') {
                field.addEventListener('input', function() {
                    this.value = this.value.trim().toLowerCase();
                });
            }
        }
        
        // Mostrar error en un campo específico
        function showFieldError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const formGroup = field.closest('.form-group');
            
            // Agregar clase de error y remover clase de válido si existe
            field.classList.add('error');
            field.classList.remove('valid');
            
            // Crear mensaje de error si no existe
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            
            // Hacer focus en el primer campo con error (solo si no hay otro focus activo)
            if (!document.activeElement || document.activeElement === document.body) {
                field.focus();
            }
        }
        
        // Limpiar error de un campo específico
        function clearFieldError(fieldId) {
            const field = document.getElementById(fieldId);
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        // Limpiar todos los mensajes de error
        function clearAllErrorMessages() {
            const errorMessages = document.querySelectorAll('.error-message');
            const errorFields = document.querySelectorAll('.error, .valid');
            
            errorMessages.forEach(error => error.remove());
            errorFields.forEach(field => {
                field.classList.remove('error', 'valid');
            });
        }
        
        // Estado de carga del botón
        function showLoadingState() {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.setAttribute('data-original-text', originalText);
        }
        
        // Mensaje de éxito
        function showSuccessMessage() {
            const originalText = submitBtn.getAttribute('data-original-text');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡ENVIADO!';
            submitBtn.style.background = '#28a745';
            
            showNotification('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
            
            // Restaurar botón después de un tiempo
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
        
        // Resetear formulario
        function resetForm() {
            contactForm.reset();
            clearAllErrorMessages();
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
                    <button class="notification-close">
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
            
            // Agregar botón para cerrar
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            });
            
            document.body.appendChild(notification);
            
            // Auto-remover después de un tiempo
            setTimeout(() => {
                if (notification && notification.parentElement) {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 5000);
        }
    }
    
    console.log('✅ CREACOM Contact Page - JavaScript mejorado cargado correctamente');
});

// Keyframe animations para notificaciones
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
`);