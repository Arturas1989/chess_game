import './App.css';
import { useState } from 'react';
import { themes, ThemeContext } from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Board';
import MoveList from './Components/MoveList.jsx';
import Arrow from './Components/Arrow.jsx';
import { preComputed, setInitialStyles, getPromotionIds, setPromotionStyles, promotionPieces } from './utilities/utilities.js';
import { Chess } from 'chess.js';



const GameContainer = () => {
  const [promotion, setPromotion] = useState({isPromoting: false, from: '', to: '', pieceType: ''});
  const [chess, setChess] = useState(new Chess());
  const [isReversed, setIsReversed] = useState(false);
  const [pieceStyle, setPieceStyle] = useState({
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    margin: '0 auto'
  })
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

  console.log(promotion)
  //square promotion styles
  let promotionIds;
  if(promotion.isPromoting){
    promotionIds = getPromotionIds(promotion.to, preComputedMaps, promotionPiecesList);
    // setPromotionStyles(initialStyles, promotionIds, promotionStyles);
  } 
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
            promotionPiecesList={promotionPiecesList}
            pieceStyle={pieceStyle}
            onPieceStyleChange={setPieceStyle}
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
            promotionPiecesList={promotionPiecesList}
            pieceStyle={pieceStyle}
            onPieceStyleChange={setPieceStyle}
          />
        }
        
        {/* <Arrow /> */}
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

export default GameContainer;