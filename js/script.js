document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZAR ÍCONES LUCIDE
    lucide.createIcons();

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 2. REDIRECIONAMENTO INTELIGENTE (WhatsApp e E-mail)
    const setupSmartLinks = () => {
        const whatsappNumber = "5511974962380";
        
        // WhatsApp links
        document.querySelectorAll('.whatsapp-link, a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = isMobile() 
                    ? `https://wa.me/${whatsappNumber}` 
                    : `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
                window.open(url, '_blank');
            });
        });

        // E-mail links
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

    // 3. LOGICA DO HEADER (Scroll)
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // 4. MENU MOBILE
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('nav a');

    const toggleMenu = () => mobileMenu.classList.toggle('active');
    
    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 5. ANIMAÇÕES DE REVELAÇÃO NO SCROLL (Interception Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-scroll').forEach(el => revealObserver.observe(el));

    // 6. VOLTAR AO TOPO
    document.getElementById('scrollToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Iniciar
    setupSmartLinks();

    // 7. Carrossel
// ==========================================================
    // --- 🌄 PARALLAX CAROUSEL LOGIC ---
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

        function updateCarousel(newIndex, direction) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;

            const currentSlide = slides[currentIndex];
            const nextSlide = slides[newIndex];

            // Reset classes from all slides first
            slides.forEach(slide => {
                slide.className = 'parallax-slide'; 
            });

            // Set animation classes
            if (direction === 'next') {
                currentSlide.classList.add('exit-next'); // Sai para a esquerda
                nextSlide.classList.add('active', 'enter-next'); // Entra da direita
            } else {
                currentSlide.classList.add('exit-prev'); // Sai para a direita
                nextSlide.classList.add('active', 'enter-prev'); // Entra da esquerda
            }

            // Update Indicators
            indicators.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === newIndex);
            });

            // Update Counter
            currentCounter.textContent = String(newIndex + 1).padStart(2, '0');

            // Update State
            currentIndex = newIndex;

            // Remove animation classes after transition completes to clean up
            setTimeout(() => {
                isAnimating = false;
                // Keep active class, remove animation specific classes
                slides.forEach((slide, idx) => {
                    if (idx === currentIndex) {
                        slide.className = 'parallax-slide active';
                    } else {
                        slide.className = 'parallax-slide';
                    }
                });
            }, 800); // Matches CSS transition duration
        }

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex, 'next');
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex, 'prev');
        });

        indicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index === currentIndex) return;
                const direction = index > currentIndex ? 'next' : 'prev';
                updateCarousel(index, direction);
            });
        });
    }
});