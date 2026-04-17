const target = document.getElementById('target');
const fragContainer = document.getElementById('fragments');

let isShattered = false;

target.addEventListener('click', (e) => {
    if(isShattered) return;
    isShattered = true;
    
    // Hide target
    target.style.display = 'none';
    
    const rect = target.getBoundingClientRect();
    const targetX = rect.left;
    const targetY = rect.top;
    
    // Create random triangle fragments using clip-path
    const numFrags = 40;
    const fragments = [];
    
    for(let i=0; i<numFrags; i++) {
        const frag = document.createElement('div');
        frag.className = 'frag';
        
        // Size it roughly size of target
        frag.style.width = '200px';
        frag.style.height = '200px';
        frag.style.left = \`\${targetX}px\`;
        frag.style.top = \`\${targetY}px\`;
        
        // Random triangle coords
        const p1x = Math.random() * 100; const p1y = Math.random() * 100;
        const p2x = Math.random() * 100; const p2y = Math.random() * 100;
        const p3x = Math.random() * 100; const p3y = Math.random() * 100;
        
        frag.style.clipPath = \`polygon(\${p1x}% \${p1y}%, \${p2x}% \${p2y}%, \${p3x}% \${p3y}%)\`;
        
        fragContainer.appendChild(frag);
        
        // Physics props
        fragments.push({
            el: frag,
            x: targetX,
            y: targetY,
            vx: (Math.random() - 0.5) * 30, // explosion velocity X
            vy: (Math.random() - 0.5) * 30, // explosion velocity Y
            rot: 0,
            vRot: (Math.random() - 0.5) * 20
        });
    }
    
    function physicsLoop() {
        let active = false;
        const gravity = 0.8;
        
        fragments.forEach(f => {
            if(f.y < window.innerHeight + 200) {
                active = true;
                f.vy += gravity; // Gravity pull
                f.x += f.vx;
                f.y += f.vy;
                f.rot += f.vRot;
                f.el.style.transform = \`translate(\${f.x - targetX}px, \${f.y - targetY}px) rotate(\${f.rot}deg)\`;
            }
        });
        
        if(active) {
            requestAnimationFrame(physicsLoop);
        } else {
            // Reset after pieces fall off
            setTimeout(() => {
                fragContainer.innerHTML = '';
                target.style.display = 'block';
                isShattered = false;
            }, 1000);
        }
    }
    
    physicsLoop();
});
