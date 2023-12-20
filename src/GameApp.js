import './App.css';
import { useState } from 'react';
import { Board, PromotionBoard } from './Components/Board/Board.jsx';
import Player from './Components/Board/Player.jsx';
import PlayerContainer from './Components/Board/PlayerContainer.jsx';
import Result from './Components/Board/Result.jsx';
import MoveContainer from './Components/MoveList/MoveContainer.jsx';
import SearchContainer from './Components/Search/SearchContainer.jsx';
import SearchResults from './Components/Search/SearchResults.jsx';
import PlayModal from './Components/Modal/PlayModal.jsx';
import Clock from './Components/Board/Clock.jsx';

import {
    GameContextProvider,
    useGameContext,
} from './context/GameContextProvider.jsx';

const GameApp = () => {
    return (
        <GameContextProvider>
            <GameContainer />
        </GameContextProvider>
    );
};

const GameContainer = () => {
    const {
        apiData,
        currView,
        isReversed,
        apiGame,
        modalIsOpen,
        playControls,
        promotion,
    } = useGameContext();
    const isPromoting = promotion.isPromoting;

    const [clock, setClock] = useState({ white: 0, black: 0 });

    let ClockComponent1,
        ClockComponent2,
        players = { white: '', black: '' },
        displayPlayerContainer = false;
    if (playControls.isPlaying) {
        ClockComponent1 = (
            <Clock color="white" clock={clock} setClock={setClock} />
        );
        ClockComponent2 = (
            <Clock color="black" clock={clock} setClock={setClock} />
        );
        players =
            playControls.color === 'white'
                ? { white: 'you', black: 'chess engine' }
                : { white: 'chess engine', black: 'you' };

        if (isReversed)
            [ClockComponent1, ClockComponent2] = [
                ClockComponent2,
                ClockComponent1,
            ];
        displayPlayerContainer = true;
    } else if (Object.keys(apiGame).length) {
        const { whiteUsername, blackUsername } = apiGame;
        players = { white: whiteUsername, black: blackUsername };
        displayPlayerContainer = true;
    }

    return currView !== 'board' ? (
        <SearchResults data={apiData} />
    ) : (
        <div className="GameContainer">
            <div className="GameWrap">
                {modalIsOpen ? <PlayModal setClock={setClock} /> : ''}
                <SearchContainer />

                <div className="GameControls">
                    <div className="BoardContainer">
                        <Result resultText={playControls.result} />
                        <PlayerContainer
                            className="Board-top"
                            displayPlayerContainer={displayPlayerContainer}
                        >
                            <Player
                                type="top"
                                players={players}
                                isReversed={isReversed}
                            />
                            {ClockComponent2}
                        </PlayerContainer>

                        {isPromoting ? <PromotionBoard /> : <Board />}

                        <PlayerContainer
                            className="Board-bottom"
                            displayPlayerContainer={displayPlayerContainer}
                        >
                            <Player
                                type="bottom"
                                players={players}
                                isReversed={isReversed}
                            />
                            {ClockComponent1}
                        </PlayerContainer>
                    </div>

                    <MoveContainer />
                </div>
            </div>
        </div>
    );
};

export { GameApp };
