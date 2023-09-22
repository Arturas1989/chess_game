import { changeStyles, highlightValidMoves, isMoveValid } from '../utilities/utilities.js';

const handleSquareClick = (e, handlerArgs) => {
    const { 
        initialStyles, 
        chess, 
        idToCoordList, 
        themes,
        squareStyles, 
        onStylesChange, 
        dragInfo,
        pieceClicked,
        onPieceClick,
    } = handlerArgs;

    const {
        validMovesEmptyStyles,
        validMovesTakeStyles,
        clickStartEndStyles,
      } = themes;

    if(!dragInfo.isDragging){
      let newStyles = {...initialStyles};
      if(e.target.tagName === 'IMG'){
        
        const [row, col] = idToCoordList[e.target.id].split(',');
        changeStyles(e.target.id, row, col, clickStartEndStyles, newStyles);

        if(!pieceClicked.wasPieceClicked){
          highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyStyles, validMovesTakeStyles, newStyles);
        }
        
        if(pieceClicked.wasPieceClicked && pieceClicked.prevPos === e.target.id){
          const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
          changeStyles(pieceClicked.prevPos, prevRow, prevCol, squareStyles, newStyles);
        }

        onPieceClick({
          ...pieceClicked,
          wasPieceClicked : !pieceClicked.wasPieceClicked,
          prevPos : e.target.id
        });
      }

      if(pieceClicked.wasPieceClicked && e.target.id !== pieceClicked.prevPos){
        newStyles = {...initialStyles};

        onPieceClick({
          ...pieceClicked,
          wasPieceClicked : false,
          pos : e.target.id,
          prevHovered: ''
        });

        if( isMoveValid(chess, pieceClicked.prevPos, e.target.id) ){
          chess.move({ from: pieceClicked.prevPos, to: e.target.id });
        } else {
          newStyles = {...initialStyles};
          onStylesChange(newStyles);
          return false;
        }
        
        const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
        const [newRow, newCol] = idToCoordList[e.target.id].split(',');
        changeStyles(pieceClicked.prevPos, prevRow, prevCol, clickStartEndStyles, newStyles);
        changeStyles(e.target.id, newRow, newCol, clickStartEndStyles, newStyles);
        
      }
      onStylesChange(newStyles);
    }
  }

  export default handleSquareClick;