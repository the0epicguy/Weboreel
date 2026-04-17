const container = document.getElementById('pillars-container');
const light = document.querySelector('.light-source');

const pillars = [];
for(let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.className = 'pillar';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    p.style.left = \`\${x}px\`;
    p.style.top = \`\${y}px\`;
    
    container.appendChild(p);
    pillars.push({ el: p, x, y });
}

document.addEventListener('mousemove', (e) => {
    const lx = e.clientX;
    const ly = e.clientY;
    
    light.style.left = \`\${lx}px\`;
    light.style.top = \`\${ly}px\`;
    
    container.style.setProperty('--lx', \`\${lx}px\`);
    container.style.setProperty('--ly', \`\${ly}px\`);
    
    // Calculate shadows
    pillars.forEach(p => {
        const dx = p.x - lx;
        const dy = p.y - ly;
        
        // Length of shadow dictates by proximity (closer = shorter, technically... wait. Light above means closer = shorter. Light far = longer.)
        // Distances:
        const dist = Math.max(1, Math.sqrt(dx*dx + dy*dy));
        
        // Multiplier to stretch shadow
        const shadowLength = dist * 0.8;
        const shadowMax = 400; // max cast distance
        
        const sx = (dx / dist) * Math.min(shadowLength, shadowMax);
        const sy = (dy / dist) * Math.min(shadowLength, shadowMax);
        
        // To make it look like a solid volumetric shadow block, we use multiple layers of box-shadow
        let shadowCSS = '';
        const steps = 15;
        for(let i=1; i<=steps; i++) {
            const stepX = (sx / steps) * i;
            const stepY = (sy / steps) * i;
            // Farther steps are softer and darker
            const blur = i * 2;
            const opacity = 1 - (i / steps);
            shadowCSS += \`\${stepX}px \${stepY}px \${blur}px rgba(0,0,0,\${opacity * 0.9})\`;
            if(i < steps) shadowCSS += ', ';
        }
        
        p.el.style.boxShadow = shadowCSS;
    });
});
