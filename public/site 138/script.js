const container = document.getElementById('wave-container');

const numBars = 100;
const bars = [];

for(let i=0; i<numBars; i++) {
    const b = document.createElement('div');
    b.className = 'bar';
    container.appendChild(b);
    bars.push(b);
}

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;
    
    // Wave calculations based on horizontal mouse position
    // We create a sine wave that peaks at the mouse X
    const targetIdx = Math.floor((mx / window.innerWidth) * numBars);
    
    // We also use Y to determine overall amplitude
    const amplitude = ((window.innerHeight - my) / window.innerHeight) * 400 + 10;
    
    bars.forEach((b, index) => {
        // Distance from current bar to target bar
        let dist = Math.abs(index - targetIdx);
        
        // Attenuate the amplitude based on distance. 
        // We use a Gaussian-like bell curve: exp(-x^2)
        const spread = 15; // lower means sharper peak
        const heightMultiplier = Math.exp( -(dist * dist) / (2 * spread * spread) );
        
        // Base sine wave running constantly for flavor
        const timeOffset = Date.now() * 0.005;
        const baseline = Math.sin(index * 0.5 + timeOffset) * 20 + 20; 
        
        const finalHeight = baseline + (amplitude * heightMultiplier);
        
        b.style.height = \`\${Math.max(10, finalHeight)}px\`;
    });
});
