const container = document.querySelector('.chroma-container');
const text = container.dataset.text;

container.innerHTML = \`
    <div class="layer layer-r">\${text}</div>
    <div class="layer layer-g">\${text}</div>
    <div class="layer layer-b">\${text}</div>
\`;

const layerR = document.querySelector('.layer-r');
const layerB = document.querySelector('.layer-b');

document.addEventListener('mousemove', (e) => {
    const rx = (e.clientX / window.innerWidth) - 0.5;
    const ry = (e.clientY / window.innerHeight) - 0.5;
    
    // Max displacement is 50px
    const displacement = 50;
    
    layerR.style.transform = \`translate(\${rx * displacement}px, \${ry * displacement}px)\`;
    layerB.style.transform = \`translate(\${-rx * displacement}px, \${-ry * displacement}px)\`;
});

// Add glitch click
document.addEventListener('mousedown', () => {
    layerR.style.transform = \`translate(\${(Math.random()-0.5)*200}px, \${(Math.random()-0.5)*200}px)\`;
    layerB.style.transform = \`translate(\${(Math.random()-0.5)*200}px, \${(Math.random()-0.5)*200}px)\`;
});

document.addEventListener('mouseup', (e) => {
    // Quickly reset based on mouse pos
    const rx = (e.clientX / window.innerWidth) - 0.5;
    const ry = (e.clientY / window.innerHeight) - 0.5;
    const displacement = 50;
    layerR.style.transform = \`translate(\${rx * displacement}px, \${ry * displacement}px)\`;
    layerB.style.transform = \`translate(\${-rx * displacement}px, \${-ry * displacement}px)\`;
});
