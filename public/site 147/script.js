document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('blob-cursor');
    const hoverTargets = document.querySelectorAll('.hover-target');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Smooth following
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Linear interpolation for smooth delay
        let easing = 0.15;
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;

        cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;

        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Hover effects
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
});
