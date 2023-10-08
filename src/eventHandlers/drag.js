import { 
  changeStyles, 
  highlightValidMoves, 
  isMoveValid, 
  setPromotionStyles 
} from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const enableDrag = (e, handlerArgs) => {
  const { setDragInfo, dragInfo, chess } = handlerArgs;
  // enable drag on mouse enter, when its disabled on drag end
  if(chess.moves({square: e.target.id}).length) setDragInfo({...dragInfo, dragEnabled : true});
};

const preventDragStart = (e) => {
  e.preventDefault();
}

const handleDragStart = (e, handlerArgs) => {
    const { 
        initialStyles, 
        chess, 
        idToCoordList,
        onStylesChange, 
        setDragInfo, 
        dragInfo, 
        setInitialPos, 
        initialPos,
        validMovesEmptyClass, 
        validMovesTakeClass,
        dragStartEndClass
    } = handlerArgs;

    let newStyles = {...initialStyles};
    highlightValidMoves(chess, e.target.id, idToCoordList, validMovesEmptyClass, validMovesTakeClass, newStyles);
    
    
    changeStyles(e.target.id, idToCoordList, dragStartEndClass, newStyles);
    
    

    onStylesChange(newStyles);
    setDragInfo({...dragInfo, isDragging : true});
    setInitialPos({
      ...initialPos,
      x : e.clientX,
      y : e.clientY,
      start : e.target.id,
      pos : e.target.id,
      destination : e.target.id
    })
  }

  const handleDragEnd = (handlerArgs) => {
    
    
    const {
        chess,
        initialStyles, 
        idToCoordList, 
        onStylesChange, 
        initialPos,
        dragStartEndClass,
        validMovesEmptyClass,
        validMovesTakeClass,
        preComputedMaps,
        promotionPiecesList,
        promotionClass
    } = handlerArgs;

    const result = handlePiecePositions(handlerArgs);

    let newStyles = {...initialStyles};
    if(initialPos.start === initialPos.destination || !result.isMoveValid){
      highlightValidMoves(chess, initialPos.start, idToCoordList, validMovesEmptyClass, validMovesTakeClass, newStyles);
    }
    changeStyles(initialPos.start, idToCoordList, dragStartEndClass, newStyles);
    if(result.isMoveValid) changeStyles(initialPos.destination, idToCoordList, dragStartEndClass, newStyles);
    console.log(result)
    if(result.isPromoting){
      setPromotionStyles(newStyles, initialPos.destination, preComputedMaps, promotionPiecesList, promotionClass);
    }
    onStylesChange(newStyles);
    
  }

  const handlePiecePositions = (handlerArgs) => {
    const {
        promotion,
        onPromotionChange,
        initialStyles, 
        chess,
        onChessChange,
        onStylesChange, 
        setDragInfo, 
        dragInfo, 
        initialPos,
        onPieceClick,
        pieceClicked,
        preComputedMaps, 
        promotionPiecesList,
        promotionClass,
        dragStartEndClass
    } = handlerArgs;
    setDragInfo({...dragInfo, dragEnabled : false, isDragging : false});
    
    //if it's the same position, disable drag and return early
    let result = {isPromoting: false, isMoveValid: true};
    let newStyles = {...initialStyles};
    if(initialPos.destination === initialPos.start){
      onPieceClick({
        ...pieceClicked,
        wasPieceClicked : true,
        prevPos : initialPos.destination
      });
      onStylesChange(newStyles);
      return result;
    } 

    if( isMoveValid(chess, initialPos.start, initialPos.destination) ){
      const chessClone = cloneDeep(chess);
      const {color, type} = chessClone.get(initialPos.start);
      
        if( (initialPos.destination[1] === '8' && color === 'w' && type === 'p') 
        || (initialPos.destination[1] === '1' && color === 'b' && type === 'p') ){
          onPromotionChange({
            ...promotion,
            isPromoting: true,
            from: initialPos.start,
            to: initialPos.destination
          })
          changeStyles(initialPos.start, preComputedMaps[2], dragStartEndClass, newStyles);
          setPromotionStyles(newStyles, initialPos.destination, preComputedMaps, promotionPiecesList, promotionClass);
          onStylesChange(newStyles);
          result.isPromoting = true;
          return result;
        } else {
          chessClone.move({ from: initialPos.start, to: initialPos.destination });
        }
      
      onChessChange(chessClone);
    } else {
      const newStyles = {...initialStyles};
      onStylesChange(newStyles);
      result.isMoveValid = false;
      onPieceClick({
        ...pieceClicked,
        wasPieceClicked : true,
        prevPos : initialPos.start
      });
      
      return result;
    }
    return result;
  }

  const handleDrag = (e, handlerArgs) => {
    const {
        styles, 
        chess, 
        idToCoordList,
        coordToIdList, 
        onStylesChange, 
        dragInfo, 
        setInitialPos, 
        initialPos,
        squareWidth,
        validMovesTakeClass,
        validMovesEmptyClass,
        draggingClass
    } = handlerArgs;

    if(dragInfo.isDragging){
      
      let newStyles = {...styles};

      //change previous cell color back to original
      if(initialPos.destination !== initialPos.start){
        if(isMoveValid(chess, initialPos.start, initialPos.destination)){
          const validMoveStyles = chess.get(initialPos.destination) ? validMovesTakeClass : validMovesEmptyClass;
          changeStyles(initialPos.destination, idToCoordList, validMoveStyles, newStyles);
        }
      }

      //highlight new cell
      const [row, col] = idToCoordList[initialPos.pos].split(',');
      const nextRow = parseInt(row) + Math.round((e.clientY - initialPos.y) / squareWidth);
      const nextCol = parseInt(col) + Math.round((e.clientX - initialPos.x) / squareWidth);
      const nextCoord = nextRow + ',' + nextCol;
      
      if(nextRow < 0 || nextCol < 0 || nextRow > 7 || nextCol > 7) return;

      const newDestination = coordToIdList[nextCoord];
      if(initialPos.start !== newDestination && isMoveValid(chess, initialPos.start, newDestination)){
        changeStyles(newDestination, idToCoordList, draggingClass, newStyles);
      }

      if(initialPos.prevDragId !== newDestination){
        onStylesChange(newStyles);
      
        setInitialPos({
          ...initialPos,
          prevDragId : newDestination,
          destination : newDestination
        })
      }

      
    }
  }

  export  { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart };