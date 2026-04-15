gsap.registerPlugin(ScrollTrigger);

// Minimalist Cursor Logic
const cursor = document.querySelector('.mira-cursor');
const links = document.querySelectorAll('a, button');
const works = document.querySelectorAll('.work-img');

document.addEventListener('mousemove', (e) => {
    // Quick, tight follow for that "technical" feel
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none"
    });
});

links.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

works.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('view'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('view'));
});

// Generative Canvas (Mouse-velocity driven particles, neutral style)
const initGenerative = () => {
    const canvas = document.getElementById('generative-canvas');
    if(!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Resize
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle System
    const particles = [];
    
    class Particle {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.life = 1;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.01;
            this.vx *= 0.95; // friction
            this.vy *= 0.95;
            this.size *= 0.95;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(51, 51, 51, ${this.life})`; // graphite color
            ctx.fill();
        }
    }

    let pMouseX = 0;
    let pMouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
        const vx = e.clientX - pMouseX;
        const vy = e.clientY - pMouseY;
        
        // Generate particles based on velocity
        const speed = Math.sqrt(vx*vx + vy*vy);
        const count = Math.min(speed / 5, 10); // cap it
        
        for(let i=0; i<count; i++) {
            particles.push(new Particle(
                e.clientX + (Math.random() - 0.5) * 20, 
                e.clientY + (Math.random() - 0.5) * 20,
                vx * 0.1 * Math.random(),
                vy * 0.1 * Math.random()
            ));
        }
        
        pMouseX = e.clientX;
        pMouseY = e.clientY;
    });

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear background completely transparent to show through css
        
        for(let i=particles.length-1; i>=0; i--) {
            particles[i].update();
            particles[i].draw();
            if(particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
    }
    animate();
};
initGenerative();

// GSAP Animations
// Image Parallax Reveal
gsap.utils.toArray('.work-img img').forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        yPercent: 15,
        scale: 1.1,
        ease: "none"
    });
});

// Floating Skills Network Effect
const nodes = document.querySelectorAll('.skill-node');

nodes.forEach(node => {
    // Gentle drift animation
    const delay = parseFloat(node.getAttribute('data-delay')) || 0;
    gsap.to(node, {
        y: '+=15',
        x: '+=10',
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: delay
    });
});

// Interactive lines drawn between nodes when hovering the cloud container
const skillsCloud = document.querySelector('.skills-cloud');
if (skillsCloud) {
    // Create an SVG to draw lines
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '-1';
    skillsCloud.appendChild(svg);

    let lines = [];

    skillsCloud.addEventListener('mouseenter', () => {
        // Draw lines between a few close nodes
        const boundsArray = Array.from(nodes).map(n => {
            return {
                node: n,
                x: n.offsetLeft,
                y: n.offsetTop
            }
        });
        
        boundsArray.forEach((b1, i) => {
            boundsArray.forEach((b2, j) => {
                if(i < j) {
                    const dist = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
                    if(dist < 300) { // arbitrary connection distance
                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute('x1', b1.x);
                        line.setAttribute('y1', b1.y);
                        line.setAttribute('x2', b2.x);
                        line.setAttribute('y2', b2.y);
                        line.setAttribute('stroke', 'rgba(255,255,255,0.1)');
                        line.setAttribute('stroke-width', '1');
                        svg.appendChild(line);
                        lines.push({line: line, b1: b1, b2: b2});
                        
                        gsap.from(line, { attr: { x2: b1.x, y2: b1.y }, duration: 0.5, ease: "power2.out" });
                    }
                }
            });
        });
    });

    skillsCloud.addEventListener('mouseleave', () => {
        lines.forEach(l => {
            gsap.to(l.line, { attr: { x2: l.b1.x, y2: l.b1.y }, duration: 0.3, onComplete: () => l.line.remove() });
        });
        lines = [];
    });
}
