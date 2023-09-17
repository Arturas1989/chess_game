import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import { makePiecesCopy, getCoord } from '../utilities/utilities.js';

const changeStyles = (row, col, colors, newStyles) => {
  const index = parseInt(row) * 8 + parseInt(col);
  const color = index % 2 === row % 2 ? colors.white : colors.black;
  newStyles[index] = {...color};
}

const Square = (props) => {
    const { 
      index, 
      styles,
      chess,
      onChessChange,
      isReversed,
      initialStyles, 
      onStylesChange, 
      boardBoundaries, 
      pieceClicked, 
      onPieceClick 
    } = props;
  
    const themes = useContext(ThemeContext);
    const {pieces, squareStyles, draggingStyles, dragStartEndStyles, clickStartEndStyles} = themes.standard; 
  
    const board = chess.board();
    const row = Math.floor(index / 8);
    const col = index % 8;
    const pos = row + ',' + col;
    const source = board[row][col] ? pieces[board[row][col].color][board[row][col].type] : '';
    const boundaries = boardBoundaries || {};
    const boardWidth = boundaries.width || 0;
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
  
      // assigning destination coordinates
      const [dropRow, dropCol] = initialPos.destination.split(',');
      
      // position used in id
      const dropPos = dropRow + ',' + dropCol;
      
      //if it's the same position, disable drag and return early
      if(dropPos === initialPos.start) return
  
      // move piece
      const [prevCoord, dropCoord] = [getCoord(initialPos.start), getCoord(dropPos)];
      try {
        chess.move({from: prevCoord, to: dropCoord});
      } catch(e) {
        const newStyles = [...initialStyles];
        onStylesChange(newStyles);
        return false;
      }
      
  
      onPieceClick({
        ...pieceClicked,
        prevPos : dropPos
      });
      return true;
    }
    
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
        pos : e.target.id,
        destination : e.target.id
      })
    }

    const handleDrag = (e) => {
      if(dragInfo.isDragging){
        
        let newStyles = [...styles];

        //change previous cell color back to original
        if(initialPos.destination !== initialPos.start){
          const [prevRow, prevCol] = initialPos.destination.split(',');
          changeStyles(prevRow, prevCol, squareStyles, newStyles);
        }
        

        //highlight new cell
        const [row, col] = initialPos.pos.split(',');
        const nextRow = parseInt(row) + Math.round((e.clientY - initialPos.y) / squareWidth);
        const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);
        const nextId = nextRow + ',' + nextCol;
        
        if(nextRow < 0 || nextCol < 0 || nextRow > 7 || nextCol > 7) return;

        if(initialPos.start !== nextId && nextCol>0){
          changeStyles(nextRow, nextCol, draggingStyles, newStyles);
        }

        onStylesChange(newStyles);
        
        setInitialPos({
          ...initialPos,
          destination : nextId
        })
      }
    }
  
    const handleDragEnd = (e) => {
      const result = handlePiecePositions(e);
      if(!result) return;

      let newStyles = [...styles];
      
      const [row, col] = initialPos.destination.split(',');
      changeStyles(row, col, dragStartEndStyles, newStyles);
      onStylesChange(newStyles);

      setInitialPos({
        ...initialPos,
        end : e.target.id
      })

      if(initialPos.destination === initialPos.start){
        onPieceClick({
          ...pieceClicked,
          wasPieceClicked : true,
          prevPos : initialPos.destination
        });
      }
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
          onPieceClick({
            ...pieceClicked,
            wasPieceClicked : false,
            pos : e.target.id
          });

          const [prevCoord, dropCoord] = [getCoord(pieceClicked.prevPos), getCoord(e.target.id)];

          try {
            chess.move({from: prevCoord, to: dropCoord});
          } catch(e) {
            newStyles = [...initialStyles];
            onStylesChange(newStyles);
            return false;
          }

          const [newRow, newCol] = e.target.id.split(',');
          changeStyles(newRow, newCol, clickStartEndStyles, newStyles);
          
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
              piece={source}
              handleMouseEnter={handleMouseEnter}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDrag={handleDrag}
            />
         : 
          <DragEnablingPiece
            piece={source}
            handleMouseEnter={handleMouseEnter}
            pos={pos}
          />
        }
      </div>
    );
  }

  export default Square;