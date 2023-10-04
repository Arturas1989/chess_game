import { useState, useEffect } from 'react';
import { useGameContext } from '../themes/themes.js';

const MoveList = () => {
    const { chess } = useGameContext();
    return (
      <div className="MoveList">
        <MoveRow chess={chess}/>
      </div>
    );
}

const MoveRow = ({ chess }) => {
  return (
    <div className="MoveRow">
      <div className="MoveNumber"></div>
      <MovesCol chess={chess}/>
    </div>
  )
}

const MovesCol = ({ chess }) => {
  return (
    <div className="MovesCol">
      <WhiteMove chess={chess}/>
      <BlackMove chess={chess}/>
    </div>
  )
}

const WhiteMove = ({ chess }) => {
  return (
    <div className="WhiteMove">

    </div>
  )
}

const BlackMove = ({ chess }) => {
  return (
    <div className="BlackMove">

    </div>
  )
}

export default MoveList;