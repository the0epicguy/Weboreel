const grid = document.getElementById('text-grid');

const charWidth = 18;
const charHeight = 18;
const cols = Math.floor(window.innerWidth / charWidth) + 1;
const rows = Math.floor(window.innerHeight / charHeight) + 1;

let textPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=".split('');

let html = '';
for(let i=0; i < cols * rows; i++) {
    const char = textPool[Math.floor(Math.random() * textPool.length)];
    html += \`<div class="t-char">\${char}</div>\`;
}
grid.innerHTML = html;

const chars = document.querySelectorAll('.t-char');

let lastMx=0, lastMy=0;
document.addEventListener('mousemove', (e) => {
    lastMx = e.clientX;
    lastMy = e.clientY;
});

// Update in a loop for perf
function updateScale() {
    chars.forEach(c => {
        const rect = c.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        
        const dist = Math.sqrt(Math.pow(lastMx - cx, 2) + Math.pow(lastMy - cy, 2));
        
        if (dist < 150) {
            // scale up to 4x
            const scale = 1 + ( (150 - dist) / 150 ) * 3;
            c.style.transform = \`scale(\${scale})\`;
            c.style.zIndex = Math.floor(scale * 10);
            c.style.fontWeight = '900';
            c.style.color = '#ff0055';
        } else {
            c.style.transform = \`scale(1)\`;
            c.style.zIndex = 1;
            c.style.fontWeight = 'normal';
            c.style.color = '#111';
        }
    });
    
    requestAnimationFrame(updateScale);
}

updateScale();
