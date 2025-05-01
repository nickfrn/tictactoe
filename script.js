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
    const placeMark = (row, column, playerMark) => {
        if (board[row][column] === 0) {
            board[row][column] = playerMark;
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
                cellDiv.dataset.row = row;
                cellDiv.dataset.col = col;

                if (board[row][col] === 0) {
                    cellDiv.textContent = '';
                } else {
                    cellDiv.textContent = board[row][col];
                }

                boardDisplay.appendChild(cellDiv);
            }
        }
    }

    return {getBoard, placeMark, renderBoard};
}

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

        const value1 = board[cell1[0]][cell1[1]];
        const value2 = board[cell2[0]][cell2[1]];
        const value3 = board[cell3[0]][cell3[1]];

        if (value1 !== 0 && value1 === value2 && value1 === value3) {
            return value1; // Returns 'X' or 'O' to then decide the winner
        }
    }

    // Get all values of the board in a flatten, mapped array to check for empty cells
    const allCellValues = board.flat().map(cell => cell);

    if (!allCellValues.includes(0)) {
        return 'tie';
    }

    return null; // Return nothing until there are still empty cells
}

// GameController controls the flow and state of the game
function GameController(board, playerOne = 'Player 1', playerTwo = 'Player 2') {

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
        } else if (GetWinner(board.getBoard()) === 'tie') {
            board.renderBoard();
        } else {
            // Switch player turn
            switchPlayerTurn();
            renderNewBoard();
        }
    }

    // Initialize board
    renderNewBoard();

    return {playRound, getActivePlayer, switchPlayerTurn, renderNewBoard};
}

function DisplayController() {
    let board = Gameboard();
    let game = GameController(board);

    const container = document.querySelector('.container');
    const boardDiv = document.querySelector('.board');
    const resetBtn = document.querySelector('#reset');
    const result = document.createElement('h1');
    result.classList.add('result');

    const handleBoardClick = (event) => {
        if (event.target.classList.contains('cell')) {
            if (event.target.textContent === '') {
                event.target.textContent = game.getActivePlayer().mark;

                let cellRow = event.target.dataset.row;
                let cellCol = event.target.dataset.col;

                board.getBoard()[cellRow][cellCol] = game.getActivePlayer().mark;

                const winnerCheck = GetWinner(board.getBoard());
                
                if (winnerCheck !== null && winnerCheck !== 'tie') {
                    result.textContent = `${game.getActivePlayer().name} Wins!`;
                    container.appendChild(result);

                    boardDiv.removeEventListener('click', handleBoardClick);
                } else if (winnerCheck === 'tie') {
                    result.textContent = 'It\'s a tie!';
                    container.appendChild(result);

                    boardDiv.removeEventListener('click', handleBoardClick);
                }
                
                game.switchPlayerTurn();
                game.renderNewBoard();
            }
        }
    }

    boardDiv.addEventListener('click', handleBoardClick);
    resetBtn.addEventListener('click', () => {
        if (result.textContent !== '') {
            result.textContent = '';
        }
        board = Gameboard();
        game = GameController(board);

        boardDiv.addEventListener('click', handleBoardClick);
    });
}

DisplayController();