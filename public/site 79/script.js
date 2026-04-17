const container = document.getElementById('ascii-container');

// Character density map
const chars = [' ', '.', '-', '~', ':', '=', '+', '*', '#', '%', '@'];

let cols, rows;
const fontSize = 14; 
// approximate character width in monospace
const charWidth = 8.4; 

let mouseX = -1000;
let mouseY = -1000;

function init() {
    cols = Math.floor(window.innerWidth / charWidth);
    rows = Math.floor(window.innerHeight / fontSize);
    
    // We'll use a single text node for better performance than thousands of spans
    let str = '\\n'.repeat(rows);
    container.textContent = str;
}

window.addEventListener('resize', init);
init();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

let time = 0;

function animate() {
    time += 0.05;
    
    let content = '';
    
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            // Screen coords
            const posX = x * charWidth;
            const posY = y * fontSize;
            
            // Dist to mouse
            const dx = posX - mouseX;
            const dy = posY - mouseY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Noiseish base
            const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time);
            
            // Interaction
            const interaction = Math.max(0, 1 - dist / 300);
            
            // Calculate final 'density'
            let val = (noise + 1) / 2; // 0 to 1
            val = (val + interaction) / 2;
            
            // Map to char
            let charIdx = Math.floor(val * chars.length);
            charIdx = Math.max(0, Math.min(chars.length - 1, charIdx));
            
            content += chars[charIdx];
        }
        content += '\\n';
    }
    
    container.textContent = content;
    requestAnimationFrame(animate);
}

animate();
