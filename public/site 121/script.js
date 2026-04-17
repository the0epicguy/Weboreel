const path = document.getElementById('jelly-path');

const numPoints = 8;
const points = [];
const radius = 100;
const originX = 200;
const originY = 200;

for(let i=0; i<numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    points.push({
        baseX: originX + Math.cos(angle) * radius,
        baseY: originY + Math.sin(angle) * radius,
        x: originX + Math.cos(angle) * radius,
        y: originY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0
    });
}

let mx = 0, my = 0;
document.addEventListener('mousemove', (e) => {
    // Canvas is centered. We need to map mouse coords to svg coords
    const rect = document.getElementById('jelly-svg').getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
});

function drawJelly() {
    // Physics
    points.forEach(p => {
        // Return to base
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.05; // spring force
        p.vy += dyBase * 0.05;
        
        // Repel from mouse
        const dxMouse = mx - p.x;
        const dyMouse = my - p.y;
        const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
        
        if (distMouse < 80) {
            const force = (80 - distMouse) / 80;
            p.vx -= (dxMouse / distMouse) * force * 10;
            p.vy -= (dyMouse / distMouse) * force * 10;
        }
        
        p.vx *= 0.8; // friction
        p.vy *= 0.8;
        
        p.x += p.vx;
        p.y += p.vy;
    });
    
    // Draw smooth curve through points
    let d = \`M \${points[0].x} \${points[0].y}\`;
    
    for(let i=0; i<=numPoints; i++) {
        const curr = points[i % numPoints];
        const next = points[(i+1) % numPoints];
        
        const xc = (curr.x + next.x) / 2;
        const yc = (curr.y + next.y) / 2;
        
        d += \` Q \${curr.x} \${curr.y}, \${xc} \${yc}\`;
    }
    
    path.setAttribute('d', d);
    requestAnimationFrame(drawJelly);
}

drawJelly();
