import { useGameContext } from '../../context/GameContextProvider.jsx';
import { searchTitledPlayers } from '../../utilities/api.js';
import React from 'react';

const API_URL = 'https://api.chess.com/pub/titled/';

const Select =({ setSearchVals }) => {
    const { setApiData, setCurrView, partname, initialStyles, setStyles} = useGameContext();
    const titledPlayersArgs = {
        API_URL, 
        setApiData, 
        setSearchVals, 
        setCurrView, 
        partname, 
        initialStyles, 
        setStyles
    }
    return(
        <div className="select-group">
            <label htmlFor="titles">Or choose a  player's title:</label>
            <select 
                name="titles" 
                id="titles"
                onChange={(e) => searchTitledPlayers(e, titledPlayersArgs)}
            >
                <option value=""></option>
                <option value="GM">GM</option>
                <option value="WGM">WGM</option>
                <option value="IM">IM</option>
                <option value="WIM">WIM</option>
                <option value="FM">FM</option>
                <option value="WFM">WFM</option>
                <option value="NM">NM</option>
                <option value="WNM">WNM</option>
                <option value="WCM">WCM</option>
            </select>
        </div>
    )
}

export default Select