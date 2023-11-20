const boardSize = 15; // 15x15 오목판
let currentPlayer = "black"; // 시작 플레이어 (흑돌부터 시작)

// 오목판 초기화
function initializeBoard() {
    const boardElement = document.getElementById("board");

    for (let i = 0; i < boardSize; i++) {
        const row = boardElement.insertRow(i);

        for (let j = 0; j < boardSize; j++) {
            const cell = row.insertCell(j);
            cell.onclick = () => makeMove(i, j);
        }
    }
}

// 돌 놓기
function makeMove(row, col) {
    const cell = document.getElementById("board").rows[row].cells[col];

    if (cell.innerHTML === "") {
        cell.innerHTML = currentPlayer === "black" ? "●" : "○";

        if (checkWinner(row, col)) {
            alert(currentPlayer.toUpperCase() + " Wins!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "black" ? "white" : "black";
        }
    }
}

// 승자 확인
function checkWinner(row, col) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // vertical and horizontal
        [-1, -1], [1, 1], [-1, 1], [1, -1] // diagonal
    ];

    for (const dir of directions) {
        let count = 1;
        let r = row + dir[0];
        let c = col + dir[1];

        while (r >= 0 && r < size && c >= 0 && c < size && document.getElementById("board").rows[r].cells[c].innerHTML === currentPlayer) {
            count++;
            r += dir[0];
            c += dir[1];
        }

        r = row - dir[0];
        c = col - dir[1];

        while (r >= 0 && r < size && c >= 0 && c < size && document.getElementById("board").rows[r].cells[c].innerHTML === currentPlayer) {
            count++;
            r -= dir[0];
            c -= dir[1];
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}


// 한 방향으로의 돌 개수 확인
function checkDirection(row, col, dirRow, dirCol) {
    let count = 0;
    let i = row + dirRow;
    let j = col + dirCol;

    while (i >= 0 && i < boardSize && j >= 0 && j < boardSize && document.getElementById("board").rows[i].cells[j].innerHTML === currentPlayer) {
        count++;
        i += dirRow;
        j += dirCol;
    }

    return count;
}

// 오목판 리셋
function resetBoard() {
    const cells = document.querySelectorAll("#board td");

    cells.forEach(cell => {
        cell.innerHTML = "";
    });

    currentPlayer = "black";
}

// 초기화 및 게임 시작
initializeBoard();
