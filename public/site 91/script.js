function setupRing(selector, count, radius) {
    const ring = document.querySelector(selector);
    let html = '';
    for(let i=0; i<count; i++) {
        const angle = (i / count) * 360;
        const val = i === 0 && count === 12 ? 12 : i;
        const padded = val.toString().padStart(2, '0');
        // Position items in a circle
        html += \`<div class="num" style="transform: rotate(\${angle}deg) translateY(\${-radius}px)">\${padded}</div>\`;
    }
    ring.innerHTML = html;
    return ring;
}

const ringH = setupRing('.hours', 12, 250);
const ringM = setupRing('.minutes', 60, 150);
const ringS = setupRing('.seconds', 60, 75);

function updateTime() {
    const d = new Date();
    const h = d.getHours() % 12; // 0-11
    const m = d.getMinutes();
    const s = d.getSeconds();
    
    // We rotate the ring backwards to align the current time at the top (0deg point)
    ringH.style.transform = \`translate(-50%, -50%) rotate(\${-h * (360/12)}deg)\`;
    ringM.style.transform = \`translate(-50%, -50%) rotate(\${-m * (360/60)}deg)\`;
    ringS.style.transform = \`translate(-50%, -50%) rotate(\${-s * (360/60)}deg)\`;
}

setInterval(updateTime, 1000);
updateTime();
