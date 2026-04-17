const svg = document.getElementById('mandala');
const cx = window.innerWidth / 2;
const cy = window.innerHeight / 2;

// Generate mandala
const petals = 24;
const layers = 5;
const baseRadius = 50;

for(let l=1; l<=layers; l++) {
    const radius = baseRadius * l;
    
    // Create a group for the layer
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.classList.add(\`layer-\${l}\`);
    g.style.transformOrigin = \`\${cx}px \${cy}px\`;
    
    for(let i=0; i<petals; i++) {
        const angle = (Math.PI * 2 / petals) * i;
        
        // Simple leaf-like path
        const d = \`M \${cx} \${cy} 
                   Q \${cx + radius * Math.cos(angle - 0.2)} \${cy + radius * Math.sin(angle - 0.2)} 
                     \${cx + radius * 1.5 * Math.cos(angle)} \${cy + radius * 1.5 * Math.sin(angle)} 
                   Q \${cx + radius * Math.cos(angle + 0.2)} \${cy + radius * Math.sin(angle + 0.2)} 
                     \${cx} \${cy}\`;
                     
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', d);
        // color variation based on layer
        const hue = (l * 40 + i * 5) % 360;
        path.style.stroke = \`hsl(\${hue}, 80%, 60%)\`;
        
        g.appendChild(path);
    }
    
    svg.appendChild(g);
}

// Interaction
let targetRots = new Array(layers + 1).fill(0);
let currentRots = new Array(layers + 1).fill(0);

document.addEventListener('mousemove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    
    // Layers rotate differently based on mouse x
    for(let l=1; l<=layers; l++) {
        targetRots[l] = nx * 360 * (l % 2 === 0 ? 1 : -1) * (l * 0.5);
    }
});

function animate() {
    for(let l=1; l<=layers; l++) {
        currentRots[l] += (targetRots[l] - currentRots[l]) * 0.05;
        const g = document.querySelector(\`.layer-\${l}\`);
        if(g) {
            g.style.transform = \`rotate(\${currentRots[l]}deg)\`;
        }
    }
    
    requestAnimationFrame(animate);
}

animate();
