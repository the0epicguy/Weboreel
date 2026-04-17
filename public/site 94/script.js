const grid = document.getElementById('elastic-grid');
const numRows = 5;
const numCols = 8;
const letters = 'ELASTICGRIDMAKESFUNNYNOISES!'.split('');

let html = '';
for(let r=0; r<numRows; r++) {
    html += '<div class="row">';
    for(let c=0; c<numCols; c++) {
        const char = letters[(r * numCols + c) % letters.length];
        html += \`<div class="cell">\${char}</div>\`;
    }
    html += '</div>';
}
grid.innerHTML = html;
