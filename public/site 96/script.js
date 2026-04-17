const grid = document.getElementById('hex-grid');

const hexWidth = 104; // 100 + margins
const hexHeight = 86; // approx row height increment

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
        hex.classList.add('glow');
        // Random neon color
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        const c = colors[Math.floor(Math.random() * colors.length)];
        hex.style.background = c;
        // box-shadow doesn't work perfectly with clip-path sometimes but CSS drop-shadow filter would. 
        // We'll just stick to background change for now.
        
        setTimeout(() => {
            hex.classList.remove('glow');
            hex.style.background = '#111';
        }, 1000);
    });
});
