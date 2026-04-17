const container = document.getElementById('kaleido-container');
const numSlices = 8;
const angle = 360 / numSlices;

let html = '';
for(let i=0; i<numSlices; i++) {
    // Alternate flipping for mirror effect
    const scaleX = (i % 2 === 0) ? 1 : -1;
    // Rotate slice into position
    const rot = i * angle;
    
    html += \`
        <div class="slice" style="transform: rotate(\${rot}deg) scaleX(\${scaleX});">
            <div class="slice-inner" id="inner-\${i}"></div>
        </div>
    \`;
}
container.innerHTML = html;

const inners = document.querySelectorAll('.slice-inner');

document.addEventListener('mousemove', (e) => {
    const rx = e.clientX / window.innerWidth;
    const ry = e.clientY / window.innerHeight;
    
    // Pan the internal background around to create the shifting pattern
    const panX = rx * 100;
    const panY = ry * 100;
    
    inners.forEach(inner => {
        inner.style.transform = \`translate(\${panX}%, \${panY}%)\`;
    });
});
