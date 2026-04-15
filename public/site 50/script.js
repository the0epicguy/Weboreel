gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.chroma-cursor');
const interactives = document.querySelectorAll('a, button, .menu-toggle, .w-item');

document.addEventListener('mousemove', (e) => {
    // Quick follow
    const x = e.clientX;
    const y = e.clientY;
    
    // Smooth translation for the cursor
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.fullscreen-menu');
const menuLinks = document.querySelectorAll('.menu-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    menu.classList.toggle('open');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        menu.classList.remove('open');
    });
});

// Hover Reveal Logic (for Work items)
const workItems = document.querySelectorAll('.w-item');
const hoverReveal = document.querySelector('.hover-reveal');
const hiddenImg = document.querySelector('.hidden-img');

workItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const imgSrc = item.getAttribute('data-img');
        hiddenImg.src = imgSrc;
        hoverReveal.classList.add('active');
    });
    
    item.addEventListener('mouseleave', () => {
        hoverReveal.classList.remove('active');
    });
    
    item.addEventListener('mousemove', (e) => {
        // Move the reveal container near the mouse but with slight delay using GSAP
        gsap.to(hoverReveal, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Three.js Abstract Colorful Fluid Background
const initFluid = () => {
    const canvas = document.getElementById('fluid-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Using a custom fragment shader to create a wavy gradient effect
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Extremely math-heavy fluid looking shader
    const fragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;

        varying vec2 vUv;

        // Colors matching Chroma palette
        vec3 c1 = vec3(1.0, 0.18, 0.57); // #ff2e93
        vec3 c2 = vec3(1.0, 0.50, 0.0);  // #ff8000
        vec3 c3 = vec3(0.0, 0.89, 1.0);  // #00e5ff
        vec3 c4 = vec3(0.66, 0.0, 1.0);  // #aa00ff

        void main() {
            vec2 st = gl_FragCoord.xy / uResolution.xy;
            
            // Influence of mouse 
            vec2 mouseDist = st - uMouse;
            float influence = exp(-dot(mouseDist, mouseDist) * 10.0);

            // Time and distortion
            float t = uTime * 0.2;
            
            vec2 p = st * 3.0;
            p.x += sin(p.y * 2.0 + t) * 0.5;
            p.y -= cos(p.x * 2.0 - t + influence) * 0.5;

            // Generate noise/waves
            float n1 = sin(p.x * 2.0 + t + p.y) * 0.5 + 0.5;
            float n2 = sin(p.y * 3.0 - t * 0.5 + p.x) * 0.5 + 0.5;
            float n3 = sin((p.x + p.y) * 1.5 + t * 1.2) * 0.5 + 0.5;

            // Mix colors
            vec3 col = mix(c1, c2, n1);
            col = mix(col, c3, n2);
            col = mix(col, c4, n3 - influence * 0.5);

            gl_FragColor = vec4(col, 1.0);
        }
    `;

    const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Track mouse globally for shader
    document.addEventListener('mousemove', (e) => {
        uniforms.uMouse.value.x = e.clientX / window.innerWidth;
        uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight); // Invert Y
    });

    function animate() {
        requestAnimationFrame(animate);
        uniforms.uTime.value += 0.05;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uResolution.value.x = window.innerWidth;
        uniforms.uResolution.value.y = window.innerHeight;
    });
};

initFluid();

// Duplicate marquee text to ensure seamless scrolling
const track = document.querySelector('.marquee-track');
if(track) {
    track.innerHTML += track.innerHTML; // duplicate content
}
