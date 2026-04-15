gsap.registerPlugin(ScrollTrigger);

// Mouse Glow effect
const mouseGlow = document.querySelector('.mouse-glow');
document.addEventListener('mousemove', (e) => {
    // We use standard updating here instead of GSAP to avoid lag over native UI feel
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Interactive Ambient Lighting (Change Background Gradient)
const colorBtns = document.querySelectorAll('.color-btn');
const dynamicBg = document.getElementById('dynamic-bg');

colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Get colors from data attribute
        const colors = btn.getAttribute('data-color');
        
        // Update background
        dynamicBg.style.background = `linear-gradient(-45deg, ${colors})`;
        dynamicBg.style.backgroundSize = '400% 400%';
    });
});

// Simulated UI Interactions in Mockups
const uiItems = document.querySelectorAll('.ui-item');
uiItems.forEach(item => {
    item.addEventListener('click', () => {
        uiItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Interactive Slider Mockup logic
const sliderTrack = document.querySelector('.slider-track');
const sliderFill = document.querySelector('.slider-fill');
const sliderThumb = document.querySelector('.slider-thumb');
const tempDisplay = document.querySelector('.temp-display');

let isDragging = false;

if(sliderTrack) {
    sliderTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e);
    });

    document.addEventListener('mousemove', (e) => {
        if(isDragging) updateSlider(e);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function updateSlider(e) {
    const rect = sliderTrack.getBoundingClientRect();
    let x = e.clientX - rect.left;
    
    // Clamp
    if(x < 0) x = 0;
    if(x > rect.width) x = rect.width;
    
    const percentage = (x / rect.width) * 100;
    
    sliderFill.style.width = percentage + '%';
    sliderThumb.style.left = percentage + '%';
    
    // Map percentage to temp (16C to 30C)
    const temp = Math.round(16 + (percentage / 100) * 14);
    tempDisplay.innerHTML = `${temp}&deg;`;
}

// Reveal Animations on scroll
gsap.utils.toArray('.reveal-up').forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

gsap.from(".exp-content", {
    scrollTrigger: {
        trigger: ".experience-section",
        start: "top 70%"
    },
    scale: 0.95,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
});
