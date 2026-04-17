const chars = [];

document.addEventListener('keydown', (e) => {
    // Only alphabet or numbers
    if (e.key.length !== 1) return;
    
    // Hide prompt
    document.querySelector('.prompt').style.opacity = '0';
    
    const el = document.createElement('div');
    el.className = 'kinetic-char';
    el.innerText = e.key;
    
    // Start at center
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    el.style.left = \`\${x}px\`;
    el.style.top = \`\${y}px\`;
    
    document.body.appendChild(el);
    
    // Give random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 15 + 10;
    
    chars.push({
        el: el,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: 0,
        vRot: (Math.random() - 0.5) * 20
    });
});

function physicsLoop() {
    chars.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        c.rot += c.vRot;
        
        // Bounce off walls
        const rect = c.el.getBoundingClientRect();
        if(c.x <= 0 || c.x + rect.width >= window.innerWidth) {
            c.vx *= -1;
            c.vRot *= -1;
            c.x = c.x <= 0 ? 1 : window.innerWidth - rect.width - 1;
        }
        if(c.y <= 0 || c.y + rect.height >= window.innerHeight) {
            c.vy *= -1;
            c.vRot *= -1;
            c.y = c.y <= 0 ? 1 : window.innerHeight - rect.height - 1;
        }
        
        c.el.style.transform = \`translate(0, 0) rotate(\${c.rot}deg)\`;
        c.el.style.left = \`\${c.x}px\`;
        c.el.style.top = \`\${c.y}px\`;
    });
    
    requestAnimationFrame(physicsLoop);
}

physicsLoop();
