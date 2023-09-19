import SquareHighLight from './SquareHighLight.jsx';

const Square = (props) => {
    const { 
      index, 
      styles,
      chess,
      onChessChange,
      isReversed,
      initialStyles, 
      onStylesChange, 
      boardBoundaries, 
      pieceClicked, 
      onPieceClick 
    } = props; 
    
    return (
      <div className="Square">
        <SquareHighLight  
          index={index}
          styles={styles}
          chess={chess}
          onChessChange={onChessChange}
          isReversed={isReversed}
          initialStyles={initialStyles}
          onStylesChange={onStylesChange}
          boardBoundaries={boardBoundaries}
          pieceClicked={pieceClicked}
          onPieceClick={onPieceClick}
        />
      </div>
    );
  }

  export default Square;