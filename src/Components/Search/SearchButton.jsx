import React from 'react'
import logo from './icons/loupe_751463.png'

const SearchButton = () => {
    const handleClick = (e) => {
        console.log(1)
    }
    return (
        <button className="SearchButton" onClick={(e)=>handleClick(e)}>
            <img alt="search" src={logo}></img>
        </button>
    )
}

export default SearchButton