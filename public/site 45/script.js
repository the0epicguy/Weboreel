gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor-plate');
const interactives = document.querySelectorAll('button, a, .tab-btn');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Menu Tabs Logic
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// 3D Parallax Hover for Dish Image
const parallaxContainer = document.querySelector('.parallax-dish');
if(parallaxContainer) {
    const layer = parallaxContainer.querySelector('img');
    const info = parallaxContainer.querySelector('.parallax-info');
    
    parallaxContainer.addEventListener('mousemove', (e) => {
        const rect = parallaxContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Move image slightly
        gsap.to(layer, {
            x: x * -50,
            y: y * -50,
            duration: 0.5
        });
        
        // Move info box slightly opposite direction
        gsap.to(info, {
            x: x * 30,
            y: y * 30,
            duration: 0.5
        });
    });
    
    parallaxContainer.addEventListener('mouseleave', () => {
        gsap.to(layer, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
        gsap.to(info, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
    });
}

// Emulate split screen text scroll fade-ins
const textBlocks = document.querySelectorAll('.text-block');
textBlocks.forEach(block => {
    gsap.from(block, {
        scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true
        },
        opacity: 0.2,
        y: 50
    });
});
