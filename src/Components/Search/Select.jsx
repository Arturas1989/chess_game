import React from 'react'

const Select = ({searchVals, onSearchValsChange}) => {
    return(
        <div className="select-group">
            <label htmlFor="titles">Or choose a  player's title:</label>
            <select 
                name="titles" 
                id="titles"
                onChange={(e) => onSearchValsChange({...searchVals, title : e.target.value})}
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