const gridArea = document.querySelector(".grid-template");
const gridCells = document.querySelectorAll(".grid-box");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer;
gameSetup();

function gameSetup() {
  gridArea.classList.remove("turn-x", "turx-o");
  gridCells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.addEventListener("click", fillCell, { once: true });
  });
  setPlayer();
}

function fillCell(e) {
  e.target.classList.add(currentPlayer);
  if (checkWin()) {
    const restart = confirm(
      currentPlayer.toUpperCase() + " is the winner! Restart?"
    );
    if (restart) gameSetup();
  } else if (checkForDraw()) {
    const restart = confirm("Draw! Restart?");
    if (restart) gameSetup();
  }
  switchPlayer();
}

function setPlayer() {
  currentPlayer = Math.round(Math.random()) === 1 ? "o" : "x";
  gridArea.classList.add(`turn-${currentPlayer}`);
}

function switchPlayer() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  gridArea.classList.remove("turn-x", "turn-o");
  gridArea.classList.add(`turn-${currentPlayer}`);
}

function checkWin() {
  return WINNING_COMBINATIONS.some((combination) => {
    console.log(combination);
    return combination.every((c) => {
      if (gridCells[c].classList.contains(currentPlayer)) return true;
      return false;
    });
  });
}
function checkForDraw() {
  return [...gridCells].every((c) => {
    if (c.classList.contains("x") || c.classList.contains("o")) {
      return true;
    }
    return false;
  });
}
