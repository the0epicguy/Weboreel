// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const interactiveElements = document.querySelectorAll('a, button, input, .feature-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Typewriter Effect for Hero Title
const titleElement = document.getElementById('hero-title');
const textToType = "NEXUS AI";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        titleElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
}
setTimeout(typeWriter, 500);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".feature-card", {
    scrollTrigger: {
        trigger: ".platform",
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Number Counter Animation
const counters = document.querySelectorAll('.counter');
const metricsSection = document.querySelector('.metrics');

let countStarted = false;

ScrollTrigger.create({
    trigger: ".metrics",
    start: "top 80%",
    onEnter: () => {
        if(!countStarted) {
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out quadratic
                    const easeProgress = progress * (2 - progress);
                    
                    const current = (easeProgress * target).toFixed(target % 1 === 0 ? 0 : 2);
                    counter.innerText = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target;
                    }
                }
                
                requestAnimationFrame(update);
            });
            countStarted = true;
        }
    }
});

// Terminal Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const mockCommands = {
    'help': 'Available commands: nexus deploy, nexus logs, nexus scale --nodes=5',
    'nexus deploy': 'Initializing build...\nPackaging containers [100%]\nDeploying to production region (us-east-1)...\nSuccess: App live at https://nexus.app/prod',
    'nexus logs': 'Tail from production cluster:\n[INFO] Request routed to edge node 4\n[WARN] High memory usage detected on auth-service\n[INFO] Auto-scaling triggered: +2 instances added.',
    'nexus scale --nodes=5': 'Scale command received.\nProvisioning 5 new nodes...\nNodes active. Routing traffic.'
};

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value.trim();
        if(cmd) {
            // Echo command
            const cmdLine = document.createElement('div');
            cmdLine.className = 'line';
            cmdLine.innerHTML = `<span class="prompt">nexus></span> ${cmd}`;
            terminalOutput.appendChild(cmdLine);
            
            // Response
            const responseLine = document.createElement('div');
            responseLine.className = 'line';
            responseLine.style.color = '#ccc';
            
            if (mockCommands[cmd]) {
                responseLine.innerText = mockCommands[cmd];
            } else {
                responseLine.innerText = `Command not found: ${cmd}. Type 'help' for options.`;
            }
            
            setTimeout(() => {
                terminalOutput.appendChild(responseLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 300);
            
            this.value = '';
        }
    }
});

// Three.js Neural Network Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('neural-canvas'), alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500; // Reduced for performance, but looks elegant
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Connecting lines logic
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x888888,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Add lines
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.15
});

// Not full connection to save performance, just visual aesthetics
const lineGeometry = new THREE.BufferGeometry();
const linePositions = [];

for(let i = 0; i < particlesCount; i++) {
    for(let j = i+1; j < particlesCount; j++) {
        const x1 = posArray[i*3];
        const y1 = posArray[i*3+1];
        const z1 = posArray[i*3+2];
        const x2 = posArray[j*3];
        const y2 = posArray[j*3+1];
        const z2 = posArray[j*3+2];
        
        const dist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2) + Math.pow(z1-z2, 2));
        
        if(dist < 1.0) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
        }
    }
}

lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(linesMesh);

camera.position.z = 3;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    // Slow rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    linesMesh.rotation.y = elapsedTime * 0.05;
    
    // Parallax effect
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll interaction for Neural Network Morph
ScrollTrigger.create({
    trigger: ".platform",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
        particlesMesh.position.y = self.progress * 2;
        linesMesh.position.y = self.progress * 2;
        particlesMesh.scale.set(1 - self.progress*0.5, 1 - self.progress*0.5, 1);
        linesMesh.scale.set(1 - self.progress*0.5, 1 - self.progress*0.5, 1);
    }
});
