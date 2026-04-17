const input = document.getElementById('type-target');
const chamber = document.getElementById('chamber');

const maxEchoes = 20;

function renderEchoes() {
    const val = input.value;
    chamber.innerHTML = '';
    
    if(!val) return;

    for(let i=1; i<=maxEchoes; i++) {
        const d = document.createElement('div');
        d.className = 'echo';
        d.innerText = val;
        
        // push backwards and fade out
        const depth = i * -150; // z translation
        const scale = 1 - (i * 0.05);
        const yOffset = -i * 20; // curve upwards slightly
        
        d.style.transform = \`translateZ(\${depth}px) translateY(\${yOffset}px)\`;
        d.style.opacity = 1 - (i * 0.05); // fade
        
        // Colors shift slightly
        const hue = i * 15;
        d.style.color = \`hsl(\${hue}, 80%, 60%)\`;
        
        // Subtle blur for distant echoes
        d.style.filter = \`blur(\${i}px)\`;
        
        chamber.appendChild(d);
    }
}

input.addEventListener('input', renderEchoes);

// Dynamic listening parallax
document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX - window.innerWidth/2) * 0.05;
    const my = (e.clientY - window.innerHeight/2) * 0.05;
    
    chamber.style.transform = \`rotateY(\${mx}deg) rotateX(\${-my}deg)\`;
});
