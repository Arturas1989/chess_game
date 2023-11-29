import { useState, useEffect } from 'react';
import { useGameContext } from "../../GameApp";

const Clock = ({ color }) => {
    const { playControls } = useGameContext();
    const [sec, setSec] = useState(playControls[`${color}MainTime`]);

    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    console.log(playControls[`${color}MainTime`])
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSec(sec - 1)
        }, 1000)

        return () => clearInterval(interval);
    })
    
    return (
        <div>{m}:{s}</div>
    )
}

export default Clock;