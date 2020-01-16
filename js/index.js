let players = { 1: 'O', 2: 'X' };
let player = players[1];
let scores = { 1: 0, 2: 0 };
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let game = true;
let currentGameNo = 1;


turn = (ele, index) => {
    if (ele.innerHTML === "" && game === true) {
        ele.innerHTML = player;
        if (player === "O") {
            board[index] = 1;
            let winner = check(board);
            if (winner) {
                alert("Player " + players[winner] + " Wins");
                updateScores(winner);
            }

            player = players[2];

            if (isDraw(board) && game) {
                alert("Game Draw");
                game = false;
            }

            setTimeout(() => {
                if (game) {
                    moveAI();
                }
            }, 0);
        }
    }
}

check = (board) => {
    let tempWinner = '';
    if (board[0] == board[1] && board[1] == board[2] && board[0] != 0) {
        tempWinner = board[0];
        game = false;
    }
    else if (board[3] == board[4] && board[4] == board[5] && board[3] != 0) {
        tempWinner = board[3];
        game = false;
    }
    else if (board[6] == board[7] && board[7] == board[8] && board[6] != 0) {
        tempWinner = board[6];
        game = false;
    }
    else if (board[0] == board[3] && board[3] == board[6] && board[0] != 0) {
        tempWinner = board[0];
        game = false;
    }
    else if (board[1] == board[4] && board[4] == board[7] && board[1] != 0) {
        tempWinner = board[1];
        game = false;
    }
    else if (board[2] == board[5] && board[5] == board[8] && board[2] != 0) {
        tempWinner = board[2];
        game = false;
    }
    else if (board[0] == board[4] && board[4] == board[8] && board[0] != 0) {
        tempWinner = board[0];
        game = false;
    }
    else if (board[2] == board[4] && board[4] == board[6] && board[2] != 0) {
        tempWinner = board[2];
        game = false;
    }
    else {
        game = true;
        return 0;
    }

    if (!game) {
        return tempWinner;
    }
}

reset = () => {
    player = changePlayer();
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    game = true;
    document.querySelectorAll(".block").forEach(ele => {
        ele.innerHTML = "";
    });
    if (player === 'X') {
        moveAI();
    }
}

changePlayer = () => {
    currentGameNo++;
    return currentGameNo % 2 === 0 ? players[2] : players[1];
}

isDraw = (board) => {
    for (let i = 0; i < 9; i++) {
        if (board[i] === 0) {
            return false
        }
    }
    return true;
}


moveAI = () => {
    index = getBestIndex([...board]);
    board[index] = 2;
    console.log(index);
    document.querySelectorAll(".block")[index].innerHTML = "X";
    let winner = check(board);
    if (winner) {
        alert("Player " + players[winner] + " Wins");
        updateScores(winner);
    }
    player = players[1];
}

getBestIndex = (tempBoard) => {
    let bestValue = -Infinity;
    let bestIndex;

    tempBoard.forEach((val, idx) => {
        if (val === 0) {
            tempBoard[idx] = 2;
            let moveValue = miniMax(tempBoard, false);
            tempBoard[idx] = 0;
            if (moveValue > bestValue) {
                bestIndex = idx;
                bestValue = moveValue;
            }
        }
    });
    return bestIndex;
}

miniMax = (tempBoard, isMaximizing) => {
    let score = check(tempBoard);
    if (score) {
        return score === 2 ? 10 : -10;
    }
    if (isDraw(tempBoard)) {
        return 0;
    }

    if (isMaximizing) {
        let best = -Infinity;
        tempBoard.forEach((val, idx) => {
            if (val === 0) {
                tempBoard[idx] = 2;
                best = Math.max(best, miniMax(tempBoard, !isMaximizing));
                tempBoard[idx] = 0;
            }
        });
        return best;
    } else {
        let best = Infinity;
        tempBoard.forEach((val, idx) => {
            if (val === 0) {
                tempBoard[idx] = 1;
                best = Math.min(best, miniMax(tempBoard, !isMaximizing));
                tempBoard[idx] = 0;
            }
        });
        return best;
    }
}


updateScores = (winner) => {
    scores[winner]++;
    document.querySelectorAll(".scores").forEach((ele, idx) => {
        ele.innerHTML = ele.innerHTML.split(/:/)[0] + " : " + scores[idx + 1];
    });
}

newGame = () => {
    players = { 1: 'O', 2: 'X' };
    player = players[1];
    scores = { 1: 0, 2: 0 };
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    game = true;
    currentGameNo = 1;
    document.querySelectorAll(".scores").forEach((ele, idx) => {
        ele.innerHTML = ele.innerHTML.split(/:/)[0] + " : 0";
    });
    document.querySelectorAll(".block").forEach(ele => {
        ele.innerHTML = "";
    });
}