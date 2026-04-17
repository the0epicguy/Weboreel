const container = document.querySelector('.defrag-container');
const percentDisplay = document.getElementById('percent');

// Calculate how many blocks fit
const blockWidth = 22; // 20 + 2 gap
const blockHeight = 32;
const cols = Math.floor((window.innerWidth * 0.8 - 20) / blockWidth);
const rows = Math.floor((window.innerHeight * 0.7 - 20) / blockHeight);
const totalBlocks = cols * rows;

let blocks = [];
for(let i=0; i<totalBlocks; i++) {
    const b = document.createElement('div');
    b.className = 'block';
    
    // Seed initial states
    const r = Math.random();
    if(r < 0.2) b.classList.add('empty');
    else if(r < 0.95) b.classList.add('unoptimized');
    else b.classList.add('bad');
    
    container.appendChild(b);
    blocks.push(b);
}

// Emulate defrag
let currentIndex = 0;
let optimizedCount = 0;

function defragTick() {
    if(currentIndex >= totalBlocks) {
        currentIndex = 0;
        // Reset when done
        blocks.forEach(b => {
             b.className = 'block unoptimized';
        });
        optimizedCount = 0;
        return;
    }
    
    const b = blocks[currentIndex];
    
    // Animate active state
    b.classList.add('active');
    
    setTimeout(() => {
        if(!b.classList.contains('bad')) {
            b.className = 'block optimized';
            optimizedCount++;
        }
        b.classList.remove('active');
        
        // Update UI
        const pct = Math.floor((currentIndex / totalBlocks) * 100);
        percentDisplay.innerText = \`\${pct}% COMPLETE\`;
        
        currentIndex++;
    }, 10);
}

setInterval(defragTick, 15);
