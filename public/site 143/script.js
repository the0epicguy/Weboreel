const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
const nodeCountEl = document.getElementById('node-count');
const linkCountEl = document.getElementById('link-count');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null, radius: 250 };

// Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Mouse tracking
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    draw() {
        ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction (repel slightly)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = (forceDirectionX * force * this.density) * -0.1;
                const directionY = (forceDirectionY * force * this.density) * -0.1;
                
                this.x += directionX;
                this.y += directionY;
            }
        }
    }
}

function init() {
    particles = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
    nodeCountEl.textContent = particles.length.toString().padStart(3, '0');
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let links = 0;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Connection Logic
            if (distance < 120) {
                ctx.beginPath();
                
                // If near mouse, highlight the connection
                let isNearMouse = false;
                if(mouse.x != null) {
                    let mdx = mouse.x - particles[i].x;
                    let mdy = mouse.y - particles[i].y;
                    let mDist = Math.sqrt(mdx*mdx + mdy*mdy);
                    if(mDist < mouse.radius * 0.8) isNearMouse = true;
                }

                if(isNearMouse) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${1 - (distance/120)})`;
                    ctx.lineWidth = 1.5;
                } else {
                    ctx.strokeStyle = `rgba(250, 250, 250, ${(1 - (distance/120)) * 0.2})`;
                    ctx.lineWidth = 1;
                }

                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                links++;
            }
        }
    }
    linkCountEl.textContent = links.toString().padStart(4, '0');
    requestAnimationFrame(animate);
}

init();
animate();
