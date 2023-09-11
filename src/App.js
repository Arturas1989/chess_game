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

  // 2 dimensional array is used for an easier debugging.
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

  // using useRef to create reference to the board component
  const boardRef = useRef(null);

  const [boardBoundaries, setBoardBoundaries] = useState(null);

  // it's not guaranteed that the Board component is rendered, it might be null
  //useEffect is used that, when boardRef changes (Board component is rendered) boardBoundaries will be set
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
  const boundaries = boardBoundaries || {}
  const boardWidth = boundaries.width || 0
  const squareWidth = boardWidth / 8;

  //drag constrains
  const left = (col + 0.3) * squareWidth * -1;
  const right = (7 - col + 0.3) * squareWidth;
  const top = (7 - revRow + 0.3) * squareWidth * -1;
  const bottom = (revRow + 0.3) * squareWidth;

  //square color
  const style = {
    backgroundColor: index % 2 === mod ? squareColors.white : squareColors.black,
  };

  const [dragEnabled, setDragEnabled] = useState(false);

  const handleMouseEnter = (e) => {
    // enable drag on mouse enter, when its disabled on mouse up
    setDragEnabled(true);
  };

  //make a copy of pieces array
  const getNewPieces = (pieces) => {
    let newPieces = [];
    for(const row of pieces){
      newPieces.push([...row]);
    }
    return newPieces;
  }

  // using for registering and clearing event listener on the document
  // handleMouseUp is used for event on mouseup (in case the pointer is outside the element)
  useEffect(() => {
    const handleMouseUp = (e) => {handlePiecePositions(e)}

    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  // based on the current position and square width and moved pointer calculating and setting new piece position
  
  const handlePiecePositions = (e) => {

    // finding move values in the transform property
    const matches = e.target.style.transform.match(/-*\d+\.*\d*/g);
    if(!matches || matches.length < 2){
      setDragEnabled(false);
      return;
    }

    //current pointer move values from the previous position
    const [x, y] = matches;

    // assigning previous coordinates
    let [currRow, currCol] = e.target.id.split(',');


    const squareWidth = (boardBoundaries.width) / 8;

    // new row and col position based on calculations on the pointer movement
    let dropRow = +currRow + Math.round(y * (-1) / squareWidth);
    const dropCol = +currCol - Math.round(x * (-1) / squareWidth);

    // position used in id
    const pos = dropRow + ',' + dropCol;

    //if it's the same position, disable drag and return early
    if(pos === e.target.id){
      setDragEnabled(false);
      return;
    } 
    
    // reverse rows, because initial chess board state is reversed
    currRow = 7 - currRow;
    dropRow = 7 - dropRow;

    // make a new copy of chess piece positions to avoid mutations
    let newPiecePositions = getNewPieces(piecePositions);

    // get movement piece
    const piece = newPiecePositions[currRow][currCol];

    //replace it with empty '..'
    newPiecePositions[currRow][currCol] = '..';

    // assign piece to a new position
    newPiecePositions[dropRow][dropCol] = piece;

    // set new positions state
    onPiecePositionsChange(newPiecePositions);

    //finish by disabling drag, it will be enabled on mouse enter event
    setDragEnabled(false);
  }

  return (
    <div 
      className='Square' 
      style={style}
    >
      {dragEnabled ? (
        pieces[piece] && (
          <motion.img
            style={{cursor: 'grab'}}
            drag
            dragConstraints={{
              left: left, 
              right: right, 
              top: top, 
              bottom: bottom }}
            whileTap={{cursor: 'grabbing'}}
            dragElastic={0}
            onMouseEnter={handleMouseEnter}
            id={pos}
            src={pieces[piece]} 
            alt='chess_piece'
          />
        )
      ) : (
        pieces[piece] && (
          <img
            onMouseEnter={handleMouseEnter}
            id={pos}
            src={pieces[piece]} 
            alt='chess_piece'
          />
        )
      )}
    </div>
  );
  
}

export default GameContainer;