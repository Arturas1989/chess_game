import { Chess } from 'chess.js';
const cloneDeep = require('lodash/cloneDeep');

const searchByUserName = async (API_URL, username, setApiData, setPlayControls, setErrors) => {
    const full_api_url = `${API_URL}${username}/games/archives`;
    
    let response = await fetch(full_api_url);

    if (!response.ok) {
        setErrors({userSearchError: `No such username: "${username}" found`})
        return [];
    }
    let data = await response.json();

    const monthsUrls = data.archives;
    if(!monthsUrls){
        console.error(`Error: no such property found: "archives"`);
        return [];
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
                'pgn' : game.pgn,
                'result' : getResult(game.pgn)
            };

            gameData.push(gameInfo);
            count++;
            if(count === gameLimit){
                const userData = {username, gameData};
                setApiData(userData);
                return userData;
            } 
        }
    }
    const userData = {username, gameData};
    setApiData(userData);
    return userData;
    
}

const searchChessGames = async (API_URL, searchVals, setApiData, setPlayControls, setErrors) => {
    const {username} = searchVals;
    if(username){
        try {
            const data = await searchByUserName(API_URL, username, setApiData, setPlayControls, setErrors);
            return data;
        } catch(e) {
            setErrors({userSearchError: `No such username: "${username}" found`});
        }
    } 
    
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

const filterTitledPlayers = (players, partname) => {
    const partNameLower = partname.toLowerCase();
    return players.filter(apiUsername => apiUsername.toLowerCase().includes(partNameLower));
}

const searchTitledPlayers = async (e, titledPlayersArgs) => {
    const {
        API_URL, 
        setApiData, 
        setSearchVals, 
        setCurrView, 
        partname, 
        initialStyles, 
        setStyles
    } = titledPlayersArgs;
    const response = await fetch(`${API_URL}${e.target.value}`);
    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
    }
    let data = await response.json();
    let players = data.players;
    if(partname) players = filterTitledPlayers(players, partname);
    setApiData(players);
    setSearchVals({username: '', title: e.target.value})
    setStyles({...initialStyles});
    if(e.target.value) setCurrView('title');
}

export {
    searchTitledPlayers, 
    filterTitledPlayers, 
    searchChessGames, 
    getResult, 
    getDate, 
    getMoveLines
};