import { useEffect } from 'react';

const useKeyPress = (eventHandler, handlerArg, key) => {
    useEffect(() => {
        const nextMoveOnKeyPress = (e) => {
            if(e.key === key){
                eventHandler(handlerArg);
            }
        }
        document.addEventListener('keydown', nextMoveOnKeyPress);
    
        return () => {
            document.removeEventListener('keydown', nextMoveOnKeyPress);
        }
    
    }, [handlerArg])
}

export default useKeyPress
