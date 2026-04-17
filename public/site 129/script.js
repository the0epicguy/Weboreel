const canvas = document.getElementById('static-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Pre-generate noise frames for performance
const numFrames = 5;
const frames = [];

for(let i=0; i<numFrames; i++) {
    const id = ctx.createImageData(width, height);
    const buf = new Uint32Array(id.data.buffer);
    for(let j=0; j<buf.length; j++) {
        // Random black and white noise
        buf[j] = Math.random() > 0.5 ? 0xFFFFFFFF : 0xFF000000;
    }
    frames.push(id);
}

let frameIdx = 0;
let opacity = 1;

let lastMx = 0;
let lastMy = 0;

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;
    
    // Calculate velocity
    const dist = Math.sqrt(Math.pow(mx - lastMx, 2) + Math.pow(my - lastMy, 2));
    
    // Velocity clears the static
    if(dist > 5) {
        opacity = Math.max(0, opacity - dist * 0.005);
    }
    
    lastMx = mx;
    lastMy = my;
});

function animate() {
    // Slowly return static if not moving
    opacity = Math.min(1, opacity + 0.01);
    
    canvas.style.opacity = opacity;
    
    ctx.putImageData(frames[frameIdx], 0, 0);
    frameIdx = (frameIdx + 1) % numFrames;
    
    // we don't need 60fps for static, 30 is fine
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000/30);
}

animate();
