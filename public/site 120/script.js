const wall = document.getElementById('cctv-wall');

let html = '';
for(let i=0; i<20; i++) {
    html += \`
        <div class="cam-feed">
            <div class="camera-lens" id="cam-\${i}"></div>
        </div>
    \`;
}
wall.innerHTML = html;

const lenses = document.querySelectorAll('.camera-lens');

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;
    
    lenses.forEach(lens => {
        const rect = lens.getBoundingClientRect();
        // get center of lens
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        
        const dx = mx - cx;
        const dy = my - cy;
        
        // calculate movement limitation so it doesn't leave the feed box completely
        const dist = Math.min(Math.sqrt(dx*dx + dy*dy) * 0.1, 20);
        const angle = Math.atan2(dy, dx);
        
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        
        lens.style.transform = \`translate(\${tx}px, \${ty}px)\`;
    });
});
