const canvas = document.getElementById('topo-canvas');
const ctx = canvas.getContext('2d');
const dataStream = document.getElementById('data-stream');

let width, height;
let cols, rows;
const scale = 30;
let zOff = 0;
let terrain = [];

function resize() {
    width = window.innerWidth * 2;
    height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;
    cols = Math.floor(width / scale);
    rows = Math.floor(height / scale);
    terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
}

resize();
window.addEventListener('resize', resize);

// Simple noise function replacement since we're using vanilla JS
function pseudoNoise(x, y, z) {
    return Math.sin(x * 0.1 + z) * Math.cos(y * 0.1 + z) * 50;
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    let yOff = 0;
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < cols; x++) {
            terrain[x][y] = pseudoNoise(xOff, yOff, zOff);
            xOff += 0.2;
        }
        yOff += 0.2;
    }
    zOff += 0.02;

    ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
    ctx.lineWidth = 1;

    for (let y = 0; y < rows - 1; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
            let px = x * scale;
            let py = y * scale + terrain[x][y];
            
            if (x === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.stroke();
    }
    
    // Update data stream
    if(Math.random() > 0.9) {
        let randomData = Math.random().toString(36).substring(2, 10).toUpperCase();
        dataStream.innerText = `SYS.SEC.V // ${randomData} // LOC: ${Math.floor(zOff*100)}`;
    }

    requestAnimationFrame(draw);
}

draw();
