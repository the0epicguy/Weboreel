const grid = document.getElementById('text-grid');
const words = ['TOPOGRAPHY', 'ELEVATE', 'DEPTH', 'SURFACE', 'TERRAIN', 'SCALE', 'MAP', 'PEAK', 'VALLEY', 'LIFT'];

let html = '';
// Add enough words to fill screen
for(let i=0; i<500; i++) {
    html += \`<span class="word">\${words[Math.floor(Math.random() * words.length)]}</span>\`;
}
grid.innerHTML = html;

const wordElements = document.querySelectorAll('.word');

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    wordElements.forEach(word => {
        const rect = word.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        const dist = Math.sqrt(Math.pow(mx - cx, 2) + Math.pow(my - cy, 2));
        
        if (dist < 200) {
            // Elevate
            const z = (200 - dist) * 0.5;
            word.style.transform = \`translateZ(\${z}px)\`;
            word.style.color = '#333';
            word.style.textShadow = \`0 \${z/2}px \${z/4}px rgba(0,0,0,0.2)\`;
        } else {
            word.style.transform = 'translateZ(0px)';
            word.style.color = '#ccc';
            word.style.textShadow = 'none';
        }
    });
});
