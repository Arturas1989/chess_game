import { setFromToStyles } from '../../utilities/utilities.js';

const goBackToStart =  (gameContext) => {
    const { setCurrVariant, setStyles, initialStyles } = gameContext;
    setCurrVariant({'currLine' : 'line1', 'currMove' : 0});
    setStyles(initialStyles);
}

const goToNextMove = (gameContext) => {
    const { 
        chessVariants,
        currVariant, 
        setCurrVariant, 
        setStyles, 
        initialStyles, 
        preComputedMaps,
        theme 
    } = gameContext;
    
    const {currLine, currMove} = currVariant;
    const nextMove = currMove + 1;
    if(chessVariants[currLine]['moves'][nextMove]){
        const moves = chessVariants[currLine]['moves'];
        setFromToStyles(moves, nextMove, preComputedMaps, initialStyles, theme, setStyles);
        setCurrVariant({...currVariant, currMove: nextMove});
    }
}

const goToPrevMove = (gameContext) => {
    const { 
        chessVariants,
        currVariant, 
        setCurrVariant, 
        setStyles, 
        initialStyles, 
        preComputedMaps,
        theme 
    } = gameContext;

    let {currLine, currMove} = currVariant;
    currMove--;
    if(currMove > -1){
        const {fromMove, fromLine} = chessVariants[currLine];
        if(fromMove === currMove) currLine = fromLine;
        const moves = chessVariants[currLine]['moves'];
        setFromToStyles(moves, currMove, preComputedMaps, initialStyles, theme, setStyles);
        setCurrVariant({currLine: currLine, currMove: currMove});
    }
}

const goToEnd = (gameContext) => {
    const { 
        chessVariants, 
        setCurrVariant, 
        setStyles, 
        initialStyles, 
        preComputedMaps,
        theme 
    } = gameContext;

    const moves = chessVariants['line1']['moves'];
    const lastIndex = moves.length - 1;
    setFromToStyles(moves, lastIndex, preComputedMaps, initialStyles, theme, setStyles);
    setCurrVariant({'currLine' : 'line1', 'currMove' : lastIndex});
}

const reverseBoard = (gameContext) => {
    const { setIsReversed } = gameContext;
    setIsReversed((prev) => !prev);
}

export { 
    goBackToStart,
    goToNextMove,
    goToPrevMove,
    goToEnd,
    reverseBoard
}