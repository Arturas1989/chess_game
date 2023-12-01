import './App.css';
import { useState, createContext, useContext } from 'react';
import themes from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Board/Board.jsx';
import Player from './Components/Board/Player.jsx';
import Result from './Components/Board/Result.jsx';
import MoveContainer from './Components/MoveList/MoveContainer.jsx';
import SearchContainer from './Components/Search/SearchContainer.jsx';
import { preComputed, setInitialStyles, promotionPieces } from './utilities/utilities.js';
import { Chess } from 'chess.js';
import SearchResults from './Components/Search/SearchResults.jsx';
import PlayModal from './Components/Modal/PlayModal.jsx';
import Clock from './Components/Board/Clock.jsx';
import useChessEngine from './hooks/useChessEngine.jsx';


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
  const [currView, setCurrView] = useState('board');
  const [partname, setPartname] = useState('');
  const [errors, setErrors] = useState({userSearchError: ''});
  const [currGame, setCurrGame] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playControls, setPlayControls] = useState({isPlaying: false});
  
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

  
  useChessEngine(playControls, chessVariants, setChessVariants, setPlayControls, setCurrVariant, setIsReversed);
  

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
    API_URL,
    currView, 
    setCurrView,
    partname, 
    setPartname,
    errors, 
    setErrors,
    currGame, 
    setCurrGame,
    modalIsOpen, 
    setModalIsOpen,
    playControls, 
    setPlayControls
  }

  return (
    <GameContext.Provider value={GameContextValues}>
      <GameContainer isPromoting={promotion.isPromoting} />
    </GameContext.Provider>
  )
}

const GameContainer =  ({ isPromoting }) => {
  const {apiData, currView, isReversed, currGame, modalIsOpen, playControls} = useGameContext();

  const [clock, setClock] = useState({'white' : 0, 'black' : 0});
  
  let ClockComponent1, ClockComponent2
  if(playControls.isPlaying){
    ClockComponent1 = <Clock color="white" clock={clock} setClock={setClock} />
    ClockComponent2 = <Clock color="black" clock={clock} setClock={setClock}/>
    if(isReversed) [ClockComponent1, ClockComponent2] = [ClockComponent2, ClockComponent1];
  };
  
  let player1class, player2class, player1, player2;
  if(currGame){
    const {whiteUsername, blackUsername} = currGame;
    [player1class, player2class, player1, player2] = isReversed ? 
    ['blackPlayer', 'whitePlayer', blackUsername, whiteUsername] : ['whitePlayer', 'blackPlayer', whiteUsername, blackUsername];
  }

  

  return (
    
    currView !== 'board' ?
      <SearchResults data={apiData}/>
      :
      <div className="GameContainer">
        {modalIsOpen ? <PlayModal setClock={setClock}/> : ''}
        <SearchContainer />
        <div className="GameControls">
          <div className="BoardContainer">
            <div className="Board-top">
              <Player className={player2class} player={player2}/>
              <Result resultText={currGame.result}/>
              {ClockComponent2}
            </div>
            {isPromoting ?
              <PromotionBoard/>
              :
              <Board/>
            }
            <div className="Board-bottom">
              <Player className={player1class} player={player1} />
              {ClockComponent1}
            </div>
          </div>
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