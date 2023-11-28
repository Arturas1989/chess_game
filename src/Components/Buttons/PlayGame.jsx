import { useGameContext } from "../../GameApp"

const PlayGame = () => {
    const { setModalIsOpen } = useGameContext();
    return (
        <button onClick={() => setModalIsOpen(true)} className="goTo">Play game</button>
    )
}

export default PlayGame