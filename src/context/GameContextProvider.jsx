import { useState, createContext, useContext } from 'react';
import { Chess } from 'chess.js';
import {
    preComputed,
    setInitialStyles,
    promotionPieces,
} from '../utilities/utilities.js';
import useChessEngine from '../hooks/useChessEngine.jsx';
import themes from '../themes/themes.js';

const GameContext = createContext();
const API_URL = 'https://api.chess.com/pub/player/';

function useGameContext() {
    const context = useContext(GameContext);
    return context;
}

const GameContextProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        squares: 'standard',
        pieces: 'standard',
        background: 'light',
    });
    const [promotion, setPromotion] = useState({
        isPromoting: false,
        from: '',
        to: '',
        pieceType: '',
    });
    const [chessVariants, setChessVariants] = useState({
        line1: {
            moves: [new Chess()],
            fromMove: 0,
            fromLine: 'line1',
        },
        lastLine: 1,
        movesLines: {},
    });
    const [currVariant, setCurrVariant] = useState({
        currLine: 'line1',
        currMove: 0,
    });
    const [isReversed, setIsReversed] = useState(false);
    const [pieceClicked, setPieceClicked] = useState({});
    const [boardBoundaries, setBoardBoundaries] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [searchVals, setSearchVals] = useState({ username: '', title: '' });
    const [currView, setCurrView] = useState('board');
    const [partname, setPartname] = useState('');
    const [errors, setErrors] = useState({ userSearchError: '' });
    const [apiGame, setApiGame] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [playControls, setPlayControls] = useState({
        isPlaying: false,
        result: '',
    });

    const {
        coords,
        revCoords,
        coordToId,
        idToCoord,
        revCoordToId,
        revIdToCoord,
    } = preComputed;

    let initialStyles = {};
    setInitialStyles(coords, initialStyles, theme.squares + 'Square');

    let preComputedMaps, promotionPiecesList;

    if (isReversed) {
        preComputedMaps = [revCoords, revCoordToId, revIdToCoord];
        promotionPiecesList = promotionPieces.reversed;
    } else {
        preComputedMaps = [coords, coordToId, idToCoord];
        promotionPiecesList = promotionPieces.regular;
    }

    const [styles, setStyles] = useState({ ...initialStyles });
    
    const chessEngineArgs = {
        playControls,
        chessVariants,
        setChessVariants,
        setPlayControls,
        setCurrVariant,
        setIsReversed,
        initialStyles,
        setStyles,
        preComputedMaps,
        className: `Square ${theme.squares}ClickStartEnd`
    }
    useChessEngine(chessEngineArgs);

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
        apiGame,
        setApiGame,
        modalIsOpen,
        setModalIsOpen,
        playControls,
        setPlayControls,
    };

    return (
        <GameContext.Provider value={GameContextValues}>
            {children}
        </GameContext.Provider>
    );
};

export { GameContextProvider, useGameContext };
