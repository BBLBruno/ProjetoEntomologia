// ===================================
// BOTÃO DE ACESSIBILIDADE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const accessibilityTrigger = document.getElementById('accessibility-trigger');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const btnTextSpeech = document.getElementById('btn-text-speech');
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnHighContrast = document.getElementById('btn-high-contrast');
    const btnReset = document.getElementById('btn-reset-accessibility');

    // Variáveis de estado
    let menuOpen = false;
    let fontSizeLevel = 0; // -1: pequena, 0: normal, 1: grande, 2: extra grande
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let isSpeaking = false;

    // Carregar preferências salvas
    loadAccessibilityPreferences();

    // Toggle do menu
    if (accessibilityTrigger) {
        accessibilityTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            menuOpen = !menuOpen;
            accessibilityMenu.style.display = menuOpen ? 'block' : 'none';
            
            // Adiciona animação
            if (menuOpen) {
                accessibilityTrigger.classList.add('accessibility-highlight');
                setTimeout(() => {
                    accessibilityTrigger.classList.remove('accessibility-highlight');
                }, 600);
            }
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuOpen && !accessibilityMenu.contains(e.target)) {
            menuOpen = false;
            accessibilityMenu.style.display = 'none';
        }
    });

    // Ler em Voz Alta
    if (btnTextSpeech) {
        btnTextSpeech.addEventListener('click', function() {
            if (isSpeaking) {
                // Para a leitura
                speechSynthesis.cancel();
                isSpeaking = false;
                this.classList.remove('active', 'reading-active');
                showNotification('Leitura pausada');
            } else {
                // Inicia a leitura
                readPageContent();
                this.classList.add('active', 'reading-active');
                isSpeaking = true;
            }
        });
    }

    // Aumentar Fonte
    if (btnIncreaseFont) {
        btnIncreaseFont.addEventListener('click', function() {
            if (fontSizeLevel < 2) {
                fontSizeLevel++;
                updateFontSize();
                savePreference('fontSize', fontSizeLevel);
                showNotification('Fonte aumentada');
            } else {
                showNotification('Tamanho máximo atingido');
            }
        });
    }

    // Diminuir Fonte
    if (btnDecreaseFont) {
        btnDecreaseFont.addEventListener('click', function() {
            if (fontSizeLevel > -1) {
                fontSizeLevel--;
                updateFontSize();
                savePreference('fontSize', fontSizeLevel);
                showNotification('Fonte diminuída');
            } else {
                showNotification('Tamanho mínimo atingido');
            }
        });
    }

    // Alto Contraste
    if (btnHighContrast) {
        btnHighContrast.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            this.classList.toggle('active');
            
            const isActive = document.body.classList.contains('high-contrast');
            savePreference('highContrast', isActive);
            showNotification(isActive ? 'Alto contraste ativado' : 'Alto contraste desativado');
        });
    }

    // Resetar Configurações
    if (btnReset) {
        btnReset.addEventListener('click', function() {
            // Para qualquer leitura em andamento
            if (isSpeaking) {
                speechSynthesis.cancel();
                isSpeaking = false;
            }

            // Remove todas as classes
            document.body.classList.remove('reading-mode', 'high-contrast', 'large-font', 'extra-large-font', 'small-font');
            
            // Reseta nível de fonte
            fontSizeLevel = 0;
            
            // Remove classes ativas dos botões
            document.querySelectorAll('.accessibility-menu-item.active').forEach(btn => {
                btn.classList.remove('active', 'reading-active');
            });
            
            // Limpa preferências salvas
            clearAccessibilityPreferences();
            
            showNotification('Configurações resetadas');
        });
    }

    // ===================================
    // FUNÇÕES AUXILIARES
    // ===================================

    function updateFontSize() {
        // Remove todas as classes de tamanho
        document.body.classList.remove('small-font', 'large-font', 'extra-large-font');
        
        // Aplica a classe correta
        if (fontSizeLevel === -1) {
            document.body.classList.add('small-font');
        } else if (fontSizeLevel === 1) {
            document.body.classList.add('large-font');
        } else if (fontSizeLevel === 2) {
            document.body.classList.add('extra-large-font');
        }
    }

    function readPageContent() {
        // Cancela qualquer leitura em andamento
        speechSynthesis.cancel();
        
        // Extrai texto legível de TODA a página
        let textToRead = '';
        
        // Pega todos os elementos de texto visíveis
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, span, div, td, th, label, button, .section-text, .hero-title, .hero-subtitle, .news-card-title, .news-card-body, .section-title, .author-name, .author-bio, .contact-text, .card-title, .filter-label, .especies-list, .filter-title, .label-text, .radio-label, .content-title, .apply-filters-button, .reset-button, .help-text');
        
        elements.forEach(element => {
            // Ignora elementos ocultos, scripts, styles, e elementos do menu de acessibilidade
            if (element.offsetParent !== null && 
                !element.closest('script') && 
                !element.closest('style') &&
                !element.closest('#accessibility-menu') &&
                !element.closest('.accessibility-floating-btn') &&
                !element.closest('.filter-overlay') && // Ignora overlay mobile duplicado
                element.textContent.trim()) {
                
                const text = element.textContent.trim();
                // Evita duplicações (verifica se já não adicionou esse texto)
                if (text && text.length > 2 && !textToRead.includes(text)) {
                    textToRead += text + '. ';
                }
            }
        });

        if (!textToRead) {
            showNotification('Nenhum conteúdo para ler');
            return;
        }

        // Cria utterance
        currentUtterance = new SpeechSynthesisUtterance(textToRead);
        
        // Detecta idioma da página
        const lang = document.documentElement.lang || 'pt-BR';
        currentUtterance.lang = lang;
        currentUtterance.rate = 0.9; // Velocidade um pouco mais lenta
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;

        // Eventos
        currentUtterance.onstart = function() {
            showNotification('Iniciando leitura...');
        };

        currentUtterance.onend = function() {
            isSpeaking = false;
            if (btnTextSpeech) {
                btnTextSpeech.classList.remove('active', 'reading-active');
            }
            showNotification('Leitura concluída');
        };

        currentUtterance.onerror = function(event) {
            console.error('Erro na síntese de fala:', event);
            isSpeaking = false;
            if (btnTextSpeech) {
                btnTextSpeech.classList.remove('active', 'reading-active');
            }
            showNotification('Erro ao ler conteúdo');
        };

        // Inicia a leitura
        speechSynthesis.speak(currentUtterance);
        showNotification('Lendo página...');
    }

    function showNotification(message) {
        // Remove notificação existente
        const existingNotification = document.querySelector('.accessibility-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = 'accessibility-notification';
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(notification);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem('accessibility_' + key, JSON.stringify(value));
        } catch (e) {
            console.error('Erro ao salvar preferência:', e);
        }
    }

    function loadAccessibilityPreferences() {
        try {
            // Alto contraste
            const highContrast = JSON.parse(localStorage.getItem('accessibility_highContrast'));
            if (highContrast) {
                document.body.classList.add('high-contrast');
                if (btnHighContrast) btnHighContrast.classList.add('active');
            }

            // Tamanho da fonte
            const fontSize = JSON.parse(localStorage.getItem('accessibility_fontSize'));
            if (fontSize !== null) {
                fontSizeLevel = fontSize;
                updateFontSize();
            }
        } catch (e) {
            console.error('Erro ao carregar preferências:', e);
        }
    }

    function clearAccessibilityPreferences() {
        try {
            localStorage.removeItem('accessibility_highContrast');
            localStorage.removeItem('accessibility_fontSize');
        } catch (e) {
            console.error('Erro ao limpar preferências:', e);
        }
    }

    // Atalhos de teclado (Alt + tecla)
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key.toLowerCase()) {
                case 'a': // Alt + A = Abrir menu de acessibilidade
                    e.preventDefault();
                    accessibilityTrigger.click();
                    break;
                case 'v': // Alt + V = Ler em voz alta
                    e.preventDefault();
                    if (btnTextSpeech) btnTextSpeech.click();
                    break;
                case '+': // Alt + + = Aumentar fonte
                case '=':
                    e.preventDefault();
                    if (btnIncreaseFont) btnIncreaseFont.click();
                    break;
                case '-': // Alt + - = Diminuir fonte
                    e.preventDefault();
                    if (btnDecreaseFont) btnDecreaseFont.click();
                    break;
                case 'c': // Alt + C = Alto contraste
                    e.preventDefault();
                    if (btnHighContrast) btnHighContrast.click();
                    break;
                case 'r': // Alt + R = Resetar
                    e.preventDefault();
                    if (btnReset) btnReset.click();
                    break;
            }
        }
    });

    // Para a leitura ao sair da página
    window.addEventListener('beforeunload', function() {
        if (isSpeaking) {
            speechSynthesis.cancel();
        }
    });
});
