const grid = document.getElementById('mine-grid');
const cellSize = 30;
const cols = Math.ceil(window.innerWidth / cellSize);
const rows = Math.ceil(window.innerHeight / cellSize);

let html = '';
// generate map logic
let map = [];
for(let x=0; x<cols; x++) {
    map[x] = [];
    for(let y=0; y<rows; y++) {
        map[x][y] = Math.random() < 0.15 ? -1 : 0;
    }
}

// Calculate neighbors
for(let x=0; x<cols; x++) {
    for(let y=0; y<rows; y++) {
        if(map[x][y] === -1) continue;
        let count = 0;
        for(let dx=-1; dx<=1; dx++) {
            for(let dy=-1; dy<=1; dy++) {
                if(x+dx >= 0 && x+dx < cols && y+dy >= 0 && y+dy < rows) {
                    if(map[x+dx][y+dy] === -1) count++;
                }
            }
        }
        map[x][y] = count;
    }
}

// Render
for(let y=0; y<rows; y++) {
    for(let x=0; x<cols; x++) {
        const val = map[x][y];
        html += \`<div class="cell" data-x="\${x}" data-y="\${y}" data-val="\${val}"></div>\`;
    }
}
grid.innerHTML = html;

// Auto reveal on hover for a satisfying chain reaction
const cells = document.querySelectorAll('.cell');
cells.forEach(c => {
    c.addEventListener('mouseenter', () => reveal(c));
});

function reveal(cell) {
    if(cell.classList.contains('revealed')) return;
    
    cell.classList.add('revealed');
    const val = parseInt(cell.dataset.val);
    
    if(val === -1) {
        cell.innerText = '💣';
        cell.style.backgroundColor = 'red';
    } else if (val > 0) {
        cell.innerText = val;
        cell.classList.add(\`c-\${val}\`);
    } else {
        // chain reveal empty neighbors safely avoiding deep recursion limit by using tiny timeout
        const ox = parseInt(cell.dataset.x);
        const oy = parseInt(cell.dataset.y);
        
        setTimeout(() => {
            for(let dx=-1; dx<=1; dx++) {
                for(let dy=-1; dy<=1; dy++) {
                    const nx = ox + dx;
                    const ny = oy + dy;
                    if(nx>=0 && nx<cols && ny>=0 && ny<rows) {
                        const next = document.querySelector(\`.cell[data-x="\${nx}"][data-y="\${ny}"]\`);
                        if(next) reveal(next);
                    }
                }
            }
        }, 10);
    }
}
