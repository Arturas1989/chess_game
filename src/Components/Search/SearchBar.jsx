import React from 'react'
import SearchButton from './SearchButton.jsx'
import { useGameContext } from '../../GameApp.js';

const SearchBar = () => {
    const {searchVals, setSearchVals} = useGameContext()
    const {username} = searchVals
    return (
        <div className='SearchBar'>
            <input  
                placeholder='search by chess.com username'
                value={username} 
                onChange={(e) => setSearchVals({...searchVals, username : e.target.value})} 
            />
            <SearchButton searchVals={searchVals}/>
        </div>
    )
}

export default SearchBar;