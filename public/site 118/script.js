const arm = document.querySelector('.arm');
const weight = document.querySelector('.weight');
const display = document.querySelector('.tempo-display');

// We can read the computed matrix transform of the arm to determine exactly where it is 
// during the CSS animation to smoothly lerp the background color.

function updateEffects() {
    const computedStyle = window.getComputedStyle(arm);
    // Get rotation from matrix
    const matrix = computedStyle.transform;
    let angle = 0;
    
    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    }
    
    // Map angle (-45 to 45) to Hue (0 to 360)
    const normalizedAngle = (angle + 45) / 90; // 0 to 1
    const hue = normalizedAngle * 360;
    
    // Adjust body background subtly
    document.body.style.backgroundColor = \`hsl(\${hue}, 50%, 15%)\`;
    
    // Arm glow color
    arm.style.backgroundColor = \`hsl(\${hue}, 100%, 70%)\`;
    arm.style.boxShadow = \`0 0 30px hsl(\${hue}, 100%, 70%)\`;
    weight.style.backgroundColor = \`hsl(\${hue}, 100%, 70%)\`;
    weight.style.boxShadow = \`0 0 30px hsl(\${hue}, 100%, 70%)\`;
    
    // Determine tick
    if(angle > 40) display.innerText = "T I C K";
    else if(angle < -40) display.innerText = "T O C K";
    
    requestAnimationFrame(updateEffects);
}

updateEffects();
