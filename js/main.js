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

// Services nav strip — dot indicators
const navStrip = document.querySelector('.services-nav-strip');
const navCards = document.querySelectorAll('.services-nav-card');
const navDots = document.querySelectorAll('.services-nav-dot');

function isMobile() {
    return window.innerWidth <= 768;
}

function activateService(index) {
    if (!navCards[index]) return;
    const targetId = navCards[index].getAttribute('href');
    const target = document.querySelector(targetId);

    if (isMobile()) {
        // Hide all service sections
        document.querySelectorAll('#meno-terapija, #judejimo-terapija, #individuali-sesija')
            .forEach(s => s.classList.remove('service-active'));

        // Show selected if target exists
        if (target) target.classList.add('service-active');

        // Update active card style
        navCards.forEach(c => c.classList.remove('card-active'));
        navCards[index].classList.add('card-active');
    }

    // Update dots always
    navDots.forEach(d => d.classList.remove('active'));
    if (navDots[index]) navDots[index].classList.add('active');
}

// Click handler — scroll to section on click
navCards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        activateService(index);

        if (isMobile()) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => {
                    const offset = 20;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }, 50);
            }
        }
    });
});

// On mobile load — show NO service by default, just dots
if (isMobile()) {
    navDots.forEach(d => d.classList.remove('active'));
    if (navDots[0]) navDots[0].classList.add('active');
}

// On page load — check if URL has a hash anchor
// If yes and we are on mobile — activate the corresponding service
if (isMobile() && window.location.hash) {
    const hash = window.location.hash;
    navCards.forEach((card, index) => {
        if (card.getAttribute('href') === hash) {
            activateService(index);
        }
    });
}

// Update dots AND active service on scroll
if (navStrip) {
    function updateDotsFromScroll() {
        const stripRect = navStrip.getBoundingClientRect();
        const stripCenter = stripRect.left + stripRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        navCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - stripCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        navDots.forEach(d => d.classList.remove('active'));
        if (navDots[closestIndex]) navDots[closestIndex].classList.add('active');

        navCards.forEach(c => c.classList.remove('card-active'));
        navCards[closestIndex].classList.add('card-active');
    }

    navStrip.addEventListener('scroll', updateDotsFromScroll, { passive: true });
    navStrip.addEventListener('touchmove', updateDotsFromScroll, { passive: true });
    navStrip.addEventListener('touchend', updateDotsFromScroll, { passive: true });
}

// Custom video play button
const videoPlayBtn = document.querySelector('.video-play-btn');
if (videoPlayBtn) {
    const video = videoPlayBtn.closest('.video-container').querySelector('video');

    function toggleVideo() {
        if (video.paused) {
            video.play();
            videoPlayBtn.classList.add('hidden');
        } else {
            video.pause();
            videoPlayBtn.classList.remove('hidden');
        }
    }

    // Клик по кнопке — stopPropagation чтобы не всплывал до видео
    videoPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVideo();
    });

    // Клик по самому видео — пауза/воспроизведение
    video.addEventListener('click', () => {
        toggleVideo();
    });

    video.addEventListener('ended', () => {
        videoPlayBtn.classList.remove('hidden');
    });
}

