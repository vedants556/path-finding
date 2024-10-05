let searchToAnimate;
let pathToAnimate;
const visualizeBtn = document.getElementById('visualize');

visualizeBtn.addEventListener('click', () => {
    clearPath();
    searchToAnimate = [];
    pathToAnimate = [];

    switch (algorithm) {
        case '': BFS(); break;
        case 'BFS': BFS(); break;
        case 'A*': Astar(); break;
        case 'Greedy': greedy(); break;
        case 'Bi-Directional': biDirectional(); break;
        case 'Dijkstra\'s': Dijkstra(); break;
        case 'DFS':
            if (DFS(source)) pathToAnimate.push(matrix[source.x][source.y])
            break;
        default: break;
    }
    animate(searchToAnimate, 'visited', delay, () => {
        visualizePath(pathToAnimate);
    });
});





// ==========================================================
// ======================= BFS ⚙️🦾 ========================
// ==========================================================
function BFS() {
    const queue = [];
    const visited = new Set();
    const parent = new Map();
    queue.push(source);
    visited.add(`${source.x}-${source.y}`);

    while (queue.length > 0) {
        const current = queue.shift();
        searchToAnimate.push(matrix[current.x][current.y]);

        if (current.x === target.x && current.y === target.y) {
            pathToAnimate = backtrack(parent, target).reverse();
            animate(searchToAnimate, 'visited', delay);
            setTimeout(() => {
                animate(pathToAnimate, 'path', delay);
                animatePacman(pathToAnimate);
            }, searchToAnimate.length * delay);
            return;
        }

        const neighbours = getNeighbours(current);
        for (const neighbour of neighbours) {
            if (isValid(neighbour.x, neighbour.y) &&
                !visited.has(`${neighbour.x}-${neighbour.y}`) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                queue.push(neighbour);
                visited.add(`${neighbour.x}-${neighbour.y}`);
                parent.set(`${neighbour.x}-${neighbour.y}`, current);
            }
        }
    }
}





// ==========================================================
// ===================== Dijkstra ⚙️🦾 =====================
// ==========================================================

function DFS(current) {
    searchToAnimate.push(matrix[current.x][current.y]);
    visited.add(`${current.x}-${current.y}`);

    if (current.x === target.x && current.y === target.y) {
        pathToAnimate = backtrack(parent, target).reverse();
        animate(searchToAnimate, 'visited', delay);
        setTimeout(() => {
            animate(pathToAnimate, 'path', delay);
            animatePacman(pathToAnimate);
        }, searchToAnimate.length * delay);
        return true;
    }

    const neighbours = getNeighbours(current);
    for (const neighbour of neighbours) {
        if (isValid(neighbour.x, neighbour.y) &&
            !visited.has(`${neighbour.x}-${neighbour.y}`) &&
            !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
            if (DFS(neighbour)) {
                pathToAnimate.push(matrix[neighbour.x][neighbour.y]);
                return true;
            }
        }
    }
    return false;
}





// ==========================================================
// ======================= Astar ⚙️🦾 ======================
// ==========================================================

function Astar() {
    const queue = new PriorityQueue();
    const visited = new Set();
    const queued = new Set();
    const parent = new Map();
    const gScore = [];

    for (let i = 0; i < row; i++) {
        const INF = [];
        for (let j = 0; j < col; j++) {
            INF.push(Infinity);
        }
        gScore.push(INF);
    }

    gScore[source.x][source.y] = 0;
    queue.push({ cordinate: source, cost: heuristicValue(source) });
    visited.add(`${source.x}-${source.y}`);

    while (queue.length > 0) {
        const { cordinate: current } = queue.pop();
        searchToAnimate.push(matrix[current.x][current.y]);

        if (current.x === target.x && current.y === target.y) {
            pathToAnimate = backtrack(parent, target).reverse();
            animate(searchToAnimate, 'visited', delay);
            setTimeout(() => {
                animate(pathToAnimate, 'path', delay);
                animatePacman(pathToAnimate);
            }, searchToAnimate.length * delay);
            return;
        }

        visited.add(`${current.x}-${current.y}`);
        queued.delete(`${current.x}-${current.y}`);

        const neighbours = getNeighbours(current);
        for (const neighbour of neighbours) {
            if (isValid(neighbour.x, neighbour.y) &&
                !visited.has(`${neighbour.x}-${neighbour.y}`) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                const tentative_gScore = gScore[current.x][current.y] + 1;

                if (tentative_gScore < gScore[neighbour.x][neighbour.y]) {
                    parent.set(`${neighbour.x}-${neighbour.y}`, current);
                    gScore[neighbour.x][neighbour.y] = tentative_gScore;
                    const fScore = gScore[neighbour.x][neighbour.y] + heuristicValue(neighbour);

                    if (!queued.has(`${neighbour.x}-${neighbour.y}`)) {
                        queue.push({ cordinate: neighbour, cost: fScore });
                        queued.add(`${neighbour.x}-${neighbour.y}`);
                    }
                }
            }
        }
    }
}






// ==========================================================
// ====================== Greedy ⚙️🦾 ======================
// ==========================================================

