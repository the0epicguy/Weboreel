gsap.registerPlugin(ScrollTrigger);

// Custom Star Trail Canvas Cursor
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
const mouse = { x: width/2, y: height/2 };

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Create new star particle on mouse move
    if(Math.random() > 0.4) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.accX = (Math.random() - 0.5) * 2;
        this.accY = (Math.random() - 0.5) * 2 + 1; // fall downwards
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
        
        // Random pastel colors
        const colors = ['#FFD166', '#EF476F', '#118AB2', '#fff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.accX;
        this.y += this.accY;
        this.life -= this.decay;
        this.size *= 0.95; // shrink
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        
        // Draw simple 4-point star
        ctx.beginPath();
        for(let i=0; i<4; i++) {
            ctx.lineTo(0, -this.size);
            ctx.rotate(Math.PI / 4);
            ctx.lineTo(0, -this.size/3);
            ctx.rotate(Math.PI / 4);
        }
        ctx.fill();
        ctx.restore();
    }
}

function animateTrail() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
    }
    
    requestAnimationFrame(animateTrail);
}
animateTrail();


// Storybook Pinned Scroll Logic
// We will pin the main 'storybook' container, and animate pages rising up
const pages = document.querySelectorAll('.story-page');

pages.forEach((page, index) => {
    // Elastic Pop In for content inside the page
    const content = page.querySelector('.pop-in');
    if(content) {
        gsap.from(content, {
            scrollTrigger: {
                trigger: page,
                start: "top 60%"
            },
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.4)" // Bouncy kid-friendly easing
        });
    }
    
    // Parallax overlap effect between pages
    if (index > 0) {
        gsap.fromTo(page, 
            { y: "50%" },
            {
                y: "0%",
                scrollTrigger: {
                    trigger: page,
                    start: "top bottom",
                    end: "top top",
                    scrub: true
                }
            }
        );
    }
});
