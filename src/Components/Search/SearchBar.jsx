import SearchButton from './SearchButton.jsx'
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { searchChessGames } from '../../utilities/api.js';
import { isInputValid } from '../../utilities/utilities.js';

const SearchBar = ({ searchVals, setSearchVals }) => {
    const {
        setApiData, 
        API_URL, 
        setCurrView, 
        setErrors,
        setPlayControls,
        initialStyles,
        setStyles,
        setLoading
    } = useGameContext();

    const { username } = searchVals;

    const handleSearchButtonClick = async () => {
        if(username === ''){
            setErrors({userSearchError: `username is required`});
            return;
        }

        if(!isInputValid(username)){
            setErrors({userSearchError: `Invalid username "${username}"`});
            return;
        }

        setLoading(true);
        const data = await searchChessGames(API_URL, searchVals, setApiData, setPlayControls, setErrors);
        
        if(!data || data.length === 0 || data.gameData.length === 0){
            setErrors({userSearchError: `No such username: "${username}" found`});
            setLoading(false);
            return;
        }

        if(searchVals.username && data.length !== 0){
            setStyles({...initialStyles});
            setCurrView('games');
        }

        setErrors({});
        setLoading(false);
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