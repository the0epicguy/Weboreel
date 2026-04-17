const machineTxt = document.querySelector('.machine-txt');
const mask = document.querySelector('.reveal-mask');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastMove = Date.now();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMove = Date.now();
    
    machineTxt.style.setProperty('--x', `${mouseX}px`);
    machineTxt.style.setProperty('--y', `${mouseY}px`);
    mask.style.setProperty('--x', `${mouseX}px`);
    mask.style.setProperty('--y', `${mouseY}px`);
});

function animate() {
    const timeSinceMove = Date.now() - lastMove;
    const activity = Math.max(0, 1 - timeSinceMove / 2000); // 2s fade out
    
    // Constant subtle glitch
    const glitchChance = 0.95 - (activity * 0.2); // more chance when active
    
    if(Math.random() > glitchChance) {
        const intensity = 5 + (activity * 15);
        machineTxt.style.transform = `translate(calc(-50% + ${(Math.random()-0.5)*intensity}px), calc(-50% + ${(Math.random()-0.5)*intensity}px))`;
        if(Math.random() > 0.9) machineTxt.style.filter = `hue-rotate(${Math.random()*360}deg)`;
    } else {
        machineTxt.style.transform = `translate(-50%, -50%)`;
        machineTxt.style.filter = 'none';
    }
    
    requestAnimationFrame(animate);
}

animate();
