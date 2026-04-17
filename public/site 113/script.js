const tunnel = document.getElementById('tunnel');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

const drops = [];
const numDrops = 150;

for(let i=0; i<numDrops; i++) {
    const d = document.createElement('div');
    d.className = 'droplet';
    tunnel.appendChild(d);
    
    // Spread them in a 3D volume
    drops.push({
        el: d,
        x: (Math.random() - 0.5) * window.innerWidth * 2,
        y: (Math.random() - 0.5) * window.innerHeight * 2,
        z: Math.random() * -2000,
        speed: Math.random() * 5 + 5,
        txt: generateRainBlock()
    });
}

function generateRainBlock() {
    let str = '';
    const len = Math.floor(Math.random() * 20) + 10;
    for(let j=0; j<len; j++) {
        str += chars[Math.floor(Math.random() * chars.length)] + '\\n';
    }
    return str;
}

function animate() {
    drops.forEach(drop => {
        // Move towards camera
        drop.z += drop.speed;
        
        // Change text occasionally
        if(Math.random() > 0.95) {
            drop.txt = generateRainBlock();
            drop.el.innerText = drop.txt;
        }
        
        // Reset if it passes camera
        if(drop.z > 800) {
            drop.z = -2000;
            drop.x = (Math.random() - 0.5) * window.innerWidth * 2;
            drop.y = (Math.random() - 0.5) * window.innerHeight * 2;
        }
        
        // The opacity decreases into distance
        const opacity = Math.min(1, Math.max(0.1, (drop.z + 2000) / 2500));
        drop.el.style.opacity = opacity;
        
        drop.el.style.transform = \`translate3d(\${drop.x}px, \${drop.y}px, \${drop.z}px)\`;
    });
    
    requestAnimationFrame(animate);
}

// Initial set
drops.forEach(d => d.el.innerText = d.txt);
animate();
