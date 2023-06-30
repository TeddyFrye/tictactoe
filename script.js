function gameBoard() {
    const rows = 3;
    const columns = 3;
    const cells = [];
//For loop creating empty cells
    for (let i = 0; i < rows; i++) {
        cells[i] = [];
      for (let j = 0; j < columns; j++) {
        cells[i].push(Cell());
      }
    }

    const getBoard = () => cells;

    
    const placeToken = (row, column, player) => {
        // get cell at row and column
        const cell = cells[row][column]

        // set cell to player token
        cell.toPlayer(player)
    };
    // Nothing preventing placing token over other player

    const printBoard = () => {
      const boardWithCellValues = [];
      for (let i = 0; i < rows; i++) {
        const rowWithCellValues = [];
        for (let j = 0; j < columns; j++) {
          rowWithCellValues.push(cells[i][j].getValue());
        }
        boardWithCellValues.push(rowWithCellValues);
      }
      console.log(boardWithCellValues);
    };
return { getBoard,
    placeToken,
    printBoard };
}


function Cell() {
  let value = 0;

  const setValue = (to_value) => {
    value = to_value;
  };
  
  const getValue = () => value;

  const toPlayer = (player) => {
    setValue(player.token)
  }

  return {
    setValue,
    getValue,
    toPlayer,
    value
  };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
//Here is what you use to play a round, e.g. "game.playRound(0,1)"
  const playRound = (row, column) => {
    console.log(
      `Placing ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
    );
    board.placeToken(row, column, getActivePlayer());

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();
    return {
    playRound,
    getActivePlayer
  };
}

const game = gameController();