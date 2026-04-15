gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.arch-cursor');
const links = document.querySelectorAll('a, .acc-head');
const scrollZone = document.querySelector('.horizontal-scroll-container');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

links.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

if(scrollZone) {
    scrollZone.addEventListener('mouseenter', () => cursor.classList.add('drag'));
    scrollZone.addEventListener('mouseleave', () => cursor.classList.remove('drag'));
}

// Three.js Architectural Blueprint/Wireframe
const initArch3D = () => {
    const canvas = document.getElementById('arch-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White
    
    // Orthographic camera for that blueprint/isometric feel
    const aspect = window.innerWidth / window.innerHeight;
    const d = 10;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(scene.position);
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create abstract building blocks
    const archGroup = new THREE.Group();
    
    // Material (wireframe + minimal shading)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x8a8d91, transparent: true, opacity: 0.5 }); // steel color
    // const solidMat = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
    
    // Function to add a wireframe box
    const addBlock = (w, h, d, x, y, z) => {
        const geo = new THREE.BoxGeometry(w, h, d);
        const edges = new THREE.EdgesGeometry(geo);
        const lines = new THREE.LineSegments(edges, lineMat);
        lines.position.set(x, y, z);
        archGroup.add(lines);
    };

    // Construct an abstract brutalist/modernist structure
    addBlock(6, 4, 6, 0, 2, 0); // Core
    addBlock(10, 1, 4, 2, 4.5, 0); // Cantilever
    addBlock(3, 8, 3, -1.5, 4, -1.5); // Tower
    addBlock(8, 0.5, 8, 0, -0.25, 0); // Base
    
    // Add grid floor
    const gridHelper = new THREE.GridHelper(40, 40, 0xe6e6e6, 0xe6e6e6);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Position group to the right
    archGroup.position.x = 4;
    scene.add(archGroup);

    let mouseX = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle rotation
        archGroup.rotation.y += 0.001;
        // Interactive tilt
        archGroup.rotation.x = mouseX * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initArch3D();

// Horizontal Scroll Logic (Drag to scroll)
const slider = document.querySelector('.horizontal-scroll-container');
let isDown = false;
let startX;
let scrollLeft;

if(slider) {
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
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Map vertical scroll wheel to horizontal scrolling if hovered
    slider.addEventListener('wheel', (e) => {
        if(e.deltaY !== 0) {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        }
    }, {passive: false});
}

// Accordion
const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
        // Toggle current
        const isActive = item.classList.contains('active');
        // Close all
        accItems.forEach(i => i.classList.remove('active'));
        // Open if wasn't active
        if(!isActive) item.classList.add('active');
    });
});
