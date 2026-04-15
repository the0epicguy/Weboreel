gsap.registerPlugin(ScrollTrigger);

// Mechanical Cursor
const cursor = document.querySelector('.a-cursor');
const interactives = document.querySelectorAll('a, button, .point-hover');

document.addEventListener('mousemove', (e) => {
    // Sharp, zero-lag tracking for industrial feel
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Record Spinning Logic via Scroll
const record = document.getElementById('spin-record');
const toneArm = document.getElementById('tone-arm');

// On load, move tonearm onto the record
setTimeout(() => {
    toneArm.style.transform = "rotate(30deg)";
}, 1000);

// GSAP ScrollTrigger to spin the record continuously as user scrolls down
gsap.to(record, {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5 // Adds inertia to the spin
    },
    rotation: 1440, // 4 full rotations over the entire page length
    ease: "none"
});

// Subtle Parallax for the radial grid in the process section
gsap.to('.radial-grid', {
    scrollTrigger: {
        trigger: ".ae-process",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: 100,
    ease: "none"
});

// Staggered reveal for radial items
gsap.from('.r-item', {
    scrollTrigger: {
        trigger: ".radial-grid",
        start: "top 60%"
    },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.3,
    ease: "back.out(1.5)"
});
