import standard from './standard/pieces.js';
import { createContext } from 'react';

const ThemeContext = createContext();

const themes = {
    standard : standard
};


export {themes, ThemeContext};