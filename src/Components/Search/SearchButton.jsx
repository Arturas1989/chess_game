import React from 'react';
import { useGameContext } from '../../GameApp.js';
import logo from './icons/loupe_751463.png';
import {searchChessGames} from '../../utilities/api.js';

const API_URL = 'https://api.chess.com/pub/player/'

const SearchButton = ({searchVals}) => {
    const {setApiData} = useGameContext();

    return (
        <button 
            className="SearchButton" 
            onClick={()=>searchChessGames(API_URL, searchVals, setApiData)}
        >
            <img alt="search" src={logo}></img>
        </button>
    )
}

export default SearchButton