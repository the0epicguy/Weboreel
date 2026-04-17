document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const cursorText = cursor.querySelector('.cursor-text');
    const gallery = document.getElementById('gallery');
    const progressBar = document.getElementById('progress');

    // Generate dummy items
    const numItems = 8;
    for (let i = 0; i < numItems * 3; i++) { // Render 3 sets to allow looping
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        // Placeholder image using random colors
        item.style.backgroundColor = `hsl(${(i * 45) % 360}, 20%, 60%)`;
        item.innerHTML = `<img src="https://picsum.photos/600/800?random=${i%numItems}" alt="Artwork">`;
        gallery.appendChild(item);
    }

    // Custom Cursor tracking
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Adjust text direction based on mouse position relative to center
        if(e.clientX > window.innerWidth / 2) {
            cursorText.textContent = "NEXT";
        } else {
            cursorText.textContent = "PREV";
        }
    });

    // Interaction State
    let isDown = false;
    let startX;
    let scrollLeft;
    let currentX = 0;
    let targetX = 0;
    
    // The width of one full set of items
    const itemWidth = window.innerWidth * 0.3 + window.innerWidth * 0.05; // 30vw + 5vw gap
    const setWidth = itemWidth * numItems;

    // Start in the middle set
    targetX = -setWidth;
    currentX = -setWidth;

    // Mouse Events
    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        cursor.classList.add('active');
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = currentX;
    });

    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        cursor.classList.remove('active');
    });

    gallery.addEventListener('mouseup', () => {
        isDown = false;
        cursor.classList.remove('active');
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        targetX = scrollLeft + walk;
    });

    // Wheel event for scrolling
    window.addEventListener('wheel', (e) => {
        targetX -= e.deltaY; // vertical scroll converts to horizontal
        targetX -= e.deltaX; // horizontal scroll
    });

    // Animation Loop
    function render() {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.1;

        // Infinite Loop Logic
        if (currentX > 0) {
            currentX -= setWidth;
            targetX -= setWidth;
        } else if (currentX < -setWidth * 2) {
            currentX += setWidth;
            targetX += setWidth;
        }

        gallery.style.transform = `translateX(${currentX}px)`;

        // Image Parallax Effect
        const items = document.querySelectorAll('.gallery-item img');
        items.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            // Calculate distance from center of screen
            const distFromCenter = rect.left + rect.width / 2 - window.innerWidth / 2;
            
            // Adjust image transform based on distance
            const shift = distFromCenter * -0.15;
            img.style.transform = `translateX(${shift}px) scale(1.1)`;
            
            // Highlight item near center
            if(Math.abs(distFromCenter) < window.innerWidth * 0.2) {
                img.style.filter = 'grayscale(0%) contrast(1)';
            } else {
                img.style.filter = 'grayscale(100%) contrast(1.2)';
            }
        });

        // Update progress bar based on position within one set
        const progress = Math.abs((currentX % setWidth) / setWidth) * 100;
        progressBar.style.width = `${progress}%`;

        requestAnimationFrame(render);
    }

    render();
});
