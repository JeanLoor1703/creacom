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
    
    // Toggle para "Más Proyectos"
    const moreProjectsToggle = document.getElementById('moreProjectsToggle');
    const moreProjectsGrid = document.getElementById('moreProjectsGrid');
    
    if (moreProjectsToggle && moreProjectsGrid) {
        moreProjectsToggle.addEventListener('click', () => {
            moreProjectsToggle.classList.toggle('active');
            moreProjectsGrid.classList.toggle('active');
        });
    }
    
    // Slider de imágenes para "Más Proyectos"
    const sliders = document.querySelectorAll('.slider');
    
    // Función para cambiar slides
    function changeSlide(slider) {
        const slides = slider.querySelectorAll('.slide');
        let activeSlide = slider.querySelector('.slide.active');
        let nextSlide;
        
        // Encuentra el siguiente slide
        if (activeSlide.nextElementSibling && activeSlide.nextElementSibling.classList.contains('slide')) {
            nextSlide = activeSlide.nextElementSibling;
        } else {
            nextSlide = slides[0]; // Vuelve al primer slide
        }
        
        // Desactiva el slide actual y activa el siguiente
        activeSlide.classList.remove('active');
        nextSlide.classList.add('active');
    }
    
    // Configura los sliders para que cambien automáticamente cada 10 segundos
    sliders.forEach(slider => {
        setInterval(() => changeSlide(slider), 10000);
    });
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
    
    // Número de WhatsApp de la gerente (cambia este número por el real)
    const WHATSAPP_NUMBER = '593968188499'; // Formato: código país + número sin espacios ni signos
    
    // Lista de servicios disponibles
    const services = [
        "Construcción",
        "Remodelación",
        "Vías",
        "Aceras y bordillos",
        "Otro"
    ];
    
    // Base de conocimiento (preguntas y respuestas)
    const knowledgeBase = {
        // Respuestas existentes
        "¿qué es creacom?": "CreaCom es una constructora líder en Guayas, Ecuador, especializada en obras civiles, carreteras, remodelaciones y diversos proyectos de construcción. Nos caracterizamos por ofrecer servicios de alta calidad y confianza.",
        "que es creacom": "CreaCom es una constructora líder en Guayas, Ecuador, especializada en obras civiles, carreteras, remodelaciones y diversos proyectos de construcción. Nos caracterizamos por ofrecer servicios de alta calidad y confianza.",
        
        // Modificada para mostrar botones
        "¿qué servicios ofrecen?": "SERVICIOS",
        "que servicios ofrecen": "SERVICIOS",
        
        "¿dónde están ubicados?": "Estamos ubicados en Av. Guayaquil y Calle Quito, Edificio Marcimex, 3er piso, en El Empalme, Guayas, Ecuador. Puede visitarnos de lunes a viernes de 8:00 AM a 5:00PM.",
        "donde estan ubicados": "Estamos ubicados en Av. Guayaquil y Calle Quito, Edificio Marcimex, 3er piso, en El Empalme, Guayas, Ecuador. Puede visitarnos de lunes a viernes de 8:00 AM a 5:00PM y sábados de 8:00 AM a 12:00 PM.",
        
        // Respuestas para el contacto con la gerente
        "¿deseas comunicarte con la gerente?": "Muy bien, este es el número de la Gerente si deseas contactar rápido: +593 98 765 4321. También puedes usar el botón de WhatsApp en nuestra página.",
        "deseas comunicarte con la gerente": "Muy bien, este es el número de la Gerente si deseas contactar rápido: +593 98 765 4321. También puedes usar el botón de WhatsApp en nuestra página.",
        "comunicarme con la gerente": "Muy bien, este es el número de la Gerente si deseas contactar rápido: +593 98 765 4321. También puedes usar el botón de WhatsApp en nuestra página.",
        
        // Nueva pregunta de cotización
        "¿deseas una cotización de tu proyecto?": "COTIZACION",
        "deseas una cotizacion de tu proyecto": "COTIZACION",
        "¿deseas una cotización?": "COTIZACION",
        "deseas una cotizacion": "COTIZACION",
        
        // Añadiendo respuestas para saludos
        "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
        "buenos días": "¡Buenos días! ¿En qué puedo asistirte hoy?",
        "buenas tardes": "¡Buenas tardes! ¿Cómo puedo ayudarte?",
        "buenas noches": "¡Buenas noches! Estoy aquí para resolver tus dudas.",
        
        // Añadiendo respuestas para palabras clave
        "ayuda": "Estoy aquí para ayudarte. Puedes preguntarme sobre nuestros servicios, ubicación o contactar con la gerente.",
        "más información": "Puedo proporcionarte más información sobre CreaCom. ¿Qué te gustaría saber específicamente? Tenemos información sobre nuestros servicios, ubicación y formas de contacto.",
        "contacto": "Puedes contactarnos por teléfono al +593 98 765 4321, visitarnos en nuestra oficina en Av. Guayaquil y Calle Quito, o usar el botón de WhatsApp en nuestra página."
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
    
    // Función para mostrar botones de servicios
    function showServiceButtons() {
        const servicesContainer = document.createElement('div');
        servicesContainer.className = 'services-buttons-container';
        
        services.forEach(service => {
            const serviceBtn = document.createElement('button');
            serviceBtn.className = 'service-option-btn';
            serviceBtn.textContent = service;
            serviceBtn.onclick = () => handleServiceSelection(service);
            servicesContainer.appendChild(serviceBtn);
        });
        
        chatbotMessages.appendChild(servicesContainer);
        
        // Scroll al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Función para manejar la selección de un servicio
    function handleServiceSelection(service) {
        // Añadir el servicio seleccionado como mensaje del usuario
        addMessage(service, true);
        
        // Simular tiempo de respuesta
        setTimeout(function() {
            addMessage("Gracias por tu interés en nuestros servicios. Estamos listos para hacer realidad tu proyecto. Para no perder tiempo, te invitamos a ponerte en contacto con nuestra gerente y hablar sobre los detalles. ¡Estamos a tu disposición!.");
            
            // Mostrar el botón de WhatsApp después de un breve delay
            setTimeout(function() {
                showWhatsAppButton(service);
            }, 300);
        }, 500);
    }
    
    // Función para mostrar el botón de WhatsApp
    function showWhatsAppButton(serviceSelected = '') {
        const whatsappContainer = document.createElement('div');
        whatsappContainer.className = 'whatsapp-button-container';
        
        // Mensaje predefinido personalizado con el servicio seleccionado
        let whatsappMessage = 'Hola, me gustaría obtener una cotización para mi proyecto.';
        if (serviceSelected) {
            whatsappMessage = `Hola, estoy interesado en el servicio de ${serviceSelected} y me gustaría obtener más información.`;
        }
        
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'whatsapp-chat-btn';
        whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chatea con la gerente';
        
        whatsappContainer.appendChild(whatsappBtn);
        chatbotMessages.appendChild(whatsappContainer);
        
        // Scroll al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Función mejorada para procesar la pregunta del usuario
    function processQuestion(question) {
        // Convertir a minúsculas y eliminar espacios extras
        const cleanedQuestion = question.toLowerCase().trim();
        
        // Buscar respuesta exacta
        if (knowledgeBase[cleanedQuestion]) {
            return knowledgeBase[cleanedQuestion];
        }
        
        // Verificar palabras clave en la pregunta
        for (let key in knowledgeBase) {
            // Si la pregunta contiene la palabra clave completa
            if (cleanedQuestion.includes(key)) {
                return knowledgeBase[key];
            }
        }
        
        // Verificar si la pregunta es sobre servicios
        if (cleanedQuestion.includes('servicio') || cleanedQuestion.includes('servicios')) {
            return "SERVICIOS";
        }
        
        // Verificar si la pregunta es sobre cotización
        if (cleanedQuestion.includes('cotizacion') || cleanedQuestion.includes('cotización') || cleanedQuestion.includes('presupuesto')) {
            return "COTIZACION";
        }
        
        // Verificar saludos comunes
        const greetings = ["hola", "buenos días", "buenas tardes", "buenas noches", "saludos"];
        for (let greeting of greetings) {
            if (cleanedQuestion.includes(greeting)) {
                return knowledgeBase[greeting] || "¡Hola! ¿Cómo puedo ayudarte hoy?";
            }
        }
        
        // Verificar palabras clave de ayuda
        const helpWords = ["ayuda", "información", "contacto", "comunicar", "gerente"];
        for (let word of helpWords) {
            if (cleanedQuestion.includes(word)) {
                if (word === "gerente" || word === "comunicar") {
                    return knowledgeBase["¿deseas comunicarte con la gerente?"];
                } else if (word === "información") {
                    return knowledgeBase["más información"];
                } else {
                    return knowledgeBase[word] || "Estoy aquí para ayudarte. ¿Qué necesitas saber sobre CreaCom?";
                }
            }
        }
        
        // Respuesta por defecto más amigable
        return "¡Hola! 😄 Puedo ayudarte con información sobre CreaCom, nuestros servicios o contacto. Haz clic en las preguntas abajo y encontrarás las respuestas. ¡Gracias!";
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
                
                // Verificar si la respuesta es sobre servicios
                if (answer === "SERVICIOS") {
                    addMessage("Ofrecemos los siguientes servicios. Selecciona el que te interesa:");
                    setTimeout(function() {
                        showServiceButtons();
                    }, 300);
                }
                // Verificar si la respuesta es sobre cotización
                else if (answer === "COTIZACION") {
                    addMessage("Perfecto. Estamos encantados de iniciar tu proyecto. Para esto, puedes ponerte en contacto con la gerente.");
                    setTimeout(function() {
                        showWhatsAppButton();
                    }, 300);
                } else {
                    addMessage(answer);
                }
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
                
                // Verificar si la respuesta es sobre servicios
                if (answer === "SERVICIOS") {
                    addMessage("Ofrecemos los siguientes servicios. Selecciona el que te interesa:");
                    setTimeout(function() {
                        showServiceButtons();
                    }, 300);
                }
                // Verificar si la respuesta es sobre cotización
                else if (answer === "COTIZACION") {
                    addMessage("Perfecto. Estamos encantados de iniciar tu proyecto. Para esto, puedes ponerte en contacto con la gerente");
                    setTimeout(function() {
                        showWhatsAppButton();
                    }, 300);
                } else {
                    addMessage(answer);
                }
            }, 500);
        });
    });
});