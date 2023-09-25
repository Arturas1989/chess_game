import './App.css';
import { useState } from 'react';
import { themes, ThemeContext } from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Board';
import MoveList from './Components/MoveList.jsx';
import Arrow from './Components/Arrow.jsx';
import { preComputed, setInitialStyles, getPromotionIds, setPromotionStyles, promotionPieces } from './utilities/utilities.js';
import { Chess } from 'chess.js';



const GameContainer = () => {
  const [promotion, setPromotion] = useState({isPromoting: true, square: 'd8'});
  const [chess, setChess] = useState(new Chess());
  const [isReversed, setIsReversed] = useState(true);

  const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord } = preComputed;
  const { squareStyles, promotionStyles } = themes.standard;

  let initialStyles = {};
  setInitialStyles(coords, initialStyles, squareStyles);
    
    
    
    
  let preComputedMaps, promotionPiecesList;

  if(isReversed){
    preComputedMaps = [revCoords, revCoordToId, revIdToCoord];
    promotionPiecesList = promotionPieces.reversed;
  } else {
    preComputedMaps = [coords, coordToId, idToCoord];
    promotionPiecesList = promotionPieces.regular;
  }

  
  const promotionIds = getPromotionIds(promotion.square, preComputedMaps, promotionPiecesList);

  //square promotion styles
  if(promotion.isPromoting) setPromotionStyles(initialStyles, promotionIds, promotionStyles);
  // onStylesChange(initialStyles);
  

  const [styles, setStyles] = useState({...initialStyles});
  return (
    <ThemeContext.Provider value={themes}>
      <div className="GameContainer">
        {promotion.isPromoting ?
          <PromotionBoard 
            promotion={promotion}
            onPromotionChange={setPromotion}
            initialStyles={initialStyles}
            styles={styles}
            onStylesChange={setStyles}
            promotionIds={promotionIds}
            preComputedMaps={preComputedMaps}
            chess={chess}
            onChessChange={setChess}
          />
          :
          <Board
            preComputedMaps={preComputedMaps}
            promotion={promotion}
            onPromotionChange={setPromotion}
            initialStyles={initialStyles}
            styles={styles}
            onStylesChange={setStyles}
            chess={chess}
            onChessChange={setChess}
            isReversed={isReversed}
          />
        }
        
        {/* <Arrow /> */}
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

export default GameContainer;