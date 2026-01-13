document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializar Ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // =========================================
    // 2. LÓGICA DO ACORDEÃO (Accordion)
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-question');
        const content = item.querySelector('.faq-answer');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha outros itens (efeito sanfona único) - Opcional
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Abre ou fecha o atual
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // =========================================
    // 3. LÓGICA DE FILTRO DE CATEGORIAS
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allItems = document.querySelectorAll('.faq-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove classe ativa dos botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // 2. Adiciona ao clicado
            btn.classList.add('active');

            // 3. Pega o valor do filtro
            const filterValue = btn.getAttribute('data-filter');

            // 4. Filtra os itens
            allItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Pequeno delay para permitir animação CSS (fade-in)
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });

            // 5. Recalcula a posição do Stick (Correção do bug)
            // Forçamos o navegador a verificar se o CTA entrou na tela agora que a lista diminuiu
            setTimeout(checkStickyVisibility, 100);
        });
    });

// =========================================
    // 4. LÓGICA PARA ESCONDER O FILTRO STICKY (CORRIGIDO)
    // =========================================
    const filterSection = document.querySelector('.filter-section');
    const ctaSection = document.querySelector('.contact-cta-section');

    function checkStickyVisibility() {
        if (!ctaSection || !filterSection) return;

        const ctaRect = ctaSection.getBoundingClientRect();
        
        // PONTO DE GATILHO:
        // Queremos que o filtro suma quando o CTA estiver chegando perto do topo.
        // 150px é uma margem de segurança (altura do filtro + um respiro).
        const triggerPoint = 150; 

        // Lógica Invertida:
        // Se o topo do CTA for MENOR que 150px (ou seja, está subindo e passando pelo topo), ESCONDE.
        if (ctaRect.top < triggerPoint) {
            filterSection.classList.add('filter-hidden');
        } else {
            filterSection.classList.remove('filter-hidden');
        }
    }

    // Adiciona o evento de scroll para checar constantemente
    window.addEventListener('scroll', checkStickyVisibility);
    
    // Checa ao carregar a página também
    checkStickyVisibility();
    
    // =========================================
    // 5. MENU MOBILE & SCROLL
    // =========================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    });

    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        const toggleMenu = () => mobileMenu.classList.toggle('active');
        menuBtn.addEventListener('click', toggleMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));
    }

    // =========================================
    // 6. ANIMAÇÕES SCROLL REVEAL
    // =========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-scroll').forEach(el => revealObserver.observe(el));
});