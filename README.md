# Project: Chess Game

Welcome! This is the description of the Chess Game project.

- **Project is published at:** [Chess Game](https://arturas1989.github.io/chess_game/)

**Project includes:**

- **Fetching data from the chess.com API:**
    - Search by chess.com username (e.g., hikaru). The result is a list of games wrapped in a table. Clicking on a table row returns a selected game.
    - Search by player titles. The result is a list of players wrapped in buttons. Clicking on them returns a game list of the selected player.

- **Chessboard. It includes:**
    - Piece movement:
        - By clicking the start and end square.
        - By dragging from the start to the end square.
    - Piece move highlights.
    - Valid move highlights.
    - Promotion styles.
    - Responsive board layout.
    - Board coordinates.

- **Move list. It includes:**
    - Move control buttons. They include the functionality to:
        - Move forward (or press the right arrow key).
        - Move backward (or press the left arrow key).
        - Move to the end position.
        - Move to the start position.
        - Reverse board.
    - Current move highlighting.
    - Move variants. The ability to make move variants within chess moves.

- **The ability to play against a chess engine by clicking on a play button. It opens a play modal where you can select time controls. The color is random.**


    

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

To get a local copy up and running follow these simple steps:

### Clone the Repository and Install Node Modules

- Clone the `chess_game` repository:
    ```bash
    git clone https://github.com/Arturas1989/chess_game.git
    ```

- Navigate to the `chess_game` repository:
    ```bash
    cd chess_game
    ```

- Install Node modules inside the `chess_game` repository:
    ```bash
    npm install
    ```

## [Getting Started with Create React App](https://github.com/facebook/create-react-app)

## Available Scripts
You can run:

```
npm start
```
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


