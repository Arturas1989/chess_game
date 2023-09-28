import { changeStyles, isMoveValid } from '../utilities/utilities.js';

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

      const newStyles = {...styles};
      if(isMoveValid(chess, pieceClicked.prevPos, e.target.id)){
        changeStyles(e.target.id, idToCoordList, draggingClass, newStyles);
        onPieceClick({
          ...pieceClicked,
          prevHovered: e.target.id
        })
      }

      if(pieceClicked.prevHovered && pieceClicked.prevHovered !== e.target.id){
        const validMoveStyles = chess.get(pieceClicked.prevHovered) ? validMovesTakeClass : validMovesEmptyClass;
        changeStyles(pieceClicked.prevHovered, idToCoordList, validMoveStyles, newStyles);
      }
      onStylesChange(newStyles);
    }
  }

  export default handleMouseEnter;