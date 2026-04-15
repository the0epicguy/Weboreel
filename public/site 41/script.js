// Custom Audio Cursor
const cursor = document.querySelector('.audio-cursor');
const interactiveParams = document.querySelectorAll('button, a, .track, .node');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactiveParams.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Sound Toggle Simulation
const muteBtn = document.getElementById('mute-btn');
let isPlaying = false;

muteBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    muteBtn.innerText = isPlaying ? "SOUND: ON" : "SOUND: OFF";
    if(isPlaying) {
        cursor.classList.add('playing');
        muteBtn.style.background = "var(--text-main)";
        muteBtn.style.color = "var(--white)";
    } else {
        cursor.classList.remove('playing');
        muteBtn.style.background = "transparent";
        muteBtn.style.color = "var(--text-main)";
    }
});

// Three.js Abstract Audio Waveform Simulator
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7f7f9); // match var(--bg-color)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('waveform-canvas'), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a mesh plane that we can distort
const geometry = new THREE.PlaneGeometry(30, 30, 60, 60);
const material = new THREE.MeshBasicMaterial({
    color: 0xd1d5db, // var(--border) color
    wireframe: true,
    transparent: true,
    opacity: 0.5
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2.5;
plane.position.y = -5;
scene.add(plane);

camera.position.z = 15;
camera.position.y = 2;

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    const positionAttribute = plane.geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    // Simulate audio frequencies causing terrain displacement
    let frequencyIntensity = isPlaying ? 3.0 : 0.5; // More intense if "audio" is ON
    
    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        
        // Simulating Perlin noise / waveform ripples
        const wave1 = Math.sin(vertex.x * 0.5 + time) * frequencyIntensity;
        const wave2 = Math.cos(vertex.y * 0.5 + time * 1.5) * frequencyIntensity;
        const dist = Math.sqrt(vertex.x*vertex.x + vertex.y*vertex.y);
        const wave3 = Math.sin(dist * 0.5 - time * 2) * (frequencyIntensity * 0.5);
        
        vertex.z = (wave1 + wave2 + wave3) * 0.5;
        positionAttribute.setZ(i, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    
    // Very slow rotation
    plane.rotation.z = time * 0.05;
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Album Art 3D Hover
const albumContainer = document.getElementById('album-art');
const albumImg = albumContainer.querySelector('img');
const glare = albumContainer.querySelector('.glare');

albumContainer.addEventListener('mousemove', (e) => {
    const rect = albumContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    albumImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Move glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 10%, transparent 60%)`;
});

albumContainer.addEventListener('mouseleave', () => {
    albumImg.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glare.style.background = `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)`;
});

// Timeline Drag to Scroll
const slider = document.querySelector('.timeline-scroll');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
});
slider.addEventListener('mouseup', () => {
    isDown = false;
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll fast
    slider.scrollLeft = scrollLeft - walk;
});
