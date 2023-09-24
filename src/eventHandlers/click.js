import { changeStyles, highlightValidMoves, isMoveValid } from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const handleSquareClick = (e, handlerArgs) => {
    const { 
        initialStyles, 
        chess, 
        idToCoordList, 
        themes, 
        onStylesChange, 
        dragInfo,
        pieceClicked,
        onPieceClick,
        onChessChange
    } = handlerArgs;

    const {
        validMovesEmptyStyles,
        validMovesTakeStyles,
        clickStartEndStyles,
        squareStyles,
      } = themes;

    if(!dragInfo.isDragging){
      let newStyles = {...initialStyles};
      if(e.target.tagName === 'IMG'){
        
        const [row, col] = idToCoordList[e.target.id].split(',');
        // console.log(clickStartEndStyles)
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
          const chessClone = cloneDeep(chess);
          onChessChange(chessClone);
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