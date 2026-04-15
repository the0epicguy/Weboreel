gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor-glow');
const interactives = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    // Smoother laggy follow for relaxed feel
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Nav Scroll transition
const nav = document.querySelector('.serene-nav');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Three.js Soft Abstract Fluid Background using Plane distortion
const initFluid = () => {
    const canvas = document.getElementById('fluid-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f1eb); // matches var(--sand)
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a highly subdivided plane
    const geometry = new THREE.PlaneGeometry(30, 20, 100, 100);
    
    // Custom material to look like soft linen/waves
    const material = new THREE.MeshBasicMaterial({
        color: 0xe8e3dc, // matches var(--linen)
        wireframe: false,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 4;
    scene.add(plane);

    const clock = new THREE.Clock();
    let targetIntensity = 0.5;

    // React to mouse movement
    document.addEventListener('mousemove', (e) => {
        // Increase intensity when moving mouse
        targetIntensity = 1.5;
        // Reset after a bit
        clearTimeout(window.intensityTimeout);
        window.intensityTimeout = setTimeout(() => { targetIntensity = 0.5; }, 500);
    });

    let currentIntensity = 0.5;

    function animate() {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime() * 0.3; // very slow
        
        currentIntensity += (targetIntensity - currentIntensity) * 0.05;

        // Distort vertices based on sine waves
        const posAttribute = plane.geometry.getAttribute('position');
        const v = new THREE.Vector3();
        
        for (let i = 0; i < posAttribute.count; i++) {
            v.fromBufferAttribute(posAttribute, i);
            // Create a flowing multi-wave pattern
            const waveX = Math.sin(v.x * 0.5 + time) * currentIntensity;
            const waveY = Math.cos(v.y * 0.3 - time) * currentIntensity;
            v.z = waveX + waveY;
            posAttribute.setZ(i, v.z);
        }
        
        posAttribute.needsUpdate = true;
        
        // Very slow gentle tilt
        plane.rotation.z = Math.sin(time * 0.5) * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initFluid();

// GSAP Reveal Animations for a serene experience
const rows = document.querySelectorAll('.t-row');
rows.forEach((row, index) => {
    gsap.from(row, {
        scrollTrigger: {
            trigger: row,
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: index * 0.1
    });
});

const spaceImgs = document.querySelectorAll('.space-img');
spaceImgs.forEach((img, index) => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: ".space-section",
            start: "top 70%"
        },
        y: 60,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        delay: index * 0.2
    });
});
