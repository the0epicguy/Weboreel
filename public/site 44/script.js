// Custom Reticle
const cursor = document.querySelector('.reticle-cursor');
const interactives = document.querySelectorAll('button, a, .prog-card, .bar');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Three.js Abstract Wireframe Anatomy Simulation (Neutral geometry)
const init3D = () => {
    const canvas = document.getElementById('body-canvas');
    if(!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    // Offset camera
    camera.position.x = -8;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create an abstract interlocking wireframe structure representing muscle/tension
    const geom1 = new THREE.TorusKnotGeometry(6, 1.5, 128, 16);
    const geom2 = new THREE.IcosahedronGeometry(7, 2);
    
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x444444, wireframe: true, transparent: true, opacity: 0.4 });
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x8c8c8c, wireframe: true, transparent: true, opacity: 0.1 });
    
    const mesh1 = new THREE.Mesh(geom1, wireMat);
    const mesh2 = new THREE.Mesh(geom2, solidMat);
    
    const group = new THREE.Group();
    group.add(mesh1);
    group.add(mesh2);
    
    // Position it on the right side of the screen
    group.position.x = 8;
    scene.add(group);
    
    let targetRotY = 0;
    document.addEventListener('mousemove', (e) => {
        targetRotY = (e.clientX / window.innerWidth - 0.5) * Math.PI;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Base rotation + mouse rotation
        mesh1.rotation.x += 0.005;
        mesh1.rotation.y += 0.002;
        mesh2.rotation.x -= 0.002;
        mesh2.rotation.y -= 0.005;
        
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

init3D();

// Carousel Logic
const cards = document.querySelectorAll('.prog-card');
let currentIndex = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.className = 'prog-card';
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        }
    });
}

document.getElementById('p-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});
document.getElementById('p-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});
updateCarousel();

// Chart Animation on Scroll (using Intersection Observer since we didn't include GSAP ScrollTrigger here to save CDN calls, or we can just do simple observer)
const bars = document.querySelectorAll('.bar');
bars.forEach(bar => {
    const h = bar.style.height;
    bar.style.height = '0%';
    bar.dataset.height = h;
});

const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        bars.forEach((bar, i) => {
            setTimeout(() => {
                bar.style.height = bar.dataset.height;
            }, i * 150);
        });
        observer.disconnect();
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.mockup-chart'));
