let playerOne = {};
let playerTwo = {};


const gameBoard = (() => {       //module to store game board
    const _rowOne = [0,0,0];
    const _rowTwo = [0,0,0];
    const _rowThree = [0,0,0];
    const set = (position, player) => {};
    const get = (x, y) => {};
    const board = () => {     //temporary for testing
        console.log(_rowOne);
        console.log(_rowTwo);
        console.log(_rowThree);
    };
    return {set, get, board};
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

    return {get, start, swap};
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
        //console.log(playerOne);
    } else {
        playerTwo = player(newName, playerTwoOrder);
        renderName(document.activeElement.id, newName);
        //console.log(playerTwo);
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
}

const whoStarts = gameFlow.start();

  


gameBoard.board();