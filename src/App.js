
import './App.css';
import themes from './themes/themes.js';
import { useState } from 'react';
import { motion } from 'framer-motion';

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

  const [piecePositions, setPiecePositions] = useState(
    {
      '0,0' : 'R', '0,1' : 'N', '0,2' : 'B', '0,3' : 'Q', '0,4' : 'K', '0,5' : 'B', '0,6' : 'N', '0,7' : 'R',
      '1,0' : 'P', '1,1' : 'P', '1,2' : 'P', '1,3' : 'P', '1,4' : 'P', '1,5' : 'P', '1,6' : 'P', '1,7' : 'P',
      '7,0' : 'r', '7,1' : 'n', '7,2' : 'b', '7,3' : 'q', '7,4' : 'k', '7,5' : 'b', '7,6' : 'n', '7,7' : 'r',
      '6,0' : 'p', '6,1' : 'p', '6,2' : 'p', '6,3' : 'p', '6,4' : 'p', '6,5' : 'p', '6,6' : 'p', '6,7' : 'p'
    }
  );
  return (
    <div className="Board">
      {Array.from({length: 64}, (_,i) => <Square 
        key={i} 
        index={i} 
        piecePositions={piecePositions}
        onPiecePositionsChange={setPiecePositions} 
      />)}
    </div>
  );
}





function Square({ index, piecePositions, onPiecePositionsChange }){
  const row = Math.floor(index / 8);
  const mod = row % 2;
  const revRow = 7 - row;
  const col = index % 8;
  const pos = revRow + ',' + col;
  const piece = piecePositions[pos] || '';
  const style = {
    backgroundColor: index % 2 === mod ? squareColors.white : squareColors.black,
  };

  const handleDragEnd = (e, info) => {
    const { point } = info;
    console.log(e.target);
    console.log('Element dropped at:', point.x, point.y);
  }

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className='Square' 
      style={style}
    >
      <motion.img
        drag
        className={isDragging ? 'dragging' : ''}
        // dragConstraints = {{left: 10, right: 10, top: 10, bottom: 10}}
        transition = {{duration: 0.3}}
        onDragEnd = {handleDragEnd}
        onMouseDown = {handleMouseDown}
        onMouseUp = {handleMouseUp}
        id={pos}
        src={pieces[piece]} 
        alt={pieces[piece]}
      />
    </div>
  )
}

export default GameContainer;
