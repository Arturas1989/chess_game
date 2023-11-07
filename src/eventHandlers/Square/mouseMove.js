import { changeStyles, isMoveValid, highlightValidMoves } from '../../utilities/utilities.js';

const handleMouseEnter = (e, handlerArgs) => {
    const {
        styles, 
        chessVariants,
        currVariant,
        idToCoordList, 
        onStylesChange,
        pieceClicked,
        onPieceClick,
        draggingClass,
        validMovesTakeClass,
        validMovesEmptyClass,
        setDragInfo, 
        dragInfo
    } = handlerArgs;

    const {currLine, currMove} = currVariant;
    const chess = chessVariants[currLine]['moves'][currMove];

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

    // disable drag on mouse enter if there is no valid moves
    if(!chess.moves({square: e.target.id}).length) setDragInfo({...dragInfo, dragEnabled : false});
  }

  export default handleMouseEnter;