// Gameboard object storing a gameboard array
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //* Create 2d array to represent the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    // Get current board
    const getBoard = () => board;

    // Place a player's mark on a free cell
    const placeMark = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addMark(player);
        }
    }

    // Render board in the DOM/display
    const renderBoard = () => {
        const boardDisplay = document.querySelector('.board');

        boardDisplay.innerHTML = '';

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellDiv = document.createElement('div');
                
                cellDiv.classList.add('cell');
                cellDiv.dataset.row = board[row];
                cellDiv.dataset.col = board[col];

                if (board[row][col] === 0) {
                    cellDiv.textContent = '';
                } else {
                    cellDiv.textContent = cell;
                }

                boardDisplay.appendChild(cellDiv);
            }
        }
    }

    return {getBoard, placeMark, renderBoard};
}

/*
Cell represents one "square" on the board and can have one of
0: no mark is in the square,
X: Player One's mark,
O: Player 2's mark
*/
// function Cell() {
//     let value = 0;

//     // Accept a player's mark to update the value of the cell
//     const addMark = (player) => {
//         value = player;
//     };

//     // Get value of the cell through closure
//     const getValue = () => value;

//     return {addMark, getValue};
// }

// Check the board each round for a winning combination and return the winner
function GetWinner(board) {

    const winningCombinations = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];

    for (const combination of winningCombinations) {
        const [cell1, cell2, cell3] = combination;

        const value1 = board[cell1[0]][cell1[1]].getValue();
        const value2 = board[cell2[0]][cell2[1]].getValue();
        const value3 = board[cell3[0]][cell3[1]].getValue();

        if (value1 !== 0 && value1 === value2 && value1 === value3) {
            return value1; // Returns 'X' or 'O' to then decide the winner
        }
    }

    // Get all values of the board in a flatten, mapped array to check for empty cells
    const allCellValues = board.flat().map(cell => cell.getValue());

    if (!allCellValues.includes(0)) {
        return 'tie';
    }

    return null; // Return nothing until there are still empty cells
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

    const renderNewBoard = () => {
        board.renderBoard();
    }

    const playRound = (row, column) => {
        // Place a mark for the current player
        board.placeMark(row, column, getActivePlayer().mark);

        // Winning player logic
        if (GetWinner(board.getBoard()) !== null && GetWinner(board.getBoard()) !== 'tie') {
            board.renderBoard();
            console.log(`${getActivePlayer().name} wins!`);
        } else if (GetWinner(board.getBoard()) === 'tie') {
            board.renderBoard();
            console.log('It\'s a tie!');
        } else {
            // Switch player turn
            switchPlayerTurn();
            renderNewBoard();
        }
    }

    // Initial play game message
    renderNewBoard();

    return {playRound, getActivePlayer};
}

// Let users place their mark on the displayed board
function AddPlayerMark(board) {

}

const game = GameController();