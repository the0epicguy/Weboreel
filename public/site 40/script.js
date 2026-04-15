gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Loupe
const cursor = document.querySelector('.cursor-loupe');
const expandItems = document.querySelectorAll('a, button, .product-card, .collection-item');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

expandItems.forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.lumiere-nav');
    if(window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Hero Animation
gsap.from(".hero-img", {
    scale: 1.2,
    duration: 3,
    ease: "power3.out"
});

gsap.from(".fade-up", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power3.out",
    delay: 0.5
});

// Philosophy Parallax Image
gsap.to(".parallax-img img", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".philosophy",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Text reveal for philosophy statement
// Simple split text simulation (since GSAP SplitText is premium)
const philosophyTxt = document.querySelector('.philosophy-statement');
const text = philosophyTxt.innerText;
philosophyTxt.innerHTML = '';
const words = text.split(' ');
words.forEach(word => {
    const span = document.createElement('span');
    span.innerText = word + ' ';
    span.style.opacity = 0;
    span.style.display = "inline-block";
    philosophyTxt.appendChild(span);
});

gsap.to(".philosophy-statement span", {
    scrollTrigger: {
        trigger: ".philosophy",
        start: "top 70%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power2.out"
});

// 3D Parallax Hover for Product Cards
const cards = document.querySelectorAll('.3d-card .card-image-wrap');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Collection Items Parallax
gsap.utils.toArray('.collection-bg').forEach(bg => {
    gsap.to(bg, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});
