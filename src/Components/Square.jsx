import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece, PromotionPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart } from '../eventHandlers/drag.js';
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
        onPieceClick,
        promotion,
        onPromotionChange,
        preComputedMaps,
      } = props;
    
      const themes = useContext(ThemeContext);
      const { pieces, promotionStyles } = themes.standard;
      const [coordList, coordToIdList, idToCoordList] = preComputedMaps;
      
    
      const row = Math.floor(index / 8);
      const col = index % 8;
      const pos = coordToIdList[row + ',' + col];
      const squareInfo = chess.get(pos);
      let source;
      source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';
      
      
      
      
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
          className={'Square' + (promotion.isPromoting ? ' .promotion-square' : '')} 
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
                handleDragEnd={(e) => handleDragEnd(e, handlerArgs)}
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

const PromotionSquare = (props) => {
  const {
      index,
      styles,
      chess,
      onChessChange,
      preComputedMaps,
      promotionIds
    } = props;
  
    const themes = useContext(ThemeContext);
    const { pieces } = themes.standard;
    const [, coordToIdList, ] = preComputedMaps;
    
  
    const row = Math.floor(index / 8);
    const col = index % 8;
    const pos = coordToIdList[row + ',' + col];
    const squareInfo = chess.get(pos);
    let source;
    if(promotionIds[pos]){
      const [color, type] = [...promotionIds[pos]];
      source = pieces[color][type];
    } else {
      source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';
    }

    return (
      <div
        id={pos}
        className={'Square promotion-square'} 
        style={styles[pos]}
      >
        <PromotionPiece 
          pos={pos}
          piece={source}
          handleDragStart={preventDragStart}
        />
      </div>
    );
}

export {Square, PromotionSquare};