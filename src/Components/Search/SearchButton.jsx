import logo from './icons/loupe_751463.png';

const SearchButton = ({ handleClick }) => {
    return (
        <button 
            className="SearchButton" 
            onClick={()=>handleClick()}
        >
            <img alt="search" src={logo}></img>
        </button>
    )
}

export default SearchButton