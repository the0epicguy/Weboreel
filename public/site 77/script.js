const shapes = document.querySelectorAll('.shape');
const texts = document.querySelectorAll('h1, h2, h3');

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        // Random chaotic movement
        const speed = (index + 1) * 20;
        const x = (mx - 0.5) * speed;
        const y = (my - 0.5) * speed;
        const rot = (mx * my) * 360 * (index % 2 === 0 ? 1 : -1);
        
        // We use string replacement to try and keep existing transforms like skew or rotate if possible, 
        // but for chaos overriding is fine too.
        shape.style.transform = \`translate(\${x}px, \${y}px) rotate(\${rot}deg)\`;
    });
    
    texts.forEach((text, index) => {
        const x = (0.5 - mx) * 50 * (index + 1);
        const y = (0.5 - my) * 50 * (index + 1);
        
        // Keep initial rotations by appending to them
        let initRot = 0;
        if(index === 0) initRot = -15;
        if(index === 1) initRot = 5;
        if(index === 2) initRot = 180;
        
        text.style.transform = \`translate(\${x}px, \${y}px) rotate(\${initRot}deg)\`;
    });
});
