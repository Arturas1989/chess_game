import React from 'react';
import Table from './Table.jsx';
import { useGameContext } from '../../GameApp.js';

const SearchResults = ({ data }) => {
    const { searchVals } = useGameContext();
    console.log(searchVals)
    return(
        <div className="SearchResults">
            {searchVals.title === '' ? 
                <Table data={data} />
                :
                <TitledPlayerResults data={data}/>
            }
            
        </div>
    )
}

const TitledPlayerResults = ({data}) => {
    const players = data.map((player, i) => (
        <button key={i} className="player-container">
            <div className="player">
                {player}
            </div>
        </button>
        
    ))
    return (
        <div className="titled-players">
            {players}
        </div>
    )
}

export default SearchResults;

