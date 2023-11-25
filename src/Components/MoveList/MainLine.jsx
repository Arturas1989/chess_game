import { useGameContext } from '../../GameApp.js';
import { getLinePriority } from '../../utilities/utilities.js';
import { Move, MoveNumber } from './Move.jsx';
import Variants from './Variants.jsx';

const MainLine = () => {
    const { chessVariants } = useGameContext();
      let moveRows = [], moveRow = [];
      const mainLine = 'line1';
      const moves = chessVariants[mainLine]['moves'];
      const chess = moves[moves.length - 1];
      const historyLength = chess.history().length
  
      const linePriority = getLinePriority(chessVariants);
  
      chess.history().forEach((move, i) => {
  
        if(i % 2 === 0){
          moveRow = [<Move key={i} id={`${mainLine},${i}`} notation={move} className='RegularMoveContainer' />];
        } else {
          moveRow.push(<Move key={i} id={`${mainLine},${i}`} notation={move} className='RegularMoveContainer' />)
          moveRows.push(
            <div key={i} className="MoveRow">
              <MoveNumber i={i} className="MoveNumber" fontSizeType={'mainLineFontSize'}/>
              <div className="MovesCol">
                {moveRow}
              </div>
            </div>
          );
        }
  
        if(linePriority[i]){
          moveRows.push( <Variants key={'0' + i} lines={linePriority[i]} />)
        }
      })
  
      if(chess.history().length % 2 === 1){
        const i = historyLength - 1;
        moveRow.push(
          <Move 
            key={historyLength} 
            id={`${mainLine},${historyLength}`} 
            notation=''
            className='empty'
          />
        )
        moveRows.push(
          <div key={i} className="MoveRow">
            <MoveNumber i={i} className="MoveNumber" />
            <div className="MovesCol">
              {moveRow}
            </div>
          </div>
        );
      }
  
      return moveRows;
  }

  export default MainLine;