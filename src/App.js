import './App.css';
import themes from './themes/themes.js';
import { useState, useRef, useEffect } from 'react';
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
    [
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['..', '..', '..', '..', '..', '..', '..', '..'],
      ['..', '..', '..', '..', '..', '..', '..', '..'],
      ['..', '..', '..', '..', '..', '..', '..', '..'],
      ['..', '..', '..', '..', '..', '..', '..', '..'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    ]
  );

  const boardRef = useRef(null);
  const [boardBoundaries, setBoardBoundaries] = useState(null);


  useEffect(() => {
    if (boardRef.current) {
      setBoardBoundaries(boardRef.current.getBoundingClientRect());
    }
  }, [boardRef]);


  return (
    <div ref={boardRef} className="Board">
      
      {Array.from({length: 64}, (_,i) => <Square 
        key={i} 
        index={i} 
        piecePositions={piecePositions}
        onPiecePositionsChange={setPiecePositions}
        boardBoundaries={boardBoundaries}
      />)}
    </div>
  );
}

function Square({ index, piecePositions, onPiecePositionsChange, boardBoundaries }){
  const row = Math.floor(index / 8);
  const mod = row % 2;
  const revRow = 7 - row;
  const col = index % 8;
  const pos = revRow + ',' + col;
  const piece = piecePositions[row][col] || '';

  const style = {
    backgroundColor: index % 2 === mod ? squareColors.white : squareColors.black,
  };

  const [isDragging, setIsDragging] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);

  const handleMouseEnter = (e) => {
    
    setDragEnabled(true);
  };

  const handleMouseDown = (e) => {
    
    setIsDragging(true);
  };

  const getNewPieces = (pieces) => {
    let newPieces = [];
    for(const row of pieces){
      newPieces.push([...row]);
    }
    return newPieces;
  }
  
  const handleMouseUp = (e) => {
    const matches = e.target.style.transform.match(/-*\d+\.*\d*/g);
    if(!matches || matches.length < 2) return;
    const [x, y] = matches;
    let [currRow, currCol] = e.target.id.split(',');

    const squareWidth = (boardBoundaries.width) / 8;
    let dropRow = +currRow + Math.round(y * (-1) / squareWidth);
    const dropCol = +currCol - Math.round(x * (-1) / squareWidth);

    const pos = dropRow + ',' + dropCol;
    if(pos === e.target.id){
      setDragEnabled(false);
      setIsDragging(false);
      return;
    } 
    console.log(pos);
    currRow = 7 - currRow;
    dropRow = 7 - dropRow;
    let newPiecePositions = getNewPieces(piecePositions);
    
    const piece = newPiecePositions[currRow][currCol];
    newPiecePositions[currRow][currCol] = '..';
    newPiecePositions[dropRow][dropCol] = piece;
    console.log(newPiecePositions)
    // console.log(piecePositions, newPiecePositions, e.target.style.transform)
    onPiecePositionsChange(newPiecePositions);
    setIsDragging(false);
  };
  // const {left, right, top, bottom} = boardBoundaries;
  return (
    <div 
      className='Square' 
      style={style}
    >
      {dragEnabled ? (
        pieces[piece] && (
          <motion.img
            drag
            dragConstraints={{ boardBoundaries }}
            // transition = {{duration: 0.3}}
            // onDragEnd = {handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            id={pos}
            src={pieces[piece]} 
            alt={pieces[piece]}
          />
        )
      ) : (
        pieces[piece] && (
          <img
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            id={pos}
            src={pieces[piece]} 
            alt={pieces[piece]}
          />
        )
      )}
    </div>
  );
  
}

export default GameContainer;