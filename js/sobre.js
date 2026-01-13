document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Animação de Scroll (Intersection Observer)
    // Substitui o 'whileInView' do Framer Motion
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale');

    const revealOptions = {
        threshold: 0.15, // Dispara quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: Parar de observar após animar uma vez
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
});