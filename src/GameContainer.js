import './App.css';
import { useState } from 'react';
import { themes, GameContext } from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Components/Board';
import MoveList from './Components/Components/MoveList.jsx';
import { preComputed, setInitialStyles, promotionPieces } from './utilities/utilities.js';
import { Chess } from 'chess.js';



const GameContainer = () => {

  const [theme, setTheme] = useState({squares: 'standard', pieces: 'standard', background: 'light'});
  const [promotion, setPromotion] = useState({isPromoting: false, from: '', to: '', pieceType: ''});
  const [chessHistory, setChessHistory] = useState([new Chess()]);
  const [currMove, setCurrMove] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [pieceClicked, setPieceClicked] = useState({});
  const [boardBoundaries, setBoardBoundaries] = useState(null);
  
  const { coords, revCoords, coordToId, idToCoord, revCoordToId, revIdToCoord } = preComputed;
  
  let initialStyles = {};
  setInitialStyles(coords, initialStyles, theme.squares + 'Square');
  
    
  let preComputedMaps, promotionPiecesList;

  if(isReversed){
    preComputedMaps = [revCoords, revCoordToId, revIdToCoord];
    promotionPiecesList = promotionPieces.reversed;
  } else {
    preComputedMaps = [coords, coordToId, idToCoord];
    promotionPiecesList = promotionPieces.regular;
  }

  const [styles, setStyles] = useState({...initialStyles});

  const GameContextValues = {

    themes,
    theme,
    setTheme,
    promotion, 
    setPromotion,
    currMove,
    setCurrMove,
    chessHistory,
    setChessHistory,
    isReversed, 
    setIsReversed,
    preComputedMaps,
    promotionPiecesList,
    styles,
    setStyles,
    initialStyles,
    pieceClicked,
    setPieceClicked,
    boardBoundaries, 
    setBoardBoundaries
  }
  
  return (
    <GameContext.Provider value={GameContextValues}>
      <div className="GameContainer">
        {promotion.isPromoting ?
          <PromotionBoard/>
          :
          <Board/>
        }
        
        <MoveList />
      </div>
    </GameContext.Provider>
  );
}

export default GameContainer;