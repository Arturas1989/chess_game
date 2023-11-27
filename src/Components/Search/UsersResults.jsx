import Table from './Table.jsx';
import SearchContainer from './SearchContainer.jsx';

const UsersResults = ({data}) => {
    return (
        <div className="UsersResults">
            <SearchContainer />
            
            <Table data={data} />
        </div>
    )
}

export default UsersResults;