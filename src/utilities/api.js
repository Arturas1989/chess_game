import { Chess } from 'chess.js';
const cloneDeep = require('lodash/cloneDeep');

const searchByUserName = async (API_URL, username, setApiData) => {
    let response = await fetch(`${API_URL}${username}/games/archives`);

    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
    }
    let data = await response.json();
     
    const monthsUrls = data.archives;
    if(!monthsUrls){
        console.error(`Error: no such property found: "archives"`);
        return;
    }
    
    const gameLimit = 100
    let count = 0;
    let gameData = [];
    for(let i = monthsUrls.length - 1; i>=0; i--){
        const url = monthsUrls[i];
        response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }
        const data = await response.json();
        for(let j = data.games.length - 1; j>=0; j--){
            const game = data.games[j];
            
            let gameInfo = {
                'endTime' : game.end_time,
                'whiteUsername' : game.white.username,
                'whiteRating' : game.white.rating,
                'blackUsername' : game.black.username,
                'blackRating' : game.black.rating,
                'pgn' : game.pgn
            };

            gameData.push(gameInfo);
            count++;
            if(count === gameLimit){
                setApiData(gameData);
                return;
            } 
        }
    }
}

const searchChessGames = async (API_URL, searchVals, setApiData) => {
    const {username, title} = searchVals;
    if(username) searchByUserName(API_URL, username, setApiData);
}






const getResult = (pgn) => {
    if(pgn.includes('1-0')) return '1-0 white wins';
    if(pgn.includes('0-1')) return '0-1 black wins';
    if(pgn.includes('1/2-1/2')) return '1/2-1/2 draw';
    return '';
}

const getDate = (pgn) => {
    const regex = /\d{4}\.\d{2}\.\d{2}/g;
    const found = pgn.match(regex) || [''];
    return found[0];
}

const getMoveLines = (history, line) => {
    let historyLines = {};
    let historyText = '';
    
    let chess = new Chess();
    let moves = [chess];
    for(const move of history){
        historyText+=move;
        historyLines[historyText] = line;
        chess = cloneDeep(chess);
        chess.move(move);
        moves.push(chess);
    }
    return [historyLines, moves]
}

export {searchChessGames, getResult, getDate, getMoveLines};