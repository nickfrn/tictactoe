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

    return { getBoard, dropMark, printBoard };
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

    return { addMark, getValue };
}


// Player object

// GameController object