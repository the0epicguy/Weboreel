const heroTitle = document.querySelector('h1');
const blobs = document.querySelectorAll('.blob');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Distort text gently
    const skewX = (x - 0.5) * 20;
    const skewY = (y - 0.5) * 10;
    const scale = 1 + Math.abs(x - 0.5) * 0.2;
    heroTitle.style.setProperty('--skewX', `${skewX}deg`);
    heroTitle.style.setProperty('--skewY', `${skewY}deg`);
    heroTitle.style.setProperty('--scale', scale);

    // Move blobs towards mouse slightly
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.setProperty('--tx', `${e.clientX * speed}px`);
        blob.style.setProperty('--ty', `${e.clientY * speed}px`);
        // Using transform here overriding the animation isn't ideal but gives a chaotic fast response 
        // to mouse over the smooth CSS animation background
    });
});

// Smooth reset on mouse leave window
document.addEventListener('mouseleave', () => {
    heroTitle.style.setProperty('--skewX', '0deg');
    heroTitle.style.setProperty('--skewY', '0deg');
    heroTitle.style.setProperty('--scale', '1');
    blobs.forEach(blob => {
        blob.style.setProperty('--tx', '0px');
        blob.style.setProperty('--ty', '0px');
    });
});
