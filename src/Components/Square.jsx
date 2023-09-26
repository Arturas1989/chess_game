import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece, PromotionPiece, RegularPiece } from './ChessPiece.jsx';
import { ThemeContext } from '../themes/themes.js';
import { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart } from '../eventHandlers/drag.js';
import handleMouseEnter from '../eventHandlers/mouseMove.js';
import handleSquareClick from '../eventHandlers/click.js';
import { changeStyles, changePromotionStyles } from '../utilities/utilities.js';


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
        promotionPiecesList,
        pieceStyle,
        onPieceStyleChange
      } = props;
    
      const themes = useContext(ThemeContext);
      const { pieces, promotionStyles, promotionHoverStyles } = themes.standard;
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
        squareWidth: squareWidth,
        promotion: promotion,
        onPromotionChange: onPromotionChange,
        preComputedMaps: preComputedMaps,
        promotionPiecesList: promotionPiecesList,
        promotionStyles: promotionStyles,
        promotionHoverStyles: promotionHoverStyles,
        pieceStyle: pieceStyle,
        onPieceStyleChange: onPieceStyleChange
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

const PromotionSquare = (props) => {
  const {
      promotion,
      onPromotionChange,
      type,
      initialStyles,
      styles,
      onStylesChange,
      chess,
      onChessChange,
      source,
      pos,
      preComputedMaps,
      pieceStyle,
      onPieceStyleChange
    } = props;
  
    const themes = useContext(ThemeContext);
    const { promotionStyles, promotionHoverStyles } = themes.standard;
    const [, , idToCoord] = preComputedMaps;
    

    const applyHoverStyle = (e) => {
      
      let newStyles = {...initialStyles};
      changePromotionStyles (e.target.id, promotion.to, promotionHoverStyles, newStyles);
      onStylesChange(newStyles);
    }

    const removeHoverStyle = (e) => {
      let newStyles = {...initialStyles};
      const [row, col] = idToCoord[e.target.id].split(',');
      changeStyles(e.target.id, row, col, promotionStyles, newStyles);
      onStylesChange(newStyles);
    }

    return (
      <div
        id={pos}
        className={'Square promotion-square'} 
        style={styles[pos]}
        onMouseEnter={(e) => applyHoverStyle(e)}
        onMouseLeave={(e) => removeHoverStyle(e)}
      >
        <PromotionPiece
          pieceStyle={pieceStyle}
          onPieceStyleChange={onPieceStyleChange}
          type={type} 
          pos={pos}
          piece={source}
          promotion={promotion}
          onPromotionChange={onPromotionChange}
          handleDragStart={preventDragStart}
        />
      </div>
    );
}

const RegularSquare = ({ pos, styles, source}) => {
  return (
    <div
      id={pos}
      className={'Square'} 
      style={styles[pos]}
    >
      <RegularPiece 
        pos={pos}
        piece={source}
        handleDragStart={preventDragStart}
      />
    </div>
  );
}

export {Square, PromotionSquare, RegularSquare};