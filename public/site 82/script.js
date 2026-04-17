const space = document.getElementById('space');
const numParticles = 60;
const particles = [];

for(let i = 0; i < numParticles; i++) {
    let p = document.createElement('div');
    p.className = 'dust';
    
    // Randomize properties
    let size = Math.random() * 150 + 10;
    let x = (Math.random() - 0.5) * window.innerWidth * 2;
    let y = (Math.random() - 0.5) * window.innerHeight * 2;
    let z = (Math.random() - 0.5) * 2000;
    
    p.style.width = \`\${size}px\`;
    p.style.height = \`\${size}px\`;
    
    // To simulate depth of field, adjust blur based on Z
    // Z near 0 = in focus. Z far away = blurry.
    let blurAmt = Math.min(20, Math.abs(z) / 50);
    p.style.filter = \`blur(\${blurAmt}px)\`;
    
    space.appendChild(p);
    
    particles.push({
        el: p,
        x: x,
        y: y,
        z: z,
        size: size,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        speedZ: (Math.random() - 0.5) * 5
    });
}

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth/2) * 0.1;
    mouseY = (e.clientY - window.innerHeight/2) * 0.1;
});

function animate() {
    // Parallax effect on the whole space
    space.style.transform = \`translate(-50%, -50%) rotateY(\${mouseX}deg) rotateX(\${-mouseY}deg)\`;
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;
        
        // Loop back
        if (p.z > 1000) p.z = -2000;
        if (p.z < -2000) p.z = 1000;
        
        let blurAmt = Math.min(20, Math.abs(p.z) / 50);
        p.el.style.filter = \`blur(\${blurAmt}px)\`;
        p.el.style.transform = \`translate3d(\${p.x}px, \${p.y}px, \${p.z}px)\`;
    });
    
    requestAnimationFrame(animate);
}

animate();
