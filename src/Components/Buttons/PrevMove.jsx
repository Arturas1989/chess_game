import React from 'react';
import useKeyPress from '../../hooks/useKeyPress.jsx';
import { useGameContext } from '../../GameApp.js';
import { goToPrevMove } from '../../eventHandlers/Buttons/click.js'

const PrevMove = () => {
    const gameContext = useGameContext();

    useKeyPress(goToPrevMove, gameContext, 'ArrowLeft');

    return (
        <button onClick={() => goToPrevMove(gameContext)} className='PrevMove'>
            <TriangleLeft />
        </button>
    )
}

const TriangleLeft = () => {
    return (
        <svg className='MoveControlSvg' width="16" height="16" viewBox="4 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g>
                <g>
                    <path d="M7.446,9.052 C6.866,8.471 6.866,7.53 7.446,6.948 L13.89,0.506 C14.471,-0.076 15.993,-0.333 15.993,1.506 L15.993,14.494 C15.993,16.395 14.472,16.076 13.89,15.495 L7.446,9.052 L7.446,9.052 Z">

                    </path>
                </g>
            </g>
        </svg>
    )
}

export default PrevMove;