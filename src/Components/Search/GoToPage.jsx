import { useGameContext } from '../../context/GameContextProvider.jsx';

const GoToPage = ({ page, innerText }) => {
    const { setCurrView, setApiData } = useGameContext();
    
    const handleClick = () => {
        setCurrView(page);
        setApiData([]);
    }

    return (
        <button onClick={() => handleClick()} className="goTo">{innerText}</button>
    )
}

export default GoToPage;