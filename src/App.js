import './App.css';
import themes from './themes/themes.js';
import { useState, useRef, useEffect, useContext, createContext } from 'react';
import { motion } from 'framer-motion';

// const pieces = themes.standard.pieces;
// const squareColors = themes.standard.colors;
const ThemeContext = createContext();
function GameContainer() {
  return (
    <ThemeContext.Provider value={themes}>
      <div className="GameContainer">
        <Board />
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

function MoveList(){
  return (
    <div className="MoveList"></div>
  );
}

function Board() {

  const themes = useContext(ThemeContext);
  const squareColors = themes.standard.squareColors;
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

  const [pieceClicked, setPieceClicked] = useState({});
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
        pieceClicked={pieceClicked}
        onPieceClick={setPieceClicked}
      />)}
    </div>
  );
}

function Square({ index, styles, piecePositions, onPiecePositionsChange, onStylesChange, boardBoundaries, pieceClicked, onPieceClick }){
  
  const themes = useContext(ThemeContext);
  const {pieces, dragHighlights} = themes.standard; 

  const row = Math.floor(index / 8);
  const col = index % 8;
  const pos = row + ',' + col;
  const piece = piecePositions[row][col] || '';
  const boundaries = boardBoundaries || {}
  const boardWidth = boundaries.width || 0
  const squareWidth = boardWidth / 8;

  //drag constrains
  const left = (col + 0.3) * squareWidth * -1;
  const right = (7 - col + 0.3) * squareWidth;
  const top = (row + 0.3) * squareWidth * -1;
  const bottom = (7 - row + 0.3) * squareWidth;

  
  const [dragInfo, setDragInfo]= useState({});

  const handleMouseEnter = () => {
    // enable drag on mouse enter, when its disabled on drag end
    setDragInfo({...dragInfo, dragEnabled : true});
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
    setDragInfo({...dragInfo, dragEnabled : false, isDragging : false});
    //current pointer move values from the previous position
    const {x, y} = currentTransform;

    // assigning previous coordinates
    let [currRow, currCol] = e.target.id.split(',');

    const squareWidth = (boardBoundaries.width) / 8;

    // new row and col position based on calculations on the pointer movement
    let dropRow = parseInt(currRow) - Math.round(y * (-1) / squareWidth);
    const dropCol = parseInt(currCol) - Math.round(x * (-1) / squareWidth);
    
    if(isNaN(dropRow) || isNaN(dropCol) || dropRow < 0 || dropCol < 0 || dropRow > 7 || dropCol > 7)return; 

    // position used in id
    const pos = dropRow + ',' + dropCol;

    //if it's the same position, disable drag and return early
    if(pos === e.target.id) return

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
    onPieceClick({
      ...pieceClicked,
      prevPos : pos
    });
  }

  const [currentTransform, setCurrentTransform] = useState({x: 0, y: 0})
  
  const [initialPos, setInitialPos] = useState({});
  const handleDragStart = (e) => {
    setDragInfo({...dragInfo, isDragging : true});
    setInitialPos({
      ...initialPos,
      x : e.clientX,
      y : e.clientY,
      pos : e.target.id,
      prevPos : e.target.id,
      wasPieceClicked : false
    })
  }

  const handleDrag = (e) => {
    if(dragInfo.isDragging){
      const [row, col] = initialPos.pos.split(',');
      const nextRow = parseInt(row) + Math.round((e.clientY - initialPos.y) / squareWidth);
      const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);

      const [prevRow, prevCol] = initialPos.prevPos.split(',');
      const prevIndex = parseInt(prevRow) * 8 + parseInt(prevCol);
      const newIndex = nextRow * 8 + nextCol;
      const boxShadow = 'inset 0 0 0 2px ' + (newIndex % 2 === nextRow % 2 ? dragHighlights.white : dragHighlights.black);
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
    const index = parseInt(row) * 8 + parseInt(col);

    let newStyles = [...styles];
    newStyles[index] = {...newStyles[index], boxShadow : ''};
    onStylesChange(newStyles);

  }

  
  const handleSquareClick = (e) => {
    if(e.target.tagName === 'IMG'){
      
      onPieceClick({
        ...pieceClicked,
        wasPieceClicked : !pieceClicked.wasPieceClicked,
        prevPos : e.target.id
      });
    }

    
    
    if(pieceClicked.wasPieceClicked && e.target.id !== pieceClicked.prevPos){
      
      let newPiecePositions = getNewPieces(piecePositions);
      const [prevRow, prevCol] = pieceClicked.prevPos.split(',');

      // get movement piece
      const piece = newPiecePositions[prevRow][prevCol];

      //replace it with empty '..'
      newPiecePositions[prevRow][prevCol] = '..';

      // assign piece to a new position
      const [newRow, newCol] = e.target.id.split(',');
      newPiecePositions[newRow][newCol] = piece;
      onPiecePositionsChange(newPiecePositions);
      onPieceClick({
        ...pieceClicked,
        wasPieceClicked : false
      });
      console.log(e.target.id, pieceClicked,newPiecePositions)
    }

  }
  
  return (
    <div
      id={pos}
      className='Square' 
      style={styles[index]}
      onClick={handleSquareClick}
    >
      {dragInfo.dragEnabled ? (
        pieces[piece] && (
          <motion.img
            id={pos}
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