const ocean = document.getElementById('ocean');

let lastX = 0, lastY = 0;

document.addEventListener('mousemove', (e) => {
    // Generate plankton based on velocity
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const vel = Math.sqrt(dx*dx + dy*dy);
    
    if (vel > 5) {
        createPlankton(e.clientX, e.clientY, vel);
    }
    
    lastX = e.clientX;
    lastY = e.clientY;
});

function createPlankton(x, y, vel) {
    const num = Math.min(5, Math.floor(vel / 10));
    
    for(let i=0; i<num; i++) {
        const p = document.createElement('div');
        p.className = 'plankton';
        
        // Random offset
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        const size = Math.random() * 4 + 1;
        
        p.style.left = \`\${x + offsetX}px\`;
        p.style.top = \`\${y + offsetY}px\`;
        p.style.width = \`\${size}px\`;
        p.style.height = \`\${size}px\`;
        
        ocean.appendChild(p);
        
        // Animate
        const duration = Math.random() * 1000 + 1000;
        
        p.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1)', offset: 0.2 },
            { opacity: 0, transform: \`scale(0) translate(\${(Math.random()-0.5)*50}px, \${(Math.random()-0.5)*50}px)\` }
        ], {
            duration: duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            if(p.parentNode) p.parentNode.removeChild(p);
        }, duration);
    }
}
