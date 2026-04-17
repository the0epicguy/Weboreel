const strip = document.querySelector('.strip');
const segments = 36;
const text = " E N D L E S S   L O O P   M Ö B I U S   ".repeat(3);

let html = '';
for(let i=0; i<segments; i++) {
    const char = text[i % text.length];
    html += `<div class="segment">${char}</div>`;
}
strip.innerHTML = html;

const segmentElements = document.querySelectorAll('.segment');
const radius = 250;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 60;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -60;
});

let scroll = 0;

function animate() {
    scroll += 0.005; // Crawl speed
    
    segmentElements.forEach((el, i) => {
        const offset = (i / segments) * Math.PI * 2;
        const angleRad = offset + scroll;
        const angleDeg = (angleRad * 180) / Math.PI;
        
        // Full Mobius twist is 180 deg over 360 deg movement
        const twist = (angleDeg / 2);
        
        const x = Math.cos(angleRad) * radius;
        const z = Math.sin(angleRad) * radius;
        
        // We use rotateY(-angle) to face the center, then rotateX(twist) for the Mobius flip
        el.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${-angleDeg}deg) rotateX(${twist}deg)`;
        
        // Change color based on twist to show the "sides"
        const side = Math.abs(Math.sin(twist * Math.PI / 180));
        el.style.background = `rgb(${side * 50}, ${side * 50}, ${side * 50})`;
    });

    // Tilt the whole scene with mouse
    strip.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    
    requestAnimationFrame(animate);
}

// Disable the CSS animation to use JS control
strip.style.animation = 'none';

animate();
