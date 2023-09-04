
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
  const row = Math.floor(index / 8);
  const mod = row % 2;
  console.log(row, mod);
  return (
    <div className={index % 2 === mod ? 'Square white' : 'Square black'}></div>
  )
}

export default GameContainer;
