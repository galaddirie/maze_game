function generateMaze(width: number, height: number): Maze {
    let maze: Maze = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    let stack: Cell[] = [];
    let startCell: Cell = { x: 0, y: 0 };

    function getNeighbors(cell: Cell): Cell[] {
        let neighbors: Cell[] = [
            { x: cell.x - 2, y: cell.y, dir: 'left' },
            { x: cell.x + 2, y: cell.y, dir: 'right' },
            { x: cell.x, y: cell.y - 2, dir: 'up' },
            { x: cell.x, y: cell.y + 2, dir: 'down' }
        ];

        return neighbors.filter(neighbor => 
            neighbor.x >= 0 && neighbor.y >= 0 && neighbor.x < width && neighbor.y < height && maze[neighbor.y][neighbor.x] === 0
        );
    }

    function removeWall(cell1: Cell, cell2: Cell, dir: Direction) {
        switch (dir) {
            case 'left':
                maze[cell1.y][cell1.x - 1] = 1;
                break;
            case 'right':
                maze[cell1.y][cell1.x + 1] = 1;
                break;
            case 'up':
                maze[cell1.y - 1][cell1.x] = 1;
                break;
            case 'down':
                maze[cell1.y + 1][cell1.x] = 1;
                break;
        }
    }

    maze[startCell.y][startCell.x] = 1;
    stack.push(startCell);

    while (stack.length) {
        let currentCell = stack.pop();
        if (currentCell) {
            let neighbors = getNeighbors(currentCell);

            if (neighbors.length) {
                stack.push(currentCell);

                let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[randomNeighbor.y][randomNeighbor.x] = 1;

                if (randomNeighbor.dir) {
                    removeWall(currentCell, randomNeighbor, randomNeighbor.dir);
                }
                stack.push(randomNeighbor);
            }
        }
    }

    return maze;
}

export { generateMaze };