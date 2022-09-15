let playerOne = {};
let playerTwo = {};


const gameBoard = (() => {       //module to store game board
    let _rowOne = [0,0,0];
    let _rowTwo = [0,0,0];
    let _rowThree = [0,0,0];
    const set = (marker, x, y) => {
        if(x === "1") _rowOne[y-1] = marker;
        if(x === "2") _rowTwo[y-1] = marker;
        if(x === "3") _rowThree[y-1] = marker;
    };
    const clear = () => {
        _rowOne = [0,0,0];
        _rowTwo = [0,0,0];
        _rowThree = [0,0,0];
        cells.forEach((cell) => {
            cell.textContent = "";
        });
    };
    const checkStatus = () => {
        // checks rows
        if(_rowOne[0] === _rowOne[1] && _rowOne[0] === _rowOne[2] && _rowOne[0] != "0") winner(_rowOne[0]);
        if(_rowTwo[0] === _rowTwo[1] && _rowTwo[0] === _rowTwo[2] && _rowTwo[0] != "0") winner(_rowTwo[0]);
        if(_rowThree[0] === _rowThree[1] && _rowThree[0] === _rowThree[2] && _rowThree[0] != "0") winner(_rowThree[0]);
        // checks columns
        if(_rowOne[0] === _rowTwo[0] && _rowOne[0] === _rowThree[0] && _rowOne[0] != "0") winner(_rowOne[0]);
        if(_rowOne[1] === _rowTwo[1] && _rowOne[1] === _rowThree[1] && _rowOne[1] != "0") winner(_rowOne[1]);
        if(_rowOne[2] === _rowTwo[2] && _rowOne[2] === _rowThree[2] && _rowOne[2] != "0") winner(_rowOne[2]);
        // checks diagonal
        if(_rowOne[0] === _rowTwo[1] && _rowOne[0] === _rowThree[2] && _rowOne[0] != "0") winner(_rowOne[0]);
        if(_rowThree[0] === _rowTwo[1] && _rowThree[0] === _rowOne[2] && _rowThree[0] != "0") winner(_rowThree[0]);
    };
    const winner = (x) => {
        if(playerOne.order === x) {
            alert(`${playerOne.name} has won the game!`);
        } else {
            alert(`${playerTwo.name} has won the game!`);
        }
    }
    const board = () => {     //temporary for testing
        console.log(_rowOne);
        console.log(_rowTwo);
        console.log(_rowThree);
    };
    return {set, clear, checkStatus};
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
    if(this.textContent === "x" || this.textContent === "o") return;
    let tempArray = this.id.split("");
    const marker = gameFlow.get();
    this.textContent = marker;
    const setMarker = gameBoard.set(marker, tempArray[0], tempArray[1]);
    setTimeout(gameBoard.checkStatus, 100);
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