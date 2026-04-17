const container = document.querySelector('.glass-container');
const h1 = document.querySelector('h1');

// Generate shards
const numShards = 12;
const shards = [];

for (let i = 0; i < numShards; i++) {
    const shard = document.createElement('div');
    shard.classList.add('shard');
    
    // Random sizes making up a rough grid
    const cols = 4;
    const rows = 3;
    const w = 600 / cols;
    const h = 400 / rows;
    
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    shard.style.width = \`\${w}px\`;
    shard.style.height = \`\${h}px\`;
    shard.style.left = \`\${col * w}px\`;
    shard.style.top = \`\${row * h}px\`;
    
    // Add random clip path for sharp edges
    const p1 = \`\${Math.random() * 20}% \${Math.random() * 20}%\`;
    const p2 = \`\${80 + Math.random() * 20}% \${Math.random() * 20}%\`;
    const p3 = \`\${80 + Math.random() * 20}% \${80 + Math.random() * 20}%\`;
    const p4 = \`\${Math.random() * 20}% \${80 + Math.random() * 20}%\`;
    
    shard.style.clipPath = \`polygon(\${p1}, \${p2}, \${p3}, \${p4})\`;
    
    container.appendChild(shard);
    shards.push(shard);
}

function scatterShards() {
    shards.forEach(shard => {
        const tx = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const ty = (Math.random() - 0.5) * window.innerHeight * 1.5;
        const rot = (Math.random() - 0.5) * 720;
        const scale = 0.5 + Math.random();
        
        shard.style.transform = \`translate(\${tx}px, \${ty}px) rotate(\${rot}deg) scale(\${scale})\`;
    });
}

// Initial scatter
setTimeout(scatterShards, 100);

h1.addEventListener('mouseenter', () => {
    container.classList.add('assembled');
});

h1.addEventListener('mouseleave', () => {
    container.classList.remove('assembled');
    scatterShards();
});
