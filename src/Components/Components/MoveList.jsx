import React from 'react';
import { useGameContext } from '../../GameApp.js';
import Piece from './NotationPieces.jsx';
import { getTypeNotations, changeStyles } from '../../utilities/utilities.js';
import fontSizeSVG from '../../utilities/fontSizeSVG.js';


const MoveList = () => {
  return (
    <div className="MoveList">
      {/* <MainLine /> */}
      <Variants />
    </div>
  );
}

const Variants = () => {
  const { chessVariants } = useGameContext();
  let variants = [];
  for(let i = 1; i <= chessVariants['lastLine']; i++){
    const line = 'line' + i;
    const length = chessVariants[line]['moves'].length;
    const chess = chessVariants[line]['moves'][length - 1];
    const variantMoves = chess.history().map(
      (notation, i) => (
        <React.Fragment key={i}>
          {i % 2 === 0 ? <MoveNumber className="VariantMoveNumber" i={i} /> : ''}
          <VariantMove notation={notation}  id={`${line},${i}`} />
        </React.Fragment>
      )
    );
    variants.push(
      <div className="VariantLine" key={i}>
        {variantMoves}
      </div>
    )
  }

  return (
    <div className="Variants">
      {variants}
    </div>
  )
  
}

const VariantMove = ({ notation, id }) => {
  const {
    currVariant, 
    setCurrVariant, 
    initialStyles, 
    setStyles, 
    chessVariants, 
    preComputedMaps,
    theme 
  } = useGameContext();

  const {currLine, currMove} = currVariant;

  const handleClick = (e) => {
    
    let newStyles = {...initialStyles};
    let [currLine, newCurrMove] = e.target.id.split(',');
    newCurrMove = parseInt(newCurrMove) + 1;

    const chess = chessVariants[currLine]['moves'][newCurrMove];
    
    let moveInfo = chess.history({ verbose: true })[newCurrMove - 1];
    changeStyles(moveInfo.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    changeStyles(moveInfo.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);

    setCurrVariant({'currLine' : currLine, 'currMove' : newCurrMove});
    setStyles(newStyles);
  }

  return (
    <div className="VariantMove" id={id} onClick={(e) => handleClick(e)}>
        <Notation notation={notation}/>
    </div>
  )
}

const MainLine = () => {
  const { chessVariants, currVariant } = useGameContext();
    let moveRows = [], moveRow = [];
    const { currLine } = currVariant;
    const moves = chessVariants[currLine]['moves'];
    const chess = moves[moves.length - 1];
    const historyLength = chess.history().length
    
    chess.history().forEach((move, i) => {

      if(i % 2 === 0){
        moveRow = [<Move key={i} id={i} notation={move} />];
      } else {
        moveRow.push(<Move key={i} id={i} notation={move} />)
        moveRows.push(
          <div key={i} className="MoveRow">
            <MoveNumber i={i} className="MoveNumber" />
            <div className="MovesCol">
              {moveRow}
            </div>
          </div>
        );
      }
    })

    if(chess.history().length % 2 === 1){
      const i = historyLength-1;
      moveRow.push(<Move key={historyLength} id={historyLength} notation='' />)
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

const MoveNumber = ({ i, className }) => {
  const moveNumber = Math.floor(i / 2) + 1;
  return <span className={className}>{moveNumber}</span>
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
    currVariant, 
    setCurrVariant, 
    initialStyles, 
    setStyles, 
    chessVariants, 
    preComputedMaps,
    theme 
  } = useGameContext();

  const {currLine, currMove} = currVariant;

  const handleClick = (e) => {
    
    let newStyles = {...initialStyles};
    const newCurrMove = parseInt(e.target.id) + 1;

    const chess = chessVariants[currLine]['moves'][newCurrMove];
    
    let moveInfo = chess.history({ verbose: true })[newCurrMove - 1];
    changeStyles(moveInfo.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    changeStyles(moveInfo.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);

    setCurrVariant({...currVariant, 'currMove' : newCurrMove});
    setStyles(newStyles);
  }

  return (
    <div 
      className={`RegularMoveContainer ${currMove - 1 === id ? 'currMove' : ''}`}
      onClick={(e) => handleClick(e)}
      id={id}
    >
      <div className="RegularMove">
        <Notation notation={notation}/>
      </div>
    </div>
  )
}


export default MoveList;