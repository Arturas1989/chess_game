import { useState, useRef, useEffect, useContext } from 'react';
import Square from './Square.jsx';
import { ThemeContext } from '../themes/themes.js';
import { Chess } from 'chess.js';

const Board = () => {
  
    const themes = useContext(ThemeContext);
    const squareColors = themes.standard.squareStyles;
    
    const [chess, setChess] = useState(new Chess());
    const [isReversed, setIsReversed] = useState(false);
    const [boardBoundaries, setBoardBoundaries] = useState(null);

    // using useRef to create reference to the board component
    const boardRef = useRef(null);
  
    // it's not guaranteed that the Board component is rendered, it might be null
    //useEffect is used that, when boardRef changes (Board component is rendered) boardBoundaries will be set
    useEffect(() => {
      if (boardRef.current) {
        setBoardBoundaries(boardRef.current.getBoundingClientRect());
      }
    }, [boardRef]);
  
    //square styles
    const initialStyles = Array.from({length: 64}, (_,i) => {
      const row = Math.floor(i / 8);
      return i % 2 === row % 2 ? squareColors.white : squareColors.black;
    })
    const [styles, setStyles] = useState([...initialStyles]);
  
    const [pieceClicked, setPieceClicked] = useState({});
    return (
      <div ref={boardRef} className="Board">
        
        {Array.from({length: 64}, (_,i) => 
            <Square 
                key={i} 
                index={i}
                styles={styles}
                chess={chess}
                onChessChange={setChess}
                isReversed={isReversed}
                initialStyles={initialStyles}
                onStylesChange={setStyles}
                boardBoundaries={boardBoundaries}
                pieceClicked={pieceClicked}
                onPieceClick={setPieceClicked}
            />
        )}
      </div>
    );
  }

  export default Board;