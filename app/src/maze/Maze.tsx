import React from 'react';
import { generateMaze, createEmptyMazeBox } from './generator';
import './maze.css';

const MazeComponent: React.FC<{ maze: Maze }> = ({ maze }) => {
  return (
    <div className="maze" style={{ gridTemplateColumns: `repeat(${maze.width}, 20px)`, gridTemplateRows: `repeat(${maze.height}, 20px)` }}>
      {maze.cells.map((cell, index) => (
        <div key={index} className={`maze-cell ${cell.type.toLowerCase()}`}></div>
      ))}
    </div>
  );
};

function getRandomOddInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min % 2 === 0) min++;
  if (max % 2 === 0) max--;

  let randomOdd = Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;

  return randomOdd;
}




const Game: React.FC = () => {
  const WIDTH = 21;
  const HEIGHT = 21;
  const TOP = 1;
  const BOTTOM = HEIGHT - 2;

  // gross! portals are hardcoded and must be odd and cannont be on an edge!
  // otherwise the maze generator will fail due to the implementation 
  const PORTAL0 = 1
  const PORTAL1 = Math.floor(WIDTH/2)
  const PORTAL2 = Math.floor(WIDTH/2)
  const PORTAL3 = getRandomOddInt(1, WIDTH - 2);
  const PORTAL4 = getRandomOddInt(1, WIDTH - 2);
  const PORTAL5 = getRandomOddInt(1, WIDTH - 2);
  
  const maze1 = generateMaze(WIDTH, HEIGHT, 
    { x: PORTAL0, y: TOP }, 
    { x: PORTAL1, y: BOTTOM}
  );
  const box1  = createEmptyMazeBox (WIDTH, HEIGHT, 
    { x: PORTAL1, y: TOP }, 
    { x: PORTAL2, y: BOTTOM});
  const maze2 = generateMaze(WIDTH, HEIGHT,
    { x: PORTAL2, y: TOP }, 
    { x: PORTAL3, y: BOTTOM }
  );
  const box2 = createEmptyMazeBox (WIDTH, HEIGHT, 
    { x: PORTAL3, y: TOP }, 
    { x: PORTAL4, y:BOTTOM }
    );
  const maze3 = generateMaze(WIDTH, HEIGHT,
    { x: PORTAL4, y: TOP }, 
    { x: PORTAL5, y: BOTTOM }
  );
  const trophy = createEmptyMazeBox (WIDTH, HEIGHT,
    { x: PORTAL5, y: TOP }, 
    null
  );


  return (
    <div className="game">
      <MazeComponent maze={maze1} />
      <MazeComponent maze={box1} />
      <MazeComponent maze={maze2} />
      <MazeComponent maze={box2} />
      <MazeComponent maze={maze3} />
      <MazeComponent maze={trophy} />
    </div>
  );
};

export default Game;
