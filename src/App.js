
import './App.css';

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
  return (
    <div className={index % 2 === 0 ? 'Square black' : 'Square white'}></div>
  )
}

export default GameContainer;
