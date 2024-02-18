import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';
import GoToPage from './GoToPage.jsx';
import Error from '../Errors/Error.jsx';
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { useState } from 'react';

const SearchContainer = () => {
  const {
    currView,
    errors, 
    setErrors
} = useGameContext();

const [searchVals, setSearchVals] = useState({username : '', title : ''});
const {userSearchError} = errors;
  return (
    <div className="SearchErrorContainer">
      {userSearchError && <Error setErrors={setErrors} errorMessage={userSearchError}/>}
      <div className="SearchContainer">
        <SearchBar searchVals={searchVals} setSearchVals={setSearchVals} />
        <Select searchVals={searchVals} setSearchVals={setSearchVals} />
        {currView === 'games' ? <GoToPage page="board" innerText="return to board view"/> : null}
      </div>
    </div>
    
    
  )
}

export default SearchContainer