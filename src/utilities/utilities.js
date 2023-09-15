//make a copy of pieces array
const makePiecesCopy = (pieces) => {
    let newPieces = [];
    for(const row of pieces){
      newPieces.push([...row]);
    }
    return newPieces;
  }

export default makePiecesCopy;