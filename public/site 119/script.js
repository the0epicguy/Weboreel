const targets = document.querySelectorAll('.target');

document.addEventListener('mousemove', (e) => {
    // Relative to center of screen
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    
    // Top Left (normal)
    targets[0].style.transform = \`translate(calc(-50% + \${dx}px), calc(-50% + \${dy}px))\`;
    
    // Top Right (invert X)
    targets[1].style.transform = \`translate(calc(-50% + \${-dx}px), calc(-50% + \${dy}px))\`;
    
    // Bottom Left (invert Y)
    targets[2].style.transform = \`translate(calc(-50% + \${dx}px), calc(-50% + \${-dy}px))\`;
    
    // Bottom Right (invert both)
    targets[3].style.transform = \`translate(calc(-50% + \${-dx}px), calc(-50% + \${-dy}px))\`;
});
