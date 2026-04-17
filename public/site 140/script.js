document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const interactiveContainer = document.getElementById('interactive-text');
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const interactiveElements = document.querySelectorAll('.info-block, .nav-bar span, .marquee-inner');

    // Custom Cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Kinetic Typography Parallax/Skew Effect
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;

        glitchTexts.forEach((text, index) => {
            const depth = (index + 1) * 20;
            const skewX = xPos * 20;
            const skewY = yPos * -10;
            const transX = xPos * depth;
            const transY = yPos * depth;
            
            text.style.transform = `translate(${transX}px, ${transY}px) skew(${skewX}deg, ${skewY}deg)`;
        });
    });

    // Add random glitch color
    setInterval(() => {
        const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
        const originalColor = window.getComputedStyle(randomText).color;
        
        if(!randomText.classList.contains('outline')) {
            randomText.style.color = 'var(--accent-color)';
            randomText.style.transform += ` translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            
            setTimeout(() => {
                randomText.style.color = '';
            }, 150);
        }
    }, 2000);
});
