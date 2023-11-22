import React from 'react';
import { useGameContext } from '../../GameApp.js';

const API_URL = 'https://api.chess.com/pub/titled/';

const Select = () => {
    const {searchVals, setSearchVals, setApiData} = useGameContext();

    const setData = async (e) => {
        const response = await fetch(`${API_URL}${e.target.value}`);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }
        let data = await response.json();
        setApiData(data.players);
        setSearchVals({...searchVals, title : e.target.value})
    }

    return(
        <div className="select-group">
            <label htmlFor="titles">Or choose a  player's title:</label>
            <select 
                name="titles" 
                id="titles"
                onChange={(e) => setData(e)}
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