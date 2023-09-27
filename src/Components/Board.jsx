import { useState, useRef, useEffect, useContext } from 'react';
import { Square, PromotionSquare, RegularSquare } from './Square.jsx';
import { GameContext } from '../themes/themes.js';
import { getPromotionIds, promotionPieces } from '../utilities/utilities.js';

const Board = () => {
    const { promotion } = useContext(GameContext)
    
    const [boardBoundaries, setBoardBoundaries] = useState(null);

    // using useRef to create reference to the board component
    const boardRef = useRef(null);
  
    // it's not guaranteed that the Board component is rendered, it might be null
    //useEffect is used that, when boardRef changes (Board component is rendered) boardBoundaries will be set
    useEffect(() => {
      if (boardRef.current) {
        setBoardBoundaries(boardRef.current.getBoundingClientRect());
      }
    }, [boardRef]);
  
    const [pieceClicked, setPieceClicked] = useState({});
    return (
      <div ref={boardRef} className={'Board' + (promotion.isPromoting ? ' promotion-board' : '')}>
        
        {Array.from({length: 64}, (_,i) => 
            <Square
                key={i} 
                index={i}
                boardBoundaries={boardBoundaries}
                pieceClicked={pieceClicked}
                onPieceClick={setPieceClicked}
            />
        )}
      </div>
    );
  }

const PromotionBoard = () => {

  const {
    themes,
    theme,
    promotion,
    chess,
    preComputedMaps,
    promotionPiecesList
  } = useContext(GameContext)

    const { pieces } = themes[theme];
    const promotionIds = getPromotionIds(promotion.to, preComputedMaps, promotionPiecesList);
    

    return (
      <div className={'Board promotion-board'}>
        
        {Array.from({length: 64}, (_,i) =>
          { 
            const [, coordToIdList, ] = preComputedMaps;
    
  
            const row = Math.floor(i / 8);
            const col = i % 8;
            const pos = coordToIdList[row + ',' + col];
            const squareInfo = chess.get(pos);
            let source, ComponentSquare;
            if(promotionIds[pos]){
              const [color, type] = [...promotionIds[pos]];
              source = pieces[color][type];
              ComponentSquare = 
                <PromotionSquare
                  key={i}
                  type={type}
                  source={source}
                  pos={pos}
                />
            } else {
              source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';
              ComponentSquare = 
                <RegularSquare
                  key={i}
                  source={source}
                  pos={pos}
                />
            }
            
            return ComponentSquare;
          }
        )}
      </div>
    );
  }



  export {Board, PromotionBoard};