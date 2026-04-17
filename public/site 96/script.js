const grid = document.getElementById('hex-grid');

const hexWidth = 104; 
const hexHeight = 86; 

const cols = Math.ceil(window.innerWidth / hexWidth) + 1;
const rows = Math.ceil(window.innerHeight / hexHeight) + 2;

let html = '';
for(let r=0; r<rows; r++) {
    html += '<div class="hex-row">';
    for(let c=0; c<cols; c++) {
        html += '<div class="hex"></div>';
    }
    html += '</div>';
}
grid.innerHTML = html;

const hexes = document.querySelectorAll('.hex');

hexes.forEach(hex => {
    hex.addEventListener('mouseenter', () => {
        if (hex.classList.contains('glow')) return;
        
        hex.classList.add('glow');
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        const c = colors[Math.floor(Math.random() * colors.length)];
        hex.style.background = c;
        hex.style.filter = `drop-shadow(0 0 10px ${c})`;
        
        setTimeout(() => {
            hex.classList.remove('glow');
            hex.style.background = '#111';
            hex.style.filter = 'none';
        }, 1000);
    });
});
