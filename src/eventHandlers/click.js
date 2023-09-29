import { changeStyles, setPromotionStyles, highlightValidMoves, isMoveValid } from '../utilities/utilities.js';

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
        onPromotionChange,
        preComputedMaps,
        promotionClass,
        promotionPiecesList
    } = handlerArgs;

    if(!dragInfo.isDragging){
      let newStyles = {...initialStyles};
      
      if(e.target.tagName === 'IMG'){

        if(chess.moves({square: e.target.id}).length){

          changeStyles(e.target.id, idToCoordList, clickStartEndClass, newStyles);

          if(!pieceClicked.wasPieceClicked){
            highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyClass, validMovesTakeClass, newStyles);
          }
          
          if(pieceClicked.wasPieceClicked && pieceClicked.prevPos === e.target.id){
            changeStyles(pieceClicked.prevPos, idToCoordList, squareClass, newStyles);
          }

          onPieceClick({
            ...pieceClicked,
            wasPieceClicked : !pieceClicked.wasPieceClicked,
            prevPos : e.target.id
          });
        }
        
      }

      if(pieceClicked.wasPieceClicked && e.target.id !== pieceClicked.prevPos){
        newStyles = {...initialStyles};

        onPieceClick({
          ...pieceClicked,
          wasPieceClicked : false,
          pos : e.target.id
        });

        if( isMoveValid(chess, pieceClicked.prevPos, e.target.id) ){
          const chessClone = cloneDeep(chess);
          const color = chessClone.get(pieceClicked.prevPos).color;
          if( (e.target.id[1] === '8' && color === 'w') || (e.target.id[1] === '1' && color === 'b') ){
            onPromotionChange({
              ...promotion,
              isPromoting: true,
              from: pieceClicked.prevPos,
              to: e.target.id
            });
            changeStyles(pieceClicked.prevPos, idToCoordList, clickStartEndClass, newStyles);
            setPromotionStyles(newStyles, e.target.id, preComputedMaps, promotionPiecesList, promotionClass);
            onStylesChange(newStyles);
            return false;
          }
          chessClone.move({ from: pieceClicked.prevPos, to: e.target.id });
          
          onChessChange(chessClone);
        } else {
          newStyles = {...initialStyles};
          onStylesChange(newStyles);
          return false;
        }
        
        changeStyles(pieceClicked.prevPos, idToCoordList, clickStartEndClass, newStyles);
        changeStyles(e.target.id, idToCoordList, clickStartEndClass, newStyles);
        
      }
      onStylesChange(newStyles);
    }
  }

  export default handleSquareClick;