const canvas = document.getElementById('sand-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const numParticles = 1000;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

resize();
window.addEventListener('resize', resize);

for(let i=0; i<numParticles; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        origX: Math.random() * width,
        origY: Math.random() * height
    });
}

let mx = width / 2;
let my = height / 2;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = '#111';
    
    for(let i=0; i<numParticles; i++) {
        let p = particles[i];
        
        // Attract to mouse
        let dx = mx - p.x;
        let dy = my - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 300) {
            let force = (300 - dist) / 300;
            p.vx += (dx / dist) * force * 1.5;
            p.vy += (dy / dist) * force * 1.5;
        }
        
        // Return to orig
        let dox = p.origX - p.x;
        let doy = p.origY - p.y;
        p.vx += dox * 0.01;
        p.vy += doy * 0.01;
        
        // Friction
        p.vx *= 0.9;
        p.vy *= 0.9;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.fillRect(p.x, p.y, 2, 2);
    }
    
    requestAnimationFrame(animate);
}

animate();
