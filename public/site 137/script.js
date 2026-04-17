const electron = document.querySelector('.electron');
const nucleusX = window.innerWidth / 2;
const nucleusY = window.innerHeight / 2;

let angle = 0;
let quantumState = false;

document.addEventListener('mousemove', (e) => {
    const dist = Math.sqrt(Math.pow(e.clientX - nucleusX, 2) + Math.pow(e.clientY - nucleusY, 2));
    
    if (dist < 150) {
        quantumState = true;
    } else {
        quantumState = false;
    }
});

function animate() {
    if (!quantumState) {
        // Standard Bohr orbit
        angle += 0.05;
        const radius = 200;
        const x = nucleusX + Math.cos(angle) * radius;
        const y = nucleusY + Math.sin(angle) * Math.cos(angle) * parseInt(radius * 0.5) + Math.sin(angle) * radius; // slight elliptical
        
        electron.style.transform = \`translate(calc(-50% + \${x - nucleusX}px), calc(-50% + \${y - nucleusY}px))\`;
        electron.style.opacity = 1;
    } else {
        // Quantum probability cloud tunneling
        // It flickers instantly between locations
        const radius = Math.random() * 300;
        const randAngle = Math.random() * Math.PI * 2;
        
        const x = nucleusX + Math.cos(randAngle) * radius;
        const y = nucleusY + Math.sin(randAngle) * radius;
        
        electron.style.transform = \`translate(calc(-50% + \${x - nucleusX}px), calc(-50% + \${y - nucleusY}px))\`;
        electron.style.opacity = Math.random() > 0.5 ? 1 : 0.2;
    }
    
    // speed up update rate drastically if in quantum state
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, quantumState ? 50 : 16);
}

animate();
