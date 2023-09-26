import { motion } from 'framer-motion';
import { useState } from 'react';

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

  function PromotionPiece(props){
    const {
      promotion,
      onPromotionChange,
      pieceStyle,
      onPieceStyleChange,
      type,
      pos,
      piece,
      handleDragStart
    } = props;

    

    const handleClick = (e) => {
      const pieceType = e.currentTarget.getAttribute('piece-type');
      onPromotionChange({
        ...promotion,
        pieceType: pieceType,
      });
    }

    return piece && (
      <img
        style={pieceStyle}
        onDragStart={(e) => handleDragStart(e)}
        onMouseEnter={() => onPieceStyleChange({...pieceStyle, width: '100%', height: '100%'})}
        onMouseLeave={() => onPieceStyleChange({...pieceStyle, width: '80%', height: '80%'})}
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