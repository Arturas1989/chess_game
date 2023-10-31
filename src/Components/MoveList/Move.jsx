import React from 'react';
import { useGameContext } from '../../GameApp.js';
import { changeStyles } from '../../utilities/utilities.js';
import { Notation } from './Notation.jsx';

const VariantMove = ({ notation, i, id, dots }) => {
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
              dots={dots} 
            /> 
          : ''}
          <Notation notation={notation} fontSizeType={'variantsFontSize'}/>
      </div>
    )
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

  const MoveNumber = ({ i, className, fontSizeType, dots }) => {
    const { themes } = useGameContext();
    const font_size = themes[fontSizeType];
    let moveNumber = Math.floor(i / 2) + 1;
    if(className === 'VariantMoveNumber') moveNumber += dots;
    return <span style={{fontSize: font_size}} className={className}>{moveNumber}</span>
  }

  export {VariantMove, Move, MoveNumber};