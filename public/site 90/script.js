const container = document.querySelector('.cloth-container');

// inject lines
let html = '';
for(let i=0; i<40; i++) {
    html += `<div class="wave" style="animation-delay: ${-i * 0.15}s; animation-duration: ${3 + Math.random() * 2}s"></div>`;
}
container.innerHTML = html;

// Add some interactive breeze
document.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    
    // skew the container slightly based on mouse, maintaining centering
    container.style.transform = `translate(-50%, -50%) rotate(${-15 + normX * 10}deg) skew(${normY * 20}deg)`;
});
