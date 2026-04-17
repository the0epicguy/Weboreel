const glow = document.querySelector('.cursor-glow');
const cells = document.querySelectorAll('.cell');
const textCell = document.querySelector('.text-cell');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    glow.style.transform = \`translate(\${x - 125}px, \${y - 125}px)\`;
    
    // Proximity check for revealing borders and text
    cells.forEach(cell => {
        const rect = cell.getBoundingClientRect();
        // check distance from mouse to cell edges
        const cx = Math.max(rect.left, Math.min(x, rect.right));
        const cy = Math.max(rect.top, Math.min(y, rect.bottom));
        
        const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        
        if(dist < 100) {
            const intensity = 1 - (dist / 100);
            cell.style.borderColor = \`rgba(255, 255, 255, \${intensity * 0.3})\`;
            
            if(cell.classList.contains('text-cell')) {
                cell.style.opacity = intensity;
            }
        } else {
            cell.style.borderColor = 'transparent';
            if(cell.classList.contains('text-cell')) {
                cell.style.opacity = 0;
            }
        }
    });
});
