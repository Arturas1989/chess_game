import { 
  changeStyles, 
  highlightValidMoves, 
  isMoveValid, 
  getPromotionIds, 
  setPromotionStyles, 
  changePromotionStyles 
} from '../utilities/utilities.js';

const cloneDeep = require('lodash/cloneDeep');

const enableDrag = (handlerArgs) => {
  const { setDragInfo, dragInfo } = handlerArgs;
  // enable drag on mouse enter, when its disabled on drag end
  setDragInfo({...dragInfo, dragEnabled : true});
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

    const [row, col] = idToCoordList[e.target.id].split(',');
    changeStyles(e.target.id, row, col, dragStartEndClass, newStyles);

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
        initialStyles, 
        idToCoordList, 
        onStylesChange, 
        initialPos,
        dragStartEndClass
    } = handlerArgs;

    const result = handlePiecePositions(handlerArgs);
    if(!result){
      return;
    }

    let newStyles = {...initialStyles};
    
    const [destRow, destCol] = idToCoordList[initialPos.destination].split(',');
    const [startRow, startCol] = idToCoordList[initialPos.start].split(',');

    changeStyles(initialPos.destination, destRow, destCol, dragStartEndClass, newStyles);
    changeStyles(initialPos.start, startRow, startCol, dragStartEndClass, newStyles);
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
        promotionClass
    } = handlerArgs;
    setDragInfo({...dragInfo, dragEnabled : false, isDragging : false});
    
    //if it's the same position, disable drag and return early
    if(initialPos.destination === initialPos.start){
      onPieceClick({
        ...pieceClicked,
        wasPieceClicked : true,
        prevPos : initialPos.destination
      });
      return false;
    } 

    if( isMoveValid(chess, initialPos.start, initialPos.destination) ){
      if(initialPos.destination[1] === '8' || initialPos.destination[1] === '1'){
        onPromotionChange({
          ...promotion,
          isPromoting: true,
          from: initialPos.start,
          to: initialPos.destination
        })
        const promotionIds = getPromotionIds(initialPos.destination, preComputedMaps, promotionPiecesList);
        let newStyles = {...initialStyles};
        setPromotionStyles(newStyles, promotionIds, promotionClass);
        onStylesChange(newStyles);
        return false;
      } else {
        chess.move({ from: initialPos.start, to: initialPos.destination });
      }
      
      const chessClone = cloneDeep(chess);
      onChessChange(chessClone);
    } else {
      const newStyles = {...initialStyles};
      onStylesChange(newStyles);
      return false;
    }

    return true;
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
        const [prevRow, prevCol] = idToCoordList[initialPos.destination].split(',');
        if(isMoveValid(chess, initialPos.start, initialPos.destination)){
          const validMoveStyles = chess.get(initialPos.destination) ? validMovesTakeClass : validMovesEmptyClass;
          changeStyles(initialPos.destination, prevRow, prevCol, validMoveStyles, newStyles);
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
        changeStyles(newDestination, nextRow, nextCol, draggingClass, newStyles);
      }

      onStylesChange(newStyles);
      
      setInitialPos({
        ...initialPos,
        destination : newDestination
      })
    }
  }

  export  { handleDragStart, handleDragEnd, handleDrag, enableDrag, preventDragStart };