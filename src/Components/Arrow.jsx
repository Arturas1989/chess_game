const Svg = () => {
    const style = {
        fill: 'rgba(255, 170, 0, 0.8)',
        opacity: '0.8'
    }
    return (
        <svg viewBox="0 0 100 100">
        <polygon transform="rotate(180 50.25 93.75)" points="79.875 98.25,
        79.875 120.125,
        89.25 120.125,
        89.25 122,
        93.75 118.75,
        89.25 115.5,
        89.25 117.375,
        82.625 117.375,
        82.625 98.25" style={style}></polygon>
        </svg>
    )
}

export default Svg;