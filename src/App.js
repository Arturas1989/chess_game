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

  //square styles
  const [styles, setStyles] = useState(
    Array.from({length: 64}, (_,i) => {
      const row = Math.floor(i / 8);
      return {backgroundColor: i % 2 === row % 2 ? squareColors.white : squareColors.black}
    })
  );


  return (
    <div ref={boardRef} className="Board">
      
      {Array.from({length: 64}, (_,i) => <Square 
        key={i} 
        index={i}
        styles={styles} 
        piecePositions={piecePositions}
        onPiecePositionsChange={setPiecePositions}
        onStylesChange={setStyles}
        boardBoundaries={boardBoundaries}
      />)}
    </div>
  );
}

function Square({ index, styles, piecePositions, onPiecePositionsChange, onStylesChange, boardBoundaries }){
  const row = Math.floor(index / 8);
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
  
  const handlePiecePositions = (e) => {

    //current pointer move values from the previous position
    const {x, y} = currentTransform;

    // assigning previous coordinates
    let [currRow, currCol] = e.target.id.split(',');

    const squareWidth = (boardBoundaries.width) / 8;

    // new row and col position based on calculations on the pointer movement
    let dropRow = parseInt(currRow) + Math.round(y * (-1) / squareWidth);
    const dropCol = parseInt(currCol) - Math.round(x * (-1) / squareWidth);

    // position used in id
    const pos = dropRow + ',' + dropCol;

    // reverse rows, because initial chess board state is reversed
    currRow = 7 - currRow;
    dropRow = 7 - dropRow;

    //if it's the same position, disable drag and return early
    if(pos === e.target.id){

      setDragEnabled(false);
      setIsDragging(false);
      return;
    } 

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

    //drag is finished
    setIsDragging(false);

  }

  const [currentTransform, setCurrentTransform] = useState({x: 0, y: 0})
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({});
  const handleDragStart = (e) => {
    setIsDragging(true);
    setInitialPos({
      ...initialPos,
      x : e.clientX,
      y : e.clientY,
      pos : e.target.id,
      prevPos : e.target.id
    })
  }

  const handleDrag = (e) => {
    if(isDragging){
      const [row, col] = initialPos.pos.split(',');
      const nextRow = parseInt(row) + Math.round((initialPos.y - e.clientY) / squareWidth);
      const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);

      const [prevRow, prevCol] = initialPos.prevPos.split(',');
      const prevIndex = (7 - parseInt(prevRow)) * 8 + parseInt(prevCol);
      const newIndex = (7 - nextRow) * 8 + nextCol;
      const boxShadow = 'inset 0 0 0 2px ' + (newIndex % 2 === nextRow % 2 ? squareColors.white : squareColors.black);
      let newStyles = [...styles];
      newStyles[prevIndex] = {...newStyles[prevIndex], boxShadow : ''};
      newStyles[newIndex] = {...newStyles[newIndex], boxShadow : boxShadow};
      
      setCurrentTransform({
        x: e.clientX - initialPos.x,
        y: e.clientY - initialPos.y
      })
      
      onStylesChange(newStyles);
      setInitialPos({
        ...initialPos,
        prevPos : nextRow + ',' + nextCol
      })
    }
  }

  const handleDragEnd = (e) => {
    handlePiecePositions(e);
    
    const [row, col] = initialPos.prevPos.split(',');
    const index = (7 - parseInt(row)) * 8 + parseInt(col);

    let newStyles = [...styles];
    newStyles[index] = {...newStyles[index], boxShadow : ''};
    onStylesChange(newStyles);

  }

  
  return (
    <div 
      className='Square' 
      style={styles[index]}
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
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onDrag={handleDrag}
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