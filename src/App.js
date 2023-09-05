
import './App.css';
import themes from './themes/themes.js';

const pieces = themes.standard.pieces;
const squareColors = themes.standard.colors; 
function GameContainer() {
  return (
    <div className="GameContainer">
      <Board />
      <MoveList />
    </div>
  );
}

function MoveList(){
  return (
    <div className="MoveList"></div>
  );
}

function Board() {
  return (
    <div className="Board">
      {Array.from({length: 64}, (_,i) => <Square key={i} index={i} />)}
    </div>
  );
}

function Square({ index }){
  const row = Math.floor(index / 8);
  const mod = row % 2;
  console.log(themes['standard']);
  const style = {
    backgroundColor: index % 2 === mod ? squareColors.white : squareColors.black,
  };

  return (
    <div className='Square' style={style}><img src={pieces['k']} alt="chess piece"/></div>
  )
}

export default GameContainer;
