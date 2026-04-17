// The illusion works entirely via CSS due to the missing perspective property.
// We can add a script to reverse the animation direction on click to shatter the illusion briefly before it reconstitutes

const cube = document.querySelector('.cube');
let direction = 1; // 1 forward, -1 reverse

document.addEventListener('click', () => {
    // We reverse the animation playback rate
    direction *= -1;
    
    // Using Web Animations API is cleanest way to manipulate purely running CSS animations
    const animations = document.getAnimations();
    animations.forEach(anim => {
        if(anim.animationName === 'spin') {
            anim.playbackRate = direction;
        }
    });

    // Momentarily change border colors to break the illusion and ground it
    const faces = document.querySelectorAll('.face');
    faces.forEach((f, i) => {
        // Red front, blue back etc helps human brain orient
        const colors = ['#f00', '#00f', '#0f0', '#0ff', '#f0f', '#ff0'];
        f.style.borderColor = colors[i];
    });
    
    // Return to black ambiguous lines
    setTimeout(() => {
        faces.forEach(f => f.style.borderColor = '#000');
    }, 500);
});
