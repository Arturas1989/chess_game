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
        alt='chess piece'
      />
    )
  }

  function PromotionPiece({ pos, piece, handleDragStart }){
    const style = {
      width: '80%',
      height: '80%',
      alignSelf: 'center',
      margin: '0 auto'
    }
    return piece && (
      <img
        // onMouseEnter={() => handleMouseEnter(handlerArgs)}
        style={style}
        onDragStart={(e) => handleDragStart(e)}
        id={pos}
        src={piece} 
        alt='promotion piece'
      />
    )
  }

  export { ChessPiece, DragEnablingPiece, PromotionPiece };