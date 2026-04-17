const cells = document.querySelectorAll('.q-cell');

cells.forEach(cell => {
    const text = cell.innerText;
    cell.innerText = '';
    
    // Create actual stable center text
    const center = document.createElement('div');
    center.style.opacity = '0';
    center.style.transition = 'opacity 0.2s';
    center.innerText = text;
    cell.appendChild(center);

    // Create ghosts
    const numGhosts = 5;
    const ghosts = [];
    
    for(let i=0; i<numGhosts; i++) {
        const g = document.createElement('span');
        g.innerText = text;
        cell.appendChild(g);
        ghosts.push(g);
    }
    
    let interval;
    
    function chaotic() {
        ghosts.forEach(g => {
            const rx = (Math.random() - 0.5) * 100;
            const ry = (Math.random() - 0.5) * 100;
            const op = Math.random() * 0.5 + 0.1;
            const blur = Math.random() * 10;
            
            g.style.transform = \`translate(calc(-50% + \${rx}px), calc(-50% + \${ry}px))\`;
            g.style.opacity = op;
            g.style.filter = \`blur(\${blur}px)\`;
            g.style.display = 'block';
        });
    }

    interval = setInterval(chaotic, 50);

    cell.addEventListener('mouseenter', () => {
        clearInterval(interval);
        ghosts.forEach(g => g.style.display = 'none');
        center.style.opacity = '1';
        cell.classList.add('locked');
    });

    cell.addEventListener('mouseleave', () => {
        interval = setInterval(chaotic, 50);
        center.style.opacity = '0';
        cell.classList.remove('locked');
    });
});
