import SearchButton from './SearchButton.jsx'
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { searchChessGames } from '../../utilities/api.js';

const SearchBar = ({ searchVals, setSearchVals }) => {
    const {
        setApiData, 
        API_URL, 
        setCurrView, 
        setErrors,
        setPlayControls,
        initialStyles,
        setStyles
    } = useGameContext();

    const { username } = searchVals;

    const handleSearchButtonClick = async () => {
        const data = await searchChessGames(API_URL, searchVals, setApiData, setPlayControls, setErrors);
        if(searchVals.username && data.length !== 0){
            setStyles({...initialStyles});
            setCurrView('games');
        } 
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