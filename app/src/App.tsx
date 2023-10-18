import React, { useState } from 'react';
import './App.css';
import Game from './maze/Maze';

function App() {
  // Generating a 21x21 maze as an example. Adjust as needed.

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maze Game</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
