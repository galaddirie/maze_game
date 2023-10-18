type CellType = 'WALL' | 'PATH' | 'ENTRY' | 'EXIT';
type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
type MazeCell = {
  x: number;
  y: number;
  type: CellType;
};

type Maze = {
  width: number;
  height: number;
  cells: MazeCell[];
};