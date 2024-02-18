import { useState } from 'react';
import { useGameContext } from '../../context/GameContextProvider.jsx';
import Select from "./Select";
import SearchButton from "./SearchButton";
import { filterTitledPlayers } from '../../utilities/api.js';

const Filter = () => {
    
    const {apiData, setApiData, setLoading} = useGameContext();
    const [searchVals, setSearchVals] = useState({username: '', title: ''})
    const { username } = searchVals;

    const handleSearchButtonClick = () => {
        setLoading(true);
        const newApiData = filterTitledPlayers(apiData, username);
        setApiData([...newApiData]);
        setLoading(false);
        setSearchVals({username: '', title: ''})
    }
    return (
        <>
            <div className="SearchBar">
                <input
                    id="username"
                    autoComplete='off'
                    onKeyDown={(e) => e.key === 'Enter' ? handleSearchButtonClick() : null} 
                    onChange={(e) => setSearchVals((prev) => ({...prev, username: e.target.value}))}
                    value={username}
                    className="filter" 
                    placeholder="filter by username"
                />
                <SearchButton handleClick={handleSearchButtonClick} />
            </div>
            <Select setSearchVals={setSearchVals} searchVals={searchVals} />
        </> 
    )
}

export default Filter;