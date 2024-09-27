import pygame
import random
from collections import deque

# Constants
WIDTH, HEIGHT = 600, 600
GRID_SIZE = 20
CELL_SIZE = WIDTH // GRID_SIZE
FPS = 10

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Directions for BFS
DIRECTIONS = [(0, 1), (1, 0), (0, -1), (-1, 0)]

class Cell:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.wall = False
        self.visited = False
        self.previous = None

    def draw(self, screen):
        color = BLACK if self.wall else WHITE
        pygame.draw.rect(screen, color, (self.x * CELL_SIZE, self.y * CELL_SIZE, CELL_SIZE, CELL_SIZE))
        if self.visited:
            pygame.draw.rect(screen, BLUE, (self.x * CELL_SIZE, self.y * CELL_SIZE, CELL_SIZE, CELL_SIZE), 1)

class Maze:
    def __init__(self):
        self.grid = [[Cell(x, y) for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]
        self.start = None
        self.end = None
        self.randomize()

    def randomize(self):
        for row in self.grid:
            for cell in row:
                cell.wall = random.choice([True, False]) if random.random() < 0.3 else False
        self.set_default_start_end()

    def set_default_start_end(self):
        self.start = self.grid[1][1]
        self.end = self.grid[GRID_SIZE - 2][GRID_SIZE - 2]
        self.start.wall = False
        self.end.wall = False

    def draw(self, screen):
        for row in self.grid:
            for cell in row:
                cell.draw(screen)
        if self.start:
            pygame.draw.circle(screen, RED, (self.start.x * CELL_SIZE + CELL_SIZE // 2, self.start.y * CELL_SIZE + CELL_SIZE // 2), CELL_SIZE // 4)
        if self.end:
            pygame.draw.circle(screen, GREEN, (self.end.x * CELL_SIZE + CELL_SIZE // 2, self.end.y * CELL_SIZE + CELL_SIZE // 2), CELL_SIZE // 4)

    def bfs(self):
        if not self.start or not self.end:
            print("Start or End not set!")
            return
        queue = deque([self.start])
        self.start.visited = True

        while queue:
            current = queue.popleft()
            if current == self.end:
                self.retrace_path()
                return
            for dx, dy in DIRECTIONS:
                nx, ny = current.x + dx, current.y + dy
                if 0 <= nx < GRID_SIZE and 0 <= ny < GRID_SIZE:
                    neighbor = self.grid[nx][ny]
                    if not neighbor.wall and not neighbor.visited:
                        neighbor.visited = True
                        neighbor.previous = current
                        queue.append(neighbor)

    def retrace_path(self):
        current = self.end
        while current:
            current.visited = True
            current = current.previous

    def toggle_wall(self, x, y):
        if 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE:
            self.grid[x][y].wall = not self.grid[x][y].wall

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Pac-Man Path Finder Visualizer")
    clock = pygame.time.Clock()
    maze = Maze()
    running = True

    while running:
        screen.fill(WHITE)
        maze.draw(screen)
        pygame.display.flip()
        clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:  # Press SPACE to run BFS
                    maze.bfs()
                if event.key == pygame.K_r:  # Press R to randomize the maze
                    maze.randomize()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mx, my = event.pos
                x, y = mx // CELL_SIZE, my // CELL_SIZE
                if event.button == 1:  # Left click to set start or end
                    if not maze.start:
                        maze.start = maze.grid[x][y]
                    elif not maze.end:
                        maze.end = maze.grid[x][y]
                    else:  # Reset if both are set
                        maze.start = maze.grid[x][y]
                        maze.end = None
                elif event.button == 3:  # Right click to toggle walls
                    maze.toggle_wall(x, y)

    pygame.quit()

if __name__ == "__main__":
    main()
