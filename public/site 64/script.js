gsap.registerPlugin(ScrollTrigger);

// Custom Cursor & Magnetic Elements
const cursor = document.querySelector('.r-cursor');
const magnetics = document.querySelectorAll('.magnetic');

document.addEventListener('mousemove', (e) => {
    // Very fast snap targeting
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Magnetic Buttons Logic
magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4; // 0.4 controls pull strength
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        
        gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        cursor.classList.add('hover');
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        cursor.classList.remove('hover');
    });
});

// Hero Image Parallax (scrolling)
gsap.to('.image-mask img', {
    scrollTrigger: {
        trigger: ".r-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 100, // Move image down slightly while scrolling down
    ease: "none"
});

// Horizontal Scrolling Section
const hContainer = document.querySelector('.h-scroll-container');
const panels = document.querySelectorAll('.h-panel');

if(hContainer) {
    let scrollWidth = hContainer.scrollWidth - window.innerWidth;
    
    // Pin and scroll horizontally
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hz-scroll",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
        }
    });
    
    tl.to(hContainer, {
        x: () => -scrollWidth,
        ease: "none"
    });

    // Parallax sub-elements within the horizontal panels
    panels.forEach((panel) => {
        const img = panel.querySelector('img');
        const text = panel.querySelector('.p-text');
        
        if(img && text) {
            // Container animation lets us animate child items relative to the horizontal scroll timeline
            gsap.from(img, {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tl,
                    start: "left center", // Trigger when left of panel reaches center of screen
                    toggleActions: "play none none reverse"
                }
            });
            
            gsap.from(text, {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tl,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
}
