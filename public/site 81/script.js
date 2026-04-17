const cells = document.querySelectorAll('.q-cell');

cells.forEach(cell => {
    const text = cell.innerText;
    cell.innerText = '';
    
    const center = document.createElement('div');
    center.style.opacity = '0';
    center.style.transition = 'opacity 0.2s';
    center.innerText = text;
    cell.appendChild(center);

    const numGhosts = 5;
    const ghosts = [];
    for(let i=0; i<numGhosts; i++) {
        const g = document.createElement('span');
        g.innerText = text;
        cell.appendChild(g);
        ghosts.push(g);
    }
    
    let isLocked = false;
    
    function chaotic() {
        if(isLocked) return;
        ghosts.forEach(g => {
            const rx = (Math.random() - 0.5) * 60;
            const ry = (Math.random() - 0.5) * 60;
            const op = Math.random() * 0.4 + 0.1;
            const blur = Math.random() * 5;
            
            g.style.transform = `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px))`;
            g.style.opacity = op;
            g.style.filter = `blur(${blur}px)`;
            g.style.display = 'block';
        });
        requestAnimationFrame(chaotic);
    }

    requestAnimationFrame(chaotic);

    cell.addEventListener('mouseenter', () => {
        isLocked = true;
        ghosts.forEach(g => g.style.display = 'none');
        center.style.opacity = '1';
        cell.classList.add('locked');
    });

    cell.addEventListener('mouseleave', () => {
        isLocked = false;
        center.style.opacity = '0';
        cell.classList.remove('locked');
        requestAnimationFrame(chaotic);
    });
});
