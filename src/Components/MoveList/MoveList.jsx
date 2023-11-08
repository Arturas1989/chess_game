import React, { useEffect, useRef } from 'react';
import MainLine from './MainLine.jsx';



const MoveList = () => {
  const MoveListRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
        MoveListRef.current.scrollTop = MoveListRef.current.scrollHeight;
    };

    const observer = new MutationObserver(scrollToBottom);

    if (MoveListRef.current) {
      observer.observe(MoveListRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="MoveList" ref={MoveListRef}>
      <MainLine />
    </div>
  );
}

export default MoveList;