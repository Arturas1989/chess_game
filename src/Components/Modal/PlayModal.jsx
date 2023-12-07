import { useGameContext } from "../../GameApp";
import { getRandomColor } from "../../utilities/utilities.js"
import { Chess } from 'chess.js';
const jsChessEngine = require('js-chess-engine')

const TimeButton = ({ time, setClock }) => {
    const { setApiGame, setModalIsOpen, setPlayControls, setChessVariants, setCurrVariant } = useGameContext();
    const handleClick = () => {
        setApiGame({});
        setModalIsOpen(false);
        const [mainTime, increment] = time.split('+').map(el=>parseInt(el));
        const sec = mainTime * 60;
        setPlayControls({
            isPlaying: true, 
            whiteMainTime: sec, 
            whiteIncrement: increment,
            blackMainTime: sec,
            blackIncrement: increment,
            color: getRandomColor(),
            game: new jsChessEngine.Game()
        });
        setClock({'white' : sec, 'black' : sec});
        setChessVariants({
            'line1' : {
                'moves' : [new Chess()],
                'fromMove' : 0,
                'fromLine' : 'line1'
              },
              'lastLine' : 1,
              'movesLines' : {}
        })

        setCurrVariant({'currLine' : 'line1', 'currMove' : 0});
    }
    return <button onClick={() => handleClick()} className="goTo">{time}</button>
}

const PlayModal = ({ setClock }) => {
    const { setModalIsOpen } = useGameContext();

    return (
        <div className="PlayModal">
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={() => setModalIsOpen(false)} className="close">&times;</span>
                    <h2>Select play time</h2>
                </div>
                <div className="modal-body">
                    <TimeButton time="1+0" setClock={setClock}/>
                    <TimeButton time="3+0" setClock={setClock}/>
                    <TimeButton time="5+0" setClock={setClock}/>
                    <TimeButton time="10+0" setClock={setClock}/>
                    <TimeButton time="30+0" setClock={setClock}/>
                    <TimeButton time="45+0" setClock={setClock}/>
                    <TimeButton time="60+0" setClock={setClock}/>
                </div>
            </div>
        </div>
    )
}

export default PlayModal