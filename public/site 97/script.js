const container = document.querySelector('.portrait-container');
const numSlices = 15;
const slices = [];

for(let i=0; i<numSlices; i++) {
    const slice = document.createElement('div');
    slice.className = 'slice';
    container.appendChild(slice);
    slices.push(slice);
}

document.addEventListener('mousemove', () => {
    // heavy glitch on mouse movement
    slices.forEach((slice, i) => {
        // Random horizontal slice
        const topH = Math.random() * 100;
        const bottomH = topH + Math.random() * 10 + 2;
        
        slice.style.clipPath = \`polygon(0% \${topH}%, 100% \${topH}%, 100% \${bottomH}%, 0% \${bottomH}%)\`;
        
        // Random offset
        const moveX = (Math.random() - 0.5) * 40;
        slice.style.transform = \`translateX(\${moveX}px)\`;
        
        // Random color tint via filter for some slices
        if (Math.random() > 0.5) {
            const hue = Math.random() > 0.5 ? 'hue-rotate(90deg)' : 'hue-rotate(-90deg)';
            slice.style.filter = \`\${hue} saturate(500%)\`;
        } else {
            slice.style.filter = 'none';
        }
    });

    // Random glitch text
    const h1 = document.querySelector('h1');
    if(Math.random() > 0.8) {
        h1.innerText = Math.random().toString(36).substring(2, 10).toUpperCase();
    } else {
        h1.innerText = "CORRUPTION";
    }
});

// Periodic reset
setInterval(() => {
    slices.forEach(slice => {
        slice.style.clipPath = 'none';
        slice.style.transform = 'translate(0)';
        slice.style.filter = 'none';
    });
}, 500);
