import { useEffect, useRef } from 'react';
import MainLine from './MainLine.jsx';
import { useGameContext } from '../../context/GameContextProvider.jsx';

const MoveList = () => {
  const MoveListRef = useRef(null);
  const { currVariant } = useGameContext();

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
  }, [currVariant.currLine]);

  return (
    <div className="MoveList" ref={MoveListRef}>
      <MainLine />
    </div>
  );
}

export default MoveList;