function greedy() {
    const pq = new PriorityQueue();
    const visited = new Set();
    const parent = new Map();

    pq.push({ cordinate: source, cost: heuristicValue(source) });

    while (!pq.isEmpty()) {
        const { cordinate: current } = pq.pop();
        searchToAnimate.push(matrix[current.x][current.y]);

        if (current.x === target.x && current.y === target.y) {
            pathToAnimate = backtrack(parent, target).reverse();
            animate(searchToAnimate, 'visited', delay);
            setTimeout(() => {
                animate(pathToAnimate, 'path', delay);
                animatePacman(pathToAnimate);
            }, searchToAnimate.length * delay);
            return;
        }

        visited.add(`${current.x}-${current.y}`);

        const neighbours = getNeighbours(current);
        for (const neighbour of neighbours) {
            if (isValid(neighbour.x, neighbour.y) &&
                !visited.has(`${neighbour.x}-${neighbour.y}`) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                parent.set(`${neighbour.x}-${neighbour.y}`, current);
                pq.push({ cordinate: neighbour, cost: heuristicValue(neighbour) });
            }
        }
    }
}




// ==========================================================
// ======================== DFS ⚙️🦾 =======================
// ==========================================================
const visited = new Set();
function DFS(current) {
    //base case
    if (current.x === target.x && current.y === target.y) {
        return true;
    }

    searchToAnimate.push(matrix[current.x][current.y]);
    visited.add(`${current.x}-${current.y}`);

    const neighbours = getNeighbours(current);

    for (const neighbour of neighbours) {
        if (isValid(neighbour.x, neighbour.y) &&
            !visited.has(`${neighbour.x}-${neighbour.y}`) &&
            !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
            if (DFS(neighbour)) {
                pathToAnimate.push(matrix[neighbour.x][neighbour.y]);
                return true;
            }

        }
    }
    pathToAnimate = backtrack(parent, target).reverse();
    animate(searchToAnimate, 'visited', delay);
    setTimeout(() => {
        animate(pathToAnimate, 'path', delay);
        animatePacman(pathToAnimate);
    }, searchToAnimate.length * delay)

    return false;
}





// ==========================================================
// ================== B-iDirectional ⚙️🦾 ==================
// ==========================================================


function biDirectional() {
    const queue1 = [];
    const queue2 = [];
    const visited1 = new Set();
    const visited2 = new Set();
    const parent1 = new Map();
    const parent2 = new Map();

    queue1.push(source);
    queue2.push(target);
    visited1.add(`${source.x}-${source.y}`);
    visited2.add(`${target.x}-${target.y}`);

    while (queue1.length > 0 && queue2.length > 0) {
        const current1 = queue1.shift();
        const current2 = queue2.shift();

        searchToAnimate.push(matrix[current1.x][current1.y]);
        searchToAnimate.push(matrix[current2.x][current2.y]);

        if (visited1.has(`${current2.x}-${current2.y}`) || visited2.has(`${current1.x}-${current1.y}`)) {
            const meetingPoint = visited1.has(`${current2.x}-${current2.y}`) ? current2 : current1;
            const path1 = backtrack(parent1, meetingPoint);
            const path2 = backtrack(parent2, meetingPoint);
            pathToAnimate = [...path1.reverse(), ...path2.slice(1)];
            animate(searchToAnimate, 'visited', delay);
            setTimeout(() => {
                animate(pathToAnimate, 'path', delay);
                animatePacman(pathToAnimate);
            }, searchToAnimate.length * delay);
            return;
        }

        const neighbours1 = getNeighbours(current1);
        for (const neighbour of neighbours1) {
            if (isValid(neighbour.x, neighbour.y) &&
                !visited1.has(`${neighbour.x}-${neighbour.y}`) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                queue1.push(neighbour);
                visited1.add(`${neighbour.x}-${neighbour.y}`);
                parent1.set(`${neighbour.x}-${neighbour.y}`, current1);
            }
        }

        const neighbours2 = getNeighbours(current2);
        for (const neighbour of neighbours2) {
            if (isValid(neighbour.x, neighbour.y) &&
                !visited2.has(`${neighbour.x}-${neighbour.y}`) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                queue2.push(neighbour);
                visited2.add(`${neighbour.x}-${neighbour.y}`);
                parent2.set(`${neighbour.x}-${neighbour.y}`, current2);
            }
        }
    }
}


function animatePacman(path) {
    const pacman = document.createElement('div');
    pacman.className = 'pacman';
    document.body.appendChild(pacman);

    let index = 0;
    function movePacman() {
        if (index >= path.length) {
            pacman.remove();
            return;
        }

        const node = path[index];
        const rect = node.getBoundingClientRect();
        pacman.style.left = `${rect.left}px`;
        pacman.style.top = `${rect.top}px`;

        if (index < path.length - 1) {
            const nextNode = path[index + 1];
            const dx = nextNode.getBoundingClientRect().left - rect.left;
            const dy = nextNode.getBoundingClientRect().top - rect.top;

            let rotation = 0;
            if (dx > 0) rotation = 0; // moving right
            else if (dx < 0) rotation = 180; // moving left
            else if (dy < 0) rotation = 270; // moving up
            else if (dy > 0) rotation = 90; // moving down

            pacman.style.transform = `rotate(${rotation}deg)`;
        }

        index++;
        setTimeout(movePacman, 150); // Adjust speed here (lower value = faster)
    }

    movePacman();
}
