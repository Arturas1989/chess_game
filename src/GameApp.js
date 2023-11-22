import './App.css';
import { useState, createContext, useContext } from 'react';
import themes from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Board/Board.jsx';
import MoveContainer from './Components/MoveList/MoveContainer.jsx';
import SearchContainer from './Components/Search/SearchContainer.jsx';
import { preComputed, setInitialStyles, promotionPieces } from './utilities/utilities.js';
import { Chess } from 'chess.js';
import SearchResults from './Components/Search/SearchResults.jsx'

const GameContext = createContext();
const API_URL = 'https://api.chess.com/pub/player/'

const GameApp = () => {
  const [theme, setTheme] = useState({squares: 'standard', pieces: 'standard', background: 'light'});
  const [promotion, setPromotion] = useState({isPromoting: false, from: '', to: '', pieceType: ''});
  const [chessVariants, setChessVariants] = useState({
    'line1' : {
      'moves' : [new Chess()],
      'fromMove' : 0,
      'fromLine' : 'line1'
    },
    'lastLine' : 1,
    'movesLines' : {}
  });
  const [currVariant, setCurrVariant] = useState({'currLine' : 'line1', 'currMove' : 0});
  const [isReversed, setIsReversed] = useState(false);
  const [pieceClicked, setPieceClicked] = useState({});
  const [boardBoundaries, setBoardBoundaries] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [searchVals, setSearchVals] = useState({username : '', title : ''});
  
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
    currVariant,
    setCurrVariant,
    chessVariants,
    setChessVariants,
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
    setBoardBoundaries,
    apiData, 
    setApiData,
    searchVals, 
    setSearchVals,
    API_URL
  }

  return (
    <GameContext.Provider value={GameContextValues}>
      <GameContainer isPromoting={promotion.isPromoting} />
    </GameContext.Provider>
  )
}

const GameContainer =  ({ isPromoting }) => {
  const {apiData} = useGameContext();
  
  return (
    apiData.length !== 0 ?
      <SearchResults data={apiData}/>
      :
      <div className="GameContainer">
        <SearchContainer />
        <div className="GameControls">
          {isPromoting ?
            <PromotionBoard/>
            :
            <Board/>
          }
          <MoveContainer />
        </div>
      </div>
      
      
  );
}

function useGameContext(){
    const context = useContext(GameContext);
    return context;
}

export {GameApp, useGameContext};