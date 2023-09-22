import { changeStyles, isMoveValid } from '../utilities/utilities.js';

const handleMouseEnter = (e, handlerArgs) => {
    const {
        styles, 
        chess, 
        idToCoordList, 
        themes, 
        onStylesChange,
        pieceClicked,
        onPieceClick
    } = handlerArgs;

    const {
      validMovesEmptyStyles,
      validMovesTakeStyles,
      draggingStyles
    } = themes;

    if(pieceClicked.wasPieceClicked){

      const newStyles = {...styles};
      if(isMoveValid(chess, pieceClicked.prevPos, e.target.id)){
        const [row, col] = idToCoordList[e.target.id].split(',');
        changeStyles(e.target.id, row, col, draggingStyles, newStyles);
        onPieceClick({
          ...pieceClicked,
          prevHovered: e.target.id
        })
      }

      if(pieceClicked.prevHovered && pieceClicked.prevHovered !== e.target.id){
        const validMoveStyles = chess.get(pieceClicked.prevHovered) ? validMovesTakeStyles : validMovesEmptyStyles;
        const [prevRow, prevCol] = idToCoordList[pieceClicked.prevHovered].split(',');
        changeStyles(pieceClicked.prevHovered, prevRow, prevCol, validMoveStyles, newStyles);
      }
      onStylesChange(newStyles);
    }
  }

  export default handleMouseEnter;