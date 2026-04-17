// Pure CSS handles the 3D folding here, but we can add subtle mouse parallax
const zone = document.querySelector('.hover-zone');
const piece = document.querySelector('.center-piece');

zone.addEventListener('mousemove', (e) => {
    // Only if it's already unfolded (we can rely on the CSS hover, but add parallax via JS)
    // Wait, CSS hover handles transform: rotateX(45deg) rotateZ(45deg). 
    // It's tricky to mix them smoothly without overwriting CSS.
    // Instead we can dynamically update variables.
});

// Since the effect is robust in CSS, let's keep JS minimal to guarantee pure smoothness
