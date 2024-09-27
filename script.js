const mazeElement = document.getElementById("maze");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const algorithmSelect = document.getElementById("algorithm");

const rows = 20;
const cols = 20;
let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let start = null;
let end = null;

function createMaze() {
    mazeElement.innerHTML = ""; // Clear existing maze
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.addEventListener("click", () => handleCellClick(i, j, cellElement));
            mazeElement.appendChild(cellElement);
        });
    });
}

function handleCellClick(i, j, cellElement) {
    if (!start) {
        start = { x: i, y: j };
        cellElement.classList.add("start");
    } else if (!end) {
        end = { x: i, y: j };
        cellElement.classList.add("end");
    } else {
        grid[i][j] = grid[i][j] === 1 ? 0 : 1;
        cellElement.classList.toggle("wall");
    }
}

startBtn.addEventListener("click", () => {
    if (start && end) {
        const algorithm = algorithmSelect.value;
        if (algorithm === "A*") {
            aStarPathfinding();
        } else if (algorithm === "Dijkstra") {
            dijkstraPathfinding();
        }
    }
});

resetBtn.addEventListener("click", () => {
    start = null;
    end = null;
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    createMaze();
});

async function aStarPathfinding() {
    const openSet = [];
    const closedSet = [];
    openSet.push(start);

    const cameFrom = {};
    const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    gScore[start.x][start.y] = 0;
    fScore[start.x][start.y] = heuristic(start, end);

    while (openSet.length > 0) {
        let current = openSet.reduce((a, b) => (fScore[a.x][a.y] < fScore[b.x][b.y] ? a : b));

        if (current.x === end.x && current.y === end.y) {
            await reconstructPath(cameFrom, current);
            return;
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);
        await animateCell(current, 'visiting');

        const neighbors = getNeighbors(current);
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || grid[neighbor.x][neighbor.y] === 1) continue;

            const tentative_gScore = gScore[current.x][current.y] + 1;

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else if (tentative_gScore >= gScore[neighbor.x][neighbor.y]) {
                continue;
            }

            cameFrom[`${neighbor.x},${neighbor.y}`] = current;
            gScore[neighbor.x][neighbor.y] = tentative_gScore;
            fScore[neighbor.x][neighbor.y] = gScore[neighbor.x][neighbor.y] + heuristic(neighbor, end);
        }
    }
}

async function dijkstraPathfinding() {
    const openSet = [start];
    const closedSet = [];
    const cameFrom = {};
    const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    gScore[start.x][start.y] = 0;

    while (openSet.length > 0) {
        let current = openSet.reduce((a, b) => (gScore[a.x][a.y] < gScore[b.x][b.y] ? a : b));

        if (current.x === end.x && current.y === end.y) {
            await reconstructPath(cameFrom, current);
            return;
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);
        await animateCell(current, 'visiting');

        const neighbors = getNeighbors(current);
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || grid[neighbor.x][neighbor.y] === 1) continue;

            const tentative_gScore = gScore[current.x][current.y] + 1;

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else if (tentative_gScore >= gScore[neighbor.x][neighbor.y]) {
                continue;
            }

            cameFrom[`${neighbor.x},${neighbor.y}`] = current;
            gScore[neighbor.x][neighbor.y] = tentative_gScore;
        }
    }
}

async function reconstructPath(cameFrom, current) {
    while (current) {
        await animateCell(current, 'path');
        current = cameFrom[`${current.x},${current.y}`];
    }
}

async function animateCell(cell, className) {
    const index = cell.x * cols + cell.y;
    const cellElement = mazeElement.children[index];
    cellElement.classList.add(className);
    await new Promise(resolve => setTimeout(resolve, 100));
}

function getNeighbors(cell) {
    const neighbors = [];
    const directions = [
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: 0, y: -1 }, { x: 0, y: 1 },
    ];

    for (const dir of directions) {
        const newX = cell.x + dir.x;
        const newY = cell.y + dir.y;
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
            neighbors.push({ x: newX, y: newY });
        }
    }
    return neighbors;
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Initialize the maze
createMaze();
