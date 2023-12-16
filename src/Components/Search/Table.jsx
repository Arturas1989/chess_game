import { useGameContext } from '../../context/GameContextProvider.jsx';
import { Chess } from 'chess.js';
import { getDate, getMoveLines } from '../../utilities/api.js';


const Table = ( { data } ) => {
    const { 
        setChessVariants, 
        setApiData, 
        setCurrVariant, 
        setCurrView, 
        setApiGame,
        setPlayControls 
    } = useGameContext();

    const setGame = (e) => {
        const chess = new Chess();
        const id = parseInt(e.currentTarget.id);
        chess.loadPgn(data[id].pgn)
        const [historyLines, moves] = getMoveLines(chess.history(), 'line1');
        const chessVariant = {
            'line1' : {
                'moves' : [...moves],
                'fromMove' : 0,
                'fromLine' : 'line1'
            },
            'lastLine' : 1,
            'movesLines' : {...historyLines}
        }
        setApiGame(data[id]);
        setChessVariants(chessVariant);
        setCurrVariant({'currLine' : 'line1', 'currMove' : 0})
        setApiData([]);
        setCurrView('board');
        setPlayControls({isPlaying: false, result: data[id].result});
    }
    
    const tableData = Array.from({length: data.length}, (_,i) =>
        (
            <tr key={i} id={i} onClick={(e) => setGame(e)}>
                <td>{i+1}</td>
                <td>{getDate(data[i].pgn)}</td>
                <td>{data[i].whiteUsername}</td>
                <td>{data[i].whiteRating}</td>
                <td>{data[i].blackUsername}</td>
                <td>{data[i].blackRating}</td>
                <td>{data[i].result}</td>
            </tr>
        ) 
    )

    return (
        <table className="SearchResults">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>White username</th>
                    <th>White rating</th>
                    <th>Black username</th>
                    <th>Black rating</th>
                    <th>Result</th>
                </tr>
            </thead>
            
            <tbody>
                {tableData}
            </tbody>
        </table>
    )
}

export default Table;