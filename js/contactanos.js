// CÓDIGO FINAL Y COMPLETO PARA FORMSPREE

document.addEventListener('DOMContentLoaded', function() {
    
    // Todas tus constantes y código de menú/header
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navContent = document.getElementById('navContent');
    const header = document.getElementById('header');

    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        const navLinks = navContent.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { header.classList.add('scrolled'); } 
            else { header.classList.remove('scrolled'); }
        });
    }
    
    // Lógica del Formulario de Contacto
    if (contactForm && submitBtn) {
        const validationConfig = {
            nombre: { required: true, minLength: 2, errorMessage: 'Por favor ingresa un nombre válido (mínimo 2 caracteres)' },
            email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, errorMessage: 'Ingresa un correo válido (ej: nombre@dominio.com)' },
            telefono: { required: true, pattern: /^(\+593\d{9}|0\d{9})$/, errorMessage: 'Ingresa un teléfono válido de Ecuador (ej: 0991234567)' },
            mensaje: { required: true, minLength: 10, errorMessage: 'Tu mensaje debe tener al menos 10 caracteres' }
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateFormFields()) {
                showLoadingState();
                const formData = new FormData(contactForm);
                const action = contactForm.getAttribute('action');

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        showSuccessMessage();
                        resetForm();
                    } else {
                        throw new Error('Error en el envío a Formspree.');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    showNotification('Hubo un error al enviar tu mensaje. Inténtalo de nuevo.', 'error');
                    const originalText = submitBtn.getAttribute('data-original-text') || 'ENVIAR MENSAJE';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
            }
        });
        
        // Todas las funciones de validación y de UI
        function validateFormFields() {
            clearAllErrorMessages();
            let isFormValid = true;
            for (const fieldId in validationConfig) {
                const field = document.getElementById(fieldId);
                const config = validationConfig[fieldId];
                if (field && !validateField(field, config)) { isFormValid = false; }
            }
            return isFormValid;
        }
        
        function validateField(field, config) {
            const value = field.value.trim();
            clearFieldError(field.id);
            if (config.required && !value) { showFieldError(field.id, 'Este campo es obligatorio.'); return false; }
            if (config.minLength && value.length < config.minLength) { showFieldError(field.id, config.errorMessage); return false; }
            if (config.pattern && !config.pattern.test(value)) { showFieldError(field.id, config.errorMessage); return false; }
            field.classList.add('valid');
            return true;
        }

        for (const fieldId in validationConfig) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() { validateField(this, validationConfig[fieldId]); });
                field.addEventListener('input', function() { clearFieldError(this.id); this.classList.remove('error', 'valid'); });
            }
        }
        
        function showFieldError(fieldId, message) {
            const field = document.getElementById(fieldId);
            if (!field) return;
            const formGroup = field.closest('.form-group');
            field.classList.add('error');
            field.classList.remove('valid');
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) { errorElement = document.createElement('span'); errorElement.className = 'error-message'; formGroup.appendChild(errorElement); }
            errorElement.textContent = message;
        }
        
        function clearFieldError(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return;
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) { errorElement.remove(); }
            field.classList.remove('error');
        }
        
        function clearAllErrorMessages() {
            document.querySelectorAll('.error-message').forEach(e => e.remove());
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(f => { f.classList.remove('error', 'valid'); });
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
            const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
            notification.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span><button class="notification-close">&times;</button>`;
            document.body.appendChild(notification);
            requestAnimationFrame(() => { notification.classList.add('show'); });
            const close = () => {
                notification.classList.remove('show');
                notification.addEventListener('transitionend', () => notification.remove());
            };
            notification.querySelector('.notification-close').addEventListener('click', close);
            setTimeout(close, 5000);
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del chatbot
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // Base de conocimiento (preguntas y respuestas)
    const knowledgeBase = {
        "¿qué es creacom?": "CreaCom es una constructora líder en Guayas, Ecuador, especializada en obras civiles, carreteras, remodelaciones y diversos proyectos de construcción. Nos caracterizamos por ofrecer servicios de alta calidad y confianza.",
        "que es creacom": "CreaCom es una constructora líder en Guayas, Ecuador, especializada en obras civiles, carreteras, remodelaciones y diversos proyectos de construcción. Nos caracterizamos por ofrecer servicios de alta calidad y confianza.",
        "¿qué servicios ofrecen?": "Ofrecemos una amplia gama de servicios que incluyen: construcción de obras civiles, desarrollo de carreteras, remodelaciones, construcción de aceras y bordillos, y otros proyectos personalizados según las necesidades de nuestros clientes.",
        "que servicios ofrecen": "Ofrecemos una amplia gama de servicios que incluyen: construcción de obras civiles, desarrollo de carreteras, remodelaciones, construcción de aceras y bordillos, y otros proyectos personalizados según las necesidades de nuestros clientes.",
        "¿dónde están ubicados?": "Estamos ubicados en Av. Guayaquil y Calle Quito, Edificio Marcimex, 3er piso, en El Empalme, Guayas, Ecuador. Puede visitarnos de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 8:00 AM a 12:00 PM.",
        "donde estan ubicados": "Estamos ubicados en Av. Guayaquil y Calle Quito, Edificio Marcimex, 3er piso, en El Empalme, Guayas, Ecuador. Puede visitarnos de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 8:00 AM a 12:00 PM."
    };
    
    // Función para mostrar/ocultar el chatbot
    chatbotToggle.addEventListener('click', function() {
        if (chatbotWindow.style.display === 'flex') {
            chatbotWindow.style.display = 'none';
        } else {
            chatbotWindow.style.display = 'flex';
        }
    });
    
    // Cerrar el chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.style.display = 'none';
    });
    
    // Función para añadir un mensaje al chat
    function addMessage(message, isUser = false) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message-container ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        messageBubble.appendChild(messageText);
        messageContainer.appendChild(messageBubble);
        chatbotMessages.appendChild(messageContainer);
        
        // Scroll al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Función para procesar la pregunta del usuario
    function processQuestion(question) {
        question = question.toLowerCase().trim();
        
        // Buscar la respuesta en la base de conocimiento
        let answer = knowledgeBase[question];
        
        // Si no hay una respuesta exacta, tratamos de encontrar una respuesta parcial
        if (!answer) {
            for (let key in knowledgeBase) {
                if (question.includes(key) || key.includes(question)) {
                    answer = knowledgeBase[key];
                    break;
                }
            }
        }
        
        // Si aún no hay respuesta, usar respuesta por defecto
        if (!answer) {
            answer = "Lo siento, no entendí tu pregunta. ¿Puedes reformularla? También puedes hacer clic en una de las sugerencias debajo.";
        }
        
        return answer;
    }
    
    // Enviar mensaje al hacer clic en el botón
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
    
    // Enviar mensaje al presionar Enter
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Función para enviar mensaje
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Añadir mensaje del usuario
            addMessage(message, true);
            
            // Limpiar input
            userInput.value = '';
            
            // Simular tiempo de respuesta
            setTimeout(function() {
                const answer = processQuestion(message);
                addMessage(answer);
            }, 500);
        }
    }
    
    // Manejar clics en botones de sugerencias
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.dataset.question;
            
            // Añadir la pregunta como mensaje del usuario
            addMessage(question, true);
            
            // Simular tiempo de respuesta
            setTimeout(function() {
                const answer = processQuestion(question);
                addMessage(answer);
            }, 500);
        });
    });
});