import standard from './standard/pieces.js';
import { createContext, useContext } from 'react';

const GameContext = createContext();

const themes = {
    standard : standard
};

function useGameContext(){
    const context = useContext(GameContext);
    return context;
}


export {themes, GameContext, useGameContext};