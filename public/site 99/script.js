const spotlight = document.querySelector('.spotlight');

// Initial setup to place it offscreen
spotlight.style.background = \`radial-gradient(circle 150px at -500px -500px, transparent 0%, #000000 100%)\`;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // The background of the spotlight Div is a black gradient that becomes transparent at the mouse coords.
    // Because of mix-blend-mode difference, the black inverts the white text to black, 
    // and the transparent center leaves the white text white (which is invisible against white bg).
    // Wait, if text is white and background is white:
    // black mask + difference = black bg, black text (still invisible).
    // We want the spotlight to REVEAL the text.
    // Let's modify the blend mode approach.
    spotlight.style.background = \`radial-gradient(circle 200px at \${x}px \${y}px, transparent 0%, #000000 100%)\`;
});

/* Fix logic:
If bg is white (#FFF), text is white (#FFF).
Spotlight is a div on top.
If spotlight is mix-blend-mode: difference.
Spotlight gradient: center is transparent (#00000000), edges are black (#000000).

Difference blend mode:
| Bottom layer | Top Layer | Result |
| White (#FFF)| Transparent (#00000000) | White (#FFF) | -> text and bg stay white (invisible).
| White (#FFF)| Black (#000000) | White (#FFF) | -> text and bg stay white.

Wait! Difference with black does nothing. Difference with white inverts.
So spotlight needs to be WHITE at the edges!
Let's dynamically update CSS in JS.
*/

document.body.style.backgroundColor = '#ffffff'; // White bg
const content = document.querySelector('.content');
// Text is white.
// Let's change the spotlight to use a background gradient.
// Actually mix-blend-mode difference with WHITE inverts white to black.
spotlight.style.background = 'none';

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Gradient: Center is WHITE, edges are TRANSPARENT.
    // Wait, if top layer is WHITE, it inverts the bottom layer. Bottom is white text on white bg -> it becomes black on black! Still invisible!
    
    // Let's just do a masking approach without blend modes for simplicity and guarantees.
    // Set text to Black. Background to White.
});

// Real working approach for "Whiteout" using clip-path:
document.body.style.backgroundColor = '#fff';
content.style.color = '#000'; // Make text black
document.querySelectorAll('.shape').forEach(s => {
    if(!s.classList.contains('triangle')) s.style.backgroundColor = '#000';
    if(s.classList.contains('triangle')) s.style.borderBottomColor = '#000';
});

// Create a pseudo white layer on top that hides everything, and punch a hole in it using clip-path
const whiteMask = document.createElement('div');
whiteMask.style.position = 'fixed';
whiteMask.style.top = '0';
whiteMask.style.left = '0';
whiteMask.style.width = '100vw';
whiteMask.style.height = '100vh';
whiteMask.style.backgroundColor = '#fff'; // hider
whiteMask.style.zIndex = '50';
whiteMask.style.pointerEvents = 'none';
document.body.appendChild(whiteMask);

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // clip-path: polygon with a hole is complex. Easier: radial-gradient mask on the whiteMask itself to make it transparent at the mouse.
    whiteMask.style.webkitMaskImage = \`radial-gradient(circle 200px at \${x}px \${y}px, transparent 0%, transparent 80%, black 100%)\`;
    whiteMask.style.maskImage = \`radial-gradient(circle 200px at \${x}px \${y}px, transparent 0%, transparent 80%, black 100%)\`;
});
