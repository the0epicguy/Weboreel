// Custom Cursor
const cursor = document.querySelector('.echo-cursor');
const interactives = document.querySelectorAll('a, button, .ep-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Play button toggle simulation
const playBtn = document.getElementById('play-toggle');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if(isPlaying) {
        // Change to pause icon
        playBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="var(--bg-dark)"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        playBtn.style.transform = 'scale(0.9)';
        setTimeout(() => playBtn.style.transform = 'scale(1)', 100);
    } else {
        // Change to play icon
        playBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }
});

// Three.js Abstract Audio Visualizer (Simulated data)
const initVisualizer = () => {
    const container = document.getElementById('visualizer-container');
    if(!container) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create a circular spectrum visualizer using lines
    const barCount = 120;
    const radius = 30;
    const visualizerGroup = new THREE.Group();
    
    // Store reference to lines to animate them later
    const bars = [];
    const material = new THREE.LineBasicMaterial({ 
        color: 0x00ff66, // neon green
        transparent: true, 
        opacity: 0.6 
    });

    for(let i=0; i<barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        
        // Base line geometry
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0)); // inner point
        points.push(new THREE.Vector3(0, 5, 0)); // outer point (will be scaled)
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        
        // Position appropriately in a circle
        line.position.x = Math.cos(angle) * radius;
        line.position.z = Math.sin(angle) * radius;
        
        // Rotate so it faces outwards
        line.rotation.y = -angle;
        
        // Store base height for animation
        line.userData = {
            baseHeight: Math.random() * 2 + 1,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.05 + 0.02
        };
        
        bars.push(line);
        visualizerGroup.add(line);
    }

    // Add a center grid sphere
    const sphereGeo = new THREE.IcosahedronGeometry(radius * 0.8, 1);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x27272a, wireframe: true, transparent: true, opacity: 0.3 });
    const core = new THREE.Mesh(sphereGeo, sphereMat);
    visualizerGroup.add(core);

    scene.add(visualizerGroup);
    
    // Tilt group for perspective
    visualizerGroup.rotation.x = Math.PI * 0.1;
    
    // Move it to the right of the screen
    visualizerGroup.position.x = 40;

    let targetRotY = 0;
    let targetRotX = Math.PI * 0.1;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        targetRotY = x * 0.2;
        targetRotX = (Math.PI * 0.1) + (y * 0.1);
    });

    function animate() {
        requestAnimationFrame(animate);

        // Smooth rotation following mouse
        visualizerGroup.rotation.y += (targetRotY - visualizerGroup.rotation.y) * 0.05;
        visualizerGroup.rotation.x += (targetRotX - visualizerGroup.rotation.x) * 0.05;
        
        // Core auto-rotation
        core.rotation.y += 0.005;
        core.rotation.x += 0.002;

        // Animate the bars
        bars.forEach(bar => {
            bar.userData.phase += bar.userData.speed;
            
            // If playing, make it jumpy and intense. If not, gentle wave.
            let scale;
            if(isPlaying) {
                // Simulating audio peaks
                const peak = Math.random() > 0.9 ? Math.random() * 4 : 0;
                scale = bar.userData.baseHeight + Math.sin(bar.userData.phase) * 2 + peak;
            } else {
                scale = bar.userData.baseHeight + Math.sin(bar.userData.phase) * 0.5;
            }
            
            // Ensure scale doesn't go below 0.1
            scale = Math.max(0.1, scale);
            bar.scale.y = scale;
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

initVisualizer();
