import BlackBishop from './pieces/BlackBishop.svg';
import BlackKnight from './pieces/BlackKnight.svg';
import BlackPawn from './pieces/BlackPawn.svg';
import BlackQueen from './pieces/BlackQueen.svg';
import BlackRook from './pieces/BlackRook.svg';
import BlackKing from './pieces/BlackKing.svg';
import WhiteBishop from './pieces/WhiteBishop.svg';
import WhiteKnight from './pieces/WhiteKnight.svg';
import WhitePawn from './pieces/WhitePawn.svg';
import WhiteQueen from './pieces/WhiteQueen.svg';
import WhiteRook from './pieces/WhiteRook.svg';
import WhiteKing from './pieces/WhiteKing.svg';

const standard  = {

    pieces : {
        '♝' : BlackBishop,
        '♞' : BlackKnight,
        '♟' : BlackPawn,
        '♛' : BlackQueen,
        '♜' : BlackRook,
        '♚' : BlackKing,
        '♗' : WhiteBishop,
        '♘' : WhiteKnight,
        '♙' : WhitePawn,
        '♕' : WhiteQueen,
        '♖' : WhiteRook,
        '♔' : WhiteKing
    },

    squareColors : {
        white : 'rgb(235, 235, 204)',
        black : 'rgb(89, 31, 31)'
    },

    draggingHighlights : {
        white : 'rgb(131,147,107)',
        black : 'rgb(131,147,107)'
    },
    
    dragHighlights : {
        white : 'rgb(242,196,92)',
        black : 'rgb(242,196,92)'
    },

    clickHighlights : {
        white : 'rgb(242,196,92)',
        black : 'rgb(242,196,92)'
    }
}

export default standard;
