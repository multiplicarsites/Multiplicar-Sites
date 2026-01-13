document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializar Ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // =========================================
    // HEADER SCROLL LOGIC
    // =========================================
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =========================================
    // MOBILE MENU LOGIC
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenuOverlay) {
        function toggleMenu() {
            const isOpen = mobileMenuOverlay.classList.contains('open');
            if (isOpen) {
                mobileMenuOverlay.classList.remove('open');
            } else {
                mobileMenuOverlay.classList.add('open');
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);
        if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', toggleMenu);
        
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                toggleMenu();
            }
        });
    }

    // =========================================
    // FAQ FILTER LOGIC
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            faqItems.forEach(item => {
                item.classList.remove('fade-in');
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // =========================================
    // ACCORDION LOGIC
    // =========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const isOpen = parentItem.classList.contains('active');
            
            // Fecha outros itens (Opcional, comente se quiser permitir múltiplos abertos)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isOpen) {
                parentItem.classList.add('active');
            }
        });
    });

    // =========================================
    // SCROLL TO TOP
    // =========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
// =========================================
// HIDE FILTER AFTER FAQ ENDS (FIXED)
// =========================================
const filterSection = document.querySelector('.filter-section');
const faqSection = document.querySelector('.faq-list-section');

if (filterSection && faqSection) {
    const faqEndOffset = faqSection.offsetTop + faqSection.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;

        if (scrollPosition >= faqEndOffset) {
            filterSection.classList.add('filter-hidden');
        } else {
            filterSection.classList.remove('filter-hidden');
        }
    });
}




    });