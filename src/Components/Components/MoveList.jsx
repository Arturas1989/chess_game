import React from 'react';
import { useGameContext } from '../../GameApp.js';
import Piece from './NotationPieces.jsx';
import { getTypeNotations, changeStyles } from '../../utilities/utilities.js';
import fontSizeSVG from '../../utilities/fontSizeSVG.js';
import { getLinePriority } from '../../utilities/utilities.js';


const MoveList = () => {
  return (
    <div className="MoveList">
      <MainLine />
    </div>
  );
}

const Variants = ({ lines }) => {
  const { chessVariants } = useGameContext();
  let variants = [];
  for(const line of lines){
    const length = chessVariants[line]['moves'].length;
    const chess = chessVariants[line]['moves'][length - 1];
    const variantMoves = chess.history().map(
      (notation, i) => (
        <React.Fragment key={i}>
          <VariantMove notation={notation} i={i}  id={`${line},${i}`} />
        </React.Fragment>
      )
    );
    variants.push(
      <div className="VariantLine" key={line}>
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

const VariantMove = ({ notation, i, id }) => {
  const { 
    currVariant,
    setCurrVariant, 
    initialStyles, 
    setStyles, 
    chessVariants, 
    preComputedMaps,
    theme,
    themes
  } = useGameContext();

  const handleClick = (e) => {
    
    let newStyles = {...initialStyles};
    let [currLine, newCurrMove] = e.target.id.split(',');
    newCurrMove = parseInt(newCurrMove) + 1;

    const chess = chessVariants[currLine]['moves'][newCurrMove];
    if(!chess) return;
    
    let moveInfo = chess.history({ verbose: true })[newCurrMove - 1];
    changeStyles(moveInfo.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    changeStyles(moveInfo.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);

    setCurrVariant({'currLine' : currLine, 'currMove' : newCurrMove});
    setStyles(newStyles);
  }

  let [line, moveIndex] = id.split(',');
  moveIndex = parseInt(moveIndex) + 1;

  console.log(line, moveIndex, currVariant['currLine'], currVariant['currMove'])

  const {notationPiece} = themes[theme.background];
  let className = `VariantMove ${notationPiece} `;
  if(currVariant['currLine'] === line && currVariant['currMove'] === moveIndex){
    className += `currMove`;
  } 

  return (
    <div 
      className={className} 
      id={id} 
      onClick={(e) => handleClick(e)}
    >
        {i % 2 === 0 ? 
          <MoveNumber 
            className="VariantMoveNumber" 
            i={i} 
            fontSizeType={'variantsFontSize'} 
          /> 
        : ''}
        <Notation notation={notation} fontSizeType={'variantsFontSize'}/>
    </div>
  )
}

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
        moveRow = [<Move key={i} id={`${mainLine},${i}`} notation={move} cursor='pointer' />];
      } else {
        moveRow.push(<Move key={i} id={`${mainLine},${i}`} notation={move} cursor='pointer' />)
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
          cursor=''
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

const MoveNumber = ({ i, className, fontSizeType }) => {
  const { themes } = useGameContext();
  const font_size = themes[fontSizeType];
  let moveNumber = Math.floor(i / 2) + 1;
  if(className === 'VariantMoveNumber') moveNumber += '.';
  return <span style={{fontSize: font_size}} className={className}>{moveNumber}</span>
}

const Notation = ({ notation, fontSizeType }) => {
  const { pieceType, svgType, notations, isPromoting, spanRight } = getTypeNotations(notation);
  const { themes } = useGameContext();
  const font_size = themes[fontSizeType];
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

const Move = ({ notation, id, cursor }) => {
  const {
    currVariant, 
    setCurrVariant, 
    initialStyles, 
    setStyles, 
    chessVariants, 
    preComputedMaps,
    theme,
    themes 
  } = useGameContext();

  const { currLine, currMove } = currVariant;
  

  const handleClick = (e) => {
    
    let newStyles = {...initialStyles};
    const [line, i] = e.target.id.split(',');

    const newCurrMove = parseInt(i) + 1;
    const chess = chessVariants[line]['moves'][newCurrMove];

    
    if(!chess) return;
    
    let moveInfo = chess.history({ verbose: true })[newCurrMove - 1];
    changeStyles(moveInfo.from, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);
    changeStyles(moveInfo.to, preComputedMaps[2], theme.squares + 'DragStartEnd', newStyles);

    setCurrVariant({'currLine' : line, 'currMove' : newCurrMove});
    setStyles(newStyles);
  }

  const { notationPiece } = themes[theme.background]
  let [line, moveIndex] = id.split(',');
  moveIndex = parseInt(moveIndex);
  let className = `RegularMoveContainer ${notationPiece} ${cursor} `;
  if (currLine === line && currMove - 1 === moveIndex){
    className +=  `currMove`;
  } 

  return (
    <div 
      className={className}
      onClick={(e) => handleClick(e)}
      id={id}
    >
      <div className="RegularMove">
        <Notation notation={notation} fontSizeType={'mainLineFontSize'}/>
      </div>
    </div>
  )
}


export default MoveList;