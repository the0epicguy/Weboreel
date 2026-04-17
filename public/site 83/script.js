const h1 = document.querySelector('h1');

// Glitch effect on mouse move
document.addEventListener('mousemove', (e) => {
    const normX = e.clientX / window.innerWidth;
    if (Math.random() > 0.8) {
        h1.style.transform = \`skewX(\${(Math.random() - 0.5) * 10}deg)\`;
        h1.style.textShadow = \`
            \${Math.random() * 10 - 5}px \${Math.random() * 5}px 0px #ff00cc, 
            \${Math.random() * -10 + 5}px \${Math.random() * -5}px 0px #00ffff
        \`;
    } else {
        h1.style.transform = 'skewX(0)';
        h1.style.textShadow = '4px 4px 0px #ff00cc, -2px -2px 0px #fff';
    }
});

// Periodic heavy glitch
setInterval(() => {
    h1.style.clipPath = \`inset(\${Math.random() * 100}% 0 \${Math.random() * 100}% 0)\`;
    setTimeout(() => {
        h1.style.clipPath = 'none';
    }, 100);
}, 2000);
