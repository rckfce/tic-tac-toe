let playerOne = {};
let playerTwo = {};

const gameBoard = (() => {       //module to store game board
    let board = [['0','0','0'],['0','0','0'],['0','0','0']];
    
    const _boardUpdate = (input) => {    //updates board and checks if there is a winner
        let diagonalTopLeftToBotRight = [];
        let diagonalTopRightToBotLeft = [];
        for (i = 0; i < board.length; i++) {
            let columnCheck = [];
            for (j = 0; j < board.length; j++) {   //creates columns to check
                columnCheck.push(board[j][i]);
            }
            diagonalTopLeftToBotRight.push(board[i][i]);
            diagonalTopRightToBotLeft.push(board[i][2-i]);
            if (_checkWin(board[i], input) || _checkWin(columnCheck, input)) _winnerAlert(input);    //checks winner for rows or columns passing marker
        }
        if (_checkWin(diagonalTopLeftToBotRight, input) || _checkWin(diagonalTopRightToBotLeft, input)) _winnerAlert(input);
        _checkForDraw();
    }

    const _checkWin = (input, marker) => { //returns true if win condition is met for input
        const winCondition = (markerCheck) => markerCheck === marker;  
        return input.every(winCondition);
    };

    const _winnerAlert = (x) => {
        if(playerOne.order === x) {
            setTimeout(function () {
                alert(`${playerOne.name} has won the game!`);
            }, 100);
        } else {
            setTimeout(function () {
                alert(`${playerTwo.name} has won the game!`);
            }, 100);
        }
    }

    const _checkForDraw = () => {                             //checks for draw
        if(!board[0].includes('0') && !board[1].includes('0') && !board[2].includes('0')) {
                setTimeout(function () {
                    alert(`It is a draw!`);
                }, 100);
            };
    }

    const _checkLine = (line) => {   //function to pass marker in filter method    !!!need to change marker
        return line == '2';
    }

    const _checkStatus = (input) => {   //gets how many markers in input
        return input.filter(_checkLine);
    }

    const set = (marker, x, y) => {
        board[x][y] = marker;
        _boardUpdate(marker);       //passes current marker to _boardUpdate
    };

    const clear = () => { 
        board = [['0','0','0'],['0','0','0'],['0','0','0']];
        cells.forEach((cell) => {
            cell.textContent = "";
        });
    };

    return {set, clear};
})();


const player = (name, order) => {      //factory function to create players
    return {name, order};
};

const gameFlow = (() => {       //module to control game
    let _turn = "x";
    const start = () => {              //randomizes who starts the game
        let starter = Math.floor(Math.random() * 2);
        if(starter === 0) return "1";
        return "2";
    };
    const get = () => {        //returns current turn and changes for next turn
        swap();
        if(_turn === "x") {
            _turn = "o";
            return "x";
        }
        _turn = "x";
        return "o";
    };
    const swap = () => {     // changes active player color
        const activePlayer = document.getElementById("active");
        const activeClass = activePlayer.className;
        const playerOneDiv = document.querySelector(".player-one");
        const playerTwoDiv = document.querySelector(".player-two");
        if(activeClass === "player-one") {
            playerOneDiv.removeAttribute("id");
            playerTwoDiv.setAttribute("id", "active");
        };
        if(activeClass === "player-two") {
            playerTwoDiv.removeAttribute("id");
            playerOneDiv.setAttribute("id", "active");
        };
        };

    return {get, start};
})();

function addNewPlayer() {
    let newName = prompt("Enter your name please!");
    let playerOneOrder;
    let playerTwoOrder;
    if(whoStarts == 1) {
        playerOneOrder = "x";
        playerTwoOrder = "o";
    } else {
        playerOneOrder = "o";
        playerTwoOrder = "x";
    }
    if(document.activeElement.id === "player-one") {
        playerOne = player(newName, playerOneOrder);
        renderName(document.activeElement.id, newName);
    } else {
        playerTwo = player(newName, playerTwoOrder);
        renderName(document.activeElement.id, newName);
    }
};

function renderName(n, name) {
    const div = document.querySelector(`.${n}`);
    if(n === "player-one" && whoStarts == 1) {
        div.setAttribute("id", "active");
    }
    if(n === "player-two" && whoStarts == 2) {
        div.setAttribute("id", "active");
    }
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let newCellNode = document.createTextNode(name);
    div.appendChild(newCellNode);
    startGameButton();
}

const cells = document.querySelectorAll(".cell");
cells.forEach(each => each.addEventListener("click", markCell));

function markCell() {
    if(this.textContent === "x" || this.textContent === "o") return;    //do nothing if cell already has marker
    let tempArray = this.id.split("");                                  //gets marker location from clicked element id
    const marker = gameFlow.get();                                      //get current marker
    this.textContent = marker;                                          //draw marker on screen
    const setMarker = gameBoard.set(marker, tempArray[0], tempArray[1]);//sets marker on board
    //setTimeout(gameBoard.checkStatus, 100);                             //updates board and checks for winner
}

function startGameButton() {
    if(Object.keys(playerOne) != 0 && Object.keys(playerTwo) != 0) {
        const boardDiv = document.querySelector(".board");
        let startButton = document.createElement("button");
        startButton.setAttribute("class", "start");
        startButton.setAttribute("onclick", "startGame()");
        let startButtonText = document.createTextNode("Start the game");
        startButton.appendChild(startButtonText);
        boardDiv.appendChild(startButton);
    };
}

function startGame() {
    let boardDiv = document.querySelector(".board");
    boardDiv.removeChild(document.querySelector(".start"));
    cells.forEach((cell) => {
        cell.classList.remove("hidden");
    });
    boardDiv.classList.remove("board-flex");
    boardDiv.classList.add("board-lines");
}

const whoStarts = gameFlow.start();