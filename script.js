document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR ÍCONES LUCIDE (Com proteção de erro)
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn("Lucide icons não carregaram corretamente.", e);
    }

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 2. REDIRECIONAMENTO INTELIGENTE
    const setupSmartLinks = () => {
        const whatsappNumber = "5511974962380";
        document.querySelectorAll('.whatsapp-link, a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = isMobile() 
                    ? `https://wa.me/${whatsappNumber}` 
                    : `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
                window.open(url, '_blank');
            });
        });

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

    // 3. LÓGICA DO HEADER (Scroll)
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // 4. MENU MOBILE
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('nav a');
        const toggleMenu = () => mobileMenu.classList.toggle('active');
        
        menuBtn.addEventListener('click', toggleMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 5. ANIMAÇÕES DE REVELAÇÃO NO SCROLL
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-scroll').forEach(el => revealObserver.observe(el));

    // 6. VOLTAR AO TOPO
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Iniciar Links
    setupSmartLinks();

    // ==========================================================
    // --- 7. CARROSSEL PARALLAX (CORRIGIDO) ---
    // ==========================================================
    const parallaxCarousel = document.getElementById('parallax-carousel');

    if (parallaxCarousel) {
        const slides = parallaxCarousel.querySelectorAll('.parallax-slide');
        const prevBtn = document.getElementById('parallax-prev');
        const nextBtn = document.getElementById('parallax-next');
        const currentCounter = document.getElementById('current-slide');
        const indicators = document.querySelectorAll('.indicator-dot');
        
        let currentIndex = 0;
        let isAnimating = false;
        let autoPlayInterval;
        const AUTO_PLAY_DELAY = 3000;

        // Função para limpar classes de animação anteriores
        function cleanClasses() {
            slides.forEach(slide => {
                slide.classList.remove('enter-next', 'enter-prev', 'exit-next', 'exit-prev');
                slide.classList.remove('active');
            });
        }

        function updateCarousel(newIndex, direction) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;

            const currentSlide = slides[currentIndex];
            const nextSlide = slides[newIndex];

            // Garante que o slide atual tem a classe active antes de começar a sair
            currentSlide.classList.add('active');

            // Aplica as classes de animação
            if (direction === 'next') {
                currentSlide.classList.add('exit-next');
                nextSlide.classList.add('active', 'enter-next');
            } else {
                currentSlide.classList.add('exit-prev');
                nextSlide.classList.add('active', 'enter-prev');
            }

            // Atualiza indicadores visualmente
            indicators.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === newIndex);
            });

            // Atualiza contador numérico
            if (currentCounter) {
                currentCounter.textContent = String(newIndex + 1).padStart(2, '0');
            }

            // Atualiza o índice global
            currentIndex = newIndex;

            // Limpeza após o fim da transição CSS (800ms)
            setTimeout(() => {
                isAnimating = false;
                // Remove todas as classes de movimento e deixa apenas 'active' no slide atual
                slides.forEach((slide, idx) => {
                    slide.classList.remove('enter-next', 'enter-prev', 'exit-next', 'exit-prev');
                    if (idx === currentIndex) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            }, 800);
        }

        const goNext = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex, 'next');
        };

        const goPrev = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex, 'prev');
        };

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goNext();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goPrev();
                resetAutoPlay();
            });
        }

        indicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index === currentIndex) return;
                const direction = index > currentIndex ? 'next' : 'prev';
                updateCarousel(index, direction);
                resetAutoPlay();
            });
        });

        // --- LÓGICA DE AUTO-PLAY (VISIBILIDADE) ---
        function startAutoPlay() {
            if (!autoPlayInterval) {
                autoPlayInterval = setInterval(goNext, AUTO_PLAY_DELAY);
            }
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Observer para rodar apenas quando visível
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.2 }); // 20% visível já ativa

        carouselObserver.observe(parallaxCarousel);

        // Pausa no Hover
        parallaxCarousel.addEventListener('mouseenter', stopAutoPlay);
        parallaxCarousel.addEventListener('mouseleave', () => {
            // Verifica se ainda está visível antes de retomar
            const rect = parallaxCarousel.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            // Se estiver parcialmente visível ou o observer estiver ativo, retomamos
            startAutoPlay(); 
        });
    }
});