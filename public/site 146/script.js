const container = document.getElementById('canvas-container');

// A simple physics simulation without matter.js
let shapes = [];
const gravity = 0.5;
const friction = 0.99;
const bounce = 0.7;

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 50 + 20;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 10 - 10;
        this.rotation = Math.random() * 360;
        this.vRot = (Math.random() - 0.5) * 10;
        
        // 0: circle, 1: square, 2: triangle
        this.type = Math.floor(Math.random() * 3);
        
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        
        if (this.type === 0) {
            // Circle
            this.el.style.width = this.size + 'px';
            this.el.style.height = this.size + 'px';
            this.el.style.borderRadius = '50%';
            this.el.style.border = '2px solid var(--text)';
            
            if(Math.random() > 0.5) {
                this.el.style.backgroundColor = 'var(--text)';
            }
        } else if (this.type === 1) {
            // Square
            this.el.style.width = this.size + 'px';
            this.el.style.height = this.size + 'px';
            this.el.style.border = '2px solid var(--text)';
            
            if(Math.random() > 0.5) {
                this.el.style.backgroundColor = 'var(--text)';
            }
        } else {
            // Triangle
            this.el.style.width = '0';
            this.el.style.height = '0';
            this.el.style.borderLeft = (this.size/2) + 'px solid transparent';
            this.el.style.borderRight = (this.size/2) + 'px solid transparent';
            this.el.style.borderBottom = this.size + 'px solid var(--text)';
            
            // Cannot easily have empty triangle with borders via CSS borders cleanly in this setup, 
            // so we make it solid
        }
        
        container.appendChild(this.el);
    }

    update() {
        this.vy += gravity;
        this.vx *= friction;
        this.vy *= friction;
        
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vRot;

        // Floor collision
        if (this.y + this.size > window.innerHeight) {
            this.y = window.innerHeight - this.size;
            this.vy *= -bounce;
            this.vx *= 0.9; // floor friction
            this.vRot *= 0.9;
        }

        // Left/Right collisions
        if (this.x < 0) {
            this.x = 0;
            this.vx *= -bounce;
        } else if (this.x + this.size > window.innerWidth) {
            this.x = window.innerWidth - this.size;
            this.vx *= -bounce;
        }

        this.draw();
    }

    draw() {
        // Adjust for center of shape based on definition
        let offsetX = this.size / 2;
        let offsetY = this.size / 2;
        if(this.type === 2) {
             offsetY = this.size / 2; // Approximation for triangle
        }

        this.el.style.transform = `translate(${this.x - offsetX}px, ${this.y - offsetY}px) rotate(${this.rotation}deg)`;
    }
}

container.addEventListener('click', (e) => {
    // Spawn 1 to 3 shapes on click
    const count = Math.floor(Math.random() * 3) + 1;
    for(let i=0; i<count; i++) {
        shapes.push(new Shape(e.clientX, e.clientY));
    }
});

// Periodic cleanup if shapes become too numerous or inactive
setInterval(() => {
    if(shapes.length > 200) {
        let oldShape = shapes.shift();
        container.removeChild(oldShape.el);
    }
}, 100);

function animate() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
