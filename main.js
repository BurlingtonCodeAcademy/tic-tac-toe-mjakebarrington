// Initiate Variables
let positions = document.getElementsByClassName("cell"),
  startBtn = document.getElementById("initGame"),
  game = {};

// Adds an event listener to the begin button. Then turns on intialize function.
startBtn.addEventListener("click", () => {
  initialize();
});

function initialize() {
  // Initialization function. Triggered when user clicks begin button.
  game.started = true;
  game.player = "human";

  // If a user clicks it win initialize turn function with currentPos as param (cell user has clicked)
  for (let currentPos of positions) {
    currentPos.onclick = () => select(currentPos);
    currentPos.ticTacToe = 0;
    currentPos.innerHTML = "";
  }
}

function select(currentPos) {
  if (currentPos.innerHTML == "X" || currentPos.innerHTML == "O") {
    alert(
      "Sorry, that position is currently taken. Please buy the deluxe edition to override positions."
    );
  } else if (currentPos.innerHTML == "") {
    currentPos.innerHTML = "X";
    checkWin();
    aiSelect();
    // Fallback if either flow is invalid
  } else {
    alert(
      "Sorry, I don't know what to do here. Try submitting a ticket for our developers. We will make them do 100 hr/wk code sprints to fix your issue so we can squeeze more cash outta you. Or try checking the console."
    );
  }
}

function aiSelect() {
  let num = Math.floor(Math.random() * positions.length);
  let aiSelection = positions[num];
  if (aiSelection.innerHTML == "X" || aiSelection.innerHTML == "O") {
    aiSelect();
  } else if (aiSelection.innerHTML == "") {
    aiSelection.innerHTML = "O";
    checkWin();
  } else {
    alert(
      "I'm starting to think we should just make you buy tickets. Stop breaking our game."
    );
  }
}

// Checks a matrix of possible winning sequences.
function checkWin() {
  // A matrix of possible winning sequences.
  let winMatrix = [
    ["cell-0", "cell-3", "cell-6"],
    ["cell-1", "cell-4", "cell-7"],
    ["cell-2", "cell-5", "cell-8"],
    ["cell-0", "cell-1", "cell-2"],
    ["cell-3", "cell-4", "cell-5"],
    ["cell-6", "cell-7", "cell-8"],
    ["cell-0", "cell-4", "cell-8"],
    ["cell-2", "cell-4", "cell-6"]
  ];

  for (let i = 0; i < winMatrix.length; i++) {
    const element = winMatrix[i];
    for (let i = 0; i < element.length; i++) {
      const newElem = element[i];
      let currCell = document.getElementById(newElem);
      // Count is number of cells with matching letter. So in THEORY, if the number is 3, that user has won the game.
      let xCount = 0;
      let oCount = 0;
      if (currCell.innerHTML == "X") {
        return ++xCount;
      } else if (currCell.innerHTML == "O") {
        return ++oCount;
      }
      checkTwo();
      // A second check to see if either xCount or oCount is > 2 (a winner)
      function checkTwo() {
        if (xCount >= 2) {
          alert("Human has won the game!");
        } else if (oCount >= 2) {
          alert(
            "Our computer has beat you! To override, please buy our new epic deluxe edition."
          );
        }
      }
    }
  }
}
