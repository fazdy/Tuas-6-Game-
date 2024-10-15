let playerTxt = document.getElementById('playerTxt');
let score = document.getElementById('score');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--win');
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer;
let spaces = Array(9).fill(null);
let X_WIN = 0;
let O_WIN = 0;
let DRAW = 0;

// Modal elements
let playerModal = document.getElementById('playerModal');
let chooseXBtn = document.getElementById('chooseX');
let chooseOBtn = document.getElementById('chooseO');

// Show the modal when the page loads
window.onload = function() {
    playerModal.style.display = 'block';
};

// Player selection logic
chooseXBtn.addEventListener('click', function() {
    currentPlayer = X_TEXT;
    playerModal.style.display = 'none'; // Hide modal
    playerTxt.innerHTML = `Current Player: ${currentPlayer}`;
    startGame(); // Start the game after selection
});

chooseOBtn.addEventListener('click', function() {
    currentPlayer = O_TEXT;
    playerModal.style.display = 'none'; // Hide modal
    playerTxt.innerHTML = `Current Player: ${currentPlayer}`;
    startGame(); // Start the game after selection
});

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    restartBtn.addEventListener('click', restart);
};

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        if (currentPlayer == X_TEXT){
        e.target.innerHTML = "<img src=\"https://img.icons8.com/?size=100&id=111057&format=png&color=F4BD74\">"
        } else {
            e.target.innerHTML = "<img src=\"https://img.icons8.com/?size=100&id=111040&format=png&color=F4BD74\">"
        }
        
        let winning_blocks = checkWin();
        if (winning_blocks) {
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            playerTxt.innerHTML = `${currentPlayer} has won!`;
            if (currentPlayer === X_TEXT){
                X_WIN++
            } else {
                O_WIN++
            }
            score.innerHTML = `<pre>X Score = ${X_WIN}    O Score = ${O_WIN}     Draw = ${DRAW}</pre>`;
            setTimeout(() => {
                restart();
                playerModal.style.display = 'block';
            }, 2000);
            return;
        } else if (spaces.every(box => box != null)) {
            playerTxt.innerHTML = "It's a draw!";
            DRAW++;
            score.innerHTML = `<pre>X Score = ${X_WIN}    O Score = ${O_WIN}    Draw = ${DRAW}</pre>`;
            setTimeout(() => {
                restart();
                playerModal.style.display = 'block';
            }, 2000);
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        playerTxt.innerHTML = `Current Player: ${currentPlayer}`;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces = Array(9).fill(null);
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = '';
    });
     // Show the modal again after restart
    playerTxt.innerHTML = "Tic Tac Toe";
}