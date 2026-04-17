// Using pure CSS for the cradle logic is standard,
// but we can add interactive speed changes via JS
const b1 = document.querySelector('.b1');
const b5 = document.querySelector('.b5');

document.addEventListener('click', () => {
    // randomize speed on click for chaos
    const s = Math.random() * 0.5 + 0.5;
    b1.style.animationDuration = \`\${s}s\`;
    b5.style.animationDuration = \`\${s}s\`;
    b5.style.animationDelay = \`\${s}s\`;
});
