const text = "A N D  S O  T H E  S E R P E N T  S L I T H E R S  O N W A R D S  I N T O  I N F I N I T Y ... ";
let textIndex = 0;

let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate distance from last drop
    const dist = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
    
    // Only drop a character if we've moved sufficiently (approx width of a char)
    if (dist > 30) {
        lastX = x;
        lastY = y;
        
        const charEl = document.createElement('div');
        charEl.className = 'snake-char';
        charEl.innerText = text[textIndex];
        charEl.style.left = \`\${x}px\`;
        charEl.style.top = \`\${y}px\`;
        
        // Randomize slight rotation for organic feel
        const angle = (Math.random() - 0.5) * 20;
        charEl.style.transform = \`translate(-50%, -50%) rotate(\${angle}deg)\`;
        
        document.body.appendChild(charEl);
        
        // Trigger fade out after a tiny delay
        setTimeout(() => {
            charEl.style.opacity = '0';
        }, 50);
        
        // Remove from DOM eventually
        setTimeout(() => {
            charEl.remove();
        }, 2050);
        
        textIndex = (textIndex + 1) % text.length;
    }
});
