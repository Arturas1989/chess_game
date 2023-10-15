import { useGameContext } from '../../themes/themes.js';
import Piece from './NotationPieces.jsx';
import { getTypeNotations, changeStyles } from '../../utilities/utilities.js';
import fontSizeSVG from '../../utilities/fontSizeSVG.js';


const MoveList = () => {
    const { chessHistory } = useGameContext();
    let moveRows = [], moveRow = [], moveNumber;
    const chess = chessHistory[chessHistory.length - 1];
    const historyLength = chess.history().length
    
    chess.history().forEach((move, i) => {
      moveNumber = Math.floor(i / 2) + 1;

      if(i % 2 === 0){
        moveRow = [<Move key={i} id={i} notation={move} />];
      } else {
        moveRow.push(<Move key={i} id={i} notation={move} />)
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
      moveRow.push(<Move key={historyLength} id={historyLength} notation='' />)
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

const Move = ({ notation, id }) => {
  const {
    currMove, 
    setCurrMove, 
    initialStyles, 
    setStyles, 
    chessHistory, 
    preComputedMaps,
    theme 
  } = useGameContext();

  const handlelick = (e) => {
    
    let newStyles = {...initialStyles};
    const newCurrMove = parseInt(e.target.id) + 1, chess = chessHistory[newCurrMove];
    let moveInfo = chess.history({ verbose: true })[newCurrMove - 1];
    changeStyles(moveInfo.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    changeStyles(moveInfo.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);

    setCurrMove(parseInt(e.target.id) + 1);
    setStyles(newStyles);
  }

  return (
    <div 
      className={`WhiteMoveContainer ${currMove - 1 === id ? 'currMove' : ''}`}
      onClick={(e) => handlelick(e)}
      id={id}
    >
      <div className="WhiteMove">
        <Notation notation={notation}/>
      </div>
    </div>
  )
}


export default MoveList;