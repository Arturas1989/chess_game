import EndPosition from './EndPosition.jsx';
import NextMove from './NextMove.jsx';
import PrevMove from './PrevMove.jsx';
import ReverseBoard from './ReverseBoard.jsx';
import StartPosition from './StartPosition.jsx';
import PlayGame from './PlayGame.jsx';

const ButtonsContainer = () => {
    return (
        <div className='ButtonsContainer'>
            <StartPosition />
            <PrevMove />
            <NextMove />
            <EndPosition />
            <ReverseBoard />
            <PlayGame />
        </div>
    )
}

export default ButtonsContainer;