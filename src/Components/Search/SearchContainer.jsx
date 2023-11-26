import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';
import { useGameContext } from '../../GameApp.js';

const SearchContainer = () => {
  const {
    errors, 
    setErrors
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
      </div>
    </>
    
  )
}

export default SearchContainer