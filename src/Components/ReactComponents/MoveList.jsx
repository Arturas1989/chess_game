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
  const {type, notations, space, isPromoting, left, top} = getTypeNotations(notation);

  let NotationPiece = [
    type && 
    <div className="NotationPiece">
      <Piece type={type} left={left} top={top}/>
    </div>,
    <span style={{paddingLeft: space}}>{notations}</span>
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