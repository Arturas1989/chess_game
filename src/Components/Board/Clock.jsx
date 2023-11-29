import { useState, useEffect } from 'react';
import { useGameContext } from "../../GameApp";

const Clock = ({ color }) => {
    const { playControls, chessVariants } = useGameContext();
    const [sec, setSec] = useState(playControls[`${color}MainTime`]);

    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    const turn = chessVariants.line1.moves.length % 2 === 1 ? 'white' : 'black';
    
    useEffect(() => {
        if(turn === color){
            const interval = setInterval(() => {
                setSec(sec - 1)
            }, 1000)
    
            return () => clearInterval(interval);
        }
    })
    
    return (
        <div>{m}:{s}</div>
    )
}

export default Clock;