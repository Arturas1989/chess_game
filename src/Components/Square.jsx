import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import { preComputed } from '../utilities/utilities.js';
import { handleDragStart, handleDragEnd, handleDrag, enableDrag } from '../eventHandlers/drag.js';
import handleMouseEnter from '../eventHandlers/mouseMove.js';
import handleSquareClick from '../eventHandlers/click.js';


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
      const { pieces } = themes.standard;

      const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord} = preComputed;
      const [coordList, coordToIdList, idToCoordList] = isReversed ? 
      [revCoords, revCoordToId, revIdToCoord] : [coords, coordToId, idToCoord];
    
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
      const [initialPos, setInitialPos] = useState({});

      const handlerArgs = {
        initialStyles: initialStyles,
        styles: styles, 
        chess: chess,
        onChessChange: onChessChange,
        idToCoordList: idToCoordList,
        coordToIdList: coordToIdList,
        themes: themes.standard, 
        onStylesChange: onStylesChange, 
        setDragInfo: setDragInfo, 
        dragInfo: dragInfo, 
        setInitialPos: setInitialPos, 
        initialPos: initialPos,
        onPieceClick: onPieceClick,
        pieceClicked: pieceClicked,
        squareWidth: squareWidth
      }
      
      return (
        <div
          id={pos}
          className='Square' 
          style={styles[pos]}
          onClick={(e) => handleSquareClick(e, handlerArgs)}
          onMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
        >
          {dragInfo.dragEnabled ? 
              <ChessPiece
                id={pos}
                left={left}
                right={right}
                top={top}
                bottom={bottom}
                piece={source}
                handleMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
                handleDragStart={(e) => handleDragStart(e, handlerArgs)}
                handleDragEnd={() => handleDragEnd(handlerArgs)}
                handleDrag={(e) => handleDrag(e, handlerArgs)}
              />
           : 
            <DragEnablingPiece
              piece={source}
              handlerArgs={handlerArgs}
              handleMouseEnter={enableDrag}
              pos={pos}
            />
          }
        </div>
      );
}

export default Square;