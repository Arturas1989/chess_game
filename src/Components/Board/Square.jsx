import React, { useState } from 'react';
import { ChessPiece, DragEnablingPiece, PromotionPiece, RegularPiece } from './ChessPiece.jsx';
import SquareCoord from './SquareCoord.jsx';
import { useGameContext } from '../../GameApp.js';
import { 
  handleDragStart, 
  handleDragEnd, 
  handleDrag, 
  enableDrag, 
  preventDragStart 
} from '../../eventHandlers/Square/drag.js';
import handleMouseEnter from '../../eventHandlers/Square/mouseMove.js';
import handleSquareClick from '../../eventHandlers/Square/click.js';
import { changeStyles, getSquareWidth } from '../../utilities/utilities.js';

const Square = ({ index }) => {
  const {
    themes,
    theme,
    promotion, 
    setPromotion,
    currVariant,
    setCurrVariant,
    chessVariants,
    setChessVariants,
    preComputedMaps,
    promotionPiecesList,
    styles,
    setStyles,
    initialStyles,
    pieceClicked,
    setPieceClicked,
    boardBoundaries
  } = useGameContext();

  const { pieces } = themes[theme.pieces];
  const [, coordToIdList, idToCoordList] = preComputedMaps;
  const {currLine, currMove} = currVariant;
  const chess = chessVariants[currLine]['moves'][currMove];
  const row = Math.floor(index / 8);
  const col = index % 8;
  const pos = coordToIdList[row + ',' + col];
  const squareInfo = chess.get(pos);
  const source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';

  const squareWidth = getSquareWidth(boardBoundaries);

  //drag constrains
  const left = (col + 0.3) * squareWidth * -1;
  const right = (7 - col + 0.3) * squareWidth;
  const top = (row + 0.3) * squareWidth * -1;
  const bottom = (7 - row + 0.3) * squareWidth;
  
  const [dragInfo, setDragInfo] = useState({ dragEnabled : false, isDragging : false, draggableId: ''});
  const [initialPos, setInitialPos] = useState({});
  
  const handlerArgs = {
    initialStyles,
    styles, 
    currVariant,
    setCurrVariant,
    chessVariants,
    setChessVariants,
    idToCoordList,
    coordToIdList,
    themes: themes[theme.squares], 
    onStylesChange: setStyles, 
    setDragInfo, 
    dragInfo, 
    setInitialPos, 
    initialPos,
    onPieceClick: setPieceClicked,
    pieceClicked,
    squareWidth,
    promotion,
    onPromotionChange: setPromotion,
    preComputedMaps,
    promotionPiecesList,
    squareClass: theme.squares + 'Square',
    draggingClass: theme.squares + 'Dragging',
    validMovesEmptyClass: theme.squares + 'ValidMovesEmpty',
    validMovesTakeClass: theme.squares + 'ValidMovesTake',
    dragStartEndClass: theme.squares + 'DragStartEnd',
    clickStartEndClass: theme.squares + 'ClickStartEnd',
    promotionClass: theme.squares + 'PromotionWhiteSide',
  }

  return (
    <div
      id={pos}
      className={`Square${promotion.isPromoting ? ' promotion-square' : ''} ${styles[pos]}`}
      onClick={(e) => handleSquareClick(e, handlerArgs)}
      onMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
    >
      {dragInfo.dragEnabled ? (
        <ChessPiece
          id={pos}
          left={left}
          right={right}
          top={top}
          bottom={bottom}
          piece={source}
          dragInfo={dragInfo}
          handleMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
          handleDragStart={(e) => handleDragStart(e, handlerArgs)}
          handleDragEnd={(e) => handleDragEnd(e, handlerArgs)}
          handleDrag={(e) => handleDrag(e, handlerArgs)}
        />
      ) : (
        <DragEnablingPiece
          piece={source}
          handlerArgs={handlerArgs}
          handleMouseOver={enableDrag}
          pos={pos}
        />
      )}
      <SquareCoord id={pos} squareWidth={squareWidth} />
    </div>
  );
}

const PromotionSquare = ({ type, source, pos }) => {
  const { styles, boardBoundaries } = useGameContext();
  const squareWidth = getSquareWidth(boardBoundaries);

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
        <SquareCoord id={pos} squareWidth={squareWidth}/>
      </div>
    );
}

const RegularSquare = ({ pos, source}) => {

  const { 
    styles, 
    initialStyles, 
    setStyles, 
    promotion, 
    setPromotion, 
    preComputedMaps,
    theme,
    pieceClicked,
    setPieceClicked,
    boardBoundaries 
  } = useGameContext();

  const cancelPromotion = () => {
    setPromotion({...promotion, isPromoting: false});
    let newStyles = {...initialStyles};
    changeStyles(promotion.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    setStyles(newStyles);
    setPieceClicked({
      ...pieceClicked,
      wasPieceClicked : true,
      prevPos : promotion.from
    })
  }
  const squareWidth = getSquareWidth(boardBoundaries);
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
      <SquareCoord id={pos} squareWidth={squareWidth}/>
    </div>
  );
}

const MemoizedSquare = React.memo(Square);
const MemoizedPromotionSquare = React.memo(PromotionSquare);
const MemoizedRegularSquare = React.memo(RegularSquare);

export {
  MemoizedSquare as Square, 
  MemoizedPromotionSquare as PromotionSquare, 
  MemoizedRegularSquare as RegularSquare
};