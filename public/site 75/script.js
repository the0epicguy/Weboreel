const cmdInput = document.getElementById('cmd-input');
const output = document.getElementById('output');

const responses = [
    "INITIALIZING PROTOCOL 7...",
    "WARNING: SYSTEM INSTABILITY DETECTED.",
    "REROUTING MAINFRAME POWER.",
    "UPLOADING NEUROMANTIC DATA SCROLL...",
    "ERROR CODES: 0x00FF OVERFLOW.",
    "BYPASSING SECURITY FIREWALL.",
    "CONNECTION ESTABLISHED. WAITING FOR DIRECTIVE..."
];

cmdInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.trim();
        if (val) {
            // Echo input
            const echo = document.createElement('p');
            echo.innerText = \`> \${val}\`;
            echo.style.color = '#00ffff';
            output.appendChild(echo);
            
            this.value = '';
            
            // Generate pseudo-random response
            setTimeout(() => {
                const response = document.createElement('p');
                // Glitch effect on input
                if(val.toLowerCase() === 'clear') {
                    output.innerHTML = '';
                    return;
                }
                
                if(val.toLowerCase() === 'glitch') {
                    document.body.style.animation = 'textFlicker 0.2s infinite';
                    setTimeout(() => document.body.style.animation = '', 1000);
                    response.innerText = "CRITICAL GLITCH INITIATED.";
                } else {
                    const rnd = responses[Math.floor(Math.random() * responses.length)];
                    response.innerText = \`[SYS]: \${rnd}\`;
                }
                
                output.appendChild(response);
                
                // Keep output scrolled
                if(output.children.length > 10) {
                    output.removeChild(output.firstChild);
                }
            }, 400);
        }
    }
});

// Always keep focus
document.addEventListener('click', () => {
    cmdInput.focus();
});
