const doc = document.getElementById('document');

// 1. Wrap all text nodes in character spans
function wrapCharacters(el) {
    const childNodes = Array.from(el.childNodes);
    childNodes.forEach(node => {
        if(node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if(text.trim() === '') return;
            
            const fragment = document.createDocumentFragment();
            for(let i=0; i<text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                span.className = 'char';
                if(char === ' ') {
                    // preserve spaces
                    span.innerHTML = '&nbsp;'; 
                } else {
                    span.innerText = char;
                }
                fragment.appendChild(span);
            }
            el.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            wrapCharacters(node);
        }
    });
}

wrapCharacters(doc);

// 2. Start decay process
const allChars = Array.from(document.querySelectorAll('.char')).filter(c => c.innerHTML !== '&nbsp;');

function randomDecay() {
    if(allChars.length === 0) return;
    
    // Pick random char
    const idx = Math.floor(Math.random() * allChars.length);
    const charEl = allChars.splice(idx, 1)[0];
    
    // To detach it smoothly, we need its absolute bounds
    const rect = charEl.getBoundingClientRect();
    
    charEl.style.left = \`\${rect.left}px\`;
    charEl.style.top = \`\${rect.top}px\`;
    
    // Wait a tick for styles to apply before adding absolute positioning
    requestAnimationFrame(() => {
        charEl.classList.add('decaying');
        
        requestAnimationFrame(() => {
            // Send it to bottom with random rotation
            const bottom = window.innerHeight - 40; // ground floor
            const rot = (Math.random() - 0.5) * 360; // random spin
            charEl.style.top = \`\${bottom}px\`;
            charEl.style.transform = \`rotate(\${rot}deg)\`;
        });
    });
    
    // Schedule next
    setTimeout(randomDecay, Math.random() * 200 + 50);
}

// Start sequence after short read time
setTimeout(randomDecay, 3000);
