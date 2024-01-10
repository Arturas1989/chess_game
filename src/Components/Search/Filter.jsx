import { useGameContext } from '../../context/GameContextProvider.jsx';
import Select from "./Select";
import SearchButton from "./SearchButton";
import { filterTitledPlayers } from '../../utilities/api.js';

const Filter = () => {
    
    const {apiData, setApiData, partname, setPartname, setLoading} = useGameContext();

    const handleSearchButtonClick = () => {
        setLoading(true);
        const newApiData = filterTitledPlayers(apiData, partname);
        setApiData([...newApiData]);
        setLoading(false);
    }

    return (
        <>
            <div className="SearchBar">
                <input
                    id="username"
                    autoComplete='off'
                    onKeyDown={(e) => e.key === 'Enter' ? handleSearchButtonClick() : null} 
                    onChange={(e) => setPartname(e.target.value)}
                    value={partname}
                    className="filter" 
                    placeholder="filter by username"
                />
                <SearchButton handleClick={handleSearchButtonClick} />
            </div>
            <Select />
        </> 
    )
}

export default Filter;