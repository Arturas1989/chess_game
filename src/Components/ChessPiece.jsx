import { motion } from 'framer-motion';

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
        alt='chess_piece'
      />
    )
  }

  export { ChessPiece, DragEnablingPiece };