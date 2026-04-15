gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.kroma-cursor');
const interactives = document.querySelectorAll('a, button, .art-piece');

document.addEventListener('mousemove', (e) => {
    // Ultra snapping, low lag for brutalist feel
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Title Parallax
gsap.to('.hero-title-container', {
    scrollTrigger: {
        trigger: ".kr-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 200,
    opacity: 0
});

// Gallery Image Parallax
gsap.utils.toArray('.img-container img').forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 80, // Subdued parallax
        ease: "none"
    });
});

// Text reveal on scroll
gsap.utils.toArray('.art-meta').forEach(meta => {
    gsap.from(meta, {
        scrollTrigger: {
            trigger: meta.parentElement,
            start: "top 80%"
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Manifesto reveal
const textSplit = document.querySelector('.kr-manifesto h2');
if(textSplit) {
    // Simple block reveal
    gsap.from(textSplit, {
        scrollTrigger: {
            trigger: ".kr-manifesto",
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    });
}
