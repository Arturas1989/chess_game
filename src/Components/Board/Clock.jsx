import { useEffect } from 'react';
import { useGameContext } from '../../context/GameContextProvider.jsx';


const Clock = ({ color, clock, setClock }) => {
    const { chessVariants, setPlayControls } = useGameContext();
    
    const sec = clock[color];
    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    const turn = chessVariants.line1.moves.length % 2 === 1 ? 'white' : 'black';
    
    useEffect(() => {
        if(turn === color){
            if(sec === 0){
                setPlayControls({
                    isPlaying: false, 
                    result: color === 'white' ? '0-1 black wins' : '1-0 white wins'
                });
                return;
            }
            const interval = setInterval(() => {
                setClock((prevClock) => ( {...prevClock, [color]: prevClock[color] - 1} ));
            }, 1000)
    
            return () => clearInterval(interval);
        }
    })
    
    return (
        <div className="Clock">{m}:{s}</div>
    )
}

export default Clock;