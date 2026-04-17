const heading = document.querySelector('h1');

document.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    
    // Create a dynamic 3D gold extrusion effect based on mouse positional offset
    let shadow = '';
    const depth = 20;
    for(let i=1; i<=depth; i++) {
        // base gold colors getting darker
        const lightness = 100 - (i * 3);
        const color = \`hsl(51, 100%, \${lightness / 2}%)\`; // Gold hues
        
        const xOffset = -nx * i;
        const yOffset = -ny * i;
        
        shadow += \`\${xOffset}px \${yOffset}px 0 \${color},\`;
    }
    
    // Add real blur shadow at the end
    shadow += \`\${-nx * 50}px \${-ny * 50}px 30px rgba(0,0,0,0.9)\`;
    
    heading.style.textShadow = shadow;
});
