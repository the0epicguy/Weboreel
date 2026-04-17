const status = document.querySelector('.status');
const container = document.querySelector('.video-container');

let jitterInterval;

document.addEventListener('mousedown', () => {
    document.body.classList.add('rewinding');
    status.innerText = "REWIND ◄◄";
    
    // Aggressive jitter
    jitterInterval = setInterval(() => {
        const offset = (Math.random() - 0.5) * 20;
        container.style.transform = \`translateX(\${offset}px)\`;
    }, 50);
});

document.addEventListener('mouseup', () => {
    document.body.classList.remove('rewinding');
    status.innerText = "PLAY ►";
    
    clearInterval(jitterInterval);
    container.style.transform = \`translateX(0px)\`;
});
