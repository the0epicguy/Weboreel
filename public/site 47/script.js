// Custom Tactical Cursor
const cursor = document.querySelector('.tactical-cursor');
const interactives = document.querySelectorAll('button, a, .m-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Update HUD Time
const timeEl = document.getElementById('hud-time');
setInterval(() => {
    const d = new Date();
    timeEl.innerText = `T+ ${d.getUTCHours().toString().padStart(2,'0')}:${d.getUTCMinutes().toString().padStart(2,'0')}:${d.getUTCSeconds().toString().padStart(2,'0')} UTC`;
}, 1000);

// Warp Speed Starfield (Grayscale/Neutral)
const initWarp = () => {
    const canvas = document.getElementById('warp-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Star geometry
    const starGeo = new THREE.BufferGeometry();
    const starCount = 6000;
    const posArray = new Float32Array(starCount * 3);
    const velArray = new Float32Array(starCount); // store velocities

    for(let i=0; i<starCount; i++) {
        posArray[i*3] = Math.random() * 600 - 300;
        posArray[i*3+1] = Math.random() * 600 - 300;
        posArray[i*3+2] = Math.random() * 600 - 300;
        velArray[i] = 0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    let starMat = new THREE.PointsMaterial({
        color: 0xe5e5e5, // platinum
        size: 0.7,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    function animateWarp() {
        requestAnimationFrame(animateWarp);
        
        const positions = starGeo.attributes.position.array;
        
        for(let i=0; i<starCount; i++) {
            velArray[i] += 0.02; // acceleration
            positions[i*3+1] -= velArray[i]; // move along Y axis (due to cam rotation)
            
            if(positions[i*3+1] < -200) {
                positions[i*3+1] = 200;
                velArray[i] = 0;
            }
        }
        starGeo.attributes.position.needsUpdate = true;
        
        stars.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    animateWarp();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initWarp();

// Fleet Section Ship Rendering (Abstract Rocket)
const initShip = () => {
    const canvas = document.getElementById('ship-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 15);
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Create a stylized abstract rocket representation using primitives
    const rocketGroup = new THREE.Group();

    // Main fuselage (Cylinder)
    const bodyGeo = new THREE.CylinderGeometry(1, 1, 8, 32);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xe5e5e5, shininess: 80 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    rocketGroup.add(body);

    // Nose cone
    const noseGeo = new THREE.ConeGeometry(1, 2, 32);
    const noseMat = new THREE.MeshPhongMaterial({ color: 0x8c92ac });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.y = 5;
    rocketGroup.add(nose);

    // Engine nozzle
    const engineGeo = new THREE.CylinderGeometry(0.8, 1.2, 1, 32);
    const engineMat = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
    const engine = new THREE.Mesh(engineGeo, engineMat);
    engine.position.y = -4.5;
    rocketGroup.add(engine);

    // Add some wireframe rings for scientific/blueprint look
    for(let i=0; i<4; i++) {
        const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 50);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = -3 + (i * 2);
        rocketGroup.add(ring);
    }

    // Slightly tilt for cinematic look, place it on the left
    rocketGroup.rotation.z = Math.PI * 0.1;
    rocketGroup.rotation.x = Math.PI * 0.1;
    rocketGroup.position.x = -2;
    scene.add(rocketGroup);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0x8c92ac, 0.5); // cool grey backlight
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    function animateShip() {
        requestAnimationFrame(animateShip);
        rocketGroup.rotation.y += 0.005; // slow spin
        renderer.render(scene, camera);
    }
    animateShip();
};
initShip();

// Fleet Tab Logic
const shipData = {
    ship1: { name: 'SH-VANGUARD', desc: 'Heavy-lift orbital class rocket. Fully reusable first stage. Designed to carry satellites into Low Earth Orbit.', spec1: '22,800 KG', spec2: '70 M' },
    ship2: { name: 'SH-ORION', desc: 'Deep space exploration vessel. Features experimental plasma propulsion for shortened Mars transit times.', spec1: '14,000 KG', spec2: '85 M' },
    ship3: { name: 'SH-APOLLO', desc: 'Automated resupply capsule. Capable of autonomously docking with the International Space Station or Lunar Gateway.', spec1: '6,000 KG', spec2: '12 M' }
};

const shipBtns = document.querySelectorAll('.ship-btn');
const sName = document.getElementById('si-name');
const sDesc = document.getElementById('si-desc');
const specs = document.querySelectorAll('.spec');

shipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        shipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const data = shipData[btn.getAttribute('data-target')];
        
        // Simple GSAP text change animation
        gsap.to([sName, sDesc, specs], { opacity: 0, duration: 0.2, onComplete: () => {
            sName.innerText = data.name;
            sDesc.innerText = data.desc;
            specs[0].innerHTML = `<span>PAYLOAD TO LEO</span><br>${data.spec1}`;
            specs[1].innerHTML = `<span>HEIGHT</span><br>${data.spec2}`;
            gsap.to([sName, sDesc, specs], { opacity: 1, duration: 0.2 });
        }});
    });
});
