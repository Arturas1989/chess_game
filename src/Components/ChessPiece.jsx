import { motion } from 'framer-motion';
import { GameContext } from '../themes/themes.js';
import { useContext } from 'react';
import { changeStyles } from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const ChessPiece = (props) => {
    const {
      left,
      right,
      top,
      bottom,
      piece,
      id,
      handleMouseEnter,
      handleDragStart,
      handleDragEnd,
      handleDrag
    } = props;
  
    return piece && (
      <motion.img
        style={{ cursor: 'grab' }}
        drag
        dragConstraints={{
          left: left,
          right: right,
          top: top,
          bottom: bottom,
        }}
        whileTap={{ cursor: 'grabbing' }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseEnter={handleMouseEnter}
        onDrag={handleDrag}
        id={id}
        src={piece}
        alt='chess_piece'
      />
    );
  }

  function DragEnablingPiece({ piece, handleMouseEnter, handlerArgs, pos }){
    return piece && (
      <img
        onMouseEnter={() => handleMouseEnter(handlerArgs)}
        id={pos}
        src={piece} 
        alt='chess piece'
      />
    )
  }

  function PromotionPiece({ type, pos, piece, handleDragStart }){

    const {
      promotion, 
      setPromotion, 
      chess, 
      setChess, 
      initialStyles, 
      setStyles, 
      preComputedMaps,
      theme
    } = useContext(GameContext);

    const handleClick = (e) => {
      const pieceType = e.currentTarget.getAttribute('piece-type');
      const chessClone = cloneDeep(chess);
      chessClone.move({from: promotion.from, to: promotion.to, promotion: pieceType});
      setChess(chessClone);

      let newStyles = {...initialStyles};
      changeStyles(promotion.from, preComputedMaps[2], theme + 'DragStartEnd', newStyles);
      changeStyles(promotion.to, preComputedMaps[2], theme + 'DragStartEnd', newStyles)
      setStyles({...newStyles});
      
      setPromotion({
        ...promotion,
        isPromoting: false
      });
    }

    return piece && (
      <img
        onDragStart={(e) => handleDragStart(e)}
        onClick={(e) => handleClick(e)}
        id={pos}
        piece-type={type}
        src={piece} 
        alt='chess piece'
      />
    )
  }

  function RegularPiece({ pos, piece, handleDragStart }){
    return piece && (
      <img
        onDragStart={(e) => handleDragStart(e)}
        id={pos}
        src={piece} 
        alt='chess piece'
      />
    )
  }

  export { ChessPiece, DragEnablingPiece, PromotionPiece, RegularPiece };