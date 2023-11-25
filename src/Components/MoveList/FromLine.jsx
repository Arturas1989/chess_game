const FromLine = ({fromLine, line}) => {
    const innerText = `(from: ${fromLine})`.replace('line1', 'Main Line');
  
    return (
      <span className="FromLine">
        <strong>{line}</strong> {innerText}
      </span>
    )
}

export default FromLine;