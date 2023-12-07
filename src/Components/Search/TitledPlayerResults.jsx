import TitledSearch from './TitledSearch.jsx';
import { searchChessGames } from '../../utilities/api.js';
import { useGameContext } from '../../GameApp.js';

const TitledPlayerResults = ({ data }) => {
    let { setCurrView, API_URL, setApiData, setPlayControls, setSearchVals, searchVals, setErrors } = useGameContext()
    
    const handleClick = async (e) => {
        searchVals = {username: e.currentTarget.id, title: ''};
        await searchChessGames(API_URL, searchVals, setApiData, setPlayControls, setErrors);
        setSearchVals(searchVals);
        setCurrView('games');
    }

    const players = data.map((player, i) => (
        <button 
            key={i} 
            id={player} 
            className="player-container"
            onClick={(e) => handleClick(e)}
        >
            <div className="player">
                view "{player}" games
            </div>
        </button>
        
    ))
    return (
    <div className="titled-results">
        <TitledSearch />
        <h1>Available {searchVals.title} players: </h1>
        <div className="titled-players">
            {players}
        </div>
    </div>
        
    )
}

export default TitledPlayerResults;