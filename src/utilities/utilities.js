const cloneDeep = require('lodash/cloneDeep');

const preComputed = {
  coords : ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  revCoords : ["h8", "g8", "f8", "e8", "d8", "c8", "b8", "a8", "h7", "g7", "f7", "e7", "d7", "c7", "b7", "a7", "h6", "g6", "f6", "e6", "d6", "c6", "b6", "a6", "h5", "g5", "f5", "e5", "d5", "c5", "b5", "a5", "h4", "g4", "f4", "e4", "d4", "c4", "b4", "a4", "h3", "g3", "f3", "e3", "d3", "c3", "b3", "a3", "h2", "g2", "f2", "e2", "d2", "c2", "b2", "a2", "h1", "g1", "f1", "e1", "d1", "c1", "b1", "a1"],
  idToCoord : { a1: "7,0", a2: "6,0", a3: "5,0", a4: "4,0", a5: "3,0", a6: "2,0", a7: "1,0", a8: "0,0", b1: "7,1", b2: "6,1", b3: "5,1", b4: "4,1", b5: "3,1", b6: "2,1", b7: "1,1", b8: "0,1", c1: "7,2", c2: "6,2", c3: "5,2", c4: "4,2", c5: "3,2", c6: "2,2", c7: "1,2", c8: "0,2", d1: "7,3", d2: "6,3", d3: "5,3", d4: "4,3", d5: "3,3", d6: "2,3", d7: "1,3", d8: "0,3", e1: "7,4", e2: "6,4", e3: "5,4", e4: "4,4", e5: "3,4", e6: "2,4", e7: "1,4", e8: "0,4", f1: "7,5", f2: "6,5", f3: "5,5", f4: "4,5", f5: "3,5", f6: "2,5", f7: "1,5", f8: "0,5", g1: "7,6", g2: "6,6", g3: "5,6", g4: "4,6", g5: "3,6", g6: "2,6", g7: "1,6", g8: "0,6", h1: "7,7", h2: "6,7", h3: "5,7", h4: "4,7", h5: "3,7", h6: "2,7", h7: "1,7", h8: "0,7"
  },

  coordToId:
  { "0,0": "a8", "0,1": "b8", "0,2": "c8", "0,3": "d8", "0,4": "e8", "0,5": "f8", "0,6": "g8", "0,7": "h8", "1,0": "a7", "1,1": "b7", "1,2": "c7", "1,3": "d7", "1,4": "e7", "1,5": "f7", "1,6": "g7", "1,7": "h7", "2,0": "a6", "2,1": "b6", "2,2": "c6", "2,3": "d6", "2,4": "e6", "2,5": "f6", "2,6": "g6", "2,7": "h6", "3,0": "a5", "3,1": "b5", "3,2": "c5", "3,3": "d5", "3,4": "e5", "3,5": "f5", "3,6": "g5", "3,7": "h5", "4,0": "a4", "4,1": "b4", "4,2": "c4", "4,3": "d4", "4,4": "e4", "4,5": "f4", "4,6": "g4", "4,7": "h4", "5,0": "a3", "5,1": "b3", "5,2": "c3", "5,3": "d3", "5,4": "e3", "5,5": "f3", "5,6": "g3", "5,7": "h3", "6,0": "a2", "6,1": "b2", "6,2": "c2", "6,3": "d2", "6,4": "e2", "6,5": "f2", "6,6": "g2", "6,7": "h2", "7,0": "a1", "7,1": "b1", "7,2": "c1", "7,3": "d1", "7,4": "e1", "7,5": "f1", "7,6": "g1", "7,7": "h1"
  },

  revIdToCoord : { a1: "0,7", a2: "1,7", a3: "2,7", a4: "3,7", a5: "4,7", a6: "5,7", a7: "6,7", a8: "7,7", b1: "0,6", b2: "1,6", b3: "2,6", b4: "3,6", b5: "4,6", b6: "5,6", b7: "6,6", b8: "7,6", c1: "0,5", c2: "1,5", c3: "2,5", c4: "3,5", c5: "4,5", c6: "5,5", c7: "6,5", c8: "7,5", d1: "0,4", d2: "1,4", d3: "2,4", d4: "3,4", d5: "4,4", d6: "5,4", d7: "6,4", d8: "7,4", e1: "0,3", e2: "1,3", e3: "2,3", e4: "3,3", e5: "4,3", e6: "5,3", e7: "6,3", e8: "7,3", f1: "0,2", f2: "1,2", f3: "2,2", f4: "3,2", f5: "4,2", f6: "5,2", f7: "6,2", f8: "7,2", g1: "0,1", g2: "1,1", g3: "2,1", g4: "3,1", g5: "4,1", g6: "5,1", g7: "6,1", g8: "7,1", h1: "0,0", h2: "1,0", h3: "2,0", h4: "3,0", h5: "4,0", h6: "5,0", h7: "6,0", h8: "7,0"
  },

  revCoordToId : { "0,0": "h1", "0,1": "g1", "0,2": "f1", "0,3": "e1", "0,4": "d1", "0,5": "c1", "0,6": "b1", "0,7": "a1", "1,0": "h2", "1,1": "g2", "1,2": "f2", "1,3": "e2", "1,4": "d2", "1,5": "c2", "1,6": "b2", "1,7": "a2", "2,0": "h3", "2,1": "g3", "2,2": "f3", "2,3": "e3", "2,4": "d3", "2,5": "c3", "2,6": "b3", "2,7": "a3", "3,0": "h4", "3,1": "g4", "3,2": "f4", "3,3": "e4", "3,4": "d4", "3,5": "c4", "3,6": "b4", "3,7": "a4", "4,0": "h5", "4,1": "g5", "4,2": "f5", "4,3": "e5", "4,4": "d5", "4,5": "c5", "4,6": "b5", "4,7": "a5", "5,0": "h6", "5,1": "g6", "5,2": "f6", "5,3": "e6", "5,4": "d6", "5,5": "c6", "5,6": "b6", "5,7": "a6", "6,0": "h7", "6,1": "g7", "6,2": "f7", "6,3": "e7", "6,4": "d7", "6,5": "c7", "6,6": "b7", "6,7": "a7", "7,0": "h8", "7,1": "g8", "7,2": "f8", "7,3": "e8", "7,4": "d8", "7,5": "c8", "7,6": "b8", "7,7": "a8"
  }
};


