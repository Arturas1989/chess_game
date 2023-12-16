

const PlayerContainer = ({ children, className, displayPlayerContainer }) => {
    
    if(!displayPlayerContainer) return;
    return (
        <div className={className}>
            {children}
        </div>
    )
    
}

export default PlayerContainer