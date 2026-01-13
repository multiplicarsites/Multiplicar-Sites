document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================================
    // 🔴 COLE A URL DO SEU GOOGLE APPS SCRIPT AQUI DENTRO DAS ASPAS
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxA_oWIoszvqb95Lvpt7_Z4oH_sDvFlDK7ILDEVfhPL4mbVwZF2z6fm1mOg99OzxoCe/exec";
    // ============================================================

    // 1. INICIALIZAR ÍCONES LUCIDE
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. LÓGICA DO MENU MOBILE
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');
        if (isActive) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        } else {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMenu);

    // 3. EFEITO DE SCROLL NO HEADER
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. PREENCHIMENTO AUTOMÁTICO (URL PARAMS)
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const selectService = document.getElementById('service_interest');

    if (serviceParam && selectService) {
        const optionExists = [...selectService.options].some(o => o.value === serviceParam);
        if (optionExists) {
            selectService.value = serviceParam;
        }
    }

    // 5. ANIMAÇÕES DE ENTRADA
    const revealElements = document.querySelectorAll('.reveal-element');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // 6. LÓGICA DE ENVIO (INTEGRAÇÃO GOOGLE SHEETS)
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    const mainContent = document.getElementById('main-contact-content');
    const successScreen = document.getElementById('success-screen');
    const newMsgBtn = document.getElementById('new-msg-btn');
    
    let isSubmitting = false;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isSubmitting) return; 

            isSubmitting = true;

            // 1. Muda UI para "Enviando..."
            submitBtn.disabled = true;
            btnText.textContent = "Enviando...";
            btnIcon.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            btnLoader.classList.add('animate-spin');

            // 2. Captura os dados automaticamente
            const formData = new FormData(contactForm);

            // 3. Envia para o Google Sheets (Fire and Forget)
            // Usamos 'no-cors' para evitar erros no console, já que não precisamos ler a resposta
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            })
            .then(() => {
                // O envio foi iniciado.
                console.log("Requisição enviada ao Google.");
            })
            .catch(error => {
                console.error("Erro na requisição", error);
            });

            // 4. Simula sucesso para o usuário (UX fluida)
            // Esperamos 1.5s para dar a sensação de processamento
            setTimeout(() => {
                // Esconde form, mostra sucesso
                mainContent.classList.add('hidden');
                successScreen.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Reseta tudo para o próximo envio
                contactForm.reset();
                submitBtn.disabled = false;
                btnText.textContent = "Enviar Mensagem";
                btnIcon.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                btnLoader.classList.remove('animate-spin');
                
                isSubmitting = false;
            }, 1500);
        });
    }

    // Botão "Enviar Nova Mensagem"
    if (newMsgBtn) {
        newMsgBtn.addEventListener('click', () => {
            successScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. BOTÃO VOLTAR AO TOPO
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});