const screen = document.querySelector('.sonar-screen');
const centerX = 400;
const centerY = 400;

const blips = [];
for(let i=0; i<15; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 350;
    
    // We want angle mapped nicely. CSS rotation starts at top (12 o'clock)
    const angleDeg = ((angle + Math.PI/2) * 180 / Math.PI) % 360;
    
    const bx = centerX + radius * Math.cos(angle);
    const by = centerY + radius * Math.sin(angle);
    
    const b = document.createElement('div');
    b.className = 'blip';
    b.style.left = \`\${bx}px\`;
    b.style.top = \`\${by}px\`;
    screen.appendChild(b);
    
    blips.push({ el: b, angle: angleDeg });
}

let startTime = performance.now();

function animate() {
    const now = performance.now();
    // 4s per 360 deg
    const progress = (now % 4000) / 4000;
    const currentAngle = progress * 360;
    
    blips.forEach(b => {
        // Find distance between current arm angle and blip angle
        let diff = currentAngle - b.angle;
        if(diff < 0) diff += 360;
        
        // If arm just passed it (within 10 deg)
        if(diff < 10 && diff >= 0) {
            // Trigger animation cleanly
            b.el.classList.remove('ping');
            void b.el.offsetWidth; // trigger reflow
            b.el.classList.add('ping');
        }
    });
    
    requestAnimationFrame(animate);
}

animate();
