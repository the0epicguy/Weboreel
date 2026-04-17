const container = document.querySelector('.scroll-container');
const words = ['FLOW', 'MOVE', 'SHIFT', 'KINETIC', 'ENERGY', 'HYPER'];
const rowsCount = 15;

for(let i=0; i<rowsCount; i++) {
    const row = document.createElement('div');
    row.classList.add('marquee-row');
    if (i % 2 !== 0) row.classList.add('odd');
    
    // Create inner text duplications for seamless loop
    let content = '';
    const word = words[i % words.length];
    for(let j=0; j<20; j++) {
        content += `<span class="marquee-text">${word}</span>`;
    }
    row.innerHTML = content;
    
    // Set initial custom scroll position properties
    row.dataset.progress = Math.random() * 1000;
    row.dataset.speed = (Math.random() * 2 + 1) * (i % 2 === 0 ? 1 : -1);
    
    container.appendChild(row);
}

const rows = document.querySelectorAll('.marquee-row');
let mouseX = 0;
let targetSpeedMult = 1;

document.addEventListener('mousemove', (e) => {
    // Increase speed based on mouse distance from center
    const center = window.innerWidth / 2;
    const dist = Math.abs(e.clientX - center) / center; // 0 to 1
    targetSpeedMult = 1 + dist * 5;
});

let currentSpeedMult = 1;

function animate() {
    // Smooth speed multiplier interpolation
    currentSpeedMult += (targetSpeedMult - currentSpeedMult) * 0.1;
    
    rows.forEach(row => {
        let prog = parseFloat(row.dataset.progress);
        let speed = parseFloat(row.dataset.speed);
        
        prog += speed * currentSpeedMult;
        
        // Reset to simulate loop
        if (prog > 2000) prog -= 2000;
        if (prog < -2000) prog += 2000;
        
        row.dataset.progress = prog;
        row.style.transform = `translateX(${prog}px)`;
    });
    
    requestAnimationFrame(animate);
}

animate();

const circleMask = document.querySelector('.circle-mask');
circleMask.addEventListener('click', () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? '#ff3366' : '#000';
    circleMask.style.backgroundColor = document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? '#ff3366' : '#000';
});
