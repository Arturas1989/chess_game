import React from 'react'

const Select = () => {
    return(
        <div className="select-group">
            <label htmlFor="titles">Choose a title:</label>
            <select name="titles" id="titles">
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