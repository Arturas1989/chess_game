import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import makePiecesCopy from '../utilities/utilities.js';

const changeStyles = (row, col, colors, newStyles) => {
  const index = parseInt(row) * 8 + parseInt(col);
  const color = index % 2 === row % 2 ? colors.white : colors.black;
  newStyles[index] = {...newStyles[index], ...color};
}

const Square = (props) => {
    const { 
      index, 
      styles,
      initialStyles, 
      piecePositions, 
      onPiecePositionsChange, 
      onStylesChange, 
      boardBoundaries, 
      pieceClicked, 
      onPieceClick 
    } = props;
  
    const themes = useContext(ThemeContext);
    const {pieces, squareStyles, draggingStyles, dragStartEndStyles, clickStartEndStyles} = themes.standard; 
  
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
  
    
    const [dragInfo, setDragInfo] = useState({ dragEnabled : false, isDragging : false});
  
    const handleMouseEnter = () => {
      // enable drag on mouse enter, when its disabled on drag end
      setDragInfo({...dragInfo, dragEnabled : true});
    };
    
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
      let newPiecePositions = makePiecesCopy(piecePositions);
  
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

      let newStyles = [...initialStyles];

      const [row, col] = e.target.id.split(',');
      changeStyles(row, col, dragStartEndStyles, newStyles);

      onStylesChange(newStyles);
      setDragInfo({...dragInfo, isDragging : true});
      setInitialPos({
        ...initialPos,
        x : e.clientX,
        y : e.clientY,
        start : e.target.id,
        end : e.target.id,
        pos : e.target.id,
        prevPos : e.target.id
      })
    }

    
  
    const handleDrag = (e) => {
      if(dragInfo.isDragging){

        // const boxShadow = 'inset 0 0 0 2px ' + (newIndex % 2 === nextRow % 2 ? dragStartEndStyles.white : dragStartEndStyles.black);
        
        let newStyles = [...styles];

        //change previous cell color back to original
        if(initialPos.prevPos !== initialPos.start){
          const [prevRow, prevCol] = initialPos.prevPos.split(',');
          changeStyles(prevRow, prevCol, squareStyles, newStyles);
        }
        

        //highlight new cell
        const [row, col] = initialPos.pos.split(',');
        const nextRow = parseInt(row) + Math.round((e.clientY - initialPos.y) / squareWidth);
        const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);
        const nextId = nextRow + ',' + nextCol;

        if(initialPos.start !== nextId){
          changeStyles(nextRow, nextCol, draggingStyles, newStyles);
        }
        
        
        onStylesChange(newStyles);

        setCurrentTransform({
          x: e.clientX - initialPos.x,
          y: e.clientY - initialPos.y
        })
        
        setInitialPos({
          ...initialPos,
          prevPos : nextId
        })
      }
    }
  
    const handleDragEnd = (e) => {
      handlePiecePositions(e);

      let newStyles = [...styles];
      
      const [row, col] = initialPos.prevPos.split(',');
      changeStyles(row, col, dragStartEndStyles, newStyles);
      onStylesChange(newStyles);

      setInitialPos({
        ...initialPos,
        end : e.target.id
      })
  
    }
  
    
    const handleSquareClick = (e) => {
      if(!dragInfo.isDragging){
        let newStyles = !pieceClicked.wasPieceClicked ? [...initialStyles] : [...styles];
        if(e.target.tagName === 'IMG'){
          
          const [row, col] = e.target.id.split(',');
          changeStyles(row, col, clickStartEndStyles, newStyles);
          
          if(pieceClicked.wasPieceClicked && pieceClicked.prevPos === e.target.id){
            const [prevRow, prevCol] = pieceClicked.prevPos.split(',');
            changeStyles(prevRow, prevCol, squareStyles, newStyles);
          }

          onPieceClick({
            ...pieceClicked,
            wasPieceClicked : !pieceClicked.wasPieceClicked,
            prevPos : e.target.id
          });

        }
        
        if(pieceClicked.wasPieceClicked && e.target.id !== pieceClicked.prevPos){
          
          let newPiecePositions = makePiecesCopy(piecePositions);
          const [prevRow, prevCol] = pieceClicked.prevPos.split(',');
    
          // get movement piece
          const piece = newPiecePositions[prevRow][prevCol];
    
          //replace it with empty '..'
          newPiecePositions[prevRow][prevCol] = '..';
    
          // assign piece to a new position
          const [newRow, newCol] = e.target.id.split(',');
          newPiecePositions[newRow][newCol] = piece;
          changeStyles(newRow, newCol, clickStartEndStyles, newStyles);
          onPiecePositionsChange(newPiecePositions);
          onPieceClick({
            ...pieceClicked,
            wasPieceClicked : false,
            pos : e.target.id
          });
        }
        
        onStylesChange(newStyles);
      }
    }
    
    return (
      <div
        id={pos}
        className='Square' 
        style={styles[index]}
        onClick={handleSquareClick}
      >
        {dragInfo.dragEnabled ? 
            <ChessPiece
              id={pos}
              left={left}
              right={right}
              top={top}
              bottom={bottom}
              piece={pieces[piece]}
              handleMouseEnter={handleMouseEnter}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDrag={handleDrag}
            />
         : 
          <DragEnablingPiece
            piece={pieces[piece]}
            handleMouseEnter={handleMouseEnter}
            pos={pos}
          />
        }
      </div>
    );
  }

  export default Square;