

import SquareHighLight from './SquareHighLight.jsx';
import { preComputed } from '../utilities/utilities.js';

const Square = (props) => {
    const { 
      index, 
      styles,
      chess,
      onChessChange,
      isReversed,
      initialStyles, 
      onStylesChange, 
      boardBoundaries, 
      pieceClicked, 
      onPieceClick 
    } = props;

    const row = Math.floor(index / 8);
    const col = index % 8;
    const { coordToId, revCoordToId} = preComputed;
    const coordToIdList = isReversed ? revCoordToId : coordToId;
    const pos = coordToIdList[row + ',' + col];
    
    
    return (
      <div className="Square"  id={pos} style={initialStyles[pos]}>
        <SquareHighLight
          pos={pos}
          row={row}
          col={col}
          index={index}
          styles={styles}
          chess={chess}
          onChessChange={onChessChange}
          isReversed={isReversed}
          initialStyles={initialStyles}
          onStylesChange={onStylesChange}
          boardBoundaries={boardBoundaries}
          pieceClicked={pieceClicked}
          onPieceClick={onPieceClick}
        />
      </div>
    );
  }

  export default Square;