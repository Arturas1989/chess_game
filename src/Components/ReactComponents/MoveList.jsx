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
        moveRow = [<WhiteMove key={i} notation={move}/>];
      } else {
        moveRow.push(<BlackMove key={i} notation={move}/>)
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
      moveRow.push(<BlackMove key={chess.history().length} notation=''/>)
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

const WhiteMove = ({ notation }) => {
  const {type, notations, space} = getTypeNotations(notation);
  

  return (
    <div className="WhiteMoveContainer">
      <div className="WhiteMove">
        {type && <div className="NotationPiece">
          <Piece width={45} type={type}/>
        </div>}
        <span style={{paddingLeft: space}}>{notations}</span>
      </div>
    </div>
  )
}

const BlackMove = ({ notation }) => {
  const {type, notations, space} = getTypeNotations(notation);

  return (
    <div className="BlackMoveContainer">
      <div className="BlackMove">
        {type && <div className="NotationPiece">
          <Piece width={45} type={type}/>
        </div>}
        <span style={{paddingLeft: space}}>{notations}</span>
      </div>
    </div>
  )
}

export default MoveList;