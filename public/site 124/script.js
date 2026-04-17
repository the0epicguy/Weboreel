const glass = document.getElementById('stained-glass');

// Voronoi approximations using clip-path are math-heavy. 
// A simpler robust method: create overlapping triangular div slices mapping the whole screen.
// We'll just define a grid and clip them diagonally to look like shards.

const cols = 5;
const rows = 5;
const w = window.innerWidth / cols;
const h = window.innerHeight / rows;

const shards = [];

for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
        // Tile 1: Top triangle
        const t1 = document.createElement('div');
        t1.className = 'shard';
        t1.style.width = \`\${w}px\`;
        t1.style.height = \`\${h}px\`;
        t1.style.left = \`\${c * w}px\`;
        t1.style.top = \`\${r * h}px\`;
        t1.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
        // tiny gap for lead frame via scaling
        t1.style.transform = 'scale(0.95)'; 
        
        // Tile 2: Bottom triangle
        const t2 = document.createElement('div');
        t2.className = 'shard';
        t2.style.width = \`\${w}px\`;
        t2.style.height = \`\${h}px\`;
        t2.style.left = \`\${c * w}px\`;
        t2.style.top = \`\${r * h}px\`;
        t2.style.clipPath = 'polygon(100% 100%, 100% 0, 0 100%)';
        t2.style.transform = 'scale(0.95)';
        
        glass.appendChild(t1);
        glass.appendChild(t2);
        shards.push(t1, t2);
    }
}

function randomizeColors() {
    shards.forEach(shard => {
        // High saturation vibrant colors
        const hue = Math.random() * 360;
        shard.style.backgroundColor = \`hsla(\${hue}, 80%, 50%, 0.9)\`;
    });
}

// Initial
randomizeColors();

// Click anywhere changes the light
document.addEventListener('click', randomizeColors);
