gsap.registerPlugin(ScrollTrigger);

// SVG filter liquid distortion animation
// We animate the 'scale' property of the feDisplacementMap on hover
const hoverItems = document.querySelectorAll('.distort-hover');
const displacement = document.getElementById('displacement');

hoverItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(displacement, {
            attr: { scale: 30 },
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(displacement, {
            attr: { scale: 5 },
            duration: 0.6,
            ease: "power2.out"
        });
    });
});

// Image entry parallax
gsap.from('.img-blob', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.2
});

gsap.from('.text-blob > *', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
});

// Grid Reveal
gsap.from('.bottle-card', {
    scrollTrigger: {
        trigger: ".curation-section",
        start: "top 70%"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Left to right
    ease: "back.out(1.5)"
});
