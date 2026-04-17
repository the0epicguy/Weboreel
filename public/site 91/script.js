function setupRing(selector, count, radius) {
    const ring = document.querySelector(selector);
    let html = '';
    for(let i=0; i<count; i++) {
        const angle = (i / count) * 360;
        const val = i === 0 && count === 12 ? 12 : i;
        const padded = val.toString().padStart(2, '0');
        // Position items in a circle
        html += `<div class="num" style="transform: rotate(${angle}deg) translateY(${-radius}px)">${padded}</div>`;
    }
    ring.innerHTML = html;
    return ring;
}

const ringH = setupRing('.hours', 12, 250);
const ringM = setupRing('.minutes', 60, 150);
const ringS = setupRing('.seconds', 60, 75);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
});

function animate() {
    const d = new Date();
    const h = d.getHours() % 12;
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
    
    // Smooth rotations
    const sDeg = (s + ms/1000) * 6;
    const mDeg = (m + s/60) * 6;
    const hDeg = (h + m/60) * 30;
    
    // Apply time rotation + mouse offset
    if(ringH) ringH.style.transform = `translate(calc(-50% + ${mouseX * 0.5}px), calc(-50% + ${mouseY * 0.5}px)) rotate(${-hDeg}deg)`;
    if(ringM) ringM.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px)) rotate(${-mDeg}deg)`;
    if(ringS) ringS.style.transform = `translate(calc(-50% + ${mouseX * 1.5}px), calc(-50% + ${mouseY * 1.5}px)) rotate(${-sDeg}deg)`;
    
    requestAnimationFrame(animate);
}

animate();
