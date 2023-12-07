import SearchButton from './SearchButton.jsx'
import { useGameContext } from '../../GameApp.js';
import { searchChessGames } from '../../utilities/api.js';

const SearchBar = () => {
    const {
        setApiData, 
        API_URL, 
        searchVals, 
        setSearchVals, 
        setCurrView, 
        setErrors,
        setPlayControls
    } = useGameContext();

    const {username} = searchVals;

    const handleSearchButtonClick = async () => {
        const data = await searchChessGames(API_URL, searchVals, setApiData, setPlayControls, setErrors);
        if(searchVals.username && data.length !== 0) setCurrView('games');
    }

    return (  
        <div className='SearchBar'>
            <input
                id="username"
                autoComplete='off'  
                placeholder='search by chess.com username'
                value={username} 
                onChange={(e) => setSearchVals({username : e.target.value, title: ''})}
                onKeyDown={(e) => e.key === 'Enter' ? handleSearchButtonClick() : null}
            />
            <SearchButton handleClick={handleSearchButtonClick} />
        </div>
    )
}

export default SearchBar;