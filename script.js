// Menu Bolo Interativo
const cakeMenu = document.getElementById('cakeMenu');
const menuToggle = document.getElementById('menuToggle');
const cakeLayers = document.querySelectorAll('.cake-layer');

// Alternar expansão do menu
menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    cakeMenu.classList.toggle('expanded');
    
    // Adicionar efeito de confete ao expandir
    if (cakeMenu.classList.contains('expanded')) {
        createSprinkles();
    }
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    if (!cakeMenu.contains(e.target)) {
        cakeMenu.classList.remove('expanded');
    }
});

// Navegação suave para as seções
cakeLayers.forEach(layer => {
    layer.addEventListener('click', function() {
        const layerNumber = this.getAttribute('data-layer');
        let targetSection;
        
        switch(layerNumber) {
            case '1':
                targetSection = 'home';
                break;
            case '2':
                targetSection = 'sobre';
                break;
            case '3':
                targetSection = 'produtos';
                break;
            case '4':
                targetSection = 'contato';
                break;
        }
        
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Fechar menu após clicar
        cakeMenu.classList.remove('expanded');
    });
});

// Efeito de confete mágico
function createSprinkles() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const symbols = ['❄️', '✨', '⭐', '💫', '🌟', '🎀'];
    
    // Posição do menu bolo para os confetes
    const menuRect = cakeMenu.getBoundingClientRect();
    const menuCenterX = menuRect.left + menuRect.width / 2;
    const menuCenterY = menuRect.top + menuRect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.classList.add('sprinkle');
        sprinkle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Posicionar os confetes ao redor do menu
        sprinkle.style.left = (menuCenterX - 10 + Math.random() * 100 - 50) + 'px';
        sprinkle.style.top = (menuCenterY - 10 + Math.random() * 100 - 50) + 'px';
        sprinkle.style.animationDelay = Math.random() * 2 + 's';
        sprinkle.style.fontSize = (Math.random() * 15 + 8) + 'px';
        
        document.body.appendChild(sprinkle);
        
        // Remover após animação
        setTimeout(() => {
            if (sprinkle.parentNode) {
                sprinkle.remove();
            }
        }, 2000);
    }
}

// Efeito de destaque nos cards de produtos
const productCards = document.querySelectorAll('.produto-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Animação de entrada para as seções
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Efeito de digitação no título hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Efeito de parallax suave no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Prevenir que o menu feche quando clicar nas camadas
cakeLayers.forEach(layer => {
    layer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
