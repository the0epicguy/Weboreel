const grid = document.getElementById('tess-grid');
const size = 100;
const cols = Math.ceil(window.innerWidth / size) + 2;
const rows = Math.ceil(window.innerHeight / size) + 2;

let html = '';
for(let i=0; i < cols * rows; i++) {
    // Random initial rotation
    const rots = ['', 'rot-90', 'rot-180', 'rot-270'];
    const r = rots[Math.floor(Math.random() * rots.length)];
    html += \`
        <div class="tess-cell">
            <div class="tess-inner \${r}"></div>
        </div>
    \`;
}
grid.innerHTML = html;

const cells = document.querySelectorAll('.tess-cell');

// Continuously flip random tiles
function flipRandom() {
    const idx = Math.floor(Math.random() * cells.length);
    const cell = cells[idx];
    
    // Parse current transform
    let currentX = 0;
    let currentY = 0;
    
    const transform = cell.style.transform;
    if(transform.includes('rotateX')) {
        const match = transform.match(/rotateX\\((-?\\d+)deg\\)/);
        if(match) currentX = parseInt(match[1]);
    }
    if(transform.includes('rotateY')) {
        const match = transform.match(/rotateY\\((-?\\d+)deg\\)/);
        if(match) currentY = parseInt(match[1]);
    }
    
    // Flip either X or Y by 180
    if(Math.random() > 0.5) {
        currentX += 180;
    } else {
        currentY += 180;
    }
    
    cell.style.transform = \`rotateX(\${currentX}deg) rotateY(\${currentY}deg)\`;
    
    setTimeout(flipRandom, 50 + Math.random() * 100);
}

// Start several loops
for(let i=0; i<10; i++) {
    setTimeout(flipRandom, Math.random() * 1000);
}
