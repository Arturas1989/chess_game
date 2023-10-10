import { useState, useEffect } from 'react';
import { useGameContext } from '../../themes/themes.js';
import Piece from './NotationPieces.jsx';
import { getTypeNotations } from '../../utilities/utilities.js';


const MoveList = () => {
    const { chess } = useGameContext();
    let moveRows = [];
    let moveRow = [];
    let moveNumber;
    chess.history().forEach((move, i) => {
      moveNumber = Math.floor(i / 2) + 1;

      if(i % 2 === 0){
        moveRow = [<Move key={i} notation={move}/>];
      } else {
        moveRow.push(<Move key={i} notation={move}/>)
        moveRows.push(
          <div key={moveNumber} className="MoveRow">
            <span className="MoveNumber">{moveNumber}</span>
            <div className="MovesCol">
              {moveRow}
            </div>
          </div>
        );
      }
    })

    if(chess.history().length % 2 === 1){
      moveRow.push(<Move key={chess.history().length} notation=''/>)
      moveRows.push(
        <div key={moveNumber} className="MoveRow">
          <span className="MoveNumber">{moveNumber}</span>
          <div className="MovesCol">
            {moveRow}
          </div>
        </div>
      );
    }
    return (
      <div className="MoveList">
        {moveRows}
      </div>
    );
}

const Notation = ({ notation }) => {
  const {
    type, 
    notations, 
    textSpace, 
    pieceSpace, 
    isPromoting, 
    left, 
    top,
    viewBoxWidth,
    viewBoxHeight
  } = getTypeNotations(notation);

  let NotationPiece = [
    type && 
    <div key={0} style={{paddingLeft: pieceSpace}} className="NotationPiece">
      <Piece type={type} left={left} top={top} viewBoxWidth={viewBoxWidth} viewBoxHeight={viewBoxHeight} />
    </div>,
    <span key={1} style={{paddingLeft: textSpace}}>{notations}</span>,
    notation[notation.length - 1] === '+' ? <span key={2}>+</span> : ''
  ] 

  if(isPromoting) [NotationPiece[1], NotationPiece[0]] = [NotationPiece[0], NotationPiece[1]];
  return (
    <>
        {NotationPiece}
    </>
    
  )
}

const Move = ({ notation }) => {
  

  return (
    <div className="WhiteMoveContainer">
      <div className="WhiteMove">
        <Notation notation={notation}/>
      </div>
    </div>
  )
}


export default MoveList;