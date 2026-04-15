gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.v-cursor');
const interactives = document.querySelectorAll('a, button, .img-block');

// Custom smooth mouse follower
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function tick() {
    // Lerp formulation for very smooth "heavy" luxury cursor movement
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.transform = `translate(-50%, -50%) translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(tick);
}
tick();

interactives.forEach(el => {
    // Add hover state only for images, for links keep it small
    if(el.classList.contains('img-block')) {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    } else {
        // For links just scale it slightly
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    }
});

// Nav scroll effect
const nav = document.querySelector('.velvet-nav');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Parallax Hero Image
gsap.to('.hero-image-wrap', {
    scrollTrigger: {
        trigger: ".v-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: "none"
});

// Reveal Triggers for Intro Text
gsap.from(".intro-content h2", {
    scrollTrigger: {
        trigger: ".v-intro",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

// Gallery Image Parallax Effect (using data-y attribute)
const parallaxImages = document.querySelectorAll('.parallax');
parallaxImages.forEach(img => {
    const yVal = img.getAttribute('data-y');
    gsap.to(img, {
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 // smooth scrubbing
        },
        y: yVal,
        ease: "none"
    });
});

// Image Scale Reveal
gsap.utils.toArray('.img-block img').forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top 90%",
        },
        scale: 1.2,
        duration: 1.5,
        ease: "power2.out"
    });
});

// Details text animation
gsap.from(".d-text", {
    scrollTrigger: {
        trigger: ".v-details",
        start: "top 70%"
    },
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});
