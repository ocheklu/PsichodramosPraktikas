// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for anchor links
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

// Text rotation in hero
const rotateTexts = document.querySelectorAll('.rotate-text');
if (rotateTexts.length > 0) {
    let currentIndex = 0;

    function rotateText() {
        const current = rotateTexts[currentIndex];
        const nextIndex = (currentIndex + 1) % rotateTexts.length;
        const next = rotateTexts[nextIndex];
        
        // Шаг 1: Текущий элемент уходит вверх
        current.classList.add('exiting');
        current.classList.remove('active');
        
        // Шаг 2: Через 400ms убираем exiting и показываем следующий
        setTimeout(() => {
            current.classList.remove('exiting');
            next.classList.add('active');
            currentIndex = nextIndex;
        }, 400);  // Половина времени анимации (0.8s / 2)
    }

    setInterval(rotateText, 4000);
}

