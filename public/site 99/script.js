// Create the white overlay
const whiteMask = document.createElement('div');
whiteMask.classList.add('white-mask');
document.body.appendChild(whiteMask);

// Move the "hole" with mouse
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const gradient = `radial-gradient(circle 180px at ${x}px ${y}px, transparent 0%, black 100%)`;

    whiteMask.style.maskImage = gradient;
    whiteMask.style.webkitMaskImage = gradient;
});