document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.neon-text');
    const speedEl = document.getElementById('speed');

    // Interactive Title pseudo-3D
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        title.style.transform = `skewX(-10deg) rotateZ(2deg) translate(${x}px, ${y}px)`;
    });

    // Speedometer simulation
    let speed = 88;
    setInterval(() => {
        speed += Math.floor(Math.random() * 5) - 2;
        if(speed < 70) speed = 70;
        if(speed > 120) speed = 120;
        speedEl.textContent = speed + ' MPH';

        // Change grid animation speed based on speed
        const grid = document.querySelector('.grid');
        const animDuration = 100 / speed;
        grid.style.animationDuration = `${animDuration}s`;

    }, 500);
});
