const grid = document.getElementById('text-grid');
const words = ['TOPOGRAPHY', 'ELEVATE', 'DEPTH', 'SURFACE', 'TERRAIN', 'SCALE', 'MAP', 'PEAK', 'VALLEY', 'LIFT'];

let html = '';
// Add enough words to fill screen
for(let i=0; i<500; i++) {
    html += `<span class="word">${words[Math.floor(Math.random() * words.length)]}</span>`;
}
grid.innerHTML = html;

const wordElements = Array.from(document.querySelectorAll('.word')).map(el => {
    const rect = el.getBoundingClientRect();
    return {
        el: el,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
});

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    wordElements.forEach(word => {
        const dx = mx - word.x;
        const dy = my - word.y;
        const distSq = dx*dx + dy*dy; // Use squared distance for performance
        
        if (distSq < 40000) { // 200px * 200px
            const dist = Math.sqrt(distSq);
            // Elevate
            const z = (200 - dist) * 0.5;
            word.el.style.transform = `translateZ(${z}px)`;
            word.el.style.color = '#333';
            word.el.style.textShadow = `0 ${z/2}px ${z/4}px rgba(0,0,0,0.2)`;
        } else {
            // Only reset if it was transformed (optional optimization)
            if (word.el.style.transform !== 'translateZ(0px)') {
                word.el.style.transform = 'translateZ(0px)';
                word.el.style.color = '#ccc';
                word.el.style.textShadow = 'none';
            }
        }
    });
});
