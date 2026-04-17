document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking with easing for ring
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => ring.classList.add('active'));
        card.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });

    // Generate Stars for Paralax Layers
    function constructLayer(layerClass, numStars, sizeRange) {
        const layer = document.querySelector(layerClass);
        for(let i=0; i<numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * sizeRange[1] + sizeRange[0];
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            
            if(Math.random() > 0.8) {
               star.style.boxShadow = `0 0 ${size * 2}px #fff`; 
            }
            
            layer.appendChild(star);
        }
    }

    constructLayer('.layer-1', 200, [1, 2]);
    constructLayer('.layer-2', 100, [2, 3]);
    constructLayer('.layer-3', 30, [3, 5]); // Foreground larger stars

    // Mouse Parallax Effect
    const layers = document.querySelectorAll('.parallax-layer, .glass-card');
    
    // Smooth Animation Loop
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2);
        targetY = (e.clientY - window.innerHeight / 2);
    });

    function render() {
        // Smooth out target coords
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        // Apply Parallax translation
        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const x = currentX * speed;
            const y = currentY * speed;
            
            if (layer.classList.contains('glass-card')) {
                // Cards tilt in opposite direction slightly
                const tiltX = (currentY / window.innerHeight) * -20;
                const tiltY = (currentX / window.innerWidth) * 20;
                layer.style.transform = `translate(${x}px, ${y}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            } else {
                 layer.style.transform = `translate(${-x}px, ${-y}px)`;
            }
        });

        // Ring follows dot with delay
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(render);
    }

    render();
});
