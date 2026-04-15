// Custom Reticle Cursor
const reticle = document.querySelector('.reticle');
const interactiveParams = document.querySelectorAll('button, a, .character-card');

document.addEventListener('mousemove', (e) => {
    reticle.style.left = e.clientX + 'px';
    reticle.style.top = e.clientY + 'px';
});

interactiveParams.forEach(el => {
    el.addEventListener('mouseenter', () => reticle.classList.add('target'));
    el.addEventListener('mouseleave', () => reticle.classList.remove('target'));
});

// Three.js Vortex Hero Background
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.002);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('vortex-canvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 3000;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i+=3) {
    // Cylindrical coordinates for vortex
    const radius = Math.random() * 20 + 2;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 50;
    
    posArray[i] = radius * Math.cos(theta);     // x
    posArray[i+1] = y;                          // y
    posArray[i+2] = radius * Math.sin(theta);   // z
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Shards material
const material = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.y = 10;
camera.position.z = 25;
camera.lookAt(0,0,0);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    particlesMesh.rotation.y = elapsedTime * -0.2;
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;
    
    // Deform particles slightly to feel like a vortex
    const positions = particlesMesh.geometry.attributes.position.array;
    for(let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // The further out, the faster they spin
        const x = positions[i3];
        const z = positions[i3+2];
        const radius = Math.sqrt(x*x + z*z);
        const angularVelocity = 0.01 / (radius * 0.1);
        
        // Simple manual rotation
        const newX = x * Math.cos(angularVelocity) - z * Math.sin(angularVelocity);
        const newZ = x * Math.sin(angularVelocity) + z * Math.cos(angularVelocity);
        
        positions[i3] = newX;
        positions[i3+2] = newZ;
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;
    
    // Parallax
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.lookAt(0,0,0);
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lore Parallax
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to('.layer-back', { x: -x*2, y: -y*2, duration: 1, ease: 'power2.out' });
});

// Carousel Logic
const cards = document.querySelectorAll('.character-card');
let currentIndex = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.className = 'character-card';
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        }
    });
}
updateCarousel();

document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});
document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});
