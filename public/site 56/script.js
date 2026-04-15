gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.q-cursor');
const interactives = document.querySelectorAll('a, button, .f-box');

document.addEventListener('mousemove', (e) => {
    // Immediate follow for this tech aesthetic
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Three.js Network Node Background (Connecting Particles)
const initNetwork = () => {
    const canvas = document.getElementById('network-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const group = new THREE.Group();
    scene.add(group);

    // Create particles
    const particleCount = 150;
    const particlesData = [];
    const positions = new Float32Array(particleCount * 3);

    const pMaterial = new THREE.PointsMaterial({
        color: 0x9933ff, // purple
        size: 3,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 600;
        const y = (Math.random() - 0.5) * 600;
        const z = (Math.random() - 0.5) * 600;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        particlesData.push({
            velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
            numConnections: 0
        });
    }

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleSystem = new THREE.Points(pGeometry, pMaterial);
    group.add(particleSystem);

    // Create lines for connections
    const maxConnections = 600;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineOpacities = new Float32Array(maxConnections);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    // Custom shader material for lines to support individual opacities
    const lMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff88, // green
        transparent: true,
        opacity: 0.15
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, lMaterial);
    group.add(linesMesh);

    // Rotate group slightly to put behind content on right
    group.position.x = 100;
    
    // Mouse interaction for network
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    });

    function animate() {
        requestAnimationFrame(animate);

        group.rotation.y += (mouseX * 0.01 - group.rotation.y) * 0.05;
        group.rotation.x += (mouseY * 0.01 - group.rotation.x) * 0.05;
        
        // Slow constant rotation
        group.rotation.y += 0.001;

        let vertexpos = 0;
        let numConnected = 0;

        // Reset connections count
        for (let i = 0; i < particleCount; i++)
            particlesData[i].numConnections = 0;

        // Move particles & check bounds
        for (let i = 0; i < particleCount; i++) {
            const particleData = particlesData[i];

            positions[i * 3] += particleData.velocity.x;
            positions[i * 3 + 1] += particleData.velocity.y;
            positions[i * 3 + 2] += particleData.velocity.z;

            // Bounce back
            if (positions[i * 3] < -300 || positions[i * 3] > 300) particleData.velocity.x = -particleData.velocity.x;
            if (positions[i * 3 + 1] < -300 || positions[i * 3 + 1] > 300) particleData.velocity.y = -particleData.velocity.y;
            if (positions[i * 3 + 2] < -300 || positions[i * 3 + 2] > 300) particleData.velocity.z = -particleData.velocity.z;

            // Check connections
            for (let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz); // simple dist

                if (dist < 80) { // Connect radius
                    if (numConnected < maxConnections) {
                        linePositions[vertexpos++] = positions[i * 3];
                        linePositions[vertexpos++] = positions[i * 3 + 1];
                        linePositions[vertexpos++] = positions[i * 3 + 2];

                        linePositions[vertexpos++] = positions[j * 3];
                        linePositions[vertexpos++] = positions[j * 3 + 1];
                        linePositions[vertexpos++] = positions[j * 3 + 2];

                        numConnected++;
                    }
                }
            }
        }

        linesMesh.geometry.setDrawRange(0, numConnected * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        particleSystem.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initNetwork();

// Simulated LIVE Order Book
const generateOrderRow = (type, priceDelta, depthPercent) => {
    const basePrice = 104230;
    const price = (basePrice + (type === 'sell' ? priceDelta : -priceDelta)).toFixed(2);
    const size = (Math.random() * 5 + 0.1).toFixed(4);
    
    return `
        <div class="ob-row ${type}">
            <div class="ob-depth" style="width: ${depthPercent}%"></div>
            <span class="p">${price}</span>
            <span class="v">${size}</span>
        </div>
    `;
};

const updateOrderBook = () => {
    const sellsContainer = document.getElementById('ob-sells');
    const buysContainer = document.getElementById('ob-buys');
    
    if(!sellsContainer || !buysContainer) return;

    let sellsHtml = '';
    let buysHtml = '';

    // Generate 6 rows each
    for(let i=6; i>0; i--) {
        sellsHtml += generateOrderRow('sell', i * 5.5, 20 + i * 10);
    }
    for(let i=1; i<=6; i++) {
        buysHtml += generateOrderRow('buy', i * 5.5, 20 + i * 10);
    }

    // Only update sometimes to simulate live but readable data
    if(Math.random() > 0.2) sellsContainer.innerHTML = sellsHtml;
    if(Math.random() > 0.2) buysContainer.innerHTML = buysHtml;
};

// Start update loop
setInterval(updateOrderBook, 800);
updateOrderBook(); // init

// Number Counter Animations using GSAP
gsap.to('.counter', {
    scrollTrigger: {
        trigger: ".metric-section",
        start: "top 80%"
    },
    innerHTML: 2,
    duration: 2,
    snap: { innerHTML: 1 }
});
gsap.to('.counter-billions', {
    scrollTrigger: {
        trigger: ".metric-section",
        start: "top 80%"
    },
    innerHTML: 45,
    duration: 2.5,
    snap: { innerHTML: 1 }
});
gsap.to('.counter-uptime', {
    scrollTrigger: {
        trigger: ".metric-section",
        start: "top 80%"
    },
    innerHTML: 99.99,
    duration: 3,
    // Note: GSAP innerHTML snap rounds to int by default, so we use a custom onUpdate for decimals
    onUpdate: function() {
        document.querySelector('.counter-uptime').innerHTML = this.targets()[0].innerHTML.slice(0, 5);
    } // simplified for visual effect
});
// Fixed decimal counter
let uptimeObj = { val: 0 };
gsap.to(uptimeObj, {
    scrollTrigger: { trigger: ".metric-section", start: "top 80%" },
    val: 99.99,
    duration: 3,
    ease: "power2.out",
    onUpdate: () => { document.querySelector('.counter-uptime').innerText = uptimeObj.val.toFixed(2); }
});
