const svg = document.getElementById('plasma-svg');
const coreX = window.innerWidth / 2;
const coreY = window.innerHeight / 2;

let mx = coreX;
let my = coreY - 200;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
});

// We create a few tendrils. One tracks the mouse if close, others just wander to the edges
const numTendrils = 8;
const tendrils = [];

for(let i=0; i<numTendrils; i++) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.appendChild(p);
    tendrils.push({
        el: p,
        angle: (i / numTendrils) * Math.PI * 2,
        length: 300 + Math.random() * 200
    });
}

function updatePlasma() {
    tendrils.forEach((t, index) => {
        // Build a jagged path from core to end
        let startX = coreX;
        let startY = coreY;
        
        let endX, endY;
        
        // Let one or two tendrils track the mouse heavily
        if(index === 0 || index === 1) {
            endX = mx + (Math.random() - 0.5) * 50;
            endY = my + (Math.random() - 0.5) * 50;
        } else {
            // Random twitchy movement on the perimeter
            t.angle += (Math.random() - 0.5) * 0.1;
            endX = coreX + Math.cos(t.angle) * t.length;
            endY = coreY + Math.sin(t.angle) * t.length;
        }
        
        // Create 4-5 intermediate jagged points
        let d = \`M \${startX} \${startY}\`;
        
        const segments = 5;
        for(let j=1; j<=segments; j++) {
            const pct = j / segments;
            const targetX = startX + (endX - startX) * pct;
            const targetY = startY + (endY - startY) * pct;
            
            // Add jitter
            const jitterX = (Math.random() - 0.5) * 40;
            const jitterY = (Math.random() - 0.5) * 40;
            
            if(j === segments) {
                d += \` L \${endX} \${endY}\`;
            } else {
                d += \` L \${targetX + jitterX} \${targetY + jitterY}\`;
            }
        }
        
        t.el.setAttribute('d', d);
        // Random opacity flicker
        t.el.style.opacity = 0.5 + Math.random() * 0.5;
    });
    
    // Needs to be fast to look like electricity
    setTimeout(() => {
        requestAnimationFrame(updatePlasma);
    }, 50);
}

updatePlasma();
