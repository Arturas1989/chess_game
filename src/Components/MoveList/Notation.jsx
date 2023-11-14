import { getTypeNotations } from '../../utilities/utilities.js';

const Piece = ({ pieceType }) => {

  const componentMap = {
    'N' : '♘',
    'B' : '♗',
    'Q' : '♕',
    'K' : '♔',
    'R' : '♖',
    'invisible' : '',
  }

  return (
    <span>{componentMap[pieceType]}</span>
  );
}

const Notation = ({ notation, i, dots }) => {
  const { pieceType, notations, isPromoting, spanRight } = getTypeNotations(notation);

  let NotationPiece = [
      <span key={0} className="pieceContainer">
        {pieceType &&
          <Piece
            pieceType={pieceType}
        />}
      </span>,
    <span key={1}>{notations}</span>,
    spanRight ? <span key={2}>{notation[notation.length - 1]}</span> : ''   
  ] 

  if(isPromoting) [NotationPiece[1], NotationPiece[0]] = [NotationPiece[0], NotationPiece[1]];

  return (
    <div className={'Notation'} key={0}>
      {i % 2 === 0 ? 
          <MoveNumber 
            className="VariantMoveNumber" 
            i={i} 
            fontSizeType={'variantsFontSize'}
            dots={dots} 
          /> 
        : ''}
      {NotationPiece}
    </div>
  )
}

const MoveNumber = ({ i, className, dots }) => {
  let moveNumber = Math.floor(i / 2) + 1;
  if(className === 'VariantMoveNumber') moveNumber += dots;
  return <span className={className}>{moveNumber}</span>
}

export {Notation, Piece};