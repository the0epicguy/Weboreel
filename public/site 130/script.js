document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
});

// also trigger occasionally automatically
setInterval(() => {
    const rx = Math.random() * window.innerWidth;
    const ry = Math.random() * window.innerHeight;
    createRipple(rx, ry);
}, 800);

function createRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = \`\${x}px\`;
    r.style.top = \`\${y}px\`;
    
    // Random neon color
    const hue = Math.random() * 360;
    r.style.borderColor = \`hsl(\${hue}, 100%, 60%)\`;
    r.style.boxShadow = \`0 0 10px hsl(\${hue}, 100%, 60%), inset 0 0 10px hsl(\${hue}, 100%, 60%)\`;
    
    document.body.appendChild(r);
    
    setTimeout(() => {
        r.remove();
    }, 2000);
}
