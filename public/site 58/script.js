gsap.registerPlugin(ScrollTrigger);

// Custom Aggressive Cursor
const cursor = document.querySelector('.k-cursor');
const interactives = document.querySelectorAll('a, button, .p-card');

document.addEventListener('mousemove', (e) => {
    // Immediate snap follow
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Kinetic text scroll effect (Hero)
gsap.to('.kinetic-text', {
    scrollTrigger: {
        trigger: ".k-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    x: -300,
    opacity: 0
});

// Product Card Stagger Reveal
gsap.from('.p-card', {
    scrollTrigger: {
        trigger: ".products-section",
        start: "top 70%"
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // Stagger effect
    ease: "back.out(1.5)" // Fast snap easing
});

// Parallax for Action Section
gsap.to('.parallax img', {
    scrollTrigger: {
        trigger: ".action-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: 150,
    ease: "none"
});

// Heavy title reveal
gsap.from('.a-content h2', {
    scrollTrigger: {
        trigger: ".action-section",
        start: "top 60%"
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(2)" // Aggressive pop
});
