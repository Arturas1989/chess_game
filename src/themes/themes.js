import standard from './standard/pieces.js';
import { createContext } from 'react';

const GameContext = createContext();

const themes = {
    standard : standard
};


export {themes, GameContext};