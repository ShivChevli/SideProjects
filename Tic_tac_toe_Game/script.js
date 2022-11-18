
document.addEventListener("DOMContentLoaded", function () {
    disablePlay(false);
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isX = true;
    document.querySelectorAll(".board-cell").forEach((el) => {
        el.addEventListener("click", (btn) => {
            btnClick(btn.target, board, isX);
        });
    })
    document.querySelector("#reset-btn").addEventListener("click", () => resetBoard(board));

})
const anylizeBoard = (b) => {
    let ans = 0;
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < 8; i++) {
        if (b[win[i][0]] != 0 && b[win[i][0]] == b[win[i][1]] && b[win[i][0]] == b[win[i][2]]) {
            ans = b[win[i][2]];
            break;
        }
    }
    return ans;
}

const min_max = (board, player) => {
    let x = anylizeBoard(board);
    if (x != 0) {
        return x * player;
    }
    let pos = -1;
    let value = -2;
    let score = 0;
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = player;
            score = -min_max(board, player * -1);
            if (score > value) {
                value = score;
                pos = i;
            }
            board[i] = 0;
        }
    }
    if (pos == -1) {
        return 0;
    }
    return value;
}

const compTurn = (b) => {
    let pos = -1;
    let value = -2;
    let score;
    for (let i = 0; i < 9; i++) {
        if (b[i] == 0) {
            b[i] = 1;
            score = -min_max(b, -1);
            b[i] = 0;
            if (score > value) {
                value = score;
                pos = i;
            }
        }
    }
    b[pos] = 1;
    console.log(b);
}

const isEnd = (board) => {
    console.log("is End Call");
    console.log(board);
    let ans = true;
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            ans = false;
            break;
        }
    }
    return ans;
}

const btnClick = (el, board, isX) => {
    if (el.dataset.value != 0) {
        return null;
    }
    el.dataset.value = isX ? -1 : 1;
    isX = !isX;
    getBoardValue(board);
    compTurn(board);
    setBoardValue(board);
    let x = anylizeBoard(board);
    if (x != 0 || isEnd(board)) {
        if (x == 0) {
            announceSroce("Match drow");
        } else if (x == 1) {
            announceSroce("System(O) wins!!!!!!");
        } else {
            announceSroce("User(X) wins!!!!!! ");
        }
        disablePlay(true);
    }
}

const setBoardValue = async (board) => {
    let element = null;
    for (let i = 1; i < 10; i++) {
        element = document.querySelector(`#cell-${i}`);
        element.dataset.value = board[i - 1];
        if (board[i - 1] != 0) {
            element.innerHTML = board[i - 1] == -1 ? "X" : "O";
        }
        else {
            element.innerHTML = "-";
        }
    }
}

const getBoardValue = (board) => {
    for (let i = 1; i < 10; i++) {
        board[i - 1] = parseInt(document.querySelector(`#cell-${i}`).dataset.value);
    }
}

const announceSroce = (msg) => {
    alert(msg)
}

const disablePlay = (isTrue) => {
    let cover = document.querySelector(".board");
    cover.style.setProperty("--display", isTrue ? "block" : "none");
    isTrue ? cover.addEventListener("click", info) : cover.removeEventListener("click", info);

}

const info = () => {
    announceSroce("Game is Over \nStart new game by clicking reset button", false);
}
const resetBoard = (board) => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    setBoardValue(board);
    disablePlay(false);
}