import { motion } from 'framer-motion';
import { GameContext } from '../themes/themes.js';
import { useContext } from 'react';

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

    const {promotion, setPromotion} = useContext(GameContext);

    const handleClick = (e) => {
      const pieceType = e.currentTarget.getAttribute('piece-type');
      setPromotion({
        ...promotion,
        pieceType: pieceType,
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