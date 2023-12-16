import { useGameContext } from '../../context/GameContextProvider.jsx';
import { goBackToStart } from '../../eventHandlers/Buttons/click.js'

const StartPosition = () => {
    const gameContext = useGameContext();
    
    return (
        <button onClick={() => goBackToStart(gameContext)} className='StartPosition'>
            <TrianglesLeft />
        </button>
    )
}

const TrianglesLeft = () => {
    return (
        <svg className='MoveControlSvg' width="17" height="17" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g>
                <g>
                    <path d="M0.446,9.052 C-0.134,8.471 -0.134,7.53 0.446,6.948 L6.89,0.506 C7.471,-0.076 8.993,-0.333 8.993,1.506 L8.993,14.494 C8.993,16.395 7.472,16.076 6.89,15.495 L0.446,9.052 L0.446,9.052 Z">

                    </path>
                    <path d="M7.446,9.052 C6.866,8.471 6.866,7.53 7.446,6.948 L13.89,0.506 C14.471,-0.076 15.993,-0.333 15.993,1.506 L15.993,14.494 C15.993,16.395 14.472,16.076 13.89,15.495 L7.446,9.052 L7.446,9.052 Z">

                    </path>
                </g>
            </g>
        </svg>
    )
}

export default StartPosition;