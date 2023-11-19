import React from 'react'
import SearchButton from './SearchButton.jsx'

const SearchBar = () => {
    return (
        <div className='SearchBar'>
            <input  placeholder='search by nickname'></input>
            <SearchButton />
        </div>
    )
}

export default SearchBar;