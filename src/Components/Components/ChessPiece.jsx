import { motion } from 'framer-motion';
import { useGameContext } from '../../GameApp.js';
import { changeStyles } from '../../utilities/utilities.js';

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
        onMouseEnter={(e) => handleMouseEnter(e, handlerArgs)}
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
      chessHistory,
      setChessHistory, 
      currMove,
      setCurrMove,
      initialStyles, 
      setStyles, 
      preComputedMaps,
      theme
    } = useGameContext();

    const handleClick = (e) => {
      const pieceType = e.currentTarget.getAttribute('piece-type');
      const chess = chessHistory[currMove];
      const chessClone = cloneDeep(chess);
      chessClone.move({from: promotion.from, to: promotion.to, promotion: pieceType});
      setChessHistory([...chessHistory, chessClone]);
      setCurrMove(currMove + 1);

      let newStyles = {...initialStyles};
      changeStyles(promotion.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
      changeStyles(promotion.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles)
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