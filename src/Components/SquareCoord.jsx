import { useContext } from 'react';
import { GameContext } from '../themes/themes.js';
import { getCoordClass, getPromotionIds } from '../utilities/utilities.js';


const SquareCoord = ({ id, squareWidth }) => {
    const { isReversed, preComputedMaps, theme, promotion, promotionPiecesList } = useContext(GameContext);
    const idToCoord = preComputedMaps[2];

    const [displayCol, displayRow] = isReversed ? ['h', '8'] : ['a', '1'];
    const [idCol, idRow] = [...id];
    const promotionIds = promotion.isPromoting ? 
    getPromotionIds(promotion.to, preComputedMaps, promotionPiecesList) : [];
    let squareCoords = [], className;
     
    if(displayCol === idCol){
        className = getCoordClass(id, idToCoord, theme, 'Row');
        const rowStyle = {opacity: promotionIds[id] ? '0.3' : '1'};
        squareCoords.push(<span className={className} style={rowStyle} key={0}>{idRow}</span>);
    }
    
    if(displayRow === idRow){
        className = getCoordClass(id, idToCoord, theme, 'Col');
        const right = squareWidth * 0.84;
        const down = squareWidth * 0.58;
        const colStyle = {
            transform: `translate(${right}px,${down}px)`,
            opacity: promotionIds[id] ? '0.3' : '1'
        }
        squareCoords.push(<span className={className} style={colStyle} key={1}>{idCol}</span>);
    }

    return squareCoords;
}

export default SquareCoord;