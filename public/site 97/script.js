const container = document.querySelector('.portrait-container');
const numSlices = 15;
const slices = [];

for(let i=0; i<numSlices; i++) {
    const slice = document.createElement('div');
    slice.className = 'slice';
    container.appendChild(slice);
    slices.push(slice);
}

let lastMove = Date.now();

document.addEventListener('mousemove', () => {
    lastMove = Date.now();
    
    slices.forEach((slice, i) => {
        const topH = Math.random() * 100;
        const bottomH = topH + Math.random() * 15 + 5;
        
        slice.style.clipPath = `polygon(0% ${topH}%, 100% ${topH}%, 100% ${bottomH}%, 0% ${bottomH}%)`;
        
        const moveX = (Math.random() - 0.5) * 60;
        slice.style.transform = `translateX(${moveX}px)`;
        
        if (Math.random() > 0.4) {
            const hue = Math.random() > 0.5 ? 'hue-rotate(90deg)' : 'hue-rotate(-90deg)';
            slice.style.filter = `${hue} saturate(500%) contrast(200%)`;
        } else {
            slice.style.filter = 'none';
        }
    });

    const h1 = document.querySelector('h1');
    if(Math.random() > 0.7) {
        h1.innerText = Math.random().toString(36).substring(2, 10).toUpperCase();
        h1.style.letterSpacing = (Math.random() * 10) + 'px';
    } else {
        h1.innerText = "CORRUPTION";
        h1.style.letterSpacing = 'normal';
    }
});

function autoReset() {
    // Only reset if no move for 100ms
    if (Date.now() - lastMove > 100) {
        slices.forEach(slice => {
            slice.style.clipPath = 'none';
            slice.style.transform = 'translate(0)';
            slice.style.filter = 'none';
        });
        const h1 = document.querySelector('h1');
        h1.innerText = "CORRUPTION";
    }
    requestAnimationFrame(autoReset);
}

autoReset();
