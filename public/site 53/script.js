gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.z-cursor');
const interactives = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Three.js Wireframe Car Concept
const initCarSimulation = () => {
    const canvas = document.getElementById('car-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    
    // Add fog to blend into background
    scene.fog = new THREE.Fog(0x08080c, 10, 50);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(10, 3, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const carGroup = new THREE.Group();

    // Create an abstract blocky car shape out of wireframes to represent a high-tech EV layout
    // Main Body
    const bodyGeo = new THREE.BoxGeometry(4, 1, 8);
    // Cabin
    const cabinGeo = new THREE.BoxGeometry(3, 1.2, 4);
    
    const wireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.3 }); // Cyan
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x111116, transparent: true, opacity: 0.8 }); // Dark Panel
    
    // Edges
    const bodyEdges = new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), wireMat);
    const cabinEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cabinGeo), wireMat);
    cabinEdges.position.set(0, 1.1, -0.5);

    // Solid core to hide lines behind it
    const bodySolid = new THREE.Mesh(bodyGeo, solidMat);
    const cabinSolid = new THREE.Mesh(cabinGeo, solidMat);
    cabinSolid.position.set(0, 1.1, -0.5);

    carGroup.add(bodyEdges);
    carGroup.add(cabinEdges);
    carGroup.add(bodySolid);
    carGroup.add(cabinSolid);

    // Wheels (Abstract cylinders)
    const wheelGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 16);
    const wheelMat = new THREE.LineBasicMaterial({ color: 0x0055ff, transparent: true, opacity: 0.5 }); // Blue
    const positions = [
        [2.2, -0.5, 2.5], [-2.2, -0.5, 2.5],
        [2.2, -0.5, -2.5], [-2.2, -0.5, -2.5]
    ];
    
    positions.forEach(pos => {
        const wheel = new THREE.LineSegments(new THREE.EdgesGeometry(wheelGeo), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        carGroup.add(wheel);
    });

    // Base Grid
    const grid = new THREE.GridHelper(40, 40, 0x1e293b, 0x1e293b);
    grid.position.y = -1.3;
    scene.add(grid);

    // Position car offset to left
    carGroup.position.x = -3;
    scene.add(carGroup);

    let mouseX = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    });

    // Speed lines
    const linesGeo = new THREE.BufferGeometry();
    const lc = 100;
    const lPos = new Float32Array(lc * 3);
    for(let i=0; i<lc*3; i++) {
        lPos[i*3] = (Math.random() - 0.5) * 30;
        lPos[i*3+1] = Math.random() * 5 - 1;
        lPos[i*3+2] = Math.random() * 40 - 20;
    }
    linesGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    const linesMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.1 });
    const lines = new THREE.Points(linesGeo, linesMat);
    scene.add(lines);

    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle tilt based on mouse
        carGroup.rotation.y += (mouseX * 0.5 - carGroup.rotation.y) * 0.05;
        
        // Move grid to simulate driving
        grid.position.z += 0.5;
        if(grid.position.z > 1) {
            grid.position.z -= 1;
        }

        // Animate speed lines
        const posAttr = linesGeo.attributes.position.array;
        for(let i=0; i<lc; i++) {
            posAttr[i*3+2] += 1;
            if(posAttr[i*3+2] > 20) {
                posAttr[i*3+2] = -20;
            }
        }
        linesGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initCarSimulation();

// GSAP Animations
// Animate chart circle when in view
const fgCircle = document.querySelector('.fg-circle');
if(fgCircle) {
    ScrollTrigger.create({
        trigger: ".telemetry-section",
        start: "top 60%",
        onEnter: () => {
            // Stroke dash array is 283. Offset 0 means full. 283 means empty.
            fgCircle.style.strokeDashoffset = "0"; 
        }
    });
}

// Fade up text in telemetry
gsap.from(".t-info > *", {
    scrollTrigger: {
        trigger: ".telemetry-section",
        start: "top 60%"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
});
