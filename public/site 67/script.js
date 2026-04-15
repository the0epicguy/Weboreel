// Custom Pixel Cursor
const cursor = document.querySelector('.pixel-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Interactive Isometric Blocks
const games = document.querySelectorAll('.b-game');

games.forEach(game => {
    game.addEventListener('mousedown', () => {
        game.classList.add('clicked');
    });
    
    // remove on mouseup or leave
    game.addEventListener('mouseup', () => {
        game.classList.remove('clicked');
        // trigger arbitrary flash effect or sound here
        flashScreen(game.classList.contains('b-blue') ? '#00f0ff' : '#ff00ea');
    });
    
    game.addEventListener('mouseleave', () => {
        game.classList.remove('clicked');
    });
});

function flashScreen(color) {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = color;
    flash.style.opacity = '0.5';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.mixBlendMode = 'screen';
    document.body.appendChild(flash);
    
    gsap.to(flash, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => flash.remove()
    });
}

// Mouse movement dictates slight tilt of the entire iso container
const isoContainer = document.querySelector('.iso-container');
let targetRotZ = -45;
let targetRotX = 60;

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10; // +/- 5 deg
    const y = (e.clientY / window.innerHeight - 0.5) * -10;
    
    gsap.to(isoContainer, {
        rotationZ: targetRotZ + x,
        rotationX: targetRotX + y,
        duration: 1,
        ease: "power2.out"
    });
});
