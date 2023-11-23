import EndPosition from './EndPosition.jsx';
import NextMove from './NextMove.jsx';
import PrevMove from './PrevMove.jsx';
import ReverseBoard from './ReverseBoard.jsx';
import StartPosition from './StartPosition.jsx';

const ButtonsContainer = () => {
    return (
        <div className='ButtonsContainer'>
            <StartPosition />
            <PrevMove />
            <NextMove />
            <EndPosition />
            <ReverseBoard />
        </div>
    )
}

export default ButtonsContainer;