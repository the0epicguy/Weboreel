const cursor = document.querySelector('.cursor-dot');
const hoverTargets = document.querySelectorAll('.hover-target');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

    target.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('inverted');
        document.body.classList.add('interacting');
        
        setTimeout(() => {
            document.body.classList.remove('interacting');
        }, 500);
    });
});

// Audio feedback (crude glitch noise)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playGlitch() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

document.addEventListener('click', playGlitch);
