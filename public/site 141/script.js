document.addEventListener('DOMContentLoaded', () => {
    const light = document.querySelector('.interactive-light');
    const cards = document.querySelectorAll('.glass-card');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Follow mouse for the subtle background light
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        requestAnimationFrame(() => {
            light.style.left = `${mouseX}px`;
            light.style.top = `${mouseY}px`;
        });
    });

    // Subtly tilt cards based on mouse position relative to the card
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // max tilt 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            // Wait for transition to finish then reset property to default hover state
            setTimeout(() => {
                if(!card.matches(':hover')) {
                    card.style.transform = '';
                }
            }, 300);
        });
    });
});
