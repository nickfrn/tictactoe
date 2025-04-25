// Gameboard object storing a gameboard array
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    /* 
    Create 2d array to represent the game board
    by pushing 3 cells to each row 
    */
    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // Get current board
    const getBoard = () => board;

    // Drop a player's mark on a free cell
    const dropMark = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addMark(player);
        }
    }

    // Print board to console until UI is built
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));

        console.log(boardWithCellValues);
    }

    return {getBoard, dropMark, printBoard};
}

/*
Cell represents one "square" on the board and can have one of
0: no mark is in the square,
X: Player One's mark,
O: Player 2's mark
*/
function Cell() {
    let value = 0;

    // Accept a player's mark to update the value of the cell
    const addMark = (player) => {
        value = player;
    };

    // Get value of the cell through closure
    const getValue = () => value;

    return {addMark, getValue};
}

// GameController controls the flow and state of the game
function GameController(playerOne = 'Player 1', playerTwo = 'Player 2') {
    const board = Gameboard();

    const players = [
        {name: playerOne, mark: 'X'},
        {name: playerTwo, mark: 'O'}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        // Drop a mark for the current player
        console.log(`Dropping ${getActivePlayer().name}'s mark into cell ${row, column}...`);
        board.dropMark(row, column, getActivePlayer().mark);

        // Winning player logic

        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    }

    // Initial play game message
    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();
game.playRound();