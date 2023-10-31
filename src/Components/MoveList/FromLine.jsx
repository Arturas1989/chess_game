import React from 'react';

const FromLine = ({fromLine, line}) => {
    const innerText = `(from: ${fromLine})`.replace('line1', 'Main Line');
  
    return (
      <span style={{fontWeight: 'normal', fontSize: '9px', lineHeight: '1', verticalAlign: 'bottom' }}>
        <strong>{line}</strong> {innerText}
      </span>
    )
}

export default FromLine;