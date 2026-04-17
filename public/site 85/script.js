const tunnel = document.getElementById('tunnel');
const numFrames = 20;

// Create recursive frames
let html = '';
for(let i=0; i<numFrames; i++) {
    html += \`<div class="frame" id="f\${i}">\`;
}
for(let i=0; i<numFrames; i++) {
    html += \`</div>\`;
}

tunnel.innerHTML = html;

let depth = 0;

document.addEventListener('wheel', (e) => {
    depth += e.deltaY * 0.005;
    if(depth < 0) depth = 0;
});

let targetDepth = depth;
function animate() {
    // smooth scrolling
    targetDepth += (depth - targetDepth) * 0.1;
    
    // Get the first frame container
    const firstFrame = document.getElementById('f0');
    if(firstFrame) {
        // This will scale the entire nested structure
        firstFrame.style.transform = \`translate(-50%, -50%) scale(\${Math.pow(1.5, targetDepth)})\`;
    }
    
    requestAnimationFrame(animate);
}

animate();
