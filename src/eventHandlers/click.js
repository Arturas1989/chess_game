import { changeStyles, highlightValidMoves, isMoveValid } from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const handleSquareClick = (e, handlerArgs) => {
    const { 
        initialStyles, 
        chess, 
        idToCoordList, 
        onStylesChange, 
        dragInfo,
        pieceClicked,
        onPieceClick,
        onChessChange,
        squareClass,
        validMovesEmptyClass,
        validMovesTakeClass,
        clickStartEndClass,
        promotion,
        onPromotionChange
    } = handlerArgs;

    if(!dragInfo.isDragging){
      let newStyles = {...initialStyles};
      if(e.target.tagName === 'IMG'){
        
        const [row, col] = idToCoordList[e.target.id].split(',');
        changeStyles(e.target.id, row, col, clickStartEndClass, newStyles);

        if(!pieceClicked.wasPieceClicked){
          highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyClass, validMovesTakeClass, newStyles);
        }
        
        if(pieceClicked.wasPieceClicked && pieceClicked.prevPos === e.target.id){
          const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
          changeStyles(pieceClicked.prevPos, prevRow, prevCol, squareClass, newStyles);
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
          if(e.target.id[1] === '8' || e.target.id[1] === '1'){
            onPromotionChange({
              ...promotion,
              isPromoting: true,
              from: pieceClicked.prevPos,
              to: e.target.id
            });
            return false;
          }
          chess.move({ from: pieceClicked.prevPos, to: e.target.id });
          const chessClone = cloneDeep(chess);
          onChessChange(chessClone);
        } else {
          newStyles = {...initialStyles};
          onStylesChange(newStyles);
          return false;
        }
        
        const [prevRow, prevCol] = idToCoordList[pieceClicked.prevPos].split(',');
        const [newRow, newCol] = idToCoordList[e.target.id].split(',');
        changeStyles(pieceClicked.prevPos, prevRow, prevCol, clickStartEndClass, newStyles);
        changeStyles(e.target.id, newRow, newCol, clickStartEndClass, newStyles);
        
      }
      onStylesChange(newStyles);
    }
  }

  export default handleSquareClick;