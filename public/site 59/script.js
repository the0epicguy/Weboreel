gsap.registerPlugin(ScrollTrigger);

// Custom Organic Cursor
const cursor = document.querySelector('.a-cursor');
const interactives = document.querySelectorAll('a, button, .c-card, .b-option');

document.addEventListener('mousemove', (e) => {
    // Smooth laggy follow for rustic feel
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Brew Guide Logic
const brewOptions = document.querySelectorAll('.b-option');
const brewContents = document.querySelectorAll('.brew-content');

brewOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all
        brewOptions.forEach(opt => opt.classList.remove('active'));
        brewContents.forEach(content => content.classList.remove('active'));
        
        // Add to clicked
        option.classList.add('active');
        const target = document.getElementById(option.getAttribute('data-target'));
        target.classList.add('active');
    });
});

// Animations on Scroll
gsap.from('.c-card', {
    scrollTrigger: {
        trigger: ".shop-section",
        start: "top 70%"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from('.brew-content', {
    scrollTrigger: {
        trigger: ".brew-section",
        start: "top 70%"
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

// Three.js Abstract Coffee Beans Background Simulation
const initBeans = () => {
    const canvas = document.getElementById('bean-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    // Warm cream background matching --a-cream
    scene.background = new THREE.Color(0xEAE6DB);
    // Add fog to fade beans in the distance
    scene.fog = new THREE.Fog(0xEAE6DB, 10, 50);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a generic "bean" shape (torus deformed)
    const beanGeo = new THREE.TorusGeometry(1, 0.6, 16, 32);
    // To make it look like a bean, flatten it slightly
    beanGeo.scale(1, 1, 0.5);

    const beanMat = new THREE.MeshLambertMaterial({ color: 0x3C2A21 }); // --a-brown
    
    const beanGroup = new THREE.Group();
    scene.add(beanGroup);

    const beanObjects = [];
    const numBeans = 40;

    for(let i=0; i<numBeans; i++) {
        const bean = new THREE.Mesh(beanGeo, beanMat);
        
        // Random positions around the screen
        bean.position.x = (Math.random() - 0.5) * 40;
        bean.position.y = (Math.random() - 0.5) * 40;
        bean.position.z = (Math.random() - 0.5) * 20 - 5; // keep some behind

        // Random rotations
        bean.rotation.x = Math.random() * Math.PI;
        bean.rotation.y = Math.random() * Math.PI;

        const scale = Math.random() * 0.5 + 0.5;
        bean.scale.set(scale, scale, scale * 0.5);

        // Store animation speeds
        bean.userData = {
            rx: (Math.random() - 0.5) * 0.01,
            ry: (Math.random() - 0.5) * 0.01,
            floatY: (Math.random() - 0.5) * 0.02
        };

        beanGroup.add(bean);
        beanObjects.push(bean);
    }

    // Lighting
    const ambientInfo = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientInfo);
    
    const dirLight = new THREE.DirectionalLight(0xffeebb, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Mouse parallax effect
    let targetX = 0;
    let targetY = 0;
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.005;
        targetY = (e.clientY - window.innerHeight / 2) * 0.005;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Gentle rotate entire group based on mouse
        beanGroup.rotation.x += (targetY - beanGroup.rotation.x) * 0.05;
        beanGroup.rotation.y += (targetX - beanGroup.rotation.y) * 0.05;

        // Animate individual beans slowly
        beanObjects.forEach(bean => {
            bean.rotation.x += bean.userData.rx;
            bean.rotation.y += bean.userData.ry;
            bean.position.y += bean.userData.floatY;

            // Bounce back limits
            if(bean.position.y > 20) bean.position.y = -20;
            if(bean.position.y < -20) bean.position.y = 20;
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

initBeans();
