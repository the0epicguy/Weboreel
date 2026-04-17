const grid = document.getElementById('elastic-grid');
const numRows = 5;
const numCols = 8;
const letters = 'ELASTICGRIDMAKESFUNNYNOISES!'.split('');

let html = '';
for(let r=0; r<numRows; r++) {
    html += '<div class="row">';
    for(let c=0; c<numCols; c++) {
        const char = letters[(r * numCols + c) % letters.length];
        html += `<div class="cell">${char}</div>`;
    }
    html += '</div>';
}
grid.innerHTML = html;

const cells = Array.from(document.querySelectorAll('.cell')).map(el => {
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

    cells.forEach(cell => {
        const dx = mx - cell.x;
        const dy = my - cell.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 200) {
            const force = (200 - dist) / 200;
            const moveX = (dx / dist) * -50 * force;
            const moveY = (dy / dist) * -50 * force;
            cell.el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 - force * 0.3})`;
            cell.el.style.color = '#ff3366';
            cell.el.style.zIndex = '10';
        } else {
            cell.el.style.transform = 'translate(0,0) scale(1)';
            cell.el.style.color = '#333';
            cell.el.style.zIndex = '1';
        }
    });
});
