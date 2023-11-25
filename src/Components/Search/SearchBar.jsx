import SearchButton from './SearchButton.jsx'
import { useGameContext } from '../../GameApp.js';
import { searchChessGames } from '../../utilities/api.js';

const SearchBar = () => {
    const {setApiData, API_URL, searchVals, setSearchVals, setCurrView} = useGameContext();
    const {username} = searchVals

    const handleSearchButtonClick = () => {
        searchChessGames(API_URL, searchVals, setApiData);
        if(searchVals.username) setCurrView('games');
    }

    return (
        <div className='SearchBar'>
            <input  
                placeholder='search by chess.com username'
                value={username} 
                onChange={(e) => setSearchVals({username : e.target.value, title: ''})} 
            />
            <SearchButton handleClick={handleSearchButtonClick} />
        </div>
    )
}

export default SearchBar;