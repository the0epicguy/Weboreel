const container = document.getElementById('grid-container');

const numH = 5;
const numV = 8;
const lasers = [];

function createLasers() {
    container.innerHTML = '';
    lasers.length = 0;
    
    for(let i=0; i<numH; i++) {
        const l = document.createElement('div');
        l.className = 'laser-h laser-hover';
        const pos = Math.random() * 90 + 5;
        l.style.top = \`\${pos}%\`;
        container.appendChild(l);
        lasers.push({el: l, type: 'h'});
    }
    
    for(let i=0; i<numV; i++) {
        const l = document.createElement('div');
        l.className = 'laser-v laser-hover';
        const pos = Math.random() * 90 + 5;
        l.style.left = \`\${pos}%\`;
        container.appendChild(l);
        lasers.push({el: l, type: 'v'});
    }
    
    // Add event listeners to all newly created lasers
    document.querySelectorAll('.laser-hover').forEach(l => {
        l.addEventListener('mouseenter', triggerAlarm);
    });
}

createLasers();

let alarmTimeout;

function triggerAlarm() {
    document.body.classList.add('alarm');
    
    // Scramble lasers
    lasers.forEach(l => {
        if(l.type === 'h') {
            l.el.style.top = \`\${Math.random() * 90 + 5}%\`;
        } else {
            l.el.style.left = \`\${Math.random() * 90 + 5}%\`;
        }
    });
    
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(() => {
        document.body.classList.remove('alarm');
    }, 1000);
}
