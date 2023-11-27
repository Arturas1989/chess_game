import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';
import GoToPage from './GoToPage.jsx';
import { useGameContext } from '../../GameApp.js';

const SearchContainer = () => {
  const {
    errors, 
    setErrors,
    currView
} = useGameContext();
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
        <SearchBar />
        <Select />
        {currView === 'games' ? <GoToPage page="board" innerText="return to board view"/> : null}
      </div>
    </>
    
  )
}

export default SearchContainer