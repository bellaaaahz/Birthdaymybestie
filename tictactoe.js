// Tic-Tac-Toe Game Logic
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('gameMessage');
const resetBtn = document.getElementById('resetBtn');
const winModal = document.getElementById('winModal');
const winCloseBtn = document.getElementById('winCloseBtn');

let currentPlayer = 'X'; // Player is X
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let lossCount = 0;
let drawCount = 0;
let isHard = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Initialize game
function initGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = 'Your turn! Click a cell.';
    message.style.color = '#6b5b95';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    winModal.classList.remove('active');
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] !== '' || !gameActive) return;

    // Player move
    makeMove(index, 'X');

    // Check for win or draw
    if (checkWin('X')) {
        gameActive = false;
        message.textContent = 'You win! 🎉';
        message.style.color = '#ff69b4';
        setTimeout(() => {
            showWinModal();
        }, 1000);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        message.textContent = 'It\'s a draw! 🤝';
        message.style.color = '#6b5b95';
        return;
    }

    // Computer move
    setTimeout(() => {
        computerMove();
    }, 500);
}

// Make a move
function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add('taken');
}

// Computer move (hard or easy AI)
function computerMove() {
    if (!gameActive) return;

    if (!isHard) {
        // Easy mode: random move
        let availableCells = [];
        gameBoard.forEach((cell, index) => {
            if (cell === '') availableCells.push(index);
        });
        if (availableCells.length === 0) return;
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const computerMoveIndex = availableCells[randomIndex];
        makeMove(computerMoveIndex, 'O');
    } else {
        // Hard mode: minimax
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                gameBoard[i] = 'O';
                let score = minimax(gameBoard, 0, false);
                gameBoard[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        makeMove(bestMove, 'O');
    }

    // Check for computer win
    if (checkWin('O')) {
        gameActive = false;
        message.textContent = 'Sorry gurl! Try again LOSER HAHAHAHA! ';
        message.style.color = '#ff85c0';
        lossCount++;
        if (lossCount >= 2 || drawCount >= 2) {
            isHard = false;
            message.textContent += '';
        }
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        message.textContent = 'It\'s a draw! 🤝';
        message.style.color = '#6b5b95';
        drawCount++;
        if (lossCount >= 2 || drawCount >= 2) {
            isHard = false;
            message.textContent += '';
        }
        return;
    }

    message.textContent = 'Your turn! Click a cell.';
}

// Check for win
function checkWin(player, board = gameBoard) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Check for draw
function checkDraw(board = gameBoard) {
    return board.every(cell => cell !== '');
}

// Minimax algorithm for AI
function minimax(board, depth, isMaximizing) {
    if (checkWin('O', board)) return 10 - depth;
    if (checkWin('X', board)) return depth - 10;
    if (checkDraw(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Show win modal
function showWinModal() {
    winModal.classList.add('active');
}

// Go to enjoy page
function goToEnjoy() {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'enjoy.html';
        }
    });
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';

        const randomX = Math.random() * window.innerWidth;
        const randomDuration = Math.random() * 3 + 5;
        const randomDelay = Math.random() * 2;

        heart.style.left = randomX + 'px';
        heart.style.top = '0px';
        heart.style.setProperty('--float-duration', randomDuration + 's');
        heart.style.setProperty('--delay', randomDelay + 's');
        heart.style.setProperty('--translate-x', (Math.random() * 200 - 100) + 'px');

        heartsContainer.appendChild(heart);
    }
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', initGame);
winCloseBtn.addEventListener('click', goToEnjoy);

// Initialize on page load
window.addEventListener('load', () => {
    createFloatingHearts();
    initGame();

    // Animate title
    gsap.from('.title-section', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'back.out'
    });
});
