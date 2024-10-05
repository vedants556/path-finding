function main() {
    renderBoard();
    source = set('source');
    target = set('target');
}
main();

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Create the debounced version of renderBoard
const repaint = debounce(main, 250);

// Attach the debounced handler to the resize event
window.addEventListener('resize', repaint);

function animatePacmanPath(path) {
    path.forEach((node, index) => {
        setTimeout(() => {
            const cell = document.querySelector(`#${node.x}-${node.y}`);
            if (index === 0) {
                cell.classList.add('pacman');
            } else {
                cell.classList.add('pellet');
            }
        }, 100 * index);
    });
}

function visualizePath(path) {
    // Clear previous path
    document.querySelectorAll('.pacman, .pellet').forEach(el => {
        el.classList.remove('pacman', 'pellet');
    });

}


