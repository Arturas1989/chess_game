import { useEffect } from 'react';
import { playChessEngine } from '../utilities/utilities.js';

const useChessEngine = (playControls, chessVariants, setChessVariants, setPlayControls, setCurrVariant, setIsReversed) => {
    useEffect(() => {
        const timeOut = setTimeout(()=>{
            playChessEngine(playControls, chessVariants, setChessVariants, setPlayControls, setCurrVariant, setIsReversed);
        },1000)
        return () => clearTimeout(timeOut);
      }, [chessVariants, playControls, setChessVariants, setPlayControls, setCurrVariant, setIsReversed])
}



export default useChessEngine;

