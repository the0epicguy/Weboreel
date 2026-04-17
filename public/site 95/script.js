const f1 = document.querySelector('.f1');
const f2 = document.querySelector('.f2');
const f3 = document.querySelector('.f3');
const f4 = document.querySelector('.f4');

// Default center
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
});

function animate() {
    // Core light follows exactly
    f1.style.transform = \`translate(calc(-50% + \${mx}px), calc(-50% + \${my}px))\`;
    
    // Streak follows y
    f2.style.transform = \`translate(calc(-50% + \${window.innerWidth/2}px), calc(-50% + \${my}px))\`;
    
    // Ghost artifacts mirror across the center of the screen
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    
    const dx = mx - cx;
    const dy = my - cy;
    
    // Ghost 1 (Hexagon)
    const gx1 = cx - dx * 0.5;
    const gy1 = cy - dy * 0.5;
    f3.style.transform = \`translate(calc(-50% + \${gx1}px), calc(-50% + \${gy1}px))\`;
    
    // Ghost 2 (Ring)
    const gx2 = cx - dx * 1.5;
    const gy2 = cy - dy * 1.5;
    f4.style.transform = \`translate(calc(-50% + \${gx2}px), calc(-50% + \${gy2}px))\`;
    
    requestAnimationFrame(animate);
}

animate();
