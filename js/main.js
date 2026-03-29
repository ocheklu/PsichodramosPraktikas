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

// Services nav strip — debug helper
function debug(msg) {
    var panel = document.getElementById('debug-panel');
    var text = document.getElementById('debug-text');
    if (panel && text) {
        panel.style.display = 'block';
        text.innerHTML = msg + '<br>' + text.innerHTML;
    }
}

// Services nav strip — dot indicators
window.addEventListener('DOMContentLoaded', function() {

    var strip = document.querySelector('.services-nav-strip');
    console.log('DOM ready');
    console.log('strip:', strip);
    debug('strip found: ' + (strip ? 'YES' : 'NO'));
    if (!strip) return;

    var cards = strip.querySelectorAll('.services-nav-card');
    var dots = document.querySelectorAll('.services-nav-dot');
    var sections = [
        document.querySelector('#meno-terapija'),
        document.querySelector('#judejimo-terapija'),
        document.querySelector('#individuali-sesija')
    ];

    console.log('cards count:', cards.length);
    console.log('dots count:', dots.length);
    console.log('sections:', sections);
    debug('cards: ' + cards.length + ' dots: ' + dots.length);
    debug('sections: ' + sections.map(function(s){ return s ? s.id : 'NULL'; }).join(', '));

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function setActive(index) {
        console.log('setActive called with index:', index);
        console.log('isMobile:', isMobile());
        debug('setActive: ' + index + ' mobile: ' + isMobile());
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === index);
        });

        cards.forEach(function(c, i) {
            c.classList.toggle('card-active', i === index);
        });

        if (isMobile()) {
            sections.forEach(function(s) {
                if (s) s.classList.remove('service-active');
            });
            if (sections[index]) sections[index].classList.add('service-active');
        }
    }

    cards.forEach(function(card, index) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('card clicked, index:', index);
            debug('CLICK index: ' + index);
            setActive(index);
            if (isMobile() && sections[index]) {
                setTimeout(function() {
                    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        });
    });

    function updateFromScroll() {
        console.log('scroll fired, stripScrollLeft:', strip.scrollLeft);
        debug('SCROLL: ' + strip.scrollLeft);
        var stripCenter = strip.scrollLeft + strip.offsetWidth / 2;
        var closest = 0;
        var minDist = Infinity;
        cards.forEach(function(card, i) {
            var cardCenter = card.offsetLeft + card.offsetWidth / 2;
            var dist = Math.abs(cardCenter - stripCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === closest);
        });
        cards.forEach(function(c, i) {
            c.classList.toggle('card-active', i === closest);
        });
    }

    strip.addEventListener('scroll', updateFromScroll, { passive: true });
    strip.addEventListener('touchend', updateFromScroll, { passive: true });

    if (isMobile() && window.location.hash) {
        var hash = window.location.hash;
        cards.forEach(function(card, index) {
            if (card.getAttribute('href') === hash) {
                setActive(index);
            }
        });
    }

    dots.forEach(function(d, i) {
        d.classList.toggle('active', i === 0);
    });
});

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

