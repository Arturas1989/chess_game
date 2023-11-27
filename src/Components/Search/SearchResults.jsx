import UsersResults from './UsersResults.jsx';
import { useGameContext } from '../../GameApp.js';
import TitledPlayerResults from './TitledPlayerResults.jsx';

const SearchResults = ({ data }) => {
    const { currView } = useGameContext();
    return(
        <div className="SearchResults">
            {currView === 'games' ? 
                <UsersResults data={data} />
                :
                <TitledPlayerResults data={data} />
            }
            
        </div>
    )
}





export default SearchResults;

