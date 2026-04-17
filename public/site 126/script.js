const shaft = document.getElementById('elevator-shaft');

// Create 10 layers
const numFloors = 10;
const floors = [];
for(let i=0; i<numFloors; i++) {
    const f = document.createElement('div');
    f.className = 'floor';
    f.innerText = \`LEVEL \${numFloors - i}\`;
    
    // Reverse z-index so layer 0 (highest level) is on top initially
    f.style.zIndex = numFloors - i;
    
    shaft.appendChild(f);
    floors.push(f);
}

function updateFloors() {
    // Scroll percentage 0 to 1
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Map scroll percentage to total "depth" we want to travel
    // Each floor is separated by depth factor
    const totalDepth = numFloors * 100; 
    const currentZ = pct * totalDepth;
    
    floors.forEach((f, index) => {
        // Floor resting Z position
        const floorZ = index * 100; 
        
        // Target Z position is resting Z minus our current scroll Z
        // So as we scroll, camera goes down, floors go UP (in Z axis, meaning towards/past us)
        const zPos = floorZ - currentZ;
        
        // Add a bit of y transition for feel
        f.style.transform = \`translate(-50%, calc(-50% + \${zPos * 0.5}px)) translateZ(\${zPos * 5}px)\`;
        
        // Opacity mapping. Fades out as it passes the camera (zPos > 0)
        // and fades in from deep background (zPos < -300)
        let op = 1;
        if(zPos > 0) {
            op = 1 - (zPos / 50); // fades quickly as it passes our face
        } else if (zPos < -300) {
            op = 1 - ((Math.abs(zPos) - 300) / 200); 
        }
        
        f.style.opacity = Math.max(0, Math.min(1, op));
    });
}

window.addEventListener('scroll', updateFloors);
updateFloors(); // Init
