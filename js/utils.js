//check outBound of matrix 
function isValid(x, y) {
    return (x >= 0 && y >= 0 && x < row && y < col);
}

//method for setting target and source
let source;
let target;
function set(className, x = -1, y = -1) {
    if (isValid(x, y)) {
        matrix[x][y].classList.add(className);
    }
    else {
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * col);
        matrix[x][y].classList.add(className);
    }
    return { x, y };
}

const clearPath = () => {
    cells.forEach((cell) => {
        cell.classList.remove('visited', 'path');
    })
}
const clearBoard = () => {
    clearPath();
    cells.forEach((cell) => {
        cell.classList.remove('wall');
    })
}

function backtrack(parents, target) {
    let arr = [];
    while (target) {
        arr.push(matrix[target.x][target.y]);
        if (target == source) return arr;
        target = parents.get(`${target.x}-${target.y}`);
    }
    return arr;
}

function getNeighbours(current){
    return [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
    ];
}

function heuristicValue(node) {
    return Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
}

// ==========================================================
// ==================== ANIMATION ⚙️🦾 =====================
// ==========================================================
let timeoutIds = [];
function clearPreviousTimeouts() {
    for (let id of timeoutIds) {
        clearTimeout(id);
    }
    timeoutIds = [];
}

function animate(list, className, delay) {
    clearPreviousTimeouts(); 
    if(algorithm == 'Bi' && className == 'visited'){
        delay /= 1.5;
    }
    for (let i = 0; i < list.length; i++) {
        let timeoutId = setTimeout(() => {
            if (className === 'wall') {
                list[i].setAttribute('class', `col ${className}`);
            } else {
                list[i].classList.remove('visited', 'unvisited', 'path');
                list[i].classList.add(className);
            }

            // After searching is done, animate the path
            if (className === 'visited' && i === list.length - 1) {
                animate(pathToAnimate, 'path', delay);
            }
        }, (className === 'path') ? i * (delay + 20) : i * delay);

        timeoutIds.push(timeoutId);  
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    push(element) {
        this.elements.push(element);
        this.elements.sort((a, b) => a.cost - b.cost);
    }

    pop() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}
