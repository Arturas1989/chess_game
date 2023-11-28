import { useGameContext } from "../../GameApp";

const TimeButton = ({ time }) => {
    const { setModalIsOpen, setPlayControls } = useGameContext();
    const handleClick = () => {
        setModalIsOpen(false);
        const [mainTime, increment] = time.split('+').map(el=>parseInt(el));
        setPlayControls({isPlaying: true, mainTime, increment})
    }
    return <button onClick={() => handleClick()} className="goTo">{time}</button>
}

const PlayModal = () => {
    const { setModalIsOpen } = useGameContext();
    return (
        <div className="PlayModal">
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={() => setModalIsOpen(false)} className="close">&times;</span>
                    <h2>Select play time</h2>
                </div>
                <div className="modal-body">
                    <TimeButton time="3+0" />
                    <TimeButton time="5+0" />
                    <TimeButton time="10+0" />
                    <TimeButton time="30+0" />
                    <TimeButton time="45+0" />
                    <TimeButton time="60+0" />
                </div>
            </div>
        </div>
    )
}

export default PlayModal