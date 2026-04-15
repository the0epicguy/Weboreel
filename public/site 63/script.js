// Matrix Rain Background Canvas setup
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?~`-=[]\;,./'.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px "Share Tech Mono"';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Terminal Sequence Logic
const tBody = document.getElementById('t-body');

const typeWriter = (elementId, text, speed, callback) => {
    const el = document.getElementById(elementId);
    let i = 0;
    el.innerHTML = '';
    
    // Add temporary blinking cursor while typing
    const curs = document.createElement('span');
    curs.className = 'cursor-blink';
    curs.innerHTML = '_';
    el.parentElement.appendChild(curs);

    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            tBody.scrollTop = tBody.scrollHeight; // Auto scroll down
            setTimeout(type, speed + (Math.random() * 50)); // Randomize slightly
        } else {
            curs.remove();
            if (callback) callback();
        }
    }
    type();
};

const showBlock = (blockId, callback) => {
    const el = document.getElementById(blockId);
    el.classList.remove('hidden');
    el.classList.add('r-block');
    tBody.scrollTop = tBody.scrollHeight;
    if(callback) setTimeout(callback, 500);
};

// Execution Sequence
setTimeout(() => {
    const txt1 = document.getElementById('t1').innerHTML;
    document.getElementById('t1').innerHTML = ''; // clear initial HTML text
    
    typeWriter('t1', txt1, 50, () => {
        setTimeout(() => {
            showBlock('r1', () => {
                document.getElementById('l2').classList.remove('hidden');
                const txt2 = document.getElementById('t2').innerHTML;
                document.getElementById('t2').innerHTML = '';
                
                typeWriter('t2', txt2, 40, () => {
                    setTimeout(() => {
                        showBlock('r2', () => {
                            document.getElementById('l3').classList.remove('hidden');
                            const txt3 = document.getElementById('t3').innerHTML;
                            document.getElementById('t3').innerHTML = '';
                            
                            typeWriter('t3', txt3, 40, () => {
                                setTimeout(() => {
                                    showBlock('r3');
                                }, 800);
                            });
                        });
                    }, 600);
                });
            });
        }, 300);
    });
}, 1000);
