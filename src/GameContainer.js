import './App.css';
import { useState } from 'react';
import { themes, ThemeContext } from './themes/themes.js';
import { Board, PromotionBoard } from './Components/Board';
import MoveList from './Components/MoveList.jsx';
import Arrow from './Components/Arrow.jsx';


const GameContainer = () => {
  const [promotion, setPromotion] = useState({isPromoting: false, square: 'e8'});
  return (
    <ThemeContext.Provider value={themes}>
      <div className="GameContainer">
        {promotion.isPromoting ?
          <PromotionBoard 
            promotion={promotion}
            onPromotionChange={setPromotion}
          />
          :
          <Board 
            promotion={promotion}
            onPromotionChange={setPromotion}
          />
        }
        
        {/* <Arrow /> */}
        <MoveList />
      </div>
    </ThemeContext.Provider>
  );
}

export default GameContainer;