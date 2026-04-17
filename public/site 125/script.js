const container = document.getElementById('topo-container');

// We simulate a grid of heights
const cols = 20;
const rows = 20;

let svgHTML = \`<svg viewBox="0 0 1000 1000">\`;

// Generate paths for each row.
// We make them look somewhat isometric by offsetting X and Y.
for(let y=0; y<rows; y++) {
    svgHTML += \`<path id="row-\${y}"></path>\`;
}
svgHTML += \`</svg>\`;
container.innerHTML = svgHTML;

const paths = document.querySelectorAll('path');

let time = 0;

function updateTopo() {
    time += 0.05;
    
    for(let y=0; y<rows; y++) {
        let d = '';
        for(let x=0; x<cols; x++) {
            // Isometric projection base
            // Normally iso: 
            // px = (x - y) * blockWidth
            // py = (x + y) * blockHeight
            
            // Simpler: just pseudo 3D by spreading x, shifting y, and adding a height factor based on noise
            // We use simple sin waves instead of full simplex noise for performance without external libs
            
            const px = x * 50 + 20;
            const pyBase = y * 40 + 100;
            
            // Height formula
            const h = Math.sin(x*0.5 + time) * Math.cos(y*0.5 + time) * 100;
            const py = pyBase - Math.abs(h);
            
            if(x === 0) {
                d += \`M \${px} \${py}\`;
            } else {
                // smooth curve to next point
                d += \` L \${px} \${py}\`;
            }
        }
        paths[y].setAttribute('d', d);
        // Fade based on height
        paths[y].style.opacity = Math.max(0.1, 1 - (y/rows));
    }
    
    // We don't use requestAnimationFrame for SVG d-path updating for performance unless we want pure butter.
    // CSS transition handles smooth tweening if we lower tick rate.
    // Actually, setting interval to 200ms with a CSS transition of 0.2s is very clean.
}

updateTopo();
setInterval(updateTopo, 200);
