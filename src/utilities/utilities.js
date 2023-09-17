//make a copy of pieces array
const makePiecesCopy = (pieces) => {
    let newPieces = [];
    for(const row of pieces){
      newPieces.push([...row]);
    }
    return newPieces;
  }

const getCoord = (id, isReverse) => {
  
  const cols = 'abcdefgh';
  let [row, col] = id.split(',').map(str=>parseInt(str));

  if(isReverse){
    row++;
    col = 8 - col;
  } else {
    row = 8 - row;
    col++;
  }
  
  return cols[col-1] + row;
}

export  { makePiecesCopy, getCoord };