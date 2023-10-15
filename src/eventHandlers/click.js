import { changeStyles, setPromotionStyles, highlightValidMoves, isMoveValid } from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const handleSquareClick = (e, handlerArgs) => {
    const { 
        initialStyles,
        chessHistory,
        setChessHistory,
        currMove,
        setCurrMove,
        idToCoordList, 
        onStylesChange, 
        dragInfo,
        pieceClicked,
        onPieceClick,
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

    const chess = chessHistory[currMove];

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
          const {color, type} = chessClone.get(pieceClicked.prevPos);
          if( (e.target.id[1] === '8' && color === 'w' && type === 'p') 
          || (e.target.id[1] === '1' && color === 'b' && type === 'p') ){
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
          
          const nextMove = currMove + 1;
          setChessHistory([...chessHistory.slice(0, nextMove), chessClone]);
          setCurrMove(nextMove);
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