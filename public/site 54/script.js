gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.o-cursor');
const interactives = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    // Adding slight lag for organic feel
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Hero Mask Reveal
// On load animation to expand the clip path
window.addEventListener('load', () => {
    const mask = document.querySelector('.img-mask');
    const img = document.querySelector('.img-mask img');
    
    setTimeout(() => {
        // Expand the organic polygon slightly
        mask.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 95% 100%, 0 100%, 0 0)';
        img.style.transform = 'scale(1)';
    }, 500);
});

// Hero Parallax text
gsap.to('.hero-text', {
    scrollTrigger: {
        trigger: ".o-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 150,
    opacity: 0
});

// Villas Section Image Parallax
gsap.to('.img1', {
    scrollTrigger: {
        trigger: ".villas-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: -80
});
gsap.to('.img2', {
    scrollTrigger: {
        trigger: ".villas-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: 50
});

// Text reveal
gsap.from(".v-text > *", {
    scrollTrigger: {
        trigger: ".villas-section",
        start: "top 70%"
    },
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

// Horizontal Scroll logic for Values Section
const horizontalTrack = document.getElementById('horizontal-track');

if(horizontalTrack) {
    // The total width to move is Total Width - 1 Viewport Width
    let scrollWidth = horizontalTrack.scrollWidth - window.innerWidth;

    gsap.to(horizontalTrack, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: ".values-section",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,        // Pin the section while scrolling horizontally
            invalidateOnRefresh: true, // Recalculate on resize
        }
    });

    // Animate content inside panels as they come into view
    const panels = gsap.utils.toArray('.content-panel .cp-inner');
    panels.forEach(panel => {
        // We use ContainerAnimation to trigger based on the horizontal scroll position
        gsap.from(panel, {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: panel.parentElement, // the panel wrapper
                containerAnimation: gsap.getTweensOf(horizontalTrack)[0],
                start: "left center", // when left of panel hits center of screen
                toggleActions: "play none none reverse"
            }
        });
    });
}
