gsap.registerPlugin(ScrollTrigger);

// Loading Animation
const tlLoad = gsap.timeline();
tlLoad.to('.loading-overlay h2', { opacity: 1, duration: 1, y: -20, ease: "power2.out" })
      .to('.loading-overlay h2', { opacity: 0, duration: 1, delay: 0.5 })
      .to('.loading-overlay', { height: 0, duration: 1, ease: "expo.inOut" })
      .from('.h-image', { scale: 0.8, opacity: 0, duration: 1.5, ease: "expo.out" }, "-=0.5")
      .from('.h-text h1', { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=1");

// Organic Cursor
const cursor = document.querySelector('.y-cursor');
const interactives = document.querySelectorAll('a, button');
const dragAreas = document.querySelectorAll('.interact-img');

document.addEventListener('mousemove', (e) => {
    // Smoothed organic following
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power3.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

dragAreas.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('drag'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('drag'));
});

// Image Parallax within Hero
gsap.to('.h-image img', {
    scrollTrigger: {
        trigger: ".y-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 150,
    ease: "none"
});

// Horizontal Panning section
const panContainer = document.querySelector('.pan-container');
if(panContainer) {
    let scrollWidth = panContainer.scrollWidth - window.innerWidth;
    
    gsap.to(panContainer, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-pan",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
        }
    });
    
    // Parallax effect on cards within horizontal scroll
    gsap.utils.toArray('.y-card').forEach((card, i) => {
        gsap.to(card, {
            y: (i % 2 === 0) ? -50 : 50, // stagger movement up and down
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-pan",
                start: "top top",
                end: () => `+=${scrollWidth}`,
                scrub: true
            }
        });
    });
}

// Text Reveal Details
gsap.from('.d-text > *', {
    scrollTrigger: {
        trigger: ".y-details",
        start: "top 70%"
    },
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

// Mask Image Interaction (Drag simulation via mousemove on img)
const interactImg = document.querySelector('.interact-img');
if(interactImg) {
    interactImg.addEventListener('mousemove', (e) => {
        const rect = interactImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        // Shift border radius dynamically based on mouse X position
        const percentage = (x / rect.width) * 100;
        gsap.to(interactImg, {
            borderRadius: `${percentage}% 20px 20px ${100 - percentage}%`,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    interactImg.addEventListener('mouseleave', () => {
        gsap.to(interactImg, {
            borderRadius: "200px 20px 20px 200px",
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    });
}
