import React, { useState } from 'react';
import { ChessPiece, DragEnablingPiece, PromotionPiece, RegularPiece } from './ChessPiece.jsx';
import SquareCoord from './SquareCoord.jsx';
import { useGameContext } from '../../themes/themes.js';
import { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart } from '../../eventHandlers/drag.js';
import handleMouseEnter from '../../eventHandlers/mouseMove.js';
import handleSquareClick from '../../eventHandlers/click.js';
import { changeStyles, getSquareWidth } from '../../utilities/utilities.js';

const Square = ({ index }) => {
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
    setPieceClicked,
    boardBoundaries
  } = useGameContext();

  console.log(1);

  const { pieces } = themes[theme.pieces];
  const [, coordToIdList, idToCoordList] = preComputedMaps;
  

  const row = Math.floor(index / 8);
  const col = index % 8;
  const pos = coordToIdList[row + ',' + col];
  const squareInfo = chess.get(pos);
  let source;
  source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';

  const squareWidth = getSquareWidth(boardBoundaries);

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
    themes: themes[theme.squares], 
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
      className={`Square ${promotion.isPromoting ? ' .promotion-square' : ''} ${styles[pos]}`}
      onClick={(e) => handleSquareClick(e, handlerArgs)}
      onMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
    >

      {dragInfo.dragEnabled ?
        <>
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
          <SquareCoord id={pos} squareWidth={squareWidth}/>
        </> 
          
        :
        <>
          <DragEnablingPiece
            piece={source}
            handlerArgs={handlerArgs}
            handleMouseEnter={enableDrag}
            pos={pos}
          />
          <SquareCoord id={pos} squareWidth={squareWidth}/>
        </> 
        
      }
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
    changeStyles(promotion.from, preComputedMaps[2], theme + 'DragStartEnd', newStyles);
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