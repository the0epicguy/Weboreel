const cursorBlob = document.querySelector('.cursor-blob');

document.addEventListener('mousemove', (e) => {
    // Pure fast tracking
    cursorBlob.style.left = \`\${e.clientX}px\`;
    cursorBlob.style.top = \`\${e.clientY}px\`;
});
