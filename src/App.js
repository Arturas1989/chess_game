import './App.css';
import { themes, ThemeContext } from './themes/themes.js';
import { createContext } from 'react';
import Board from './Components/Board';
import MoveList from './Components/MoveList.jsx';

const GameContainer = () => {
  return (
    <ThemeContext.Provider value={themes}>
      <div className="GameContainer">
        <Board />
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

export default GameContainer;