import { useState, useRef, useEffect, useContext } from 'react';
import { Square, PromotionSquare } from './Square.jsx';
import { ThemeContext } from '../themes/themes.js';
import { Chess } from 'chess.js';
import { preComputed, promotionPieces, getPromotionIds, setInitialStyles, setPromotionStyles } from '../utilities/utilities.js';

const Board = ({ promotion, onPromotionChange }) => {
  
    const themes = useContext(ThemeContext);
    const { squareStyles, promotionStyles } = themes.standard;
    const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord} = preComputed;
    
    
    const [chess, setChess] = useState(new Chess());
    const [isReversed, setIsReversed] = useState(false);
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
    
    let preComputedMaps;

    if(isReversed){
      preComputedMaps = [revCoords, revCoordToId, revIdToCoord];
    } else {
      preComputedMaps = [coords, coordToId, idToCoord];
    }

    //square styles
    let initialStyles = {};
    setInitialStyles(coords, initialStyles, squareStyles);
    

    const [styles, setStyles] = useState({...initialStyles});
  
    const [pieceClicked, setPieceClicked] = useState({});
    return (
      <div ref={boardRef} className={'Board' + (promotion.isPromoting ? ' promotion-board' : '')}>
        
        {Array.from({length: 64}, (_,i) => 
            <Square
                key={i} 
                index={i}
                styles={styles}
                chess={chess}
                onChessChange={setChess}
                isReversed={isReversed}
                initialStyles={initialStyles}
                onStylesChange={setStyles}
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

const PromotionBoard = ({ promotion, onPromotionChange }) => {
  
    const themes = useContext(ThemeContext);
    const { squareStyles, promotionStyles } = themes.standard;
    const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord} = preComputed;
    
    
    const [chess, setChess] = useState(new Chess());
    const [isReversed, setIsReversed] = useState(false);
    
    let preComputedMaps, promotionPiecesList;

    if(isReversed){
      preComputedMaps = [revCoords, revCoordToId, revIdToCoord];
      promotionPiecesList = promotionPieces.reversed;
    } else {
      preComputedMaps = [coords, coordToId, idToCoord];
      promotionPiecesList = promotionPieces.regular;
    }

    
    const promotionIds = getPromotionIds(promotion.square, preComputedMaps, promotionPiecesList);

    //square styles
    let initialStyles = {};
    setInitialStyles(coords, initialStyles, squareStyles);
    setPromotionStyles(initialStyles, promotionIds, promotionStyles);

    return (
      <div className={'Board promotion-board'}>
        
        {Array.from({length: 64}, (_,i) => 
            <PromotionSquare
                key={i} 
                index={i}
                styles={initialStyles}
                chess={chess}
                onChessChange={setChess}
                preComputedMaps={preComputedMaps}
                promotionIds={promotionIds}
            />
        )}
      </div>
    );
  }



  export {Board, PromotionBoard};