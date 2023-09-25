import { useState, useRef, useEffect, useContext } from 'react';
import { Square, PromotionSquare, RegularSquare } from './Square.jsx';
import { ThemeContext } from '../themes/themes.js';

const Board = (props) => {
  
  const { 
    promotion, 
    onPromotionChange, 
    styles, 
    onStylesChange, 
    initialStyles,
    preComputedMaps,
    chess,
    onChessChange,
    isReversed
  } = props;
    
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
                styles={styles}
                chess={chess}
                onChessChange={onChessChange}
                isReversed={isReversed}
                initialStyles={initialStyles}
                onStylesChange={onStylesChange}
                boardBoundaries={boardBoundaries}
                pieceClicked={pieceClicked}
                onPieceClick={setPieceClicked}
                promotion={promotion}
                onPromotionChange={onPromotionChange}
                preComputedMaps={preComputedMaps}
            />
        )}
      </div>
    );
  }

const PromotionBoard = (props) => {
  
  const { 
    promotion, 
    onPromotionChange, 
    styles, 
    onStylesChange, 
    initialStyles, 
    promotionIds, 
    preComputedMaps, 
    chess, 
    onChessChange } = props;

    const themes = useContext(ThemeContext);
    const { pieces } = themes.standard;
    

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
                  styles={styles}
                  initialStyles={initialStyles}
                  onStylesChange={onStylesChange}
                  chess={chess}
                  onChessChange={onChessChange}
                  source={source}
                  pos={pos}
                  preComputedMaps={preComputedMaps}
                />
            } else {
              source = squareInfo ? pieces[squareInfo.color][squareInfo.type] : '';
              ComponentSquare = 
                <RegularSquare
                  key={i}
                  styles={initialStyles}
                  chess={chess}
                  onChessChange={onChessChange}
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