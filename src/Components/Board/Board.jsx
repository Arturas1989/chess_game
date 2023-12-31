import { Square, PromotionSquare, RegularSquare } from './Square.jsx';
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { getPromotionIds } from '../../utilities/utilities.js';
import useBoardRef from '../../hooks/useBoardRef.jsx';

const Board = () => {
    const { promotion } = useGameContext()

    // using useRef to create reference to the board component
    const boardRef = useBoardRef();


    return (
      <div ref={boardRef} className={'Board' + (promotion.isPromoting ? ' promotion-board' : '')}>
        
        {Array.from({length: 64}, (_,i) => 
            <Square
                key={i} 
                index={i}
            />
        )}
      </div>
    );
  }

const PromotionBoard = () => {

  const {
    themes,
    theme,
    promotion,
    chessVariants,
    currVariant,
    preComputedMaps,
    promotionPiecesList
  } = useGameContext();

    const { pieces } = themes[theme.pieces];
    const promotionIds = getPromotionIds(promotion.to, preComputedMaps, promotionPiecesList);
    const { currLine, currMove} = currVariant
    
    const chess = chessVariants[currLine]['moves'][currMove];

    return (
      <div className={'Board promotion-board'}>
        
        {Array.from({length: 64}, (_,i) =>
          { 
            const [, coordToIdList, ] = preComputedMaps;
            const row = Math.floor(i / 8);
            const col = i % 8;
            const pos = coordToIdList[row + ',' + col];
            const squareInfo = chess.get(pos);
            let source, ComponentSquare;
            if(promotionIds[pos]){
              const [color, type] = [...promotionIds[pos]];
              source = pieces[color][type];
              ComponentSquare = 
                <PromotionSquare
                  key={i}
                  type={type}
                  source={source}
                  pos={pos}
                />
            } else {
              source = squareInfo && promotion.from !== pos ? pieces[squareInfo.color][squareInfo.type] : '';
              ComponentSquare = 
                <RegularSquare
                  key={i}
                  source={source}
                  pos={pos}
                />
            }
            
            return ComponentSquare;
          }
        )}
      </div>
    );
  }



  export {Board, PromotionBoard};