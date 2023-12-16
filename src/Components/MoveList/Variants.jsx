import React from 'react';
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { VariantMove } from './Move.jsx';
import FromLine from './FromLine.jsx';

const Variants = ({ lines }) => {
    const { chessVariants } = useGameContext();
    let variants = [];
    for(const line of lines){
      const length = chessVariants[line]['moves'].length;
      const chess = chessVariants[line]['moves'][length - 1];
      let {fromMove, fromLine} = chessVariants[line];
      const moveIndex = fromMove - 1;
      const notation = chess.history()[fromMove];
      let variantMoves;
      if(fromMove % 2 === 1){
        variantMoves = [
          <React.Fragment key={fromMove}>
            <VariantMove notation={notation} i={moveIndex}  id={`${line},${fromMove}`} dots={'...'}/>
          </React.Fragment>
        ]
        fromMove++;
      } else {
        variantMoves = []
      }
  
      const remainingVariantMoves = chess.history().slice(fromMove).map(
        (notation, i) => 
          { 
            const moveIndex = fromMove + i;
            return (
              <React.Fragment key={i}>
                <VariantMove notation={notation} i={moveIndex}  id={`${line},${moveIndex}`} dots={'.'} />
              </React.Fragment>
            )
          }
      );
  
      variantMoves = 
      [
        <FromLine key={'fromLine'} fromLine={fromLine} line={line} />,
        ...variantMoves, 
        remainingVariantMoves
      ];
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

  export default Variants;