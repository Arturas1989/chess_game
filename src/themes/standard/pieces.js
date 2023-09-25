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


const squareStyles = {
    white : {
        backgroundColor :  'rgb(235, 235, 204)'
    },
    black : {
        backgroundColor :  'rgb(89, 31, 31)'
    },
}

const fromSquareStyle = (backgroundColor) => backgroundColor.match(/\(.+\)/g)[0].replace(/\)/g,'');

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
            backgroundColor :  squareStyles.white.backgroundColor
        },
        black : {
            backgroundColor :  squareStyles.black.backgroundColor
        },
    },

    draggingStyles : {
        white : {
            backgroundColor :  'rgba(131,147,107,0.7)'
        },
        black : {
            backgroundColor :  'rgba(131,147,107,0.7)'
        },
    },

    dragStartEndStyles : {
        white : {
            backgroundColor :  'rgb(242,196,92)',
            // opacity: '0.8',
        },
        black : {
            backgroundColor :  'rgb(242,196,92)',
            // opacity: '0.8',
        },
    },

    clickStartEndStyles : {
        white : {
            backgroundColor :  'rgba(242,196,92,0.8)'
        },
        black : {
            backgroundColor :  'rgba(242,196,92,0.8)'
        },
    },

    validMovesEmptyStyles : {
        white : {
            background: 'radial-gradient( rgba(242,196,92, 0.8) 19%, rgb(235, 235, 204) 20%)'
        },
        black : {
            background: 'radial-gradient( rgba(242,196,92, 0.8) 19%, rgb(89, 31, 31) 20%)'
        },
    },

    validMovesTakeStyles : {
        white : {
            background: 'radial-gradient(rgb(235, 235, 204) 79%, rgba(242,196,92, 0.8) 80%)'
        },
        black : {
            background :  'radial-gradient(rgb(89, 31, 31) 79%, rgba(242,196,92, 0.8) 80%)'
        },
    },

    promotionStyles : {
        white : {
            position: 'relative',
            background: `radial-gradient(rgba(190,190,190,30) 30%, rgba(100,100,100,10) 69.9%, rgba${fromSquareStyle(squareStyles.white.backgroundColor)}, 0.3) 71%)`,
            
        },
        black : {
            position: 'relative',
            background :  `radial-gradient(rgba(190,190,190,30) 30%, rgba(100,100,100,10) 69.9%, rgba${fromSquareStyle(squareStyles.black.backgroundColor)}, 0.3) 71%)`,
            
        },
    },

    promotionHoverStyles : {
        white : {
            position: 'relative',
            background: 'linear-gradient(to right, #fffbd5, #b20a2c)',
            cursor: 'pointer',
        },
        black : {
            position: 'relative',
            background: 'linear-gradient(to right, #fffbd5, #b20a2c)',
            cursor: 'pointer',
        },
    }
}

export default standard;
