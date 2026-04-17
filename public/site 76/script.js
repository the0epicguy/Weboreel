const svg = document.querySelector('.mechanical-drawing');
const valX = document.getElementById('val-x');
const valY = document.getElementById('val-y');
const valT = document.getElementById('val-t');

// Create tracking lines
const lineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
lineX.setAttribute("stroke", "rgba(255,255,255,0.8)");
lineX.setAttribute("stroke-width", "1");
lineX.setAttribute("stroke-dasharray", "5,5");

const lineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
lineY.setAttribute("stroke", "rgba(255,255,255,0.8)");
lineY.setAttribute("stroke-width", "1");
lineY.setAttribute("stroke-dasharray", "5,5");

// Create dynamic connection lines between center and mouse
const connectLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
connectLine.setAttribute("stroke", "rgba(255,255,255,0.4)");
connectLine.setAttribute("stroke-width", "2");

svg.appendChild(lineX);
svg.appendChild(lineY);
svg.appendChild(connectLine);

const cx = window.innerWidth / 2;
const cy = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;
    
    // Update lines
    lineX.setAttribute("x1", mx);
    lineX.setAttribute("y1", 0);
    lineX.setAttribute("x2", mx);
    lineX.setAttribute("y2", window.innerHeight);
    
    lineY.setAttribute("x1", 0);
    lineY.setAttribute("y1", my);
    lineY.setAttribute("x2", window.innerWidth);
    lineY.setAttribute("y2", my);
    
    connectLine.setAttribute("x1", cx);
    connectLine.setAttribute("y1", cy);
    connectLine.setAttribute("x2", mx);
    connectLine.setAttribute("y2", my);

    // Update UI
    valX.innerText = mx.toFixed(2).padStart(8, '0');
    valY.innerText = my.toFixed(2).padStart(8, '0');
    
    const dist = Math.hypot(mx - cx, my - cy);
    if(dist > 300) {
        valT.innerText = "CRITICAL";
        valT.style.color = "#ffcccc";
        connectLine.setAttribute("stroke", "rgba(255,100,100,0.8)");
    } else {
        valT.innerText = "NOMINAL";
        valT.style.color = "#ffffff";
        connectLine.setAttribute("stroke", "rgba(255,255,255,0.4)");
    }
});
