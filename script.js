
const statusText = document.querySelector('.status-text');
const places = document.querySelectorAll('#board>.cells');
const resetBtn = document.querySelector('.reset-btn');

const player = ((char, stat) => {
    this.token = char;
    this.turn = stat;
    return {token, turn};
});

const player1 = player('X', true);
const player2 = player('O', false);

const gameboard = (() => {
    const gamePlaces = new Array(9); //Creates array filled with undefined 
    //Dictates flow of turns (alternating using true/false on player object properties)
    places.forEach(x => x.addEventListener('click', (e) => {
        if (gamePlaces[e.target.dataset.type] !== undefined) return; //if place in array occupied
        if (player1.turn === true) { //player1 turn
            e.target.textContent = player1.token;
            gamePlaces.splice(e.target.dataset.type, 1, player1.token);
            player1.turn = false;
            player2.turn = true;
            statusText.textContent = 'O\'s turn';
        } else if (player2.turn === true) { //player2 turn
            e.target.textContent = player2.token;
            gamePlaces.splice(e.target.dataset.type, 1, player2.token);
            player2.turn = false;
            player1.turn = true;
            statusText.textContent = 'X\'s turn';
        }
        checkWinnerTie();
    }));

    //Checks if a winner exists or the board is full(tie)
    const checkWinnerTie = (() => {
        const winningPlaces = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        let winnerFound = false;
        const stopTurns = (() => {
            player1.turn = false;
            player2.turn = false;
        });
        winningPlaces.forEach((set) => {
            //Checks all three indexes, if same value then it checks if it is the symbol of one of the 2 players
            if(gamePlaces[set[0]] === gamePlaces[set[1]] && gamePlaces[set[1]] === gamePlaces[set[2]] && gamePlaces[set[0]] === player1.token) {
                stopTurns();
                statusText.textContent = 'X WINS!';
                winnerFound = true;
            } else if (gamePlaces[set[0]] === gamePlaces[set[1]] && gamePlaces[set[1]] === gamePlaces[set[2]] && gamePlaces[set[0]] === player2.token) {
                stopTurns();
                statusText.textContent = 'O WINS!';
                winnerFound = true;
            }
        });
        if (winnerFound === false && gamePlaces.filter(num => num !== undefined).length === 9) {
            stopTurns();
            statusText.textContent = 'It\s a TIE!';
        }
    });

    resetBtn.addEventListener('click', () => resetBoard());

    const resetBoard = (() => {
        //update Array places
        for(let i = 0; i < 9; i++) {
            gamePlaces[i] = undefined; 
        }
        //update Visual places
        places.forEach((x) => {
            x.textContent = '';
        });
        player1.turn = true;
        player2.turn = false;
        statusText.textContent = 'X starts first';
    });

    return {gamePlaces};
})();