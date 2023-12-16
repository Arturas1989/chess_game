import { useEffect } from 'react';
import { playChessEngine } from '../utilities/utilities.js';

const useChessEngine = (chessEngineArgs) => {
    useEffect(() => {
        const timeOut = setTimeout(()=>{
            playChessEngine(chessEngineArgs);
        },1000)
        return () => clearTimeout(timeOut);
      }, [chessEngineArgs])
}



export default useChessEngine;

