import TitledSearch from './TitledSearch.jsx';

const TitledPlayerResults = ({data}) => {
    const players = data.map((player, i) => (
        <button key={i} className="player-container">
            <div className="player">
                {player}
            </div>
        </button>
        
    ))
    return (
    <div className="titled-results">
        <TitledSearch />
        <div className="titled-players">
            {players}
        </div>
    </div>
        
    )
}

export default TitledPlayerResults;