const notationSymbols = {
  'K' : '♔',
  'Q' : '♕',
  'R' : '♖',
  'B' : '♗',
  'N' : '♘'
}

const getLinePriority = (chessVariants) => {
  let variantsClone = cloneDeep(chessVariants);
  delete variantsClone['lastLine'];
  delete variantsClone['movesLines'];

  let fromLines = {};
  for(const line in variantsClone){
    const fromLine = variantsClone[line]['fromLine'];
    if(line !== fromLine){
      fromLines[fromLine] ? fromLines[fromLine].push(line) : fromLines[fromLine] = [line];
    }
  }

  let linePriority = {};
  if(fromLines['line1']){
    for(const line of fromLines['line1']){
      const fromMove = chessVariants[line]['fromMove'];
      linePriority[fromMove] ? linePriority[fromMove].push(line) : linePriority[fromMove] = [line];
      let unchecked = [line];
      while(unchecked.length!==0){
        let newUnchecked = [];
        for(const line2 of unchecked){
          if(fromLines[line2]){
            linePriority[fromMove] = [...linePriority[fromMove], ...fromLines[line2]];
            newUnchecked = [...newUnchecked, ...fromLines[line2]];
          }
        }
        unchecked = [...newUnchecked];
      }
    }
  }
  
  return linePriority;
}

const setVariant = (newChessVariants, currLine, currMove, chessClone, setChessVariants, setCurrVariant) => {
  const prevMoves = [...newChessVariants[currLine]['moves']];
  let nextMoveIndex = currMove + 1;
  const prevHistory = prevMoves[prevMoves.length - 1].history();
  const nextHistory = chessClone.history();
  const nextHistoryText = nextHistory.join('');
  const lastMove = prevHistory[currMove] || '';
  const nextMove = nextHistory[currMove];

  let newMoves = [...prevMoves.slice(0, nextMoveIndex), chessClone];

  if(lastMove){
    if(nextMove !== lastMove){
      if(!newChessVariants['movesLines'][nextHistoryText]){
        
        const prevLine = currLine;
        newChessVariants['lastLine']++;
        currLine = 'line' + newChessVariants['lastLine'];
        newChessVariants[currLine] = {
          'fromLine' : prevLine,
          'fromMove' : currMove
        };
        nextMoveIndex = nextHistory.length;
        
      } else {
        currLine = newChessVariants['movesLines'][nextHistoryText];
      }
      
    } else {
      newMoves = prevMoves;
    }
  }

  newChessVariants['movesLines'][nextHistoryText] = currLine;
  newChessVariants[currLine]['moves'] = newMoves;
  setChessVariants(newChessVariants);
  setCurrVariant({'currLine' : currLine, 'currMove' : nextMoveIndex});
}

