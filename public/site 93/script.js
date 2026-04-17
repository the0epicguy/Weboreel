const maze = document.getElementById('maze');
const chars = ['█', '▓', '▒', '░'];
const pathChar = '·';

// Estimate rows and cols based on viewport and font size
// font-size is 1.5rem ~ 24px width approx 14.4px
const colCount = Math.floor(window.innerWidth / 15);
const rowCount = Math.floor(window.innerHeight / 24);

maze.style.gridTemplateColumns = \`repeat(\${colCount}, 1fr)\`;
maze.style.gridTemplateRows = \`repeat(\${rowCount}, 1fr)\`;

let html = '';
for(let i=0; i < colCount * rowCount; i++) {
    const isWall = Math.random() > 0.1; // Mostly walls
    const content = isWall ? chars[Math.floor(Math.random() * chars.length)] : pathChar;
    const cls = isWall ? 'wall' : 'path';
    html += \`<div class="cell \${cls}">\${content}</div>\`;
}
maze.innerHTML = html;

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        if(cell.classList.contains('wall')) {
            cell.innerText = pathChar;
            cell.className = 'cell path';
        }
    });
});

// Periodically scramble un-dug walls to keep it lively
setInterval(() => {
    document.querySelectorAll('.wall').forEach(wall => {
        if(Math.random() > 0.95) {
            wall.innerText = chars[Math.floor(Math.random() * chars.length)];
        }
    });
}, 200);
