import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import { preComputed } from '../utilities/utilities.js';

const changeStyles = (id, row, col, colors, newStyles) => {
    const index = parseInt(row) * 8 + parseInt(col);
    const color = index % 2 === row % 2 ? colors.white : colors.black;
    newStyles[id] = {...color};
}

const highlightValidMoves = (chess, id, idToCoord, emptyColors, pieceColors, newStyles) => {
  const validMoves = chess.moves({ square: id, verbose: true });
  for(const move of validMoves){
    const [row, col] = idToCoord[move.to].split(',').map(el=>parseInt(el));
    chess.get(move.to) ? changeStyles(move.to, row, col, pieceColors, newStyles) : 
    changeStyles(move.to, row, col, emptyColors, newStyles);
  }
}

const isMoveValid = (chess, fromSquare, moveSquare) => {
  const moves = chess.moves({ square: fromSquare, verbose: true });
  for(const move of moves){
    if(move.to === moveSquare) return true;
  }
  return false;
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
      const { 
        pieces, 
        squareStyles, 
        draggingStyles, 
        dragStartEndStyles, 
        clickStartEndStyles,
        validMovesEmptyStyles,
        validMovesTakeStyles

      } = themes.standard;

      const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord} = preComputed;
      const [coordList, coordToIdList, idToCoordList] = isReversed ? 
      [revCoords, revCoordToId, revIdToCoord] : [coords, coordToId, idToCoord];
      // console.log(idToCoordList)
    
      const board = chess.board();
      const row = Math.floor(index / 8);
      const col = index % 8;
      const pos = coordToIdList[row + ',' + col];
      const squareInfo = chess.get(pos);
      const source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';
      const boundaries = boardBoundaries || {};
      const boardWidth = boundaries.width || 0;
      const squareWidth = boardWidth / 8;
    
      //drag constrains
      const left = (col + 0.3) * squareWidth * -1;
      const right = (7 - col + 0.3) * squareWidth;
      const top = (row + 0.3) * squareWidth * -1;
      const bottom = (7 - row + 0.3) * squareWidth;
    
      
      const [dragInfo, setDragInfo] = useState({ dragEnabled : false, isDragging : false});
    
      const enableDrag = () => {
        // enable drag on mouse enter, when its disabled on drag end
        setDragInfo({...dragInfo, dragEnabled : true});
      };

      const handleMouseEnter = (e) => {

        if(pieceClicked.wasPieceClicked){

          const newStyles = {...styles};
          if(isMoveValid(chess, pieceClicked.prevPos, e.target.id)){
            const [row, col] = idToCoordList[e.target.id].split(',');
            changeStyles(e.target.id, row, col, draggingStyles, newStyles);
            onPieceClick({
              ...pieceClicked,
              prevHovered: e.target.id
            })
          }

          if(pieceClicked.prevHovered && pieceClicked.prevHovered !== e.target.id){
            const validMoveStyles = chess.get(pieceClicked.prevHovered) ? validMovesTakeStyles : validMovesEmptyStyles;
            const [prevRow, prevCol] = idToCoordList[pieceClicked.prevHovered].split(',');
            changeStyles(pieceClicked.prevHovered, prevRow, prevCol, validMoveStyles, newStyles);
          }
          onStylesChange(newStyles);
        }
      }
      
      const handlePiecePositions = (e) => {
        setDragInfo({...dragInfo, dragEnabled : false, isDragging : false});
        
        //if it's the same position, disable drag and return early
        if(initialPos.destination === initialPos.start){
          onPieceClick({
            ...pieceClicked,
            wasPieceClicked : true,
            prevPos : initialPos.destination
          });
          return false;
        } 
    
        if( isMoveValid(chess, initialPos.start, initialPos.destination) ){
          chess.move({ from: initialPos.start, to: initialPos.destination });
        } else {
          const newStyles = {...initialStyles};
          onStylesChange(newStyles);
          return false;
        }

        return true;
      }
      
      const [initialPos, setInitialPos] = useState({});
      
      const handleDragStart = (e) => {
  
        let newStyles = {...initialStyles};

        highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyStyles, validMovesTakeStyles, newStyles);
        
  
        const [row, col] = idToCoordList[e.target.id].split(',');
        changeStyles(e.target.id, row, col, dragStartEndStyles, newStyles);
  
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
          
          let newStyles = {...styles};
  
          //change previous cell color back to original
          if(initialPos.destination !== initialPos.start){
            const [prevRow, prevCol] = idToCoordList[initialPos.destination].split(',');
            if(isMoveValid(chess, initialPos.start, initialPos.destination)){
              const validMoveStyles = chess.get(initialPos.destination) ? validMovesTakeStyles : validMovesEmptyStyles;
              changeStyles(initialPos.destination, prevRow, prevCol, validMoveStyles, newStyles);
            }
          }
          
  
          //highlight new cell
          const [row, col] = idToCoordList[initialPos.pos].split(',');
          const nextRow = parseInt(row) + Math.round((e.clientY - initialPos.y) / squareWidth);
          const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);
          const nextCoord = nextRow + ',' + nextCol;
          
          if(nextRow < 0 || nextCol < 0 || nextRow > 7 || nextCol > 7) return;

          const newDestination = coordToIdList[nextCoord];
          if(initialPos.start !== newDestination && isMoveValid(chess, initialPos.start, newDestination)){
            changeStyles(newDestination, nextRow, nextCol, draggingStyles, newStyles);
          }
  
          onStylesChange(newStyles);
          
          setInitialPos({
            ...initialPos,
            destination : newDestination
          })
        }
      }
    
      const handleDragEnd = (e) => {
        const result = handlePiecePositions(e);
        if(!result) return;
  
        let newStyles = {...initialStyles};
        
        const [destRow, destCol] = idToCoordList[initialPos.destination].split(',');
        const [startRow, startCol] = idToCoordList[initialPos.start].split(',');

        changeStyles(initialPos.destination, destRow, destCol, dragStartEndStyles, newStyles);
        changeStyles(initialPos.start, startRow, startCol, dragStartEndStyles, newStyles);
        onStylesChange(newStyles);
      }
    
      
      const handleSquareClick = (e) => {
        if(!dragInfo.isDragging){
          let newStyles = {...initialStyles};
          if(e.target.tagName === 'IMG'){
            
            const [row, col] = idToCoordList[e.target.id].split(',');
            changeStyles(e.target.id, row, col, clickStartEndStyles, newStyles);

            if(!pieceClicked.wasPieceClicked){
              highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyStyles, validMovesTakeStyles, newStyles);
            }
            
            if(pieceClicked.wasPieceClicked && pieceClicked.prevPos === e.target.id){
              const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
              changeStyles(pieceClicked.prevPos, prevRow, prevCol, squareStyles, newStyles);
            }
  
            onPieceClick({
              ...pieceClicked,
              wasPieceClicked : !pieceClicked.wasPieceClicked,
              prevPos : e.target.id
            });
          }

          if(pieceClicked.wasPieceClicked && e.target.id !== pieceClicked.prevPos){
            newStyles = {...initialStyles};

            onPieceClick({
              ...pieceClicked,
              wasPieceClicked : false,
              pos : e.target.id,
              prevHovered: ''
            });

            if( isMoveValid(chess, pieceClicked.prevPos, e.target.id) ){
              chess.move({ from: pieceClicked.prevPos, to: e.target.id });
            } else {
              newStyles = {...initialStyles};
              onStylesChange(newStyles);
              return false;
            }
            
            const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
            const [newRow, newCol] = idToCoordList[e.target.id].split(',');
            changeStyles(pieceClicked.prevPos, prevRow, prevCol, clickStartEndStyles, newStyles);
            changeStyles(e.target.id, newRow, newCol, clickStartEndStyles, newStyles);
            
          }
          
          onStylesChange(newStyles);
        }
      }
      
      return (
        <div
          id={pos}
          className='Square' 
          style={styles[pos]}
          onClick={handleSquareClick}
          onMouseEnter={handleMouseEnter}
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
              handleMouseEnter={enableDrag}
              pos={pos}
            />
          }
        </div>
      );
}

export default Square;