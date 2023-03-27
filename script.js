function playGame(){
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }

    const getBoard = () => board;

    const placeToken = (column, player) => {
      const availableCells = [];
      for (let i = rows - 1; i >= 0; i--) {
        if (board[i][column].getValue() === 0) {
          availableCells.push(board[i][column]);
          break;
        }
      }

      if (!availableCells.length) return;

      availableCells[0].addToken(player);
    };

    const printBoard = () => {
      const boardWithCellValues = [];
      for (let i = 0; i < rows; i++) {
        const rowWithCellValues = [];
        for (let j = 0; j < columns; j++) {
          rowWithCellValues.push(board[i][j].getValue());
        }
        boardWithCellValues.push(rowWithCellValues);
      }
      console.log(boardWithCellValues);
    };
return { getBoard, placeToken, printBoard };
}


function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };
    const getValue = () => value;

  return {
    addToken,
    getValue
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

  const playRound = (row, column) => {
    console.log(
      `Placing ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
    );
    board.placeToken(column, row, getActivePlayer().token);

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
}
console.log(playGame());