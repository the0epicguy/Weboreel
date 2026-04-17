document.addEventListener('DOMContentLoaded', () => {
    // Clock
    const clock = document.getElementById('clock');
    setInterval(() => {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);

    // Typing Sequence
    const typeLines = document.querySelectorAll('.typing');
    const hiddenLines = document.querySelectorAll('.line.hidden');
    const menu = document.querySelector('.menu');
    const inputLine = document.querySelector('.input-line');

    let sequenceIndex = 0;

    function typeLine(element) {
        const text = element.getAttribute('data-text');
        element.textContent = '';
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                sequenceIndex++;
                startSequence();
            }
        }, 30); // Typing speed
    }

    function startSequence() {
        if (sequenceIndex < typeLines.length) {
            const currentEl = typeLines[sequenceIndex];
            const parentLine = currentEl.parentElement;
            
            setTimeout(() => {
                parentLine.classList.remove('hidden');
                typeLine(currentEl);
            }, currentEl.getAttribute('data-delay'));
        } else {
            // Show rest of UI
            setTimeout(() => {
                hiddenLines.forEach(line => line.classList.remove('hidden'));
                menu.classList.remove('hidden');
                inputLine.classList.remove('hidden');
            }, 500);
        }
    }

    // Start boot sequence
    startSequence();

    // Interactive Menu
    const options = document.querySelectorAll('.interactive-option');
    const infoPanel = document.getElementById('info-panel');
    const dynamicContent = document.getElementById('dynamic-content');

    const databases = {
        data1: "EXTRACTING SECTOR 7G...\nFILE: ARCHIVE_001.DAT\n[████████████] 100%\n\nCONTENTS: SUBJECT REJECTS SIMULATION. ABNORMAL KINETIC ACTIVITY DETECTED.",
        data2: "WARNING: OVERRIDE REQUIRES LEVEL 5 CLEARANCE.\nATTEMPTING BRUTE FORCE...\nACCESS DENIED.\nACCESS DENIED.\nACCESS DENIED.\nSYSTEM LOCKDOWN IMMINENT.",
        data3: "INITIATING PURGE PROTOCOL.\nDELETING MEMORY BANKS:\n- SECTOR A: PURGED\n- SECTOR B: PURGED\n- SECTOR C: ERROR - CORRUPTION DETECTED."
    };

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            // Add a visual "flash" to the terminal
            document.querySelector('.terminal').style.boxShadow = "0 0 30px var(--text-color), inset 0 0 30px rgba(0, 255, 65, 0.4)";
            setTimeout(() => {
                document.querySelector('.terminal').style.boxShadow = "";
            }, 100);

            infoPanel.classList.remove('hidden');
            const target = opt.getAttribute('data-target');
            
            // Randomly glitch the terminal output
            if(Math.random() > 0.5) {
                dynamicContent.classList.add('glitch');
                dynamicContent.setAttribute('data-text', databases[target].substring(0, 20) + "...");
            } else {
                dynamicContent.classList.remove('glitch');
            }

            dynamicContent.textContent = '';
            let text = databases[target];
            let i = 0;
            
            // Fast typing for output
            const outInterval = setInterval(() => {
                dynamicContent.textContent += text.charAt(i);
                i++;
                if(i >= text.length) clearInterval(outInterval);
            }, 10);
            
        });
    });
});
