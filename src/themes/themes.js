import standard from './standard/pieces.js';
import { createContext, useContext } from 'react';

const GameContext = createContext();

const themes = {
    standard : standard,
    moveListFontSize: '16px'
};

function useGameContext(){
    const context = useContext(GameContext);
    return context;
}


export {themes, GameContext, useGameContext};