const getTypeNotations = (notation) => {
  let pieceType,
  svgType, 
  notations, 
  isPromoting,
  spanRight,
  lastIndex = notation.length - 1;
  if(notationSymbols[notation[lastIndex - 1]]){
    notation = notation.substring(0, lastIndex);
    lastIndex--;
    svgType = 'middle';
    isPromoting = true;
    spanRight = true;
  } 
  if(notationSymbols[notation[lastIndex]]){
    pieceType = notation[lastIndex];
    svgType = 'right';
    notations = notation.substring(0, lastIndex);
    isPromoting = true;
  } else if (notationSymbols[notation[0]]) {
    pieceType = notation[0];
    svgType = 'left';
    notations = notation.substring(1);
  } else {
    pieceType = '';
    svgType = 'none';
    notations = notation;
  }
  return { 
    pieceType: pieceType,
    svgType: svgType, 
    notations: notations, 
    isPromoting: isPromoting,
    spanRight: spanRight
  };
}

const getSquareWidth = (boardBoundaries) => {
  const boundaries = boardBoundaries || {};
  const boardWidth = boundaries.width || 0;
  return boardWidth / 8;
}

const getCoordClass = (id, idToCoord, theme, coordType) => {
  const squareType = getSquareType(id, idToCoord);
  return `coord${coordType} ${theme}Coord${squareType}`;
}

const getSquareType = (id, idToCoord) => {
  if(!idToCoord[id]) return;
  const [row, col] = idToCoord[id].split(',');
  const index = parseInt(row) * 8 + parseInt(col);
  return index % 2 === row % 2 ? 'White' : 'Black';
};

const changePromotionStyles = (id, promotionId, className, newStyles) => {
  const newClassName = promotionId[1] === '8' ? className + 'SideWhite' : className + 'SideBlack';
  newStyles[id] = newClassName;
};

const changeStyles = (id, idToCoord, className, newStyles) => {
  newStyles[id] = className + getSquareType(id, idToCoord);
};

const highlightValidMoves = (chess, id, idToCoord, emptySquareClass, pieceClass, newStyles) => {
  const validMoves = chess.moves({ square: id, verbose: true });
  for(const move of validMoves){
    chess.get(move.to) ? changeStyles(move.to, idToCoord, pieceClass, newStyles) : 
    changeStyles(move.to, idToCoord, emptySquareClass, newStyles);
  }
};

const isMoveValid = (chess, fromSquare, moveSquare) => {
  if(!fromSquare || !moveSquare) return false;
  const moves = chess.moves({ square: fromSquare, verbose: true });
  for(const move of moves){
    if(move.to === moveSquare) return true;
  }
  return false;
};

const promotionPieces = {
  regular: {
    white: ['wq', 'wr', 'wb', 'wn'],
    black: ['bq', 'br', 'bb', 'bn']
  },

  reversed: {
    black: ['wq', 'wr', 'wb', 'wn'],
    white: ['bq', 'br', 'bb', 'bn']
  }
};

const getPromotionIds = (square, preComputedMaps, promotionPieces) => {
  const [, coordToIdList, idToCoordList] = preComputedMaps;
  let [row, col] = idToCoordList[square].split(',').map(el=>parseInt(el));
  let ids = {};
  if(row === 7){
    for(const piece of promotionPieces.black){
      ids[coordToIdList[(row--) + ',' + col]] = piece;
    }
  } else {
    for(const piece of promotionPieces.white){
      ids[coordToIdList[(row++) + ',' + col]] = piece;
    }
  }
  return ids;
};

const setInitialStyles = (coords, initialStyles, className) => {
  let i = 0;
    
    for(const id of coords){
      const row = Math.floor(i / 8);
      
      initialStyles[id] = i % 2 === row % 2 ? className + 'Black' : className + 'White';
      i++;
    }
}

const setPromotionStyles = (initialStyles, square, preComputedMaps, promotionPiecesList, promotionClass) => {

    const promotionIds = getPromotionIds(square, preComputedMaps, promotionPiecesList);
  
    const cols = {'a' : 0, 'b' : 1, 'c' : 2, 'd' : 3, 'e' : 4, 'f' : 5, 'g' : 6, 'h' : 7};
  
    for(const id in promotionIds){
      const [col, coordRow] = id;
      const i = cols[col] + coordRow * 8;
      const row = Math.floor(i / 8);
      initialStyles[id] = i % 2 === row % 2 ? promotionClass + 'White' : promotionClass + 'Black';
    }
  
}

export  {
  getTypeNotations, 
  promotionPieces, 
  preComputed,
  getSquareWidth,
  getSquareType,
  getCoordClass, 
  changeStyles, 
  highlightValidMoves, 
  isMoveValid, 
  getPromotionIds, 
  setInitialStyles,
  setPromotionStyles,
  changePromotionStyles,
  setVariant,
  getLinePriority
 };