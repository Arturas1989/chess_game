import { changeStyles, isMoveValid, highlightValidMoves } from '../utilities/utilities.js';

const handleMouseEnter = (e, handlerArgs) => {
    const {
        styles, 
        chess, 
        idToCoordList, 
        onStylesChange,
        pieceClicked,
        onPieceClick,
        draggingClass,
        validMovesTakeClass,
        validMovesEmptyClass
    } = handlerArgs;

    if(pieceClicked.wasPieceClicked){
      let newStyles = {...styles};
      highlightValidMoves(chess, pieceClicked.prevPos, idToCoordList, validMovesEmptyClass, validMovesTakeClass, newStyles)
      
      if(isMoveValid(chess, pieceClicked.prevPos, e.target.id)){
        
        changeStyles(e.target.id, idToCoordList, draggingClass, newStyles);
        onPieceClick({
          ...pieceClicked,
          prevHovered: e.target.id
        })
      }
      onStylesChange(newStyles);
    }
  }

  export default handleMouseEnter;