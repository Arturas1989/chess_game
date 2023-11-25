import Filter from './Filter.jsx';
import GoToPage from './GoToPage.jsx';

const TitledSearch = () => {
    return (
        <div className="titled-search-container">
            <Filter />
            <GoToPage page='board' innerText='Go to board view'/>
        </div>
    )
}

export default TitledSearch;