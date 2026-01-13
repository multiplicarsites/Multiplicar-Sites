document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INICIALIZAÇÃO SEGURA DE ÍCONES ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // --- 2. REDIRECIONAMENTO INTELIGENTE ---
    const setupSmartLinks = () => {
        const whatsappNumber = "5511974962380";
        
        // WhatsApp
        document.querySelectorAll('.whatsapp-link, a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = isMobile() 
                    ? `https://wa.me/${whatsappNumber}` 
                    : `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
                window.open(url, '_blank');
            });
        });

        // E-mail (Gmail para Desktop)
        document.querySelectorAll('.email-link, a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!isMobile()) {
                    e.preventDefault();
                    const email = link.getAttribute('href').replace('mailto:', '');
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
                }
            });
        });
    };

    // --- 3. LÓGICA DO HEADER (Scroll) ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // --- 4. MENU MOBILE (Com verificação de nulidade) ---
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        const toggleMenu = () => mobileMenu.classList.toggle('active');
        
        menuBtn.addEventListener('click', toggleMenu);
        
        // Só adiciona o evento se o botão de fechar realmente existir
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', toggleMenu);
        }

        // Fechar ao clicar nos links
        const mobileLinks = mobileMenu.querySelectorAll('nav a');
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // --- 5. ANIMAÇÕES DE REVELAÇÃO NO SCROLL ---
    const revealElements = document.querySelectorAll('.reveal-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- 6. VOLTAR AO TOPO ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Iniciar funções globais
    setupSmartLinks();
    const scrollElements = document.querySelectorAll(".reveal-on-scroll");

    // Configuração do Observador
    const observerOptions = {
        threshold: 0.2, // Dispara quando 20% do elemento está visível
        rootMargin: "0px 0px -50px 0px" // Ajuste fino para disparar um pouco antes
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Adiciona a classe que faz a animação CSS acontecer
                entry.target.classList.add("is-visible");
                
                // (Opcional) Se quiser que anime apenas uma vez, descomente a linha abaixo:
                // observer.unobserve(entry.target);
            } else {
                // Se quiser que a animação suma ao sair da tela (efeito "fade in/out" contínuo)
                // mantenha o else. Se quiser só uma vez, remova este bloco else.
                entry.target.classList.remove("is-visible");
            }
        });
    }, observerOptions);

    scrollElements.forEach((el) => scrollObserver.observe(el));
    
    // Reinicializa os ícones Lucide (caso sejam carregados dinamicamente)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});