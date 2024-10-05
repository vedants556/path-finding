# Pac-Man Path Finder Visualizer

A web application designed to visualize pathfinding algorithms in a Pac-Man themed grid environment.

![Pac-Man Path Finder Visualizer](assets/tutorial/generate-maze.gif)

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation & Requirements](#installation--requirements)
4. [Usage](#usage)
5. [Algorithms](#algorithms)
6. [Customization](#customization)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

## Overview

The Pac-Man Path Finder Visualizer is an interactive web application that helps users understand and visualize various pathfinding algorithms. It provides a grid-based maze environment themed after the classic Pac-Man game, allowing users to see how different algorithms navigate from a start point to a target.

## Features

- **Interactive Maze**: Create and reset mazes by clicking on grid cells.
- **Multiple Algorithms**: Choose from BFS, DFS, A*, Dijkstra's, Greedy Best-first Search, and Bi-Directional BFS.
- **Real-time Visualization**: Watch the chosen algorithm find the shortest path in real-time.
- **Maze Generation**: Automatically generate complex mazes for testing algorithms.
- **Adjustable Speed**: Control the visualization speed to follow the algorithm's progress closely.
- **Responsive Design**: Works on various screen sizes, including mobile devices.

## Installation & Requirements

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pacman-pathfinder-visualizer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pacman-pathfinder-visualizer
   ```
3. Open `index.html` in your web browser.

No additional installation is required as this is a client-side application.

## Usage

1. **Set Start and End Points**: Click and drag the Pac-Man (start) and Ghost (end) icons to desired locations.
2. **Create Walls**: Click or click-and-drag on the grid to create walls/obstacles.
3. **Choose Algorithm**: Select a pathfinding algorithm from the dropdown menu.
4. **Adjust Speed**: Choose the visualization speed (Slow, Normal, Fast).
5. **Generate Maze**: Click the "Generate Maze" button for a random maze.
6. **Visualize**: Click the "Visualize" button to start the pathfinding process.
7. **Clear Board/Path**: Use the respective buttons to clear the entire board or just the path.

## Algorithms

- **Breadth-First Search (BFS)**: Explores all neighbor nodes at the present depth before moving to nodes at the next depth level.
- **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking.
- **A* Search**: Uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm.
- **Dijkstra's Algorithm**: Finds the shortest path between nodes in a graph.
- **Greedy Best-first Search**: Always expands the node closest to the goal as estimated by a heuristic function.
- **Bi-Directional BFS**: Runs two simultaneous BFS, one from start and one from goal.

## Customization

- **Grid Size**: Adjust the pixel size of grid cells for different resolutions.
- **Visualization Speed**: Change the speed of the algorithm visualization.
- **Maze Patterns**: The maze generation algorithm creates various patterns for diverse pathfinding scenarios.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Pac-Man game
- Thanks to all contributors and users of this pathfinding visualizer

For questions or feedback, please reach out to [vedants556@gmail.com](mailto:vedants556@gmail.com).
