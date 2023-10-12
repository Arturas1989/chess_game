import { useGameContext } from '../../themes/themes.js';
import Piece from './NotationPieces.jsx';
import { getTypeNotations } from '../../utilities/utilities.js';
import fontSizeSVG from '../../utilities/fontSizeSVG.js';


const MoveList = () => {
    const { chess } = useGameContext();
    let moveRows = [];
    let moveRow = [];
    let moveNumber;
    
    chess.history().forEach((move, i) => {
      moveNumber = Math.floor(i / 2) + 1;

      if(i % 2 === 0){
        moveRow = [<Move key={i} notation={move} />];
      } else {
        moveRow.push(<Move key={i} notation={move} />)
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
      moveRow.push(<Move key={chess.history().length} notation='' />)
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
  const { pieceType, svgType, notations, isPromoting, spanRight } = getTypeNotations(notation);
  const { themes } = useGameContext();
  const font_size = themes.moveListFontSize;
  const { 
    pieceSpace, 
    left, 
    top, 
    viewBoxWidth, 
    viewBoxHeight, 
    textSpace,
    pieceWidth
  } = fontSizeSVG[font_size][svgType]

  let NotationPiece = [
    pieceType && 
    <div key={0} style={{paddingLeft: pieceSpace, width: pieceWidth}}>
      <Piece 
        pieceType={pieceType} 
        left={left} 
        top={top} 
        viewBoxWidth={viewBoxWidth} 
        viewBoxHeight={viewBoxHeight} 
      />
    </div>,
    <span key={1} style={{paddingLeft: textSpace, fontSize: font_size}}>{notations}</span>,
    spanRight ? <span key={2} style={{fontSize: font_size}}>{notation[notation.length - 1]}</span> : ''
  ] 

  if(isPromoting) [NotationPiece[1], NotationPiece[0]] = [NotationPiece[0], NotationPiece[1]];

  return NotationPiece
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