import Filter from './Filter.jsx';
import SearchButton from "./SearchButton";
import GoToPage from './GoToPage.jsx';
import { useGameContext } from '../../GameApp.js';

const TitledSearch = () => {
    const {searchVals} = useGameContext()
    return (
        <div className="titled-search-container">
            <Filter />
            <SearchButton searchVals={searchVals}/>
            <GoToPage />
        </div>
    )
}

export default TitledSearch;