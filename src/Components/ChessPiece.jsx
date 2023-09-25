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

  function PromotionPiece({ pos, piece, handleDragStart }){

    const [pieceStyle, setPieceStyle] = useState({
      width: '80%',
      height: '80%',
      alignSelf: 'center',
      margin: '0 auto'
    })

    return piece && (
      <img
        style={pieceStyle}
        onDragStart={(e) => handleDragStart(e)}
        onMouseEnter={() => setPieceStyle({...pieceStyle, width: '100%', height: '100%'})}
        onMouseLeave={() => setPieceStyle({...pieceStyle, width: '80%', height: '80%'})}
        id={pos}
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