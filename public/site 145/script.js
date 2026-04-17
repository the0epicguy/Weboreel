const canvas = document.getElementById('orb-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
// Mouse tracking
let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function(){ 
    mouse.x = null;
    mouse.y = null;
});

// Implode on click
let isImploding = false;
window.addEventListener('mousedown', () => { isImploding = true; });
window.addEventListener('mouseup', () => { isImploding = false; });
window.addEventListener('touchstart', () => { isImploding = true; });
window.addEventListener('touchend', () => { isImploding = false; });

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x + (Math.random() * 200 - 100); // Start slightly dispersed
        this.y = y + (Math.random() * 200 - 100);
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        
        // Random color slightly off-white
        const hue = Math.random() * 40 + 200; // Blueish
        this.color = `hsl(${hue}, 100%, ${Math.random() * 50 + 50}%)`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (isImploding) {
            // Implode: move rapidly towards center (baseX, baseY)
            this.x -= (this.x - window.innerWidth/2) * 0.1;
            this.y -= (this.y - window.innerHeight/2) * 0.1;
        } else if (distance < mouse.radius) {
            // Scatter from mouse
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Return to sphere formation slowly
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/20;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/20;
            }
        }
    }
}

function init() {
    particlesArray = [];
    const numParticles = 4000;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create particles in a spherical distribution
    for (let i = 0; i < numParticles; i++) {
        // use spherical coordinates roughly mapped to 2D
        const r = 200 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trailing effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
