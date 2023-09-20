import './App.css';
import { themes, ThemeContext } from './themes/themes.js';
import Board from './Components/Board';
import MoveList from './Components/MoveList.jsx';
import Arrow from './Components/Arrow.jsx';


const GameContainer = () => {
  return (
    <ThemeContext.Provider value={themes}>
      <div className="GameContainer">
        <Board />
        {/* <Arrow /> */}
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

export default GameContainer;