import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';
import GoToPage from './GoToPage.jsx';
import { useGameContext } from '../../context/GameContextProvider.jsx';
import { useState } from 'react';

const SearchContainer = () => {
  const {
    currView
} = useGameContext();

const [searchVals, setSearchVals] = useState({username : '', title : ''});
const [errors, setErrors] = useState({userSearchError: ''});
const {userSearchError} = errors;

  return (
    <>
      {userSearchError &&
      <div className="error">
          {userSearchError}
          <div onClick={() => setErrors({userSearchError: ''})} className="close-error">
              <div>x</div>
          </div>
      </div>}
    
      <div className="SearchContainer">
        <SearchBar searchVals={searchVals} setSearchVals={setSearchVals} />
        <Select searchVals={searchVals} setSearchVals={setSearchVals} />
        {currView === 'games' ? <GoToPage page="board" innerText="return to board view"/> : null}
      </div>
    </>
    
  )
}

export default SearchContainer