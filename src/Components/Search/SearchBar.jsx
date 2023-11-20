import React from 'react'
import SearchButton from './SearchButton.jsx'


const SearchBar = ( { searchVals, onSearchValsChange }) => {
    const {username} = searchVals
    return (
        <div className='SearchBar'>
            <input  
                placeholder='search by nickname'
                value={username} 
                onChange={(e) => onSearchValsChange({...searchVals, username : e.target.value})} 
            />
            <SearchButton searchVals={searchVals}/>
        </div>
    )
}

export default SearchBar;