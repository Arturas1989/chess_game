import { useRef, useEffect, useCallback} from 'react';
import { useGameContext } from '../context/GameContextProvider';

const useBoardRef = () => {

    const boardRef = useRef(null);
    const { setBoardBoundaries } = useGameContext()
    
    const updateBoardBoundaries = useCallback(() => {
        if (boardRef.current) {
            setBoardBoundaries(boardRef.current.getBoundingClientRect());
        }
    }, [setBoardBoundaries])

    useEffect(() => {
      updateBoardBoundaries();
    },[updateBoardBoundaries]);

    useEffect(() => {
      window.addEventListener('resize', updateBoardBoundaries);
      return () => {
          window.removeEventListener('resize', updateBoardBoundaries);
      };
    },[updateBoardBoundaries]);

    return boardRef;
}

export default useBoardRef