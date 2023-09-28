import { useState, useContext} from 'react';
import { ChessPiece, DragEnablingPiece, PromotionPiece, RegularPiece } from './ChessPiece.jsx';
import { GameContext } from '../themes/themes.js';
import { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart } from '../eventHandlers/drag.js';
import handleMouseEnter from '../eventHandlers/mouseMove.js';
import handleSquareClick from '../eventHandlers/click.js';
import { changeStyles } from '../utilities/utilities.js';

const Square = ({ index, boardBoundaries }) => {
  const {
    themes,
    theme,
    promotion, 
    setPromotion,
    chess,
    setChess,
    preComputedMaps,
    promotionPiecesList,
    styles,
    setStyles,
    initialStyles,
    pieceClicked,
    setPieceClicked
  } = useContext(GameContext);

  const { pieces } = themes[theme];
  const [, coordToIdList, idToCoordList] = preComputedMaps;
  

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
    onChessChange: setChess,
    idToCoordList: idToCoordList,
    coordToIdList: coordToIdList,
    themes: themes.standard, 
    onStylesChange: setStyles, 
    setDragInfo: setDragInfo, 
    dragInfo: dragInfo, 
    setInitialPos: setInitialPos, 
    initialPos: initialPos,
    onPieceClick: setPieceClicked,
    pieceClicked: pieceClicked,
    squareWidth: squareWidth,
    promotion: promotion,
    onPromotionChange: setPromotion,
    preComputedMaps: preComputedMaps,
    promotionPiecesList: promotionPiecesList,
    squareClass: theme + 'Square',
    draggingClass: theme + 'Dragging',
    validMovesEmptyClass: theme + 'ValidMovesEmpty',
    validMovesTakeClass: theme + 'ValidMovesTake',
    dragStartEndClass: theme + 'DragStartEnd',
    clickStartEndClass: theme + 'ClickStartEnd',
    promotionClass: theme + 'PromotionWhiteSide',
  }

  return (
    <div
      id={pos}
      className={`Square ${promotion.isPromoting ? ' .promotion-square' : ''} ${styles[pos]}`}
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

const PromotionSquare = ({ type, source, pos }) => {
  const { styles } = useContext(GameContext);

    return (
      <div
        id={pos}
        className={`Square promotion-square ${styles[pos]}`}
      >
        <PromotionPiece
          type={type} 
          pos={pos}
          piece={source}
          handleDragStart={preventDragStart}
        />
      </div>
    );
}

const RegularSquare = ({ pos, source }) => {

  const { 
    styles, 
    initialStyles, 
    setStyles, 
    promotion, 
    setPromotion, 
    preComputedMaps,
    theme,
    pieceClicked,
    setPieceClicked 
  } = useContext(GameContext);

  const cancelPromotion = () => {
    setPromotion({...promotion, isPromoting: false});
    let newStyles = {...initialStyles};
    changeStyles(promotion.from, preComputedMaps[2], theme + 'DragStartEnd', newStyles);
    setStyles(newStyles);
    setPieceClicked({
      ...pieceClicked,
      wasPieceClicked : true,
      prevPos : promotion.from
    })
  }

  return (
    <div
      id={pos}
      className={`Square ${styles[pos]}`}
      onClick={() => cancelPromotion()}
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