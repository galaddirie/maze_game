function createEmptyMazeBox(width: number, height: number, entrance: {x: number, y: number}, exit: {x: number, y: number}): Maze {
    const cells: MazeCell[] = [];

    

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
        // Check if it's the entrance or exit
        if (x === entrance.x && y === entrance.y) {
            cells.push({ x, y, type: 'ENTRY' });
        } else if (x === exit.x && y === exit.y) {
            cells.push({ x, y, type: 'EXIT' });
        } else if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
            // Check if it's on the border
            cells.push({ x, y, type: 'WALL' });
        } else {
            cells.push({ x, y, type: 'PATH' });
        }
        }
    }

  return { width, height, cells };
}

function generateMaze(width: number, height: number, entrance: { x: number, y: number }, exit: { x: number, y: number }): Maze {
  const maze: Maze = {
    width,
    height,
    cells: []
  };
  
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
      maze.cells.push({
          x,
          y,
          type: 'WALL'
      });
      }
  }
    
  const stack: MazeCell[] = [];
  const visited: { [key: string]: boolean } = {}; 
    
    
  function isInside(x: number, y: number): boolean {
    return x >= 0 && x < width && y >= 0 && y < height;
  }
  
  function getNeighbor(cell: MazeCell): MazeCell | null {
      const directions: Direction[] = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
      const shuffledDirections = directions.sort(() => 0.5 - Math.random());
  
      for (const direction of shuffledDirections) {
      let nx = cell.x;
      let ny = cell.y;
      switch (direction) {
          case 'LEFT':
          nx -= 2;
          break;
          case 'RIGHT':
          nx += 2;
          break;
          case 'UP':
          ny -= 2;
          break;
          case 'DOWN':
          ny += 2;
          break;
      }
  
      const key = `${nx},${ny}`;
      if (isInside(nx, ny) && !visited[key]) {
          return {
          x: nx,
          y: ny,
          type: 'PATH'
          };
      }
      }
  
      return null;
  }
    
  
  function markCellAsVisited(cell: MazeCell) {
    const index = maze.cells.findIndex(c => c.x === cell.x && c.y === cell.y);
    maze.cells[index] = cell;
    visited[`${cell.x},${cell.y}`] = true;
  }

  function removeWallBetween(cellA: MazeCell, cellB: MazeCell) {
    const x = (cellA.x + cellB.x) / 2;
    const y = (cellA.y + cellB.y) / 2;
    markCellAsVisited({ x, y, type: 'PATH' });
  }

  // Start with the entrance cell
  stack.push({ ...entrance, type: 'ENTRY' });
  markCellAsVisited({ ...entrance, type: 'ENTRY' });

  while (stack.length) {
    const current = stack.pop()!;
    const neighbor = getNeighbor(current);

    if (neighbor) {
      stack.push(current);
      removeWallBetween(current, neighbor);
      stack.push(neighbor);
      markCellAsVisited(neighbor);
    }
  }

  // Mark the exit cell
  markCellAsVisited({ ...exit, type: 'EXIT' });

  return maze;
}


export { createEmptyMazeBox, generateMaze};