gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cosmos-cursor');
const interactives = document.querySelectorAll('button, a, input, textarea, .course-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Code Editor Simulator
const runBtn = document.getElementById('run-btn');
const consoleOut = document.getElementById('console-output');
const codeInput = document.getElementById('code-input');

runBtn.addEventListener('click', () => {
    runBtn.innerText = "Running...";
    setTimeout(() => {
        const val = codeInput.value;
        if(val.includes('print(i)') || val.includes('print (i)')) {
            consoleOut.innerHTML = "> 1<br>> 2<br>> 3<br><span style='color: #F0EAE1;'>✔ Program exited successfully. +10 XP</span>";
        } else {
            consoleOut.innerHTML = "<span style='color: #ff5555;'>> SyntaxError: invalid syntax<br>> Hint: did you forget to print?</span>";
        }
        runBtn.innerText = "Run Code ▶";
    }, 800);
});

// Three.js Starfield (Neutral theme - white/beige dots)
const initStarfield = () => {
    const canvas = document.getElementById('cosmos-canvas');
    if(!canvas) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFAF8F5); // Matches --cream
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 800;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create constellations
    const particles = new THREE.BufferGeometry();
    const pCount = 800;
    const pArray = new Float32Array(pCount * 3);
    
    for(let i=0; i<pCount*3; i++) {
        pArray[i] = (Math.random() - 0.5) * 2000;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(pArray, 3));
    
    // Custom shader for depth-based fading to make it look nicer on white bg
    const pMaterial = new THREE.PointsMaterial({
        color: 0x3B332B, // mocha color dots
        size: 3,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);
    
    // Add some connecting lines to simulate "clusters of knowledge"
    const lineMat = new THREE.LineBasicMaterial({
        color: 0xD1CCB9, // taupe
        transparent: true,
        opacity: 0.3
    });
    
    const lineGeo = new THREE.BufferGeometry();
    const lArray = [];
    
    for(let i=0; i<100; i++) {
        const idx1 = Math.floor(Math.random() * pCount) * 3;
        const idx2 = Math.floor(Math.random() * pCount) * 3;
        if(Math.abs(pArray[idx1] - pArray[idx2]) < 200) {
            lArray.push(pArray[idx1], pArray[idx1+1], pArray[idx1+2]);
            lArray.push(pArray[idx2], pArray[idx2+1], pArray[idx2+2]);
        }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lArray, 3));
    const lineSystem = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSystem);

    function animateStars() {
        requestAnimationFrame(animateStars);
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        lineSystem.rotation.y += 0.001;
        lineSystem.rotation.x += 0.0005;
        renderer.render(scene, camera);
    }
    animateStars();
    
    // Mouse Parallax
    document.addEventListener('mousemove', (e) => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 100;
        const my = (e.clientY / window.innerHeight - 0.5) * 100;
        gsap.to(camera.position, {
            x: mx,
            y: -my,
            duration: 1
        });
        camera.lookAt(scene.position);
    });
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Three.js Subject Globe
const initGlobe = () => {
    const canvas = document.getElementById('globe-canvas');
    if(!canvas) return;
    
    const container = document.querySelector('.globe-container');
    const tooltip = document.querySelector('.globe-tooltip');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 300;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Globe Geometry
    const geometry = new THREE.IcosahedronGeometry(100, 2); // Low poly globe looks academic
    
    // Edges
    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x3B332B, linewidth: 1 });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    
    // Solid interior
    const material = new THREE.MeshBasicMaterial({ color: 0xF0EAE1, transparent: true, opacity: 0.9 });
    const globe = new THREE.Mesh(geometry, material);
    
    const globeGroup = new THREE.Group();
    globeGroup.add(globe);
    globeGroup.add(edges);
    scene.add(globeGroup);

    // Nodes (Subjects)
    const nodeGeo = new THREE.SphereGeometry(4, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x231E19 });
    
    const positions = [
        [80, 50, 40], [-60, 70, 50], [20, -90, 40], [-80, -20, 60]
    ];
    
    const nodes = [];
    positions.forEach((pos, i) => {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.set(...pos);
        globeGroup.add(mesh);
        // Store data
        nodes.push({
            mesh: mesh,
            name: ['Mathematics', 'Physics', 'Biology', 'Computer Science'][i],
            count: [412, 289, 530, 892][i]
        });
    });

    // Drag interaction
    let isDragging = false;
    let preX, preY;
    
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        preX = e.clientX;
        preY = e.clientY;
    });
    
    window.addEventListener('mouseup', () => { isDragging = false; });
    
    window.addEventListener('mousemove', (e) => {
        if(isDragging) {
            const dx = e.clientX - preX;
            const dy = e.clientY - preY;
            globeGroup.rotation.y += dx * 0.01;
            globeGroup.rotation.x += dy * 0.01;
            preX = e.clientX;
            preY = e.clientY;
        }
        
        // Raycaster for tooltip
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
        
        if(intersects.length > 0) {
            const hit = intersects[0].object;
            const nodeData = nodes.find(n => n.mesh === hit);
            tooltip.style.display = 'block';
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
            tooltip.innerHTML = `${nodeData.name}<br><span>${nodeData.count} Active Learners</span>`;
            document.body.style.cursor = 'none'; // Ensure custom cursor stays
        } else {
            tooltip.style.display = 'none';
        }
    });

    function animateGlobe() {
        requestAnimationFrame(animateGlobe);
        if(!isDragging) {
            globeGroup.rotation.y += 0.002;
            globeGroup.rotation.x += 0.001;
        }
        renderer.render(scene, camera);
    }
    animateGlobe();
};

initStarfield();
initGlobe();

// Scroll Animations
gsap.from(".step-card", {
    scrollTrigger: {
        trigger: ".how-it-works",
        start: "top 70%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});
