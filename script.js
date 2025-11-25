// script.js

class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.carousel-slides');
        this.indicators = container.querySelectorAll('.carousel-indicator');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.children.length;
        
        this.init();
    }
    
    init() {
        // Event Listeners para botões
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        // Event Listeners para indicadores (bolinhas)
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Avanço automático a cada 5 segundos
        setInterval(() => this.next(), 5000);
        
        this.updateIndicators();
    }
    
    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
    }
    
    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }
    
    updateSlides() {
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        this.updateIndicators();
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('bg-white', 'bg-opacity-100');
                indicator.classList.remove('bg-opacity-50');
            } else {
                indicator.classList.remove('bg-white', 'bg-opacity-100');
                indicator.classList.add('bg-opacity-50');
            }
        });
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    
    // Iniciar Carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
    
    // Scroll Suave para links internos (segurança extra além do CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Configuração Automática do WhatsApp
    // ATENÇÃO: Mude o número abaixo!
    const meuNumeroWhatsApp = "SEUNUMERO"; // Ex: 5511999999999
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        if (link.href.includes("SEUNUMERO") && meuNumeroWhatsApp !== "SEUNUMERO") {
            link.href = `https://wa.me/${meuNumeroWhatsApp}`;
        }
    });
});