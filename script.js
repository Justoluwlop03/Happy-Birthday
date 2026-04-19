// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Page Variables
let isAudioPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const preloader = document.getElementById('preloader');

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// ==================== MUSIC CONTROL ====================
musicControl.addEventListener('click', () => {
    isAudioPlaying = !isAudioPlaying;
    
    if (isAudioPlaying) {
        bgMusic.play();
        bgMusic.volume = 1;
        musicControl.classList.remove('muted');
        gsap.to(bgMusic, { volume: 1, duration: 10 });
    } else {
        gsap.to(bgMusic, {
            volume: 1,
            duration: 10,
            onComplete: () => bgMusic.pause()
        });
        musicControl.classList.add('muted');
    }
});

// ==================== NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== HERO ANIMATIONS ====================
// Character reveal animation
const chars = document.querySelectorAll('.char');
chars.forEach((char, index) => {
    gsap.to(char, {
        delay: index * 0.05,
        duration: 0.6,
        ease: 'back.out'
    });
});

// Hero animations on load
gsap.to('.hero-date', {
    duration: 1,
    delay: 0.3,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
});

gsap.to('.hero-message', {
    duration: 1,
    delay: 0.6,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
});

// Scroll trigger animations for hero
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'center center',
        end: 'bottom center',
        scrub: 1,
        markers: false
    },
    opacity: 0.5,
    scale: 0.95
});

// ==================== COUNTDOWN TIMER ====================
function startCountdown() {
    // Target date: May 2, 2025
    const targetDate = new Date('2025-05-02T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        animateValue('days', days);
        animateValue('hours', hours);
        animateValue('minutes', minutes);
        animateValue('seconds', seconds);
    }

    function animateValue(id, value) {
        const element = document.getElementById(id);
        const currentValue = parseInt(element.textContent);
        
        if (currentValue !== value) {
            gsap.to(element, {
                textContent: value,
                duration: 0.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                rotation: 360,
                onUpdate: function() {
                    element.textContent = Math.floor(this.targets()[0].textContent);
                }
            });
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start countdown when page loads
startCountdown();

// ==================== COUNTDOWN SECTION ANIMATIONS ====================
gsap.to('.countdown-item', {
    scrollTrigger: {
        trigger: '.countdown-section',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: (index) => index * 0.15,
    opacity: 1,
    y: 0,
    ease: 'back.out'
});

// ==================== TIMELINE ANIMATIONS ====================
const timelineItems = gsap.utils.toArray('.timeline-item');

timelineItems.forEach((item) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top center+=50',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 1,
        x: 0,
        ease: 'power3.out'
    });
});

gsap.to('.timeline-marker', {
    scrollTrigger: {
        trigger: '.timeline-section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    stagger: {
        each: 0.2,
        repeat: -1,
        repeatDelay: 3
    },
    boxShadow: '0 0 40px rgba(245, 87, 108, 1)',
    duration: 0.8
});

// ==================== REASONS SECTION ANIMATIONS ====================
const reasonCards = gsap.utils.toArray('.reason-card');

gsap.to(reasonCards, {
    scrollTrigger: {
        trigger: '.reasons-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: (index) => index * 0.1,
    opacity: 1,
    y: 0,
    ease: 'back.out',
    stagger: 0.1
});

// Add interactivity to reason cards
reasonCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// ==================== GALLERY SETUP ====================
const imageFolder = 'birthday pictures/';
const imageNames = [
    '14dfa2d9-db7e-4379-bfc6-8bc125932b19.jpg',
    '160d00a8-da8b-455e-8591-e79f8343b768.jpg',
    '1aa60758-5aff-4ace-ab19-74da44c26b09.jpg',
    '20a677b1-e87a-4db1-b5bf-964a73195c9e.jpg',
    '214318e5-ad86-4602-a7e5-59bdc844257a.jpg',
    '2889808c-3f37-45b3-be73-17df46c3ac8c.jpg',
    '2beda293-5733-4337-872e-42920aa7b439.jpg',
    '341b0679-20d6-4245-b64e-13eb05f2d4f3.jpg',
    '355672dc-0a93-4202-8972-dbe5fc675d69.jpg',
    '37a2794a-d739-4720-b2fb-1a9636c3a1e6.jpg',
    '3865354e-aa22-42f9-8439-569c07372122.jpg',
    '3e24ceb3-13c1-4140-af28-9570ae47c24e.jpg',
    '40978d21-10c9-4f64-b792-2b2defc402ff.jpg',
    '59f44b0f-1eab-4f5b-9c51-27c7c451c530.jpg',
    '608904e8-fae4-4a6f-9a97-bb5aa6611e55.jpg',
    '6240c413-6a3d-46f7-963c-f49650e524ef.jpg',
    '64ab7daa-f750-46a7-b847-c0b47f837ed0.jpg',
    '66e6de58-7678-45ac-ae1e-c34f8fee85f7.jpg',
    '6c2660c1-c321-4cc2-bf03-6f638a6e930b.jpg',
    '7470278c-8e36-4b95-bf15-46bdff93e538.jpg',
    '7701a865-0fa6-4c9a-a974-88a9309836e8.jpg',
    '7b4a6fc5-826a-4d6a-90e2-29d1301c6bf3.jpg',
    '7d09ae50-1eea-4035-b902-1897ea8a97f1.jpg',
    '85f98f07-f5d3-4a40-8fba-8c8a2ca4b834.jpg',
    '89b0512a-abcc-4a1e-ba1a-fb73611ee868.jpg',
    '8c73666c-aa33-4ccf-a5aa-c8119f43319e.jpg',
    '8e96df6d-df83-4e4a-95fa-cc26fca55f36.jpg',
    '95d1b11d-90e4-4036-b096-f5892d10a078.jpg',
    '983d5bcf-da1d-47de-959d-cdffb8d397e6.jpg',
    '990e420f-17c3-4787-aa12-545753e4f24d.jpg',
    '991923a3-3508-44d4-babe-f611355e40de.jpg',
    '99e224a9-0c1f-40cf-a61f-222824822c57.jpg',
    '9a23862f-4de1-4376-838d-0a6753a818c2.jpg',
    'a4f17b74-5725-47f1-a80b-ed82b1a0f947.jpg',
    'a536e28a-5108-4ab7-b14b-4f4e2f8b9a2b.jpg',
    'acb2eaf5-ce6f-47ee-a84e-67ce3e15fde9.jpg',
    'af6634bd-8680-4fbd-b91b-8259fb8f8b31.jpg',
    'af7ab78a-5b5d-406b-a9d1-e607c27265c2.jpg',
    'ba418f2e-492c-490e-aff6-c7a4dc0cd7f8.jpg',
    'bdd5570d-7720-4084-b429-90d22c92dcc9.jpg',
    'c0806c72-8ae9-4d3d-9da4-5cd6945aed3f.jpg',
    'c4d671be-e296-4a44-b058-42602ca29465.jpg',
    'c7b09e19-a1c9-49c1-a635-6593c5b2e294.jpg',
    'dc774fb3-a631-4250-a7bc-23f0e173336a.jpg',
    'eb11f8a5-67f5-4725-9039-341f9bd6fd63.jpg',
    'ed4e1fe9-8e29-46a3-8a4c-ec6767d03f11.jpg',
    'eea26009-5b86-49f8-a8bf-a320f1b2552e.jpg',
    'f68dbeea-2622-4534-b636-eede3ac4c33d.jpg',
    'f8e239e7-f18b-44b6-9622-f1797f38d87d.jpg',
    'fe92b4cf-4f55-4171-bc31-cc94387f5a3f.jpg',
    'ff09deb2-f41a-4262-88e8-cce95fe15c91.jpg'
];

const galleryGrid = document.getElementById('galleryGrid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Populate gallery
imageNames.forEach((imageName, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <img src="${imageFolder}${imageName}" alt="Gallery image ${index + 1}" loading="lazy">
        <div class="gallery-overlay">
            <i class="fas fa-search"></i>
        </div>
    `;
    
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = `${imageFolder}${imageName}`;
        gsap.to(modalImage, { duration: 0.3, scale: 1, opacity: 1 });
    });

    galleryGrid.appendChild(item);
});

// Close modal
closeBtn.addEventListener('click', () => {
    gsap.to(modalImage, {
        duration: 0.3,
        scale: 0.8,
        opacity: 0,
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        gsap.to(modalImage, {
            duration: 0.3,
            scale: 0.8,
            opacity: 0,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }
});

// Gallery items animation
gsap.to('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: (index) => index * 0.05,
    opacity: 1,
    y: 0,
    ease: 'back.out',
    stagger: 0.05
});

// ==================== MESSAGE/TYPEWRITER SECTION ====================
const typewriterText = "Happy Birthday, Oluwabusayomi! 🎉\n\nYou deserve all the love, light, and joy in this world.\n\n21 and absolutely unforgettable. 💫";
const typewriterElement = document.getElementById('typewriter');

function typeWriter(text, element, speed = 50) {
    let index = 0;

    element.textContent = '';

    function type() {
        if (index < text.length) {
            if (text[index] === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.textContent += text[index];
            }
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing when section comes into view
    gsap.to(element, {
        scrollTrigger: {
            trigger: '.message-section',
            start: 'top center',
            once: true,
            onEnter: () => {
                type();
            }
        }
    });
}

typeWriter(typewriterText, typewriterElement);

// Message section animations
gsap.to('.message-text-wrapper', {
    scrollTrigger: {
        trigger: '.message-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    opacity: 1,
    scale: 1,
    ease: 'back.out'
});

// ==================== FINALE ANIMATIONS ====================
gsap.to('.finale-title', {
    scrollTrigger: {
        trigger: '.finale-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    opacity: 1,
    scale: 1,
    ease: 'back.out'
});

gsap.to('.finale-subtitle', {
    scrollTrigger: {
        trigger: '.finale-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: 0.2,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
});

gsap.to('.finale-message', {
    scrollTrigger: {
        trigger: '.finale-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: 0.4,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
});

gsap.to('.finale-button', {
    scrollTrigger: {
        trigger: '.finale-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    delay: 0.6,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
});

// Confetti on button click
const celebrateBtn = document.getElementById('celebrateBtn');

celebrateBtn.addEventListener('click', () => {
    // Trigger confetti multiple times
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#667eea', '#764ba2', '#f093fb', '#ff6b6b', '#4ecdc4']
            });
        }, i * 200);
    }

    // Play sound effect if available
    if (isAudioPlaying) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    }

    // Button animation
    gsap.to(celebrateBtn, {
        duration: 0.3,
        scale: 1.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
    });
});

// ==================== PARALLAX SCROLLING ====================
gsap.to('.hero::before', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false
    },
    y: 100
});

gsap.to('.hero::after', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100
});

// ==================== SCROLL ANIMATIONS ====================
// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: 'power3.out'
            });
        }
    });
}, observerOptions);

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.addEventListener('DOMContentLoaded', () => {
    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ==================== LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== FLOATING ANIMATION ====================
gsap.fromTo('.reason-card', 
    { y: 0 },
    {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
    }
);

// ==================== GLOW EFFECT ON HOVER ====================
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: '0 20px 40px rgba(245, 87, 108, 0.6)',
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: 'none',
            ease: 'power2.out'
        });
    });
});

// ==================== PAGE LOAD COMPLETE ====================
console.log('🎉 Birthday website loaded successfully!');
console.log('Click the music icon to enjoy background music! 🎵');
