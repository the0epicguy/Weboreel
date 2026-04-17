const container = document.getElementById('layer-container');

// A set of highly contrasting aesthetics
const styles = [
    { bg: '#FF3366', fg: '#FFF', text: 'SHED' },
    { bg: '#000000', fg: '#00FFCC', text: 'EVOLVE' },
    { bg: '#FFFF00', fg: '#000', text: 'MUTATE' },
    { bg: '#0033FF', fg: '#FF00FF', text: 'RECYCLE' },
    { bg: '#FFFFFF', fg: '#000', text: 'REVEAL' }
];

let layerElements = [];

// Reverse order so the first one is on top
for(let i = styles.length - 1; i >= 0; i--) {
    let layer = document.createElement('div');
    layer.className = 'layer';
    layer.style.backgroundColor = styles[i].bg;
    layer.style.color = styles[i].fg;
    layer.innerText = styles[i].text;
    layer.style.zIndex = styles.length - i;
    container.appendChild(layer);
    layerElements.push(layer);
}

let activeLayer = layerElements.length - 1;

document.addEventListener('click', (e) => {
    if (activeLayer < 0) {
        // Reset when we run out
        layerElements.forEach(l => l.classList.remove('peeled'));
        activeLayer = layerElements.length - 1;
        return;
    }
    
    // Set custom properties for click location animation origin
    const curr = layerElements[activeLayer];
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    curr.style.setProperty('--x', \`\${x}%\`);
    curr.style.setProperty('--y', \`\${y}%\`);
    
    curr.classList.add('peeled');
    activeLayer--;
});
