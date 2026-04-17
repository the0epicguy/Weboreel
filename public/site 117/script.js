const feed = document.getElementById('ascii-feed');
const chars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

// We will render a rotating sphere in ASCII
let time = 0;

function renderSphere() {
    time += 0.1;
    let frame = '';
    const radius = 20;
    const width = 80;
    const height = 40;
    
    // light source
    const lx = Math.sin(time) * 30;
    const lz = Math.cos(time) * 30;
    const ly = -10;
    
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            // Project screen to coordinates
            const cx = x - width / 2;
            const cy = (y - height / 2) * 2; // correct aspect ratio roughly
            
            const dist = Math.sqrt(cx*cx + cy*cy);
            
            if(dist < radius) {
                // calculate Z on sphere
                const cz = Math.sqrt(radius*radius - dist*dist);
                
                // Normal
                const nx = cx / radius;
                const ny = cy / radius;
                const nz = cz / radius;
                
                // Light vector
                const lmag = Math.sqrt(lx*lx + ly*ly + lz*lz);
                const ldx = lx / lmag;
                const ldy = ly / lmag;
                const ldz = lz / lmag;
                
                // Dot product
                let dot = nx * ldx + ny * ldy + nz * ldz;
                dot = Math.max(0, dot); // 0 to 1
                
                let idx = Math.floor(dot * (chars.length - 1));
                frame += chars[idx];
            } else {
                // Background noise or empty
                frame += Math.random() > 0.95 ? '.' : ' ';
            }
        }
        frame += '\\n';
    }
    
    feed.innerText = frame;
    requestAnimationFrame(renderSphere);
}

renderSphere();
