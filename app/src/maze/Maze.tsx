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


const WIDTH = 21;
const HEIGHT = 21;
const TOP = 1;
const BOTTOM = HEIGHT - 2;

// gross!
const PORTAL1 = getRandomOddInt(1, WIDTH - 2);
const PORTAL2 = getRandomOddInt(1, WIDTH - 2);
const PORTAL3 = getRandomOddInt(1, WIDTH - 2);

const Game: React.FC = () => {
  
  const maze1 = generateMaze(WIDTH, HEIGHT, 
    { x: 1, y: TOP }, 
    { x: PORTAL1, y: BOTTOM}
  );
  const box1  = createEmptyMazeBox (WIDTH, HEIGHT, 
    { x: PORTAL1, y: TOP }, 
    { x: PORTAL2, y: BOTTOM});
  const maze2 = generateMaze(WIDTH, HEIGHT,
    { x: PORTAL2, y: TOP }, 
    { x: PORTAL3, y: BOTTOM }
  );
  const box2  = createEmptyMazeBox (WIDTH, HEIGHT, 
    { x: PORTAL3, y: TOP }, 
    { x: 3, y:BOTTOM }
    );

  // You can continue this pattern for more mazes and boxes...

  return (
    <div className="game">
      <MazeComponent maze={maze1} />
      <MazeComponent maze={box1} />
      <MazeComponent maze={maze2} />
      <MazeComponent maze={box2} />
      {/* Render more mazes and boxes as needed */}
    </div>
  );
};

export default Game;
