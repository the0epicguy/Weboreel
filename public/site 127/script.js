const g1 = document.querySelector('.g1');
const g2 = document.querySelector('.g2');
const g3 = document.querySelector('.g3');

window.addEventListener('scroll', () => {
    // Scroll drives rotation.
    // 1px scroll = 0.5 degrees
    const r = window.scrollY * 0.5;
    
    // G1 drives G2, G2 drives G3. Sizes are 400, 300, 500.
    // Gear ratios: 
    // G2 speed = G1 speed * (400/300) = 1.33x, inverted.
    const r2 = -(r * (400/300));
    
    // G3 speed = G2 speed * (300/500) = 0.6x, inverted (so back to positive).
    const r3 = -(r2 * (300/500));
    
    g1.style.transform = \`rotate(\${r}deg)\`;
    g2.style.transform = \`rotate(\${r2}deg)\`;
    g3.style.transform = \`rotate(\${r3}deg)\`;
});
