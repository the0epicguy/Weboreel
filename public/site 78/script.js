// Background random text
const bg = document.querySelector('.marquee-bg');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
let txt = '';
for(let i=0; i<3000; i++) {
    txt += chars.charAt(Math.floor(Math.random() * chars.length));
}
bg.innerText = txt;

// Periodically update some chars
setInterval(() => {
    let newTxt = txt.split('');
    for(let i=0; i<50; i++) {
        const idx = Math.floor(Math.random() * newTxt.length);
        newTxt[idx] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    txt = newTxt.join('');
    bg.innerText = txt;
}, 100);

// Dragging logic
const windows = document.querySelectorAll('.window');
let activeZ = 10;

windows.forEach(win => {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    win.addEventListener('mousedown', (e) => {
        isDragging = true;
        win.classList.add('active');
        activeZ++;
        win.style.zIndex = activeZ;

        startX = e.clientX;
        startY = e.clientY;
        const rect = win.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        // Disable pure CSS top/left to use transform or just update top/left
        win.style.top = \`\${startTop + dy}px\`;
        win.style.left = \`\${startLeft + dx}px\`;
    });

    document.addEventListener('mouseup', () => {
        if(isDragging) {
            isDragging = false;
            win.classList.remove('active');
        }
    });
});
