// Gentle trailing cursor
const cursor = document.querySelector('.oura-cursor');
const interactives = document.querySelectorAll('a, button');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Update cursor with requestAnimationFrame for extreme smoothness
const updateCursor = () => {
    // using GSAP for the smoothing logic or simple lerp
    gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 2, // very slow dragging feel
        ease: "power2.out"
    });
    requestAnimationFrame(updateCursor);
};
updateCursor();

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Three.js Ambient Particle Field
const initAmbient = () => {
    const canvas = document.getElementById('ambient-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x03010b, 10, 800);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create soft glowing orbs
    const pGroup = new THREE.Group();
    scene.add(pGroup);

    const particleCount = 200;
    
    // Create a procedural soft circle texture
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(107,76,255,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);
    const texture = new THREE.CanvasTexture(texCanvas);

    const pMat = new THREE.PointsMaterial({
        size: 8,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.6
    });

    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pData = []; // to store unique speeds

    for(let i=0; i<particleCount; i++) {
        pPos[i*3] = (Math.random() - 0.5) * 600;
        pPos[i*3+1] = (Math.random() - 0.5) * 600;
        pPos[i*3+2] = (Math.random() - 0.5) * 600;

        pData.push({
            speed: Math.random() * 0.002 + 0.001,
            ang: Math.random() * Math.PI * 2,
            radius: Math.random() * 2 // slight orbital jitter
        });
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pSystem = new THREE.Points(pGeo, pMat);
    pGroup.add(pSystem);

    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle rotation of the whole field
        pGroup.rotation.y -= 0.0005;
        pGroup.rotation.z -= 0.0002;

        // Interactive camera sway
        const targetX = (mouseX - window.innerWidth / 2) * 0.05;
        const targetY = (mouseY - window.innerHeight / 2) * 0.05;

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initAmbient();

// Features Reveal
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.f-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%"
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });
});
