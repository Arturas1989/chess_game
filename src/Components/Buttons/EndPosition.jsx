import { useGameContext } from '../../context/GameContextProvider.jsx';
import { goToEnd } from '../../eventHandlers/Buttons/click.js'

const EndPosition = () => {
    const gameContext = useGameContext();

    return (
        <button onClick={() => goToEnd(gameContext)} className='EndPosition'>
            <TrianglesRight />
        </button>
    )
}

const TrianglesRight = () => {
    return (
        <svg className='MoveControlSvg' width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g>
                <g>
                    <path d="M9.113,15.495 C8.531,16.076 7.01,16.395 7.01,14.494 L7.01,1.506 C7.01,-0.333 8.531,-0.076 9.113,0.506 L15.557,6.948 C16.137,7.529 16.137,8.47 15.557,9.052 L9.113,15.495 L9.113,15.495 Z" >
        
                    </path>
                    <path d="M2.113,15.495 C1.531,16.076 0.01,16.395 0.01,14.494 L0.01,1.506 C0.01,-0.333 1.531,-0.076 2.113,0.506 L8.557,6.948 C9.137,7.529 9.137,8.47 8.557,9.052 L2.113,15.495 L2.113,15.495 Z" >
        
                    </path>
                </g>
            </g>
        </svg>
    )
}

export default EndPosition;