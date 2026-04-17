const machineTxt = document.querySelector('.machine-txt');
const mask = document.querySelector('.reveal-mask');

document.addEventListener('mousemove', (e) => {
    // Simple custom property updates for the mask location
    const x = \`\${e.clientX}px\`;
    const y = \`\${e.clientY}px\`;
    
    machineTxt.style.setProperty('--x', x);
    machineTxt.style.setProperty('--y', y);
    
    mask.style.setProperty('--x', x);
    mask.style.setProperty('--y', y);
    
    // Add glitching to machine text when moving fast
    if(Math.random() > 0.8) {
        machineTxt.style.transform = \`translate(calc(-50% + \${(Math.random()-0.5)*20}px), calc(-50% + \${(Math.random()-0.5)*20}px))\`;
    } else {
        machineTxt.style.transform = \`translate(-50%, -50%)\`;
    }
});
