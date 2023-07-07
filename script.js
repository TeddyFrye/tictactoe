function gameBoard(getActivePlayer, showWinner, hideBanner) {
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
    const cell = cells[row][column];
    if (cell.getValue() !== 0) {
      console.log("Cell already taken");
      return false;
    }

    // set cell to player token
    cell.toPlayer(player);

    // update grid box in HTML
    const gridBox = document.getElementById(`cell-${row}-${column}`);
    gridBox.textContent = player.token === 1 ? "X" : "O";
    gridBox.classList.add("pop");
    setTimeout(() => gridBox.classList.remove("pop"), 20);
    return true;
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

  const checkWin = () => {
    // Check rows for win
    for (let i = 0; i < rows; i++) {
      if (
        cells[i][0].getValue() === cells[i][1].getValue() &&
        cells[i][1].getValue() === cells[i][2].getValue() &&
        cells[i][0].getValue() !== 0
      ) {
        showWinner(getActivePlayer());
        return true;
      }
    }

    // Check columns for win
    for (let i = 0; i < columns; i++) {
      if (
        cells[0][i].getValue() === cells[1][i].getValue() &&
        cells[1][i].getValue() === cells[2][i].getValue() &&
        cells[0][i].getValue() !== 0
      ) {
        showWinner(getActivePlayer());
        return true;
      }
    }

    // Check diagonals for win
    if (
      (cells[0][0].getValue() === cells[1][1].getValue() &&
        cells[1][1].getValue() === cells[2][2].getValue() &&
        cells[0][0].getValue() !== 0) ||
      (cells[0][2].getValue() === cells[1][1].getValue() &&
        cells[1][1].getValue() === cells[2][0].getValue() &&
        cells[0][2].getValue() !== 0)
    ) {
      showWinner(getActivePlayer());
      return true;
    }

    // No win found
    return false;
  };

  return { getBoard, placeToken, printBoard, checkWin };
}

function Cell() {
  let value = 0;

  const setValue = (to_value) => {
    value = to_value;
  };

  const getValue = () => value;

  const toPlayer = (player) => {
    setValue(player.token);
  };

  return {
    setValue,
    getValue,
    toPlayer,
    value,
  };
}
/////////////////////////
function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const showWinner = (player) => {
    const banner = document.getElementById("banner");
    banner.textContent = `${player.name} wins!`;
    banner.style.display = "block";
  };

  const hideBanner = () => {
    const banner = document.getElementById("banner");
    banner.style.display = "none";
  };

  const board = gameBoard(getActivePlayer, showWinner, hideBanner);

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s token into row ${row}, column ${column}...`
    );
    if (!board.placeToken(row, column, getActivePlayer())) {
      return;
    }

    if (board.checkWin()) {
      // Added win condition check
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  const restartGame = () => {
    // Clear the board
    const cells = board.getBoard();
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        cells[i][j].setValue(0);
      }
    }

    // Reset the active player to player 1
    activePlayer = players[0];

    // Clear grid boxes
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach((box) => {
      box.textContent = "";
    });
    hideBanner();
    printNewRound();
  };

  return {
    playRound,
    getActivePlayer,
    restartGame,
  };
}

// Event listeners for grid boxes
document.addEventListener("DOMContentLoaded", (event) => {
  const game = gameController();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const gridBox = document.getElementById(`cell-${i}-${j}`);
      gridBox.addEventListener("click", () => {
        game.playRound(i, j);
      });
    }
  }

  // Event listener for restart button
  document.querySelector(".restart-button").addEventListener("click", () => {
    game.restartGame();
  });

  // Add this to hide banner on click
  document.getElementById("banner").addEventListener("click", () => {
    game.restartGame();
  });
});
