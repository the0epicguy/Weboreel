const container = document.getElementById('barcode-container');
const serial = document.getElementById('serial');

let bars = [];
for(let i=0; i<150; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    // Random width initially
    const w = Math.random() > 0.5 ? Math.random() * 10 + 2 : 0;
    bar.style.width = \`\${w}px\`;
    const margin = Math.random() * 5;
    bar.style.marginRight = `${margin}px`;
    
    container.appendChild(bar);
    bars.push({ el: bar, baseW: w });
}

const barsWithPos = bars.map(b => ({
    el: b.el,
    left: b.el.getBoundingClientRect().left
}));

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const nx = mx / window.innerWidth;
    
    // Wave effect
    barsWithPos.forEach(b => {
        const dist = Math.abs(mx - b.left);
        
        if (dist < 100) {
            const scale = 1 - (dist / 100);
            b.el.style.transform = `scaleY(${1 - scale * 0.5})`;
        } else {
            if(b.el.style.transform !== 'scaleY(1)') {
                b.el.style.transform = `scaleY(1)`;
            }
        }
    });

    // Update serial
    serial.innerText = Math.floor(nx * 1000000000000).toString().padStart(12, '0');
});
