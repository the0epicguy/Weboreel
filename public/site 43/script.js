// Custom Cursor & Compass Spin
const cursor = document.querySelector('.compass-cursor');
const rose = document.querySelector('.compass-rose');
const interactives = document.querySelectorAll('button, a, .cat-tile, .journey-card, input');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    // Spin compass based on mouse x movement
    const rotation = (e.clientX / window.innerWidth) * 360;
    rose.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Three.js Monochromatic Earth
const initGlobe = () => {
    const canvas = document.getElementById('earth-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    // Neutral background
    scene.background = new THREE.Color(0xF5EFEB); 

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    // Offset camera to the right so globe is on the right side
    camera.position.x = -1.5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a procedural textural earth look using standard materials 
    // Usually we use textures here, but for neutral styling, a wireframe+solid composite looks elegant
    
    // Core sphere (Clay colored)
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0xE1DAC7,
        emissive: 0x4A463F,
        emissiveIntensity: 0.1,
        shininess: 5
    });
    const earth = new THREE.Mesh(geometry, material);
    
    // Wireframe atmosphere to give "digital map" feel
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x8F8778,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const wireSphere = new THREE.Mesh(geometry, wireMat);
    wireSphere.scale.set(1.02, 1.02, 1.02);

    const globeGroup = new THREE.Group();
    globeGroup.add(earth);
    globeGroup.add(wireSphere);
    scene.add(globeGroup);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Draggable Earth Logic
    let isDragging = false;
    let preX = 0;
    
    // Inertia variables
    let targetRotationX = 0.002;
    let currentRotationX = 0.002;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        preX = e.clientX;
        document.body.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'none';
        // Let it naturally slow back down to default spin
        targetRotationX = 0.002;
    });

    window.addEventListener('mousemove', (e) => {
        if(isDragging) {
            const dx = e.clientX - preX;
            targetRotationX = dx * 0.005; // Set target speed based on drag
            preX = e.clientX;
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Lerp rotation speed for smooth inertia
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        globeGroup.rotation.y += currentRotationX;
        
        // Slight tilt
        globeGroup.rotation.z = Math.PI * 0.05;
        globeGroup.rotation.x = Math.PI * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initGlobe();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".journey-card", {
    scrollTrigger: {
        trigger: ".curated-journeys",
        start: "top 70%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

gsap.from(".cat-tile", {
    scrollTrigger: {
        trigger: ".experiences",
        start: "top 60%"
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});
