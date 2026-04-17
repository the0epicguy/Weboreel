const flash = document.querySelector('.subliminal-flash');
const txt = flash.querySelector('h2');
const messages = ['WAKE UP', 'OBEY', 'CONSUME', 'THEY LIVE', 'SUBMIT'];

function triggerFlash() {
    // Pick random message
    txt.innerText = messages[Math.floor(Math.random() * messages.length)];
    
    // Flash for random duration between 20ms and 50ms (barely perceptible)
    flash.style.opacity = '1';
    
    setTimeout(() => {
        flash.style.opacity = '0';
        
        // Schedule next
        const nextTime = Math.random() * 5000 + 3000; // 3 to 8 seconds
        setTimeout(triggerFlash, nextTime);
    }, Math.random() * 30 + 20);
}

// Start first
setTimeout(triggerFlash, 2000);

// Interaction triggers it too occasionally
document.addEventListener('click', () => {
    if(Math.random() > 0.5) triggerFlash();
});
