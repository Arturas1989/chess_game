import { useGameContext } from '../../context/GameContextProvider.jsx';

const GoToPage = ({ page, innerText }) => {
    const { setCurrView, setApiData, setPlayControls } = useGameContext();
    
    const handleClick = () => {
        setCurrView(page);
        setApiData([]);
        setPlayControls({isPlaying: false, result: ''});
    }

    return (
        <button onClick={() => handleClick()} className="goTo">{innerText}</button>
    )
}

export default GoToPage;