const container = document.querySelector('.tracking-container');
const txt = document.querySelector('h1');

txt.addEventListener('mouseenter', () => {
    container.classList.add('stable');
    document.querySelector('p').innerText = 'P L A Y';
});

txt.addEventListener('mouseleave', () => {
    container.classList.remove('stable');
    document.querySelector('p').innerText = 'A D J U S T I N G';
});
