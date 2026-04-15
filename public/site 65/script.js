gsap.registerPlugin(ScrollTrigger);

// Custom Real-Time Clock Cursor
const cursor = document.getElementById('clock-cursor');
const secHand = document.getElementById('second');
const minHand = document.getElementById('minute');
const hourHand = document.getElementById('hour');
const interactives = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    // Elegant delayed tracking
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
    });
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Update Clock Hands based on real time
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    const secDegrees = (seconds / 60) * 360;
    const minDegrees = ((mins + seconds/60) / 60) * 360;
    const hourDegrees = ((hours + mins/60) / 12) * 360;

    secHand.style.transform = `rotate(${secDegrees}deg)`;
    minHand.style.transform = `rotate(${minDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(updateClock, 1000);
updateClock(); // init immediately

// Parallax Image Effect
gsap.to('.parallax-img', {
    scrollTrigger: {
        trigger: ".parallax-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: "15%", // Moving down back to 0 or positive
    ease: "none"
});

// Staggered Fade Up for Items
gsap.utils.toArray('.fade-up').forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Text reveal for the article
gsap.from('.dropcap', {
    scrollTrigger: {
        trigger: ".e-article",
        start: "top 70%"
    },
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "back.out(2)"
});
