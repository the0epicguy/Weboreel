const strip = document.querySelector('.strip');
const segments = 36;
const text = " E N D L E S S   L O O P   M O B I U S   ".repeat(3);

let html = '';
for(let i=0; i<segments; i++) {
    const angle = (i / segments) * 360;
    // to make a Mobius strip, as we go around the circle (360 deg), we must twist the segment by 180 deg
    const twist = (i / segments) * 180;
    const radius = 250;
    
    // We translate out to the radius, then twist
    const transform = \`translate(-50%, -50%) rotateY(\${angle}deg) translateZ(\${radius}px) rotateX(\${twist}deg)\`;
    
    // Pick character
    const char = text[i % text.length];
    
    html += \`<div class="segment" style="transform: \${transform}">\${char}</div>\`;
}
strip.innerHTML = html;
