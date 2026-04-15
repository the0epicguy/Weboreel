// Custom Cursor
const cursor = document.querySelector('.i-cursor');
const interactives = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    // Smoothed trailing logic
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Dynamic Background Color based on scroll snap
const container = document.querySelector('.snap-container');
const sections = document.querySelectorAll('.snap-section');

container.addEventListener('scroll', () => {
    let currentSection = sections[0];
    let minDiff = Math.abs(container.scrollTop - currentSection.offsetTop);

    // Find the section closest to the top of the scroll container
    sections.forEach(sec => {
        let diff = Math.abs(container.scrollTop - sec.offsetTop);
        if (diff < minDiff) {
            minDiff = diff;
            currentSection = sec;
        }
    });

    // Get color, default to original if null
    const color = currentSection.getAttribute('data-color') || '#FCFBFA';
    document.body.style.backgroundColor = color;
});

// Three.js Ethereal Smoke Background Simulation
// Uses a particle system with a smoke texture mapping
const initSmoke = () => {
    const canvas = document.getElementById('smoke-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a procedural smoke texture using a canvas to avoid external image deps
    const createSmokeTexture = () => {
        const texCanvas = document.createElement('canvas');
        texCanvas.width = 128;
        texCanvas.height = 128;
        const ctx = texCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        // Soft white gradient
        gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(texCanvas);
    };

    const smokeTexture = createSmokeTexture();
    const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0x555555, // Greyish smoke, blends via mix-blend-mode in CSS
        map: smokeTexture,
        transparent: true,
        opacity: 0.6
    });

    const smokeGeo = new THREE.PlaneGeometry(300, 300);
    const smokeParticles = [];

    // Create 40 smoke planes
    for (let p = 0; p < 40; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
            (Math.random() - 0.5) * 800,
            (Math.random() - 0.5) * 800,
            (Math.random() - 0.5) * 800
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 0, 1);
    scene.add(light);
    
    // Ambient light
    scene.add(new THREE.AmbientLight(0x404040, 2));

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.5;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle panning
        camera.position.x += (mouseX - camera.position.x) * 0.01;
        camera.position.y += (-mouseY - camera.position.y) * 0.01;
        camera.lookAt(scene.position);

        // Rotate individual smoke particles
        smokeParticles.forEach(p => {
            p.rotation.z += 0.002;
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initSmoke();

// Subtle entry animations when scrolling
gsap.registerPlugin(ScrollTrigger);

// Since we are using a custom scroll container for snapping, ScrollTrigger needs to know
ScrollTrigger.defaults({
    scroller: ".snap-container"
});

gsap.utils.toArray('.split-layout').forEach(layout => {
    gsap.from(layout.querySelector('.p-img'), {
        scrollTrigger: {
            trigger: layout,
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });
    
    gsap.from(layout.querySelector('.p-text > *'), {
        scrollTrigger: {
            trigger: layout,
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
});
