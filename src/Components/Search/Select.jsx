import { useGameContext } from '../../GameApp.js';
import { searchTitledPlayers } from '../../utilities/api.js';

const API_URL = 'https://api.chess.com/pub/titled/';

const Select = () => {
    const {setSearchVals, setApiData, setCurrView, partname} = useGameContext();

    return(
        <div className="select-group">
            <label htmlFor="titles">Or choose a  player's title:</label>
            <select 
                name="titles" 
                id="titles"
                onChange={(e) => searchTitledPlayers(e, API_URL, setApiData, setSearchVals, setCurrView, partname)}
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