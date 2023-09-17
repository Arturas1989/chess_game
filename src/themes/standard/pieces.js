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

    pieces2 : {
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

    pieces : {
        w : {
            b : WhiteBishop,
            n : WhiteKnight,
            p : WhitePawn,
            q : WhiteQueen,
            r : WhiteRook,
            k : WhiteKing
        },

        b : {
            b : BlackBishop,
            n : BlackKnight,
            p : BlackPawn,
            q : BlackQueen,
            r : BlackRook,
            k : BlackKing
        } 
    },

    squareStyles : {
        white : {
            backgroundColor :  'rgb(235, 235, 204)'
        },
        black : {
            backgroundColor :  'rgb(89, 31, 31)'
        },
    },

    draggingStyles : {
        white : {
            backgroundColor :  'rgb(131,147,107)'
        },
        black : {
            backgroundColor :  'rgb(131,147,107)'
        },
    },

    dragStartEndStyles : {
        white : {
            backgroundColor :  'rgb(242,196,92)'
        },
        black : {
            backgroundColor :  'rgb(242,196,92)'
        },
    },

    clickStartEndStyles : {
        white : {
            backgroundColor :  'rgb(242,196,92)'
        },
        black : {
            backgroundColor :  'rgb(242,196,92)'
        },
    }
}

export default standard;
