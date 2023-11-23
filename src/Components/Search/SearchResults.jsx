import Table from './Table.jsx';
import { useGameContext } from '../../GameApp.js';
import TitledPlayerResults from './TitledPlayerResults.jsx';

const SearchResults = ({ data }) => {
    const { searchVals } = useGameContext();
    return(
        <div className="SearchResults">
            {searchVals.title === '' ? 
                <Table data={data} />
                :
                <TitledPlayerResults data={data}/>
            }
            
        </div>
    )
}





export default SearchResults;

