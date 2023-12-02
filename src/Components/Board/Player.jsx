const Player = ({ type, players, isReversed }) => {

    let player;
    player = (type === 'bottom' && !isReversed) || (type === 'top' && isReversed) ?  players['white'] : players['black'];

    return (
        <div className={`Player`}>{player}</div>
    )
}

export default Player;