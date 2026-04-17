const meter = document.querySelector('.led-meter');

// create LEDs
for(let i=0; i<10; i++) {
    const led = document.createElement('div');
    led.className = 'led';
    meter.appendChild(led);
}
const leds = document.querySelectorAll('.led');

// Knob logic
const knobs = document.querySelectorAll('.knob');
knobs.forEach(knob => {
    let startY = 0;
    let isActive = false;
    let initialVal = parseInt(knob.dataset.val);
    
    // Set initial rotation map 0-100 to -150deg to 150deg
    knob.style.transform = \`rotate(\${(initialVal / 100) * 300 - 150}deg)\`;

    knob.addEventListener('mousedown', (e) => {
        isActive = true;
        startY = e.clientY;
        initialVal = parseInt(knob.dataset.val);
        knob.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if(!isActive) return;
        const dy = startY - e.clientY;
        let setVal = initialVal + dy;
        setVal = Math.max(0, Math.min(100, setVal));
        knob.dataset.val = setVal;
        knob.style.transform = \`rotate(\${(setVal / 100) * 300 - 150}deg)\`;
    });

    document.addEventListener('mouseup', () => {
        isActive = false;
        knob.style.cursor = 'grab';
    });
});

// Switch logic
const sw = document.querySelector('.switch');
sw.addEventListener('click', () => {
    sw.classList.toggle('up');
});

// Fake meter activity
setInterval(() => {
    const val = Math.floor(Math.random() * 10);
    leds.forEach((led, i) => {
        if(i <= val) {
            led.classList.add('on');
        } else {
            led.classList.remove('on');
        }
    });
}, 100);
