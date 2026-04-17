const fp = document.querySelector('.fingerprint');
const laser = document.querySelector('.laser');
const scanLine = document.querySelector('.scan-line');
const progressFill = document.querySelector('.progress-fill');
const statusText = document.querySelector('.status');
const accessGranted = document.querySelector('.access-granted');

let isScanning = false;
let progress = 0;
let scanFrame;

fp.addEventListener('mousedown', () => {
    isScanning = true;
    laser.style.opacity = '1';
    scanLine.style.opacity = '1';
    statusText.innerText = "ANALYZING...";
    statusText.style.animation = 'none';
    scan();
});

document.addEventListener('mouseup', () => {
    isScanning = false;
    laser.style.opacity = '0';
    scanLine.style.opacity = '0';
    if(progress < 100) {
        progress = 0;
        progressFill.style.width = '0%';
        statusText.innerText = "HOLD TO SCAN";
        statusText.style.animation = 'blink 1s infinite alternate';
    }
    cancelAnimationFrame(scanFrame);
});

function scan() {
    if(!isScanning || progress >= 100) return;
    
    progress += 0.5;
    progressFill.style.width = progress + '%';
    
    // Animate laser
    const yPos = Math.sin(progress * 0.1) * 150 + window.innerHeight/2;
    laser.style.top = yPos + 'px';
    scanLine.style.backgroundPosition = \`0 \${progress * 5}%\`;
    
    if(progress >= 100) {
        statusText.innerText = "VERIFIED";
        accessGranted.style.display = 'block';
        fp.style.pointerEvents = 'none';
        
        // Flash screen
        document.body.style.backgroundColor = '#0f0';
        setTimeout(() => document.body.style.backgroundColor = '#051005', 100);
        return;
    }
    
    scanFrame = requestAnimationFrame(scan);
}
