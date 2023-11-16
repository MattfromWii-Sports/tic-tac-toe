
const places = document.querySelectorAll('#grid>.cells');

const player = ((char, stat) => {
    this.token = char;
    this.turn = stat;
    return {token, turn};
});

const player1 = player('O', true);
const player2 = player('X', false);

const gameboard = (() => {
    const gamePlaces = new Array(9);
    
    places.forEach(x => x.addEventListener('click', (e) => {
        if (gamePlaces[e.target.dataset.type] !== undefined) return; //if place in array occupied
        if (player1.turn === true) { //player1 turn
            e.target.textContent = player1.token;
            gamePlaces.splice(e.target.dataset.type, 1, player1.token);
            player1.turn = false;
            player2.turn = true;

        } else if (player2.turn === true) { //player2 turn
            e.target.textContent = player2.token;
            gamePlaces.splice(e.target.dataset.type, 1, player2.token);
            player2.turn = false;
            player1.turn = true;

        }
        checkWinner();
        console.log(`board game array: ${gamePlaces}`);
    }));

    const checkWinner = (() => {
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
        winningPlaces.forEach((set) => {
            //Checks all three indexes, if same value then it checks if it is the symbol of one of the 2 players
            if(gamePlaces[set[0]] === gamePlaces[set[1]] && gamePlaces[set[1]] === gamePlaces[set[2]] && gamePlaces[set[0]] === player1.token) {
                console.log('player1 won');
            } else if (gamePlaces[set[0]] === gamePlaces[set[1]] && gamePlaces[set[1]] === gamePlaces[set[2]] && gamePlaces[set[0]] === player2.token) {
                console.log('player2 won');
            }
        });

    });



    return {gamePlaces};
})();