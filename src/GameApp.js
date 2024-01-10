import './App.css';
import { useState } from 'react';
import { Board, PromotionBoard } from './components/Board/Board.jsx';
import Player from './components/Board/Player.jsx';
import PlayerContainer from './components/Board/PlayerContainer.jsx';
import Result from './components/Board/Result.jsx';
import MoveContainer from './components/MoveList/MoveContainer.jsx';
import SearchContainer from './components/Search/SearchContainer.jsx';
import SearchResults from './components/Search/SearchResults.jsx';
import PlayModal from './components/Modal/PlayModal.jsx';
import Clock from './components/Board/Clock.jsx';
import { Loading } from './components/Search/Loading.jsx';

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
        loading
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

    if(loading){
        return <Loading />
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
