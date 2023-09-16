import { useState, useRef, useEffect, useContext } from 'react';
import Square from './Square.jsx';
import { themes, ThemeContext } from '../themes/themes.js'

const Board = () => {

    const themes = useContext(ThemeContext);
    const squareColors = themes.standard.squareColors;
    // 2 dimensional array is used for an easier debugging.
    const [piecePositions, setPiecePositions] = useState(
      [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['..', '..', '..', '..', '..', '..', '..', '..'],
        ['..', '..', '..', '..', '..', '..', '..', '..'],
        ['..', '..', '..', '..', '..', '..', '..', '..'],
        ['..', '..', '..', '..', '..', '..', '..', '..'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
      ]
    );
  
    // using useRef to create reference to the board component
    const boardRef = useRef(null);
  
    const [boardBoundaries, setBoardBoundaries] = useState(null);
  
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
      return {backgroundColor: i % 2 === row % 2 ? squareColors.white : squareColors.black}
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
                initialStyles={initialStyles} 
                piecePositions={piecePositions}
                onPiecePositionsChange={setPiecePositions